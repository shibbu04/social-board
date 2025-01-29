import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';

export const createPost = asyncHandler(async (req, res) => {
  const { caption } = req.body;
  const images = req.files.map(file => `/${file.path}`);

  const post = await Post.create({
    user: req.user._id,
    images,
    caption,
  });

  res.status(201).json(post);
});

export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate('user', 'name socialHandle')
    .sort('-createdAt');
  res.json(posts);
});

export const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.params.userId })
    .populate('user', 'name socialHandle')
    .sort('-createdAt');
  res.json(posts);
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized');
  }

  await post.deleteOne();
  res.json({ message: 'Post removed' });
});

export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  post.caption = req.body.caption || post.caption;
  const updatedPost = await post.save();

  res.json(updatedPost);
});