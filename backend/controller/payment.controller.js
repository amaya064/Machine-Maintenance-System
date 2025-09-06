import Payment from '../model/payment.model.js';

export const createPayment = async (req, res, next) => {
  try {
    const { bookId, bookTitle, totalPrice, quantity, formData, bankData } = req.body;

    const newPayment = new Payment({
      bookId,
      bookTitle,
      totalPrice,
      quantity,
      customerName: formData.name,
      customerAddress: formData.address,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      bankName: bankData.bankName,
    });

    const savedPayment = await newPayment.save();

    res.status(201).json({ success: true, data: savedPayment });
  } catch (err) {
    next(err);
  }
};



export const getAllPayments = async (req, res, next) => {
    try {
      const payments = await Payment.find();
      res.status(200).json({ success: true, data: payments });
    } catch (err) {
      next(err);
    }
  };

 
  //Controller for fetching orders and payments
export const getOrdersForEmail = async (req, res) => {
  const { email } = req.params;
  const orders = await Order.find({ customerEmail: email });
  res.json({ orders });
};



export const getPaymentsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(`Fetching payments for email: ${email}`);

    const payments = await Payment.find({ customerEmail: email });

    if (payments.length === 0) {
      return res.status(404).json({ message: 'No payments found for this user.' });
    }

    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Error fetching payments.', error: error.message });
  }
};


export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ success: false, message: 'Payment not found.' });
    }

    res.status(200).json({ success: true, message: 'Payment deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting payment.', error: error.message });
  }
};
