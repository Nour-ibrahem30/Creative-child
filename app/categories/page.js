'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const categories = [
    { id: 1, name: 'ألعاب تعليمية', emoji: '📚', color: 'from-blue-500 to-cyan-500', count: 120, description: 'ألعاب تنمي مهارات التفكير والتعلم' },
    { id: 2, name: 'ألعاب البناء', emoji: '🧱', color: 'from-orange-500 to-amber-500', count: 85, description: 'مكعبات وألعاب بناء إبداعية' },
    { id: 3, name: 'دمى وعرائس', emoji: '🧸', color: 'from-pink-500 to-rose-500', count: 95, description: 'دمى ناعمة وعرائس متنوعة' },
    { id: 4, name: 'ألعاب إلكترونية', emoji: '🎮', color: 'from-purple-500 to-violet-500', count: 60, description: 'ألعاب تحكم عن بعد وإلكترونية' },
    { id: 5, name: 'ألعاب خارجية', emoji: '⚽', color: 'from-green-500 to-emerald-500', count: 75, description: 'ألعاب للحدائق والأماكن المفتوحة' },
    { id: 6, name: 'فنون وحرف', emoji: '🎨', color: 'from-red-500 to-pink-500', count: 110, description: 'أدوات رسم وأعمال يدوية' },
    { id: 7, name: 'ألعاب الرضع', emoji: '👶', color: 'from-teal-500 to-cyan-500', count: 50, description: 'ألعاب آمنة للأطفال الصغار' },
    { id: 8, name: 'ألغاز وتركيب', emoji: '🧩', color: 'from-indigo-500 to-purple-500', count: 90, description: 'بازل وألعاب ذكاء' },
]

export default function CategoriesPage() {
    return (
        <main className="min-h-screen bg-dark">
            <Navbar />
            <div className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl font-bold text-white mb-4">الأقسام</h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            تصفح أقسامنا المتنوعة واختر ما يناسب طفلك
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link href={`/products?category=${category.name}`}>
                                    <div className="group glass-card rounded-3xl overflow-hidden border border-gray-800 hover:border-primary/50 transition-all duration-300">
                                        <div className={`h-40 bg-gradient-to-br ${category.color} flex items-center justify-center relative overflow-hidden`}>
                                            <motion.div
                                                whileHover={{ scale: 1.2, rotate: 10 }}
                                                className="text-7xl relative z-10"
                                                style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.3))' }}
                                            >
                                                {category.emoji}
                                            </motion.div>
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-bold text-xl text-white mb-2 group-hover:text-primary transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="text-gray-500 text-sm mb-4">{category.description}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">{category.count} منتج</span>
                                                <span className="text-primary font-medium group-hover:translate-x-[-4px] transition-transform inline-block">
                                                    تصفح ←
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
