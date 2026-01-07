const jwt = require('jsonwebtoken')
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET || 'toyland-secret-key-2025'

// Protect routes
exports.protect = async (req, res, next) => {
    try {
        let token

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }

        if (!token) {
            return res.status(401).json({ message: 'غير مصرح لك بالوصول' })
        }

        const decoded = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(decoded.id)

        if (!user) {
            return res.status(401).json({ message: 'المستخدم غير موجود' })
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ message: 'غير مصرح لك بالوصول' })
    }
}

// Admin only
exports.adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'غير مصرح لك بهذا الإجراء' })
    }
    next()
}

// Generate JWT token
exports.generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' })
}
