const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'اسم المنتج مطلوب'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'وصف المنتج مطلوب'],
    },
    price: {
        type: Number,
        required: [true, 'سعر المنتج مطلوب'],
        min: 0,
    },
    oldPrice: {
        type: Number,
        min: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    emoji: {
        type: String,
        default: '🧸',
    },
    images: [{
        type: String,
    }],
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    reviews: {
        type: Number,
        default: 0,
    },
    isNew: {
        type: Boolean,
        default: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    ageRange: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 99 },
    },
}, { timestamps: true })

// Virtual for discount calculation
productSchema.virtual('discountedPrice').get(function () {
    if (this.discount > 0) {
        return this.price - (this.price * this.discount / 100)
    }
    return this.price
})

module.exports = mongoose.model('Product', productSchema)
