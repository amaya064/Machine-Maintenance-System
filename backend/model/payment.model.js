import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  bookTitle: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerAddress: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerEmail: { type: String, required: true },
  bankName: { type: String, required: true },
  paymentDate: { type: Date, default: Date.now },
});


const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
