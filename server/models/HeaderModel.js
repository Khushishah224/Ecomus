import mongoose from 'mongoose';

const titleSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Title = mongoose.model('Title', titleSchema);

export default Title;