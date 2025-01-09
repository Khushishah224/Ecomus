//admin routes
import express from 'express';
import {
  getUsers,
  login,
  updateUserProfile,
  createTagline,
  getTaglines,
  updateTagline,
  deleteTagline
} from '../controllers/adminController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';
import { getShopTheLook, updateShopTheLook } from "../controllers/shopthelookController.js";
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.get('/get_users', protect, admin, getUsers);
router.put('/update_user_profile', protect,admin, updateUserProfile);

// Tagline Management Routes
router.post('/create_taglines', protect, admin, createTagline);
router.get('/get_taglines', protect, admin, getTaglines);
router.put('/update_taglines/:id', protect, admin, updateTagline);
router.delete('/delete_taglines/:id', protect, admin, deleteTagline);

// Shop the Look Routes

router.get("/get_shopthelook",getShopTheLook);
router.put("/update_shopthelook",upload.fields([{ name: "image1" }, { name: "image2" }]), updateShopTheLook);



export default router;
 