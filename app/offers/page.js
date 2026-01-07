'use client'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { Flame, Clock, Percent } from 'lucide-react'

const offerProducts = [
    { id: 1, name: 'مكعبات البناء الملونة - 100 قطعة', price: 299, oldPrice: 399, category: 'ألعاب البناء', rating: 5, reviews: 128, emoji: '🧱', isNew: true, discount: 25 },
    { id: 3, name: 'لوحة الرسم المغناطيسية', price: 180, oldPrice: 220, category: 'فنون وحرف', rating: 5, reviews: 156, emoji: '🎨', isNew: false, discount: 18 },
    { id: 5, name: 'بازل خشبي - خريطة مصر', price: 150, oldPrice: 200, category: 'ألغاز وتركيب', rating: 5, reviews: 203, emoji: '🧩', isNew: true, discount: 25 },
    { id: 7, name: 'مجموعة الطبيب الصغير', price: 280, oldPrice: 350, category: 'ألعاب تعليمية', rating: 5, reviews: 167, emoji: '🩺', isNew: true, discount: 20 },
    { id: 9, name: 'مجموعة ليجو كلاسيك', price: 650, oldPrice: 800, category: 'ألعاب البناء', rating: 5, reviews: 245, emoji: '🏗️', isNew: false, discount: 19 },
    { id: 11, name: 'مجموعة ألوان مائية', price: 95, oldPrice: 120, category: 'فنون وحرف', rating: 5, reviews: 189, emoji: '🖌️', isNew: false, discount: 21 },
]

export default function OffersPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="pt-24 pb-20">
                {/* Hero Banner */}
                <section className="bg-gradient-to-r from-primary via-pink-500 to-secondary py-16 mb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center text-white"
                        >
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Flame className="w-8 h-8" />
                                <span className="text-xl font-bold">عروض حصرية</span>
                                <Flame className="w-8 h-8" />
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                خصومات تصل إلى 50%
                            </h1>
                            <p className="text-xl opacity-90 mb-6">
                                لا تفوت الفرصة! العروض لفترة محدودة
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <Clock className="w-5 h-5" />
                                    <span>ينتهي العرض قريباً</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <Percent className="w-5 h-5" />
                                    <span>توفير حقيقي</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Products */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-dark mb-2">منتجات بخصومات مميزة</h2>
                        <p className="text-gray-600">اغتنم الفرصة واحصل على أفضل الألعاب بأسعار مخفضة</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {offerProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>

                    {/* Info Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 bg-gray-100 rounded-3xl p-8 text-center"
                    >
                        <h3 className="text-2xl font-bold text-dark mb-4">🎁 عروض جديدة كل أسبوع!</h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            تابعنا على وسائل التواصل الاجتماعي واشترك في نشرتنا البريدية لتصلك أحدث العروض والخصومات
                        </p>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
