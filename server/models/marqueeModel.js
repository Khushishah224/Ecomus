import mongoose from 'mongoose';

const taglineSchema = mongoose.Schema(
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

const Tagline = mongoose.model('Tagline', taglineSchema);

export default Tagline;