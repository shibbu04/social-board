import express from 'express';
import multer from 'multer';
import path from 'path';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  createPost,
  getPosts,
  getUserPosts,
  deletePost,
  updatePost,
} from '../controllers/postController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  },
});

router.post('/', protect, upload.array('images', 5), createPost);
router.get('/', protect, getPosts);
router.get('/user/:userId', protect, getUserPosts);
router.delete('/:id', protect, deletePost);
router.put('/:id', protect, updatePost);

export default router;