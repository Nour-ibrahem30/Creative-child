'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCartStore } from '@/store/cartStore'
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react'

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
    const total = getTotal()
    const shipping = total > 500 ? 0 : 50

    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-dark">
                <Navbar />
                <div className="pt-24 pb-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20"
                        >
                            <div className="text-8xl mb-6">🛒</div>
                            <h1 className="text-3xl font-bold text-white mb-4">سلة التسوق فارغة</h1>
                            <p className="text-gray-400 mb-8">لم تقم بإضافة أي منتجات بعد</p>
                            <Link href="/products" className="btn-primary inline-flex items-center gap-2 shadow-glow-primary">
                                <ShoppingBag className="w-5 h-5" />
                                تصفح المنتجات
                            </Link>
                        </motion.div>
                    </div>
                </div>
                <Footer />
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-dark">
            <Navbar />
            <div className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-white mb-8"
                    >
                        سلة التسوق ({items.length} منتج)
                    </motion.h1>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <CartItems items={items} removeItem={removeItem} updateQuantity={updateQuantity} />
                        <OrderSummary total={total} shipping={shipping} clearCart={clearCart} />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

function CartItems({ items, removeItem, updateQuantity }) {
    return (
        <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card rounded-2xl p-6 border border-gray-800 flex gap-6"
                >
                    <div className="w-24 h-24 bg-gray-800 rounded-xl flex items-center justify-center text-5xl flex-shrink-0">
                        {item.emoji}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-white">{item.name}</h3>
                                <p className="text-sm text-gray-500">{item.category}</p>
                            </div>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="text-gray-500 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center glass-effect rounded-full border border-gray-700">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded-full text-gray-400"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-10 text-center font-bold text-white">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded-full text-gray-400"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <span className="text-xl font-bold gradient-text">
                                {item.price * item.quantity} ج.م
                            </span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}


function OrderSummary({ total, shipping, clearCart }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-2xl p-6 border border-gray-800 h-fit sticky top-24"
        >
            <h2 className="text-xl font-bold text-white mb-6">ملخص الطلب</h2>

            <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                    <span className="text-gray-400">المجموع الفرعي</span>
                    <span className="font-medium text-white">{total} ج.م</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">الشحن</span>
                    <span className="font-medium">
                        {shipping === 0 ? (
                            <span className="text-green-400">مجاني</span>
                        ) : (
                            <span className="text-white">{shipping} ج.م</span>
                        )}
                    </span>
                </div>
                {shipping > 0 && (
                    <p className="text-xs text-gray-500">
                        أضف {500 - total} ج.م للحصول على شحن مجاني
                    </p>
                )}
                <div className="border-t border-gray-700 pt-4 flex justify-between">
                    <span className="font-bold text-lg text-white">الإجمالي</span>
                    <span className="font-bold text-xl gradient-text">{total + shipping} ج.م</span>
                </div>
            </div>

            <Link href="/checkout" className="btn-primary w-full text-center block mb-4 shadow-glow-primary">
                إتمام الشراء
            </Link>

            <Link
                href="/products"
                className="flex items-center justify-center gap-2 text-gray-400 hover:text-primary transition-colors"
            >
                <ArrowLeft className="w-4 h-4 rotate-180" />
                متابعة التسوق
            </Link>

            <button
                onClick={clearCart}
                className="w-full mt-4 text-red-400 hover:text-red-300 text-sm transition-colors"
            >
                إفراغ السلة
            </button>
        </motion.div>
    )
}
