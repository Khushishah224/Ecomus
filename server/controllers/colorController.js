import Color from "../models/colorModel.js";
import asyncHandler from "express-async-handler";

// @desc    Fetch all colors
// @route   GET /api/colors
// @access  Public
const getColors = asyncHandler(async (req, res) => {
  const colors = await Color.find({});
  res.json(colors);
});

// @desc    Add a new color
// @route   POST /api/colors
// @access  Public
const addColor = asyncHandler(async (req, res) => {
  const { name, hexCode } = req.body;

  // Validate inputs
  if (!name || !hexCode) {
    res.status(400);
    throw new Error("Name and Hex Code are required");
  }

  // Check for duplicates
  const colorExists = await Color.findOne({ $or: [{ name }, { hexCode }] });

  if (colorExists) {
    res.status(400);
    throw new Error("Color name or hex code already exists");
  }

  // Create and save the new color
  const color = await Color.create({
    name,
    hexCode,
  });

  if (color) {
    res.status(201).json(color);
  } else {
    res.status(400);
    throw new Error("Failed to create the color");
  }
});

// @desc    Update an existing color
// @route   PUT /api/colors/:id
// @access  Public
const updateColor = asyncHandler(async (req, res) => {
  const { name, hexCode } = req.body;

  const color = await Color.findById(req.params.id);

  if (color) {
    // Update fields
    color.name = name || color.name;
    color.hexCode = hexCode || color.hexCode;

    // Save updated color
    const updatedColor = await color.save();
    res.json(updatedColor);
  } else {
    res.status(404);
    throw new Error("Color not found");
  }
});

// @desc    Delete a color
// @route   DELETE /api/colors/:id
// @access  Public
const deleteColor = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);

  if (color) {
    await color.remove();
    res.json({ message: "Color deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Color not found");
  }
});

export { getColors, addColor, updateColor, deleteColor };
