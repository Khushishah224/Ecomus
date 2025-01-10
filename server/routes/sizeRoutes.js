import express from 'express';
import Size from '../models/sizeModel.js';

const router = express.Router();

// Fetch all sizes
router.get('/', async (req, res) => {
  try {
    const sizes = await Size.find();
    res.json(sizes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new size
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    // Validate required field
    if (!name) {
      return res.status(400).json({ error: 'Size name is required' });
    }

    // Create and save the new size
    const newSize = new Size({ name });
    await newSize.save();

    res.status(201).json(newSize);
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error for unique fields
      return res.status(400).json({ error: 'Size name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Update a size
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;

    const updatedSize = await Size.findById(req.params.id);

    if (!updatedSize) {
      return res.status(404).json({ error: 'Size not found' });
    }

    // Update the size name
    if (name) updatedSize.name = name;

    await updatedSize.save();

    res.json(updatedSize);
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error for unique fields
      return res.status(400).json({ error: 'Size name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Delete a size
router.delete('/:id', async (req, res) => {
  try {
    const sizeToDelete = await Size.findByIdAndDelete(req.params.id);

    if (!sizeToDelete) {
      return res.status(404).json({ error: 'Size not found' });
    }

    res.json({ message: 'Size deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
