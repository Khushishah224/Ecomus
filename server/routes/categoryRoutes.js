import express from 'express';
import Category from '../models/categoryModel.js';
import upload from '../middlewares/uploadMiddleware.js';
const router = express.Router();

// Fetch all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    // const updatedCategories = categories.map(category => {
    //   if (category.image) {
    //     category.image = `http://localhost:5000${category.image}`;  // Add full URL
    //   }
    //   return category;
    // });
    res.json(categories); // Send all categories to frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new category
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;

    // Check if name exists
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    // If an image is uploaded, use its path; otherwise, use a default or empty string
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const newCategory = new Category({ name, image: imagePath });

    // Save the new category
    await newCategory.save();

    // Return the created category
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update category
router.put('/:id', upload.single('image'), async (req, res) => { // Change the path here to match the frontend request
  try {
    const { name } = req.body;
    const updatedCategory = await Category.findById(req.params.id);

    if (!updatedCategory) return res.status(404).json({ error: 'Category not found' });

    // Update category name and image if provided
    if (name) updatedCategory.name = name;
    if (req.file) updatedCategory.image = `/uploads/${req.file.filename}`;

    await updatedCategory.save();

    // Return updated category
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete category
router.delete('/:id', async (req, res) => {
  try {
    const categoryToDelete = await Category.findByIdAndDelete(req.params.id);

    if (!categoryToDelete) return res.status(404).json({ error: 'Category not found' });

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
      const { active } = req.body;
      const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { active }, { new: true });

      if (!updatedCategory) {
          return res.status(404).json({ error: 'Category not found' });
      }

      res.json(updatedCategory);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// module.exports = router;
export default router