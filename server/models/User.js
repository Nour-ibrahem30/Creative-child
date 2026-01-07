const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'الاسم مطلوب'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'البريد الإلكتروني مطلوب'],
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: [true, 'رقم الهاتف مطلوب'],
    },
    password: {
        type: String,
        required: [true, 'كلمة المرور مطلوبة'],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    address: {
        street: String,
        city: String,
        country: { type: String, default: 'مصر' },
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
}, { timestamps: true })

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
