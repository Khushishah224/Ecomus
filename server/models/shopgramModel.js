import mongoose from "mongoose";

const shopGramSchema = new mongoose.Schema({
  image: {
    type: String, 
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", 
    required: true,
  },
});

const ShopGram = mongoose.model("ShopGram", shopGramSchema);
export default ShopGram;
