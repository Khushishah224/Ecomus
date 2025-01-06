import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Tagline from '../models/marquee.js';
//@desc     Auth User & Get Token
//@route    POST api/users/login
//@access   Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

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
});

//@desc     REGISTER User & Get Token
//@route    POST api/users/register
//@access   Public
const register = asyncHandler(async (req, res) => {
  const { fname,lname, email, password } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already Exist');
  }

  const user = await User.create({ fname,lname, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

//@desc     Get all Users
//@route    GET api/users
//@access   Private/Admin
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    return res.json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('User not Found');
  }
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
    throw new Error('User not Found');
  }
});
// @desc     Get all Taglines
// @route    GET /api/users/get_taglines
// @access   Private/users
const getTaglines = asyncHandler(async (req, res) => {
  const taglines = await Tagline.find({});
  res.json(taglines);
});

export { login, register, getUser, updateUserProfile,getTaglines };
