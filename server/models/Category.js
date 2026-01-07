const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'اسم القسم مطلوب'],
        unique: true,
        trim: true,
    },
    description: String,
    emoji: {
        type: String,
        default: '📦',
    },
    image: String,
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true })

module.exports = mongoose.model('Category', categorySchema)
