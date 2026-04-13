import express from 'express';
import Order from '../models/Order.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', protect, async (req, res) => {
  const { orderItems, totalAmount } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  } else {
    try {
      const order = new Order({
        user: req.user._id,
        products: orderItems,
        totalAmount,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (err) {
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  }
});

// @route   GET /api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('products.product', 'name image price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private/Admin
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
