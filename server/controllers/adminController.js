import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Banner from '../models/bannerModel.js';
import Tagline from '../models/marquee.js';
import Category from '../models/categoryModel.js';
import path from 'path';
import fs from 'fs';

// @desc     Auth User & Get Token
// @route    POST api/users/login
// @access   Private
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(user && user.isAdmin) {
    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or Password');
    }
  } else {
    res.status(401);
    throw new Error('User is not an Admin');
  }
});

// @desc     Get all Users
// @route    GET api/users
// @access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc     Update User Profile
// @route    PUT api/users/profile/:id
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.fname = req.body.fname || user.fname;
    user.lname = req.body.lname || user.lname;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    return res.json({
      _id: updatedUser._id,
      fname: updatedUser.fname,
      lname: updatedUser.lname,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

// Banner operations
const createBanner = asyncHandler(async (req, res) => {
  const { img, title, description } = req.body;

  const banner = await Banner.create({ img, title, description });
  try{
    if (banner) {
      res.status(201).json({
        _id: banner._id,
        img: banner.img,
        title: banner.title,
        description: banner.description,
      });
    } else {
      res.status(400);
      throw new Error('Invalid Banner Data');
    }
  } catch(err){
    console.log(err);
  }
});



const getBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find({});
  res.json(banners);
});

const updateBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);

  if (banner) {
    if (req.file) {
      // Delete old image from Cloudinary
      const publicId = banner.img.split('/').pop().split('.')[0]; // Extract public ID
      await cloudinary.uploader.destroy(`banners/${publicId}`);

      banner.img = req.file.path;
    }

    banner.title = req.body.title || banner.title;
    banner.description = req.body.description || banner.description;

    const updatedBanner = await banner.save();
    res.json(updatedBanner);
  } else {
    res.status(404);
    throw new Error('Banner not found');
  }
});


const deleteBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);

  if (banner) {
    // Delete image from Cloudinary
    const publicId = banner.img.split('/').pop().split('.')[0]; // Extract public ID
    await cloudinary.uploader.destroy(`banners/${publicId}`);

    await banner.remove();
    res.json({ message: 'Banner removed' });
  } else {
    res.status(404);
    throw new Error('Banner not found');
  }
});

// Tagline operations
const createTagline = asyncHandler(async (req, res) => {
  const { text } = req.body;

  const tagline = await Tagline.create({ text });

  if (tagline) {
    res.status(201).json(tagline);
  } else {
    res.status(400);
    throw new Error("Invalid tagline data");
  }
});

const getTaglines = asyncHandler(async (req, res) => {
  const taglines = await Tagline.find({});
  res.json(taglines);
});

const updateTagline = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const tagline = await Tagline.findById(req.params.id);

  if (tagline) {
    tagline.text = text || tagline.text;
    const updatedTagline = await tagline.save();
    res.json(updatedTagline);
  } else {
    res.status(404);
    throw new Error("Tagline not found");
  }
});

const deleteTagline = asyncHandler(async (req, res) => {
  const tagline = await Tagline.findById(req.params.id);

  if (tagline) {
    await tagline.remove();
    res.json({ message: "Tagline removed" });
  } else {
    res.status(404);
    throw new Error("Tagline not found");
  }
});

//Category Section


export {
  login,
  updateUserProfile,
  getUsers,
  createBanner,
  getBanners,
  updateBanner,
  deleteBanner,
  createTagline,
  getTaglines,
  updateTagline,
  deleteTagline,
  // getCategories,
  // createCategory,
  // updateCategory,
  // deleteCategory,
};
