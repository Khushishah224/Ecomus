import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Tagline from '../models/marqueeModel.js';


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


export {
  login,
  updateUserProfile,
  getUsers,
  createTagline,
  getTaglines,
  updateTagline,
  deleteTagline
};
