import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './db.js';
import cors from 'cors';

import Category from './models/categoryModel.js';  // Make sure to import the Category model
import Banner from './models/bannerModel.js';
import ShopTheLook from './models/shoplookModel.js';
import Product from './models/productModel.js';



const app = express();
dotenv.config();

import categoryRoutes from './routes/categoryRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js'
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import productsRoutes from './routes/productsRoutes.js';



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
app.use('/banners', bannerRoutes);
app.use('/products', productsRoutes);  // Corrected the route declaration

 

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

const insertDefaultShopthelook = async () => {
  try {
    const existingShopLooks = await ShopTheLook.find();
    if (existingShopLooks.length === 0) {
      const defaultShopLook = {
        images: {
          image1: {
            imagePath: "/uploads/lookbook-3.jpg",
            dots: [],
          },
          image2: {
            imagePath: "/uploads/lookbook-4.jpg",
            dots: [],
          },
        },
      };

      await ShopTheLook.create(defaultShopLook);
      console.log('Default ShopLook inserted');
    } else {
      console.log('ShopLooks already exist in the database');
    }
  } catch (error) {
    console.error('Error inserting default ShopLook:', error);
  }
};
insertDefaultShopthelook();


const insertDefaultProducts = async () => {
  try {
    const existingProducts = await Product.find();
    if (existingProducts.length === 0) {
      const defaultProducts = [
        {
          name: "Ribbed Tank Top",
          category: "Clothing",
          description: "A stylish casual shirt for everyday wear.",
          variants: [
            {
              color: "Orange",
              sizes: [
                { size: "S", price: 18.00 },
                { size: "L", price: 18.25 },
                { size: "XL", price: 18.35 },
              ],
              stock: 50,
              stockStatus: "In Stock",
              images: {
                front: "/uploads/orange-1.jpg",
                back: "/uploads/white-1.jpg",
                side: "/uploads/black-1.jpg",
              },
            },
            {
              color: "Black",
              sizes: [
                { size: "S", price: 18.00 },
                { size: "L", price: 18.25 },
                { size: "XL", price: 18.35 },
              ],
              stock: 50,
              stockStatus: "In Stock",
              images: {
                front: "/uploads/orange-1.jpg",
                back: "/uploads/white-1.jpg",
                side: "/uploads/black-1.jpg",
              },
            },
            {
              color: "White",
              sizes: [
                { size: "S", price: 18.00 },
                { size: "L", price: 18.25 },
                { size: "XL", price: 18.35 },
              ],
              stock: 50,
              stockStatus: "In Stock",
              images: {
                front: "/uploads/orange-1.jpg",
                back: "/uploads/white-1.jpg",
                side: "/uploads/black-1.jpg",
              },
            },
            
          ],
        },
        {
          name: "Ribbed modal T-shirt",
          category: "Men's Clothing",
          description: "Comfortable and stylish formal pants.",
          variants: [
            {
              color: "Black",
              sizes: [
                { size: "S", price: 40.99 },
                { size: "M", price: 42.99 },
                { size: "L", price: 20.00 },
              ],
              stock: 30,
              stockStatus: "In Stock",
              images: {
                front: "/uploads/brown.jpg",
                back: "/uploads/purple.jpg",
                side: "/uploads/formal-pants-black-side.jpg",
              },
            },
          ],
        },
        {
          name: "Oversized Motif T-shirt",
          category: "Footwear",
          description: "Lightweight sports shoes for running and training.",
          variants: [
            {
              color: "White",
              sizes: [
                { size: "S", price: 60.99 },
                { size: "M", price: 62.99 },
                { size: "XL", price: 25.00 },
              ],
              stock: 20,
              stockStatus: "Low Stock",
              images: {
                front: "/uploads/white-3.jpg",
                back: "/uploads/white-3.jpg",
                side: "/uploads/sports-shoes-white-side.jpg",
              },
            },
          ],
        },
        {
          name: "Oversized Printed T-shirt",
          category: "Outerwear",
          description: "A sleek leather jacket for a bold look.",
          variants: [
            {
              color: "Brown",
              sizes: [
                { size: "M", price: 120.99 },
                { size: "L", price: 125.99 },
                { size: "XL", price: 130.99 },
              ],
              stock: 15,
              stockStatus: "In Stock",
              images: {
                front: "/uploads/white-2.jpg",
                back: "/uploads/brown-4.jpg",
                side: "/uploads/leather-jacket-brown-side.jpg",
              },
            },
          ],
        },
        {
          name: "V-neck linen T-shirt",
          category: "Women's Clothing",
          description: "A vibrant summer dress for sunny days.",
          variants: [
            {
              color: "Yellow",
              sizes: [
                { size: "S", price: 35.99 },
                { size: "M", price: 37.99 },
                { size: "L", price: 39.99 },
              ],
              stock: 25,
              stockStatus: "In Stock",
              images: {
                front: "/uploads/light-green-1.jpg",
                back: "/uploads/light-green-2.jpg",
                side: "/uploads/summer-dress-yellow-side.jpg",
              },
            },
          ],
        },
        {
          name: "Loose Fit Sweatshirt",
          category: "Accessories",
          description: "Breathable running cap for sunny runs.",
          variants: [
            {
              color: "Black",
              sizes: [
                { size: "S", price: 35.99 },
                { size: "M", price: 37.99 },
                { size: "L", price: 39.99 },
              ],
              stock: 100,
              stockStatus: "In Stock",
              images: {
                front: "/uploads/black-4.jpg",
                back: "/uploads/black-5.jpg",
                side: "/uploads/running-cap-black-side.jpg",
              },
            },
          ],
        },
        {
          name: "Regular Fit Oxford Shirt",
          category: "Accessories",
          description: "Breathable running cap for sunny runs.",
          variants: [
            {
              color: "Black",
              sizes: [
                { size: "S", price: 35.99 },
                { size: "M", price: 37.99 },
                { size: "L", price: 39.99 },
              ],
              stock: 100,
              stockStatus: "In Stock",
              images: {
                front: "/uploads/black-4.jpg",
                back: "/uploads/black-5.jpg",
                side: "/uploads/running-cap-black-side.jpg",
              },
            },
          ],
        },
        {
          name: "Loose Fit Hoodie",
          category: "Accessories",
          description: "Breathable running cap for sunny runs.",
          variants: [
            {
              color: "Black",
              sizes: [
                { size: "S", price: 35.99 },
                { size: "M", price: 37.99 },
                { size: "L", price: 39.99 },
              ],
              stock: 100,
              stockStatus: "In Stock",
              images: {
                front: "/uploads/black-4.jpg",
                back: "/uploads/black-5.jpg",
                side: "/uploads/running-cap-black-side.jpg",
              },
            },
          ],
        },
        {
          name: "Patterned scarf",
          category: "Accessories",
          description: "Breathable running cap for sunny runs.",
          variants: [
            {
              color: "Brown",
              sizes: [
                { size: "S", price: 35.99 },
                { size: "M", price: 37.99 },
                { size: "L", price: 39.99 },
              ],
              stock: 100,
              stockStatus: "In Stock",
              images: {
                front: "/uploads/black-4.jpg",
                back: "/uploads/black-5.jpg",
                side: "/uploads/running-cap-black-side.jpg",
              },
            },
          ],
        },
        {
          name: "Slim Fit-knit Turtleneck Sweater",
          category: "Accessories",
          description: "Breathable running cap for sunny runs.",
          variants: [
            {
              color: "Black",
              sizes: [
                { size: "S", price: 35.99 },
                { size: "M", price: 37.99 },
                { size: "L", price: 39.99 },
              ],
              stock: 100,
              stockStatus: "In Stock",
              images: {
                front: "/uploads/black-4.jpg",
                back: "/uploads/black-5.jpg",
                side: "/uploads/running-cap-black-side.jpg",
              },
            },
          ],
        },
        {
          name: "Boxy T-shirt",
          category: "Accessories",
          description: "Breathable running cap for sunny runs.",
          variants: [
            {
              color: "Brown",
              sizes: [
                { size: "S", price: 35.99 },
                { size: "M", price: 37.99 },
                { size: "L", price: 39.99 },
              ],
              stock: 100,
              stockStatus: "In Stock",
              images: {
                front: "/uploads/black-4.jpg",
                back: "/uploads/black-5.jpg",
                side: "/uploads/running-cap-black-side.jpg",
              },
            },
          ],
        },
        {
          name: "Drawstring-detail Sports Tank Top",
          category: "Accessories",
          description: "Breathable running cap for sunny runs.",
          variants: [
            {
              color: "Orange",
              sizes: [
                { size: "S", price: 35.99 },
                { size: "M", price: 37.99 },
                { size: "L", price: 39.99 },
              ],
              stock: 100,
              stockStatus: "In Stock",
              images: {
                front: "/uploads/black-4.jpg",
                back: "/uploads/black-5.jpg",
                side: "/uploads/running-cap-black-side.jpg",
              },
            },
          ],
        },
      ];

      await Product.insertMany(defaultProducts);
      console.log("Default products inserted");
    } else {
      console.log("Products already exist in the database");
    }
  } catch (error) {
    console.error("Error inserting default products:", error);
  }
};

insertDefaultProducts();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});