const express = require('express')
const router = express.Router()
const Category = require('../models/Category')
const Product = require('../models/Product')
const { protect, adminOnly } = require('../middleware/auth')

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true })

        // Get product count for each category
        const categoriesWithCount = await Promise.all(
            categories.map(async (cat) => {
                const count = await Product.countDocuments({ category: cat._id })
                return {
                    ...cat.toObject(),
                    productCount: count,
                }
            })
        )

        res.json({ success: true, categories: categoriesWithCount })
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ في جلب الأقسام', error: error.message })
    }
})

// Get single category with products
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)

        if (!category) {
            return res.status(404).json({ message: 'القسم غير موجود' })
        }

        const products = await Product.find({ category: req.params.id })

        res.json({ success: true, category, products })
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ في جلب القسم', error: error.message })
    }
})

// Create category (Admin)
router.post('/', protect, adminOnly, async (req, res) => {
    try {
        const category = await Category.create(req.body)
        res.status(201).json({ success: true, category })
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ في إنشاء القسم', error: error.message })
    }
})

// Update category (Admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!category) {
            return res.status(404).json({ message: 'القسم غير موجود' })
        }

        res.json({ success: true, category })
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ في تحديث القسم', error: error.message })
    }
})

// Delete category (Admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)

        if (!category) {
            return res.status(404).json({ message: 'القسم غير موجود' })
        }

        res.json({ success: true, message: 'تم حذف القسم بنجاح' })
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ في حذف القسم', error: error.message })
    }
})

module.exports = router
