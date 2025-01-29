import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  makeAdmin,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', protect, admin, getUsers);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.delete('/:id', protect, admin, deleteUser);
router.put('/:id/make-admin', protect, admin, makeAdmin);

export default router;