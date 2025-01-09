import ShopTheLook from "../models/shoplookModel.js";
import asyncHandler from 'express-async-handler';

const getShopTheLook = async (req, res) => {
  try {
      const data = await ShopTheLook.findOne(); // Ensure this matches your database query

      if (!data) {
          return res.status(404).send({ message: 'No data found' });
      }

      res.status(200).json(data);
  } catch (error) {
      console.error("Error fetching ShopTheLook data:", error);
      res.status(500).send({ message: 'Server error' });
  }
};


const updateShopTheLook = asyncHandler(async (req, res) => {
  try {
    const shopTheLook = await ShopTheLook.findOne();

    if (!shopTheLook) {
      return res.status(404).json({ message: "No ShopTheLook data found to update" });
    }

    console.log("Uploaded files:", req.files);

    // Update image1
    if (req.files && req.files.image1) {
      const image1Path = `/uploads/${req.files.image1[0].filename}`;
      console.log("New image1Path:", image1Path);
      shopTheLook.images.image1.imagePath = image1Path;
    }
    if (req.body.dots1) {
      shopTheLook.images.image1.dots = JSON.parse(req.body.dots1);
    }

    // Update image2
    if (req.files && req.files.image2) {
      const image2Path = `/uploads/${req.files.image2[0].filename}`;
      console.log("New image2Path:", image2Path);
      shopTheLook.images.image2.imagePath = image2Path;
    }
    if (req.body.dots2) {
      shopTheLook.images.image2.dots = JSON.parse(req.body.dots2);
    }

    // Save updated data
    await shopTheLook.save();
    console.log("Updated shopTheLook:", shopTheLook);
    res.status(200).json({ message: "ShopTheLook updated successfully", shopTheLook });
  } catch (error) {
    console.error("Error in updateShopTheLook:", error);
    res.status(500).json({ message: "Error updating ShopTheLook", error });
  }
});




export {getShopTheLook,updateShopTheLook};