import mongoose from "mongoose"

const DotSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  id: { type: String, required: true },
});

const ImageSchema = new mongoose.Schema({
  imagePath: { type: String, required: true },
  dots: [DotSchema],
});

const shopTheLookSchema = new mongoose.Schema({
  images: {
    image1: { type: ImageSchema, required: true },
    image2: { type: ImageSchema, required: true },
  },
});
  
const ShopTheLook = mongoose.model('ShopTheLook', shopTheLookSchema);

export default ShopTheLook;

