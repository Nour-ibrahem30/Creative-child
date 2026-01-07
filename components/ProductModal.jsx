'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Minus, Plus, Check, Sparkles } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'

export default function ProductModal({ product, onClose }) {
    const [quantity, setQuantity] = useState(1)
    const addToCart = useCartStore((state) => state.addItem)

    if (!product) return null

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product)
        }
        toast.success(`تمت إضافة ${quantity} من ${product.name} إلى السلة`)
        onClose()
    }

    const features = [
        { icon: Truck, text: 'توصيل مجاني للطلبات فوق 500 ج.م', color: 'text-cyan-400' },
        { icon: Shield, text: 'ضمان الجودة لمدة سنة', color: 'text-green-400' },
        { icon: RotateCcw, text: 'إرجاع مجاني خلال 14 يوم', color: 'text-amber-400' },
    ]

    return (
        <AnimatePresence>
            {product && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-4 md:inset-10 lg:inset-20 z-50 overflow-hidden"
                    >
                        <div className="h-full glass-card rounded-3xl border border-gray-700 overflow-hidden flex flex-col lg:flex-row">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 left-4 z-10 w-10 h-10 glass-effect rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Image Section */}
                            <div className="lg:w-1/2 bg-gradient-to-br from-dark-lighter to-dark p-8 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 mesh-bg opacity-30" />
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="text-[180px] md:text-[220px] relative z-10"
                                    style={{ filter: 'drop-shadow(0 0 40px rgba(139, 92, 246, 0.3))' }}
                                >
                                    {product.emoji}
                                </motion.div>
                                
                                {/* Badges */}
                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    {product.isNew && (
                                        <span className="bg-gradient-to-r from-secondary to-cyan-400 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-glow-secondary">
                                            جديد ✨
                                        </span>
                                    )}
                                    {product.discount > 0 && (
                                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                                            خصم {product.discount}%
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="lg:w-1/2 p-6 md:p-8 overflow-y-auto">
                                <ProductInfo product={product} />
                                <ProductBenefits benefits={product.benefits} />
                                <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                                <ActionButtons handleAddToCart={handleAddToCart} />
                                <ProductFeatures features={features} />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}


function ProductInfo({ product }) {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-secondary font-medium">{product.category}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-500 text-sm">{product.ageRange}</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{product.name}</h2>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-5 h-5 ${i < product.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`}
                        />
                    ))}
                </div>
                <span className="text-gray-400">({product.reviews} تقييم)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold gradient-text">{product.price} ج.م</span>
                {product.oldPrice && (
                    <>
                        <span className="text-xl text-gray-500 line-through">{product.oldPrice} ج.م</span>
                        <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-bold border border-red-500/30">
                            وفر {product.oldPrice - product.price} ج.م
                        </span>
                    </>
                )}
            </div>

            <p className="text-gray-400 leading-relaxed">{product.description}</p>
        </div>
    )
}

function ProductBenefits({ benefits }) {
    if (!benefits || benefits.length === 0) return null
    
    return (
        <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                فوائد هذا المنتج
            </h3>
            <div className="grid grid-cols-2 gap-2">
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 text-gray-300"
                    >
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm">{benefit}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

function QuantitySelector({ quantity, setQuantity }) {
    return (
        <div className="flex items-center gap-4 mb-6">
            <span className="font-medium text-gray-300">الكمية:</span>
            <div className="flex items-center glass-effect rounded-full border border-gray-700">
                <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-700 rounded-full transition-colors text-gray-400"
                >
                    <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-white">{quantity}</span>
                <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-700 rounded-full transition-colors text-gray-400"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

function ActionButtons({ handleAddToCart }) {
    return (
        <div className="flex gap-4 mb-6">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-2 py-4 shadow-glow-primary"
            >
                <ShoppingCart className="w-5 h-5" />
                أضف للسلة
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 glass-effect border border-gray-700 rounded-full flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors text-gray-400"
            >
                <Heart className="w-6 h-6" />
            </motion.button>
        </div>
    )
}

function ProductFeatures({ features }) {
    return (
        <div className="space-y-3 pt-4 border-t border-gray-800">
            {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                        <feature.icon className={`w-4 h-4 ${feature.color}`} />
                    </div>
                    <span className="text-gray-400 text-sm">{feature.text}</span>
                </div>
            ))}
        </div>
    )
}
