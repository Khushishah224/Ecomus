import express from 'express';
import {
  getUser,
  login,
  register,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getUser);
router.put('/update_profile', protect, updateUserProfile);
export default router;
