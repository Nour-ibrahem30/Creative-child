'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Heart, ShoppingBag } from 'lucide-react'

export default function WishlistPage() {
    // In a real app, this would come from a store or API
    const wishlistItems = []

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-dark mb-8"
                    >
                        قائمة الأمنيات
                    </motion.h1>

                    {wishlistItems.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20 bg-white rounded-3xl shadow-lg"
                        >
                            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Heart className="w-12 h-12 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold text-dark mb-4">قائمة الأمنيات فارغة</h2>
                            <p className="text-gray-600 mb-8">لم تقم بإضافة أي منتجات إلى قائمة الأمنيات بعد</p>
                            <Link href="/products" className="btn-primary inline-flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" />
                                تصفح المنتجات
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Wishlist items would be mapped here */}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    )
}
