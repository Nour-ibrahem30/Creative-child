const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    name: String,
    price: Number,
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
})

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [orderItemSchema],
    shippingAddress: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: String,
        address: { type: String, required: true },
        city: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'card'],
        default: 'cash',
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },
    subtotal: {
        type: Number,
        required: true,
    },
    shippingCost: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
    },
    notes: String,
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
