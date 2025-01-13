import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  color: { type: String, ref: "Color", required: true },
  sizes: [
    {
      size: { type: String, ref: "Size", required: true },
      price: { type: Number, required: true },
    },
  ],
  stock: { type: Number, required: true },
  stockStatus: { type: String, enum: ["In Stock", "Low Stock", "Out of Stock"],
     required: true },
  images: {
    front: { type: String, required: true },
    back: { type: String, required: true },
    side: { type: String, required: true },
  },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, ref: "Category", required: true },
  description: { type: String },
  variants: [variantSchema],
});

// module.exports = mongoose.model("Product", productSchema);
const Product = mongoose.model('Product', productSchema);
export default Product;
