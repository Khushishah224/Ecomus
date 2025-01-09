import asyncHandler from 'express-async-handler';
import Header from '../models/HeaderModel.js';

// @desc     Create a new header
// @route    POST /api/headers
// @access   Private/Admin
const createHeader = asyncHandler(async (req, res) => {
  const { text } = req.body;

  const header = await Header.create({ text });

  if (header) {
    res.status(201).json(header);
  } else {
    res.status(400);
    throw new Error('Invalid header data');
  }
});

// @desc     Get all headers
// @route    GET /api/headers
// @access   Public
const getHeaders = asyncHandler(async (req, res) => {
  const headers = await Header.find({});
  res.json(headers);
});

// @desc     Update a header
// @route    PUT /api/headers/:id
// @access   Private/Admin
const updateHeader = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const header = await Header.findById(req.params.id);

  if (header) {
    header.text = text || header.text;
    const updatedHeader = await header.save();
    res.json(updatedHeader);
  } else {
    res.status(404);
    throw new Error('Header not found');
  }
});

// @desc     Delete a header
// @route    DELETE /api/headers/:id
// @access   Private/Admin
const deleteHeader = asyncHandler(async (req, res) => {
  const header = await Header.findById(req.params.id);

  if (header) {
    await header.remove();
    res.json({ message: 'Header removed' });
  } else {
    res.status(404);
    throw new Error('Header not found');
  }
});

export { createHeader, getHeaders, updateHeader, deleteHeader };