import express from 'express';
import {
  getUser,
  login,
  register,
  updateUserProfile,
  getTaglines
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getUser);
router.put('/update_profile', protect, updateUserProfile);
router.get('/get_taglines', getTaglines);
export default router;
