const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const { protect, adminOnly } = require('../middleware/auth')

// Get all products
router.get('/', async (req, res) => {
    try {
        const { category, minPrice, maxPrice, sort, search, featured, page = 1, limit = 12 } = req.query

        let query = {}

        if (category) query.category = category
        if (minPrice || maxPrice) {
            query.price = {}
            if (minPrice) query.price.$gte = Number(minPrice)
            if (maxPrice) query.price.$lte = Number(maxPrice)
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ]
        }
        if (featured === 'true') query.isFeatured = true

        let sortOption = { createdAt: -1 }
        if (sort === 'price-low') sortOption = { price: 1 }
        if (sort === 'price-high') sortOption = { price: -1 }
        if (sort === 'rating') sortOption = { rating: -1 }

        const skip = (Number(page) - 1) * Number(limit)

        const products = await Product.find(query)
            .populate('category', 'name emoji')
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit))

        const total = await Product.countDocuments(query)

        res.json({
            success: true,
            products,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit)),
            },
        })
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ في جلب المنتجات', error: error.message })
    }
})

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name emoji')

        if (!product) {
            return res.status(404).json({ message: 'المنتج غير موجود' })
        }

        res.json({ success: true, product })
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ في جلب المنتج', error: error.message })
    }
})

// Create product (Admin)
router.post('/', protect, adminOnly, async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json({ success: true, product })
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ في إنشاء المنتج', error: error.message })
    }
})

// Update product (Admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!product) {
            return res.status(404).json({ message: 'المنتج غير موجود' })
        }

        res.json({ success: true, product })
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ في تحديث المنتج', error: error.message })
    }
})

// Delete product (Admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        if (!product) {
            return res.status(404).json({ message: 'المنتج غير موجود' })
        }

        res.json({ success: true, message: 'تم حذف المنتج بنجاح' })
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ في حذف المنتج', error: error.message })
    }
})

module.exports = router
