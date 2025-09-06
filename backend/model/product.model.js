import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    mainCategory: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    introduction: { type: String, required: true },
    image: { type: String }, // New field to store image path
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
