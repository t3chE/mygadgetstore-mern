const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrderStatus, deleteOrder } = require('../controllers/orderController');

// POST /api/orders - Create a new order
router.post('/', createOrder);
// GET /api/orders - Get all orders
router.get('/', getOrders);
// GET /api/orders/:id - Get a single order
router.get('/:id', getOrderById);
// PUT /api/orders/:id - Update order status
router.put('/:id', updateOrderStatus);
// DELETE /api/orders/:id - Delete an order
router.delete('/:id', deleteOrder);

module.exports = router;
