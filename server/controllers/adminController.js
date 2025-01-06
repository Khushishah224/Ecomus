//Admin Controller
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Banner from "../models/bannerModel.js";
import Tagline from "../models/marquee.js";
import Category from "../models/shopByCategory.js";
//@desc     Auth User & Get Token
//@route    POST api/users/login
//@access   Private
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.isAdmin) {
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
      throw new Error("Invalid email or Password");
    }
  } else {
    res.status(401);
    throw new Error("User is not an Admin");
  }
});

//@desc     Get all Users
//@route    GET api/users
//@access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc     Update User Profile
//@route    PUT api/users/profile/:id
//@access   Private
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

const createBanner = asyncHandler(async (req, res) => {
  const { img, title, description } = req.body;

  const banner = await Banner.create({ img, title, description });

  if (banner) {
    res.status(201).json({
      _id: banner._id,
      img: banner.img,
      title: banner.title,
      description: banner.description,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Banner Data");
  }
});

const getBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find({});
  res.json(banners);
});

const updateBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);

  if (banner) {
    banner.img = req.body.img || banner.img;
    banner.title = req.body.title || banner.title;
    banner.description = req.body.description || banner.description;

    const updatedBanner = await banner.save();
    res.json({
      _id: updatedBanner._id,
      img: updatedBanner.img,
      title: updatedBanner.title,
      description: updatedBanner.description,
    });
  } else {
    res.status(404);
    throw new Error("Banner not Found");
  }
});

const deleteBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);

  if (banner) {
    await banner.remove();
    res.json({ message: "Banner removed" });
  } else {
    res.status(404);
    throw new Error("Banner not Found");
  }
});

// @desc     Create a Tagline
// @route    POST /api/admin/taglines
// @access   Private/Admin
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

// @desc     Get all Taglines
// @route    GET /api/admin/taglines
// @access   Private/Admin
const getTaglines = asyncHandler(async (req, res) => {
  const taglines = await Tagline.find({});
  res.json(taglines);
});

// @desc     Update a Tagline
// @route    PUT /api/admin/taglines/:id
// @access   Private/Admin
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

// @desc     Delete a Tagline
// @route    DELETE /api/admin/taglines/:id
// @access   Private/Admin
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

// Create a new Category
const createCategory = asyncHandler(async (req, res) => {
  const { image, name, active } = req.body;

  const category = await Category.create({
    image,
    name,
    active,
  });

  if (category) {
    res.status(201).json(category);
  } else {
    res.status(400);
    throw new Error("Invalid Category Data");
  }
});

// Update a Category's details
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = req.body.name || category.name;
    category.image = req.body.image || category.image;
    category.active = req.body.active ?? category.active;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not Found");
  }
});

// Delete a Category
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not Found");
  }
});

// Toggle category status
const updateCategoryStatus = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    category.active = req.body.active;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not Found");
  }
});

export {
  login,
  getUsers,
  createBanner,
  getBanners,
  updateUserProfile,
  updateBanner,
  deleteBanner,
  createTagline,
  getTaglines,
  updateTagline,
  deleteTagline,
  createCategory,
  updateCategory,
  deleteCategory,
  updateCategoryStatus,
};
