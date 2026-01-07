'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'

export default function ProductCard({ product, index = 0 }) {
    const addToCart = useCartStore((state) => state.addItem)

    const handleAddToCart = (e) => {
        e.preventDefault()
        addToCart(product)
        toast.success('تمت الإضافة إلى السلة')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
        >
            <Link href={`/products/${product.id}`}>
                <div className="glass-card rounded-3xl overflow-hidden card-hover border border-gray-800 hover:border-primary/50 transition-all duration-300">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-dark-lighter to-dark">
                        <div className="absolute inset-0 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
                            {product.emoji || '🧸'}
                        </div>

                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Badges */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                            {product.isNew && (
                                <span className="bg-gradient-to-r from-secondary to-cyan-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-glow-secondary">
                                    جديد
                                </span>
                            )}
                            {product.discount > 0 && (
                                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    -{product.discount}%
                                </span>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-10 h-10 glass-effect rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors border border-gray-700"
                            >
                                <Heart className="w-5 h-5 text-gray-300" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-10 h-10 glass-effect rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors border border-gray-700"
                            >
                                <Eye className="w-5 h-5 text-gray-300" />
                            </motion.button>
                        </div>

                        {/* Add to Cart Button */}
                        <motion.button
                            initial={{ y: 100 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={handleAddToCart}
                            className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-primary to-purple-500 text-white py-3 rounded-full font-semibold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all flex items-center justify-center gap-2 shadow-glow-primary"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            أضف للسلة
                        </motion.button>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        <span className="text-xs text-secondary font-medium">{product.category}</span>
                        <h3 className="font-bold text-white mt-1 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < product.rating ? 'text-accent fill-accent' : 'text-gray-600'}`}
                                />
                            ))}
                            <span className="text-xs text-gray-500 mr-1">({product.reviews})</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold gradient-text">{product.price} ج.م</span>
                            {product.oldPrice && (
                                <span className="text-sm text-gray-500 line-through">{product.oldPrice} ج.م</span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
