const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items, total, customer } = req.body;
    if (!items || !total || !customer) {
      return res.status(400).json({ error: 'Missing order data.' });
    }
    const order = new Order({ items, total, customer });
    await order.save();
    res.status(201).json({ message: 'Order created successfully.', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order.' });
  }
};
