'use client'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import Link from 'next/link'

const products = [
    { id: 1, name: 'مكعبات البناء الملونة - 100 قطعة', price: 299, oldPrice: 399, category: 'ألعاب البناء', rating: 5, reviews: 128, emoji: '🧱', isNew: true, discount: 25 },
    { id: 2, name: 'دمية تعليمية ناطقة بالعربية', price: 450, category: 'ألعاب تعليمية', rating: 4, reviews: 89, emoji: '🧸', isNew: true, discount: 0 },
    { id: 3, name: 'لوحة الرسم المغناطيسية', price: 180, oldPrice: 220, category: 'فنون وحرف', rating: 5, reviews: 156, emoji: '🎨', isNew: false, discount: 18 },
    { id: 4, name: 'سيارة تحكم عن بعد', price: 550, category: 'ألعاب إلكترونية', rating: 4, reviews: 72, emoji: '🚗', isNew: false, discount: 0 },
    { id: 5, name: 'بازل خشبي - خريطة مصر', price: 150, oldPrice: 200, category: 'ألغاز وتركيب', rating: 5, reviews: 203, emoji: '🧩', isNew: true, discount: 25 },
    { id: 6, name: 'كرة قدم للأطفال', price: 120, category: 'ألعاب خارجية', rating: 4, reviews: 95, emoji: '⚽', isNew: false, discount: 0 },
    { id: 7, name: 'مجموعة الطبيب الصغير', price: 280, oldPrice: 350, category: 'ألعاب تعليمية', rating: 5, reviews: 167, emoji: '🩺', isNew: true, discount: 20 },
    { id: 8, name: 'قطار موسيقي للرضع', price: 320, category: 'ألعاب الرضع', rating: 4, reviews: 84, emoji: '🚂', isNew: false, discount: 0 },
]

export default function FeaturedProducts() {
    return (
        <section className="py-20 bg-dark-lighter relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
                >
                    <div>
                        <span className="text-secondary font-semibold">الأكثر مبيعاً</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">منتجات مميزة</h2>
                        <p className="text-gray-400 mt-4 max-w-xl">
                            اكتشف أفضل الألعاب التي يحبها الأطفال والآباء على حد سواء
                        </p>
                    </div>
                    <Link
                        href="/products"
                        className="mt-6 md:mt-0 text-primary font-semibold hover:text-secondary transition-colors flex items-center gap-2 group"
                    >
                        عرض الكل
                        <svg className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
