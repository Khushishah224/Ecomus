import express from 'express';
import {
  getUsers,
  login,
  createBanner,
  updateUserProfile,
  deleteBanner,
  updateBanner,
  createTagline,
  getTaglines,
  updateTagline,
  deleteTagline,
  getBanners,
} from '../controllers/adminController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';
const router = express.Router();


router.post('/login', login);
router.get('/get_users', protect, admin, getUsers);
router.put('/update_user_profile', protect,admin, updateUserProfile);
router.post('/create_banner', protect, admin, createBanner);
router.get('/get_banners', protect, admin, getBanners);
router.delete('/delete_banner/:id', protect, admin, deleteBanner);
router.put('/update_banner/:id', protect, admin, updateBanner);

// Tagline Management Routes
router.post('/create_taglines', protect, admin, createTagline);
router.get('/get_taglines', protect, admin, getTaglines);
router.put('/update_taglines/:id', protect, admin, updateTagline);
router.delete('/delete_taglines/:id', protect, admin, deleteTagline);


export default router;
 