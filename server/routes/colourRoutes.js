import express from 'express';
import Color from '../models/colorModel.js';

const Color = require("../models/Color");
const router = express.Router();

// Get all colors
router.get("/", async (req, res) => {
  try {
    const colors = await Color.find();
    res.json(colors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new color
router.post("/", async (req, res) => {
  try {
    const color = new Color(req.body);
    await color.save();
    res.status(201).json(color);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
