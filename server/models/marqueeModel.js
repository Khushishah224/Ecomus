import mongoose from 'mongoose';

const taglineSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    // hexCode: {
    //   type: String,
    //   required: true,
    //   unique: true, 
    // },
  },
  {
    timestamps: true,
  }
);

const Tagline = mongoose.model('Tagline', taglineSchema);

export default Tagline;