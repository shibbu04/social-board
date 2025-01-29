import { create } from 'zustand';
import api from '../lib/axios';

interface Post {
  _id: string;
  user: {
    _id: string;
    name: string;
    socialHandle: string;
  };
  images: string[];
  caption: string;
  createdAt: string;
}

interface PostState {
  posts: Post[];
  userPosts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  fetchUserPosts: (userId: string) => Promise<void>;
  createPost: (formData: FormData) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  updatePost: (postId: string, caption: string) => Promise<void>;
}

const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  userPosts: [],
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/posts');
      set({ posts: data, loading: false, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch posts', loading: false });
    }
  },

  fetchUserPosts: async (userId) => {
    set({ loading: true });
    try {
      const { data } = await api.get(`/posts/user/${userId}`);
      set({ userPosts: data, loading: false, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch user posts', loading: false });
    }
  },

  createPost: async (formData) => {
    set({ loading: true });
    try {
      const { data: newPost } = await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Update both posts and userPosts arrays
      set((state) => ({
        posts: [newPost, ...state.posts],
        userPosts: [newPost, ...state.userPosts],
        loading: false,
        error: null
      }));
    } catch (error) {
      set({ error: 'Failed to create post', loading: false });
    }
  },

  deletePost: async (postId) => {
    try {
      await api.delete(`/posts/${postId}`);
      set((state) => ({
        posts: state.posts.filter((post) => post._id !== postId),
        userPosts: state.userPosts.filter((post) => post._id !== postId),
      }));
    } catch (error) {
      set({ error: 'Failed to delete post' });
    }
  },

  updatePost: async (postId, caption) => {
    try {
      const { data } = await api.put(`/posts/${postId}`, { caption });
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId ? { ...post, caption } : post
        ),
        userPosts: state.userPosts.map((post) =>
          post._id === postId ? { ...post, caption } : post
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to update post' });
    }
  },
}));

export default usePostStore;