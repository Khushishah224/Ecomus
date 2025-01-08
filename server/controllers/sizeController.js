import Size from "../models/sizeModel.js";
import asyncHandler from "express-async-handler";

// @desc    Fetch all sizes
// @route   GET /api/sizes
// @access  Public
const getSizes = asyncHandler(async (req, res) => {
  const sizes = await Size.find({});
  res.json(sizes);
});

// @desc    Add a new size
// @route   POST /api/sizes
// @access  Public
const addSize = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Validate inputs
  if (!name) {
    res.status(400);
    throw new Error("Size name is required");
  }

  // Check for duplicates
  const sizeExists = await Size.findOne({ name });

  if (sizeExists) {
    res.status(400);
    throw new Error("Size already exists");
  }

  // Create and save the new size
  const size = await Size.create({ name });

  if (size) {
    res.status(201).json(size);
  } else {
    res.status(400);
    throw new Error("Failed to create the size");
  }
});

// @desc    Update an existing size
// @route   PUT /api/sizes/:id
// @access  Public
const updateSize = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const size = await Size.findById(req.params.id);

  if (size) {
    // Update fields
    size.name = name || size.name;

    // Save updated size
    const updatedSize = await size.save();
    res.json(updatedSize);
  } else {
    res.status(404);
    throw new Error("Size not found");
  }
});

// @desc    Delete a size
// @route   DELETE /api/sizes/:id
// @access  Public
const deleteSize = asyncHandler(async (req, res) => {
  const size = await Size.findById(req.params.id);

  if (size) {
    await size.remove();
    res.json({ message: "Size deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Size not found");
  }
});

export { getSizes, addSize, updateSize, deleteSize };
