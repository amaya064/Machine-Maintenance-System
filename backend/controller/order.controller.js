import Order from '../model/order.model.js';

// Create and store an order
export const createOrder = async (req, res) => {
    try {
      const {
        bookTitle,
        customerName,
        customerEmail,
        customerAddress,
        customerPhone,
        totalPrice,
        quantity,
        bankName,
        paymentDate,
        bookId,
      } = req.body;
  
      // Create a new order using the provided details
      const newOrder = new Order({
        bookTitle,
        customerName,
        customerEmail,
        customerAddress,
        customerPhone,
        totalPrice,
        quantity,
        bankName,
        paymentDate,
        bookId,
      });
  
      // Save the order to the database
      await newOrder.save();
  
      // Respond with the order data
      res.status(201).json({
        success: true,
        message: 'Order successfully sent to Book Manager.',
        data: newOrder,
      });
    } catch (error) {
      console.error('Error saving order:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error saving order to database.',
        error: error.message,
      });
    }
  };
  

// Retrieve all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders.',
      error: error.message,
    });
  }
};




// Delete an order by ID
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting order:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error deleting order.',
      error: error.message,
    });
  }
};