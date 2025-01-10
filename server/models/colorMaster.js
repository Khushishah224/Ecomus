import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    hexCode: {
      type: String,
      required: true,
      unique: true, // To ensure no duplicate colors with the same code
    },
  });
  
const Color = mongoose.model('Color', colorSchema);
export default Color;
