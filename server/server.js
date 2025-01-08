import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './db.js';
import bodyParser from 'body-parser';
import cors from 'cors';

import Category from './models/categoryModel.js';  // Make sure to import the Category model
import Banner from './models/bannerModel.js';


const app = express();
dotenv.config();

import categoryRoutes from './routes/categoryRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js'
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';


// Connect to DB
connectDb();

// Middleware Setup
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan('dev')); // Logging for incoming requests
app.use(cors()); // Enable Cross-Origin Resource Sharing


// API Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/categories', categoryRoutes); 
app.use('/banners', bannerRoutes);  // Corrected the route declaration
 

app.use('/uploads', express.static('uploads'));

const insertDefaultCategories = async () => {
  try {
    const existingCategories = await Category.find();
    if (existingCategories.length === 0) {
      const defaultCategories = [
        { name: 'Clothing', image: "/uploads/collection-1.jpg" ,active:true},
        { name: 'Sunglasses', image: "/uploads/collection-2.jpg",active:true },
        { name: 'Bags', image: "/uploads/collection-14.jpg",active:true },
        { name: 'Shoes', image: "/uploads/collection-20.jpg",active:true },
        { name: 'Accessories', image: "/uploads/collection-17.jpg",active:true },
        { name: 'Jewelry', image: "/uploads/collection-18.jpg",active:true },
      ];

      await Category.insertMany(defaultCategories);
      console.log('Default categories inserted');
    } else {
      console.log('Categories already exist in the database');
    }
  } catch (error) {
    console.error('Error inserting default categories:', error);
  }
};

// Call the function to insert categories on startup
insertDefaultCategories();


const insertDefaultBanners = async () => {
  try {
    const existingBanners = await Banner.find();
    if (existingBanners.length === 0) {
      const defaultBanners = [
        { image: "/uploads/fashion-slideshow-01.jpg", caption: "Glamorous Glam", text: "From casual to formal, we've got you covered", active: true },
        { image: "/uploads/fashion-slideshow-02.jpg", caption: "Summer Style Sensations", text: "Fashion at your fingertips!", active: true },
        { image: "/uploads/fashion-slideshow-03.jpg", caption: "Elegance", text: "Don't miss out on great discounts!", active: true }
      ];
      await Banner.insertMany(defaultBanners);
      console.log('Default banners inserted');
    } else {
      console.log('Banners already exist in the database');
    }
  } catch (error) {
    console.error('Error inserting default banners:', error);
  }
};
insertDefaultBanners();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
