import mongoose from 'mongoose';


const variantSchema = new mongoose.Schema({
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Color",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    front: { type: String, required: true },
    back: { type: String, required: true },
    side: { type: String, required: true },
  },
  sizes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Size",
    },
  ],
  status: {
    type: String,
    enum: ["instock","lowstock", "outofstock"],
    default: "instock",
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  variants: [variantSchema],
});

const Product = mongoose.model('Product', productSchema);
export default Product;
