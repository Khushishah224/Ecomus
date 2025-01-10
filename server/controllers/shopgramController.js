import ShopGram from '../models/shopgramModel.js';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
import asyncHandler from 'express-async-handler';

// @desc     Create a ShopGram entry
// @route    POST api/shopgram
// @access   Private/Admin
const createShopGram = asyncHandler(async (req, res) => {
  const { image, productId, categoryId } = req.body;

  const product = await Product.findById(productId);
  const category = await Category.findById(categoryId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  const shopGram = await ShopGram.create({
    image,
    product: productId,
    category: categoryId,
  });

  if (shopGram) {
    res.status(201).json(shopGram);
  } else {
    res.status(400);
    throw new Error('Invalid ShopGram data');
  }
});

// @desc     Get all ShopGram entries
// @route    GET api/shopgram
// @access   Public
const getShopGrams = asyncHandler(async (req, res) => {
  const shopGramEntries = await ShopGram.find({})
    .populate('product', 'name price') // Populate product details
    .populate('category', 'name');    // Populate category details

  res.json(shopGramEntries);
});

// @desc     Update a ShopGram entry
// @route    PUT api/shopgram/:id
// @access   Private/Admin
const updateShopGram = asyncHandler(async (req, res) => {
  const { image, productId, categoryId } = req.body;

  const shopGram = await ShopGram.findById(req.params.id);

  if (shopGram) {
    if (productId) {
      const product = await Product.findById(productId);
      if (!product) {
        res.status(404);
        throw new Error('Product not found');
      }
      shopGram.product = productId;
    }

    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        res.status(404);
        throw new Error('Category not found');
      }
      shopGram.category = categoryId;
    }

    shopGram.image = image || shopGram.image;

    const updatedShopGram = await shopGram.save();
    res.json(updatedShopGram);
  } else {
    res.status(404);
    throw new Error('ShopGram entry not found');
  }
});

// @desc     Delete a ShopGram entry
// @route    DELETE api/shopgram/:id
// @access   Private/Admin
const deleteShopGram = asyncHandler(async (req, res) => {
  const shopGram = await ShopGram.findById(req.params.id);

  if (shopGram) {
    await shopGram.remove();
    res.json({ message: 'ShopGram entry removed' });
  } else {
    res.status(404);
    throw new Error('ShopGram entry not found');
  }
});

export {
  createShopGram,
  getShopGrams,
  updateShopGram,
  deleteShopGram,
};
