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
import {
  getColors,
  addColor,
  updateColor,
  deleteColor,
} from '../controllers/colorController.js';
import {
  getSizes,
  addSize,
  updateSize,
  deleteSize,
} from '../controllers/sizeController.js';  // Import size controller

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
// Color Management Routes
router.get('/get_colors', protect, admin, getColors); // Fetch all colors
router.post('/add_color', protect, admin, addColor); // Add a new color
router.put('/update_color/:id', protect, admin, updateColor); // Update a color
router.delete('/delete_color/:id', protect, admin, deleteColor); // Delete a color

// Size Management Routes
router.get('/get_sizes', protect, admin, getSizes); // Fetch all sizes
router.post('/add_size', protect, admin, addSize); // Add a new size
router.put('/update_size/:id', protect, admin, updateSize); // Update a size
router.delete('/delete_size/:id', protect, admin, deleteSize); // Delete a size

export default router;
