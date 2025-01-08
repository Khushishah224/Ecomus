//admin routes
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
import {
  createHeader,
  getHeaders,
  updateHeader,
  deleteHeader
} from '../controllers/headerController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multerMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.get('/get_users', protect, admin, getUsers);
router.put('/update_user_profile', protect, admin, updateUserProfile);

// Banner Management Routes
router.post('/create_banner', protect, admin, upload.single('img'), (req, res, next) => {
  console.log("File received by Multer:", req.file);
  next();
}, createBanner);
router.get('/get_banners', protect, admin, getBanners);
router.delete('/delete_banner/:id', protect, admin, deleteBanner);
router.put('/update_banner/:id', protect, admin, upload.single('img'), updateBanner);

// Tagline Management Routes
router.post('/create_taglines', protect, admin, createTagline);
router.get('/get_taglines', protect, admin, getTaglines);
router.put('/update_taglines/:id', protect, admin, updateTagline);
router.delete('/delete_taglines/:id', protect, admin, deleteTagline);

// Header Management Routes
router.post('/create_header', protect, admin, createHeader);
router.get('/get_headers', protect, admin, getHeaders);
router.put('/update_header/:id', protect, admin, updateHeader);
router.delete('/delete_header/:id', protect, admin, deleteHeader);

export default router;
