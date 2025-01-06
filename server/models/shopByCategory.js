import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
    active: { type: Boolean, default: true }
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
