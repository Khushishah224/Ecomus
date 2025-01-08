import mongoose from 'mongoose';

const sizeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

const Size = mongoose.model('Size', sizeSchema);

export default Size;
