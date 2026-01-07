const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const { protect, adminOnly } = require('../middleware/auth')

// Create order
router.post('/', async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, subtotal, shippingCost, total, notes } = req.body

    const order = await Order.create({
      user: req.user?._id,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingCost,
      total,
      notes,
    })

    res.status(201).json({ success: true, order })
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ في إنشاء الطلب', error: error.message })
  }
})

// Get user orders
router.get('/my-orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name emoji price')

    res.json({ success: true, orders })
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ في جلب الطلبات', error: error.message })
  }
})

// Get single order
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name emoji price')

    if (!order) {
      return res.status(404).json({ message: 'الطلب غير موجود' })
    }

    // Check if user owns the order or is admin
    if (order.user?.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'غير مصرح لك بالوصول لهذا الطلب' })
    }

    res.json({ success: true, order })
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ في جلب الطلب', error: error.message })
  }
})

// Get all orders (Admin)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    
    let query = {}
    if (status) query.orderStatus = status

    const skip = (Number(page) - 1) * Number(limit)

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('user', 'name email phone')

    const total = await Order.countDocuments(query)

    res.json({
      success: true,
      orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ في جلب الطلبات', error: error.message })
  }
})

// Update order status (Admin)
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus, paymentStatus },
      { new: true }
    )

    if (!order) {
      return res.status(404).json({ message: 'الطلب غير موجود' })
    }

    res.json({ success: true, order })
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ في تحديث الطلب', error: error.message })
  }
})

module.exports = router
