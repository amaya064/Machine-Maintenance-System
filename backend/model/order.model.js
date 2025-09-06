import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  bookTitle: { type: String, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerAddress: { type: String, required: true },
  customerPhone: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  bankName: { type: String, required: true },
  paymentDate: { type: Date, required: true },
  bookId: { type: String, required: true },
});

export default mongoose.model('Order', OrderSchema);
