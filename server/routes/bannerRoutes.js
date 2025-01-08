import express from 'express';
import Banner from '../models/bannerModel.js';
import upload from '../middlewares/uploadMiddleware.js';
const router = express.Router();

// Fetch all banners
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners); // Send all categories to frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new banner
router.post('/', upload.single('image'), async (req, res) => {
  try {
       const newBanner = new Banner({
            image: `/uploads/${req.file.filename}`,
            caption: req.body.caption,
            text: req.body.text,
            active: req.body.active || true
        });
        await newBanner.save();
        res.status(201).json({ message: "Banner added successfully", banner: newBanner });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update banner
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const updatedData = {
            caption: req.body.caption,
            text: req.body.text,
            active: req.body.active
        };
        if (req.file) {
            updatedData.image = "/uploads/" + req.file.filename;
        }
        const updatedBanner = await Banner.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.status(200).json({ message: "Banner updated successfully", banner: updatedBanner });
    } catch (error) {
        res.status(500).json({ error: "Failed to update banner" });
    }
});

// Delete category
router.delete("/delete_banner/:id", async (req, res) => {
    try {
        await Banner.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Banner deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete banner" });
    }
});

router.patch('/:id', async (req, res) => {
  try {
      const { active } = req.body;
      const updatedBanner = await Category.findByIdAndUpdate(req.params.id, { active }, { new: true });

      if (!updatedBanner) {
          return res.status(404).json({ error: 'Banner not found' });
      }

      res.json(updatedData);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


export default router