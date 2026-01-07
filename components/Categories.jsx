'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const categories = [
    { id: 1, name: 'ألعاب تعليمية', emoji: '📚', color: 'from-blue-500 to-cyan-500', count: 120 },
    { id: 2, name: 'ألعاب البناء', emoji: '🧱', color: 'from-orange-500 to-amber-500', count: 85 },
    { id: 3, name: 'دمى وعرائس', emoji: '🧸', color: 'from-pink-500 to-rose-500', count: 95 },
    { id: 4, name: 'ألعاب إلكترونية', emoji: '🎮', color: 'from-purple-500 to-violet-500', count: 60 },
    { id: 5, name: 'ألعاب خارجية', emoji: '⚽', color: 'from-green-500 to-emerald-500', count: 75 },
    { id: 6, name: 'فنون وحرف', emoji: '🎨', color: 'from-red-500 to-pink-500', count: 110 },
    { id: 7, name: 'ألعاب الرضع', emoji: '👶', color: 'from-teal-500 to-cyan-500', count: 50 },
    { id: 8, name: 'ألغاز وتركيب', emoji: '🧩', color: 'from-indigo-500 to-purple-500', count: 90 },
]

export default function Categories() {
    return (
        <section className="py-20 bg-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-secondary font-semibold">تصفح حسب</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">الأقسام الرئيسية</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        اختر من بين مجموعة متنوعة من الأقسام التي تناسب اهتمامات طفلك
                    </p>
                </motion.div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            viewport={{ once: true }}
                        >
                            <Link href={`/products?category=${encodeURIComponent(category.name)}`}>
                                <div className="group relative glass-card rounded-3xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                                    {/* Background Gradient on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                                    
                                    {/* Glow effect */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity -z-10" />

                                    {/* Emoji */}
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                        className="text-5xl mb-4 filter drop-shadow-lg"
                                    >
                                        {category.emoji}
                                    </motion.div>

                                    {/* Content */}
                                    <h3 className="font-bold text-white group-hover:text-primary transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">{category.count} منتج</p>

                                    {/* Arrow */}
                                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-primary transition-all">
                                        <svg className="w-4 h-4 rotate-180 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
