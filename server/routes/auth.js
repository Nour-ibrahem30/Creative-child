const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { generateToken, protect } = require('../middleware/auth')

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'البريد الإلكتروني مسجل بالفعل' })
        }

        const user = await User.create({ name, email, phone, password })
        const token = generateToken(user._id)

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        })
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ في التسجيل', error: error.message })
    }
})

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' })
        }

        const token = generateToken(user._id)

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        })
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ في تسجيل الدخول', error: error.message })
    }
})

// Get current user
router.get('/me', protect, async (req, res) => {
    res.json({
        success: true,
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone,
            role: req.user.role,
            address: req.user.address,
        },
    })
})

// Update profile
router.put('/profile', protect, async (req, res) => {
    try {
        const { name, phone, address } = req.body

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, phone, address },
            { new: true }
        )

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
        })
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ في تحديث الملف الشخصي', error: error.message })
    }
})

module.exports = router
