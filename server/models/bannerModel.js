import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    active: { 
      type: Boolean,
       default: true, 
    }
  },
  { timestamps: true }
);

const Banner = mongoose.model('Banner', bannerSchema);
export default Banner;
