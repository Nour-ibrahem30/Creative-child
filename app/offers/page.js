'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import ProductModal from '@/components/ProductModal'
import { Flame, Clock, Percent, Zap, Gift, Tag, Sparkles, ArrowUp } from 'lucide-react'

const offerProducts = [
    { id: 1, name: 'مكعبات البناء الملونة - 100 قطعة', price: 299, oldPrice: 399, category: 'ألعاب البناء', rating: 5, reviews: 128, emoji: '🧱', isNew: true, discount: 25, ageRange: '3-8 سنوات', description: 'مكعبات بناء ملونة عالية الجودة', benefits: ['تنمية المهارات الحركية', 'تعزيز الإبداع'] },
    { id: 3, name: 'لوحة الرسم المغناطيسية', price: 180, oldPrice: 220, category: 'فنون وحرف', rating: 5, reviews: 156, emoji: '🎨', isNew: false, discount: 18, ageRange: '3-10 سنوات', description: 'لوحة رسم مغناطيسية سهلة المسح', benefits: ['تنمية مهارات الرسم', 'تعزيز الإبداع الفني'] },
    { id: 5, name: 'بازل خشبي - خريطة مصر', price: 150, oldPrice: 200, category: 'ألغاز وتركيب', rating: 5, reviews: 203, emoji: '🧩', isNew: true, discount: 25, ageRange: '4-10 سنوات', description: 'بازل خشبي تعليمي', benefits: ['تعلم الجغرافيا', 'تنمية الذاكرة'] },
    { id: 7, name: 'مجموعة الطبيب الصغير', price: 280, oldPrice: 350, category: 'ألعاب تعليمية', rating: 5, reviews: 167, emoji: '🩺', isNew: true, discount: 20, ageRange: '3-8 سنوات', description: 'مجموعة أدوات طبية للعب التخيلي', benefits: ['التعرف على المهن', 'اللعب التخيلي'] },
    { id: 9, name: 'مجموعة ليجو كلاسيك', price: 650, oldPrice: 800, category: 'ألعاب البناء', rating: 5, reviews: 245, emoji: '🏗️', isNew: false, discount: 19, ageRange: '4-12 سنة', description: 'مجموعة ليجو كلاسيكية', benefits: ['تنمية الإبداع', 'حل المشكلات'] },
    { id: 11, name: 'مجموعة ألوان مائية', price: 95, oldPrice: 120, category: 'فنون وحرف', rating: 5, reviews: 189, emoji: '🖌️', isNew: false, discount: 21, ageRange: '4-12 سنة', description: 'مجموعة ألوان مائية آمنة', benefits: ['تنمية الإبداع الفني', 'التعبير عن المشاعر'] },
]

const flashDeals = [
    { id: 101, name: 'روبوت تعليمي ذكي', price: 450, oldPrice: 750, category: 'ألعاب إلكترونية', rating: 5, reviews: 89, emoji: '🤖', isNew: true, discount: 40, ageRange: '6-12 سنة', description: 'روبوت تعليمي قابل للبرمجة', benefits: ['تعلم البرمجة', 'التفكير المنطقي'] },
    { id: 102, name: 'مجموعة تجارب علمية', price: 320, oldPrice: 550, category: 'ألعاب تعليمية', rating: 5, reviews: 134, emoji: '🔬', isNew: true, discount: 42, ageRange: '8-14 سنة', description: 'مجموعة تجارب علمية ممتعة', benefits: ['تعلم العلوم', 'التجربة العملية'] },
]

function TimeBlock({ value, label }) {
    return (
        <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white bg-gray-800 rounded-lg px-3 py-2 min-w-[60px]">
                {String(value).padStart(2, '0')}
            </div>
            <span className="text-xs text-gray-400 mt-1">{label}</span>
        </div>
    )
}

function StatBadge({ icon, text }) {
    return (
        <div className="flex items-center gap-2 glass-effect px-4 py-2 rounded-full text-gray-300">
            <span className="text-primary">{icon}</span>
            <span className="text-sm font-medium">{text}</span>
        </div>
    )
}

function BackToTop() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const handleScroll = () => setShow(window.scrollY > 400)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    if (!show) return null

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center text-white shadow-glow-primary hover:scale-110 transition-transform"
        >
            <ArrowUp className="w-5 h-5" />
        </motion.button>
    )
}


function FlashDealCard({ product, onClick }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => onClick(product)}
            className="glass-card rounded-2xl p-4 border border-red-500/20 cursor-pointer group relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 bg-gradient-to-l from-red-500 to-orange-500 text-white px-4 py-1 rounded-bl-xl font-bold text-sm">
                خصم {product.discount}%
            </div>
            <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-800 rounded-xl flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                    {product.emoji}
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-white mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{product.category}</p>
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-primary">{product.price} ج.م</span>
                        <span className="text-gray-500 line-through text-sm">{product.oldPrice} ج.م</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-accent text-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>وفر {product.oldPrice - product.price} ج.م</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function OffersPage() {
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [activeTab, setActiveTab] = useState('all')
    const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
                return { hours: 23, minutes: 59, seconds: 59 }
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const filteredProducts = activeTab === 'flash' ? flashDeals : 
                            activeTab === 'big' ? offerProducts.filter(p => p.discount >= 20) : 
                            offerProducts

    const totalSavings = offerProducts.reduce((acc, p) => acc + (p.oldPrice - p.price), 0)

    return (
        <main className="min-h-screen bg-dark">
            <Navbar />
            <div className="pt-24 pb-20">
                {/* Hero Banner */}
                <section className="relative overflow-hidden py-16 mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-pink-500/20 to-secondary/20" />
                    <div className="absolute inset-0 mesh-bg" />
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                            <motion.div 
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full mb-6"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Flame className="w-5 h-5" />
                                <span className="font-bold">عروض حصرية لفترة محدودة</span>
                                <Flame className="w-5 h-5" />
                            </motion.div>

                            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                <span className="gradient-text">خصومات تصل إلى 50%</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8">
                                وفر أكثر من <span className="text-accent font-bold">{totalSavings} ج.م</span> على مشترياتك
                            </p>

                            {/* Countdown Timer */}
                            <div className="flex items-center justify-center gap-4 mb-8">
                                <div className="glass-card px-6 py-4 rounded-2xl">
                                    <div className="flex items-center gap-4 md:gap-6">
                                        <Clock className="w-6 h-6 text-accent hidden sm:block" />
                                        <div className="flex gap-2 md:gap-4 items-center">
                                            <TimeBlock value={timeLeft.hours} label="ساعة" />
                                            <span className="text-2xl md:text-3xl font-bold text-white">:</span>
                                            <TimeBlock value={timeLeft.minutes} label="دقيقة" />
                                            <span className="text-2xl md:text-3xl font-bold text-white">:</span>
                                            <TimeBlock value={timeLeft.seconds} label="ثانية" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-3">
                                <StatBadge icon={<Gift className="w-5 h-5" />} text="شحن مجاني" />
                                <StatBadge icon={<Percent className="w-5 h-5" />} text="ضمان أفضل سعر" />
                                <StatBadge icon={<Zap className="w-5 h-5" />} text="توصيل سريع" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Flash Deals Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <div className="glass-card rounded-2xl p-6 border border-red-500/30 bg-gradient-to-r from-red-500/10 to-orange-500/10">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">عروض خاطفة ⚡</h2>
                                        <p className="text-gray-400">خصومات تصل إلى 42% - الكمية محدودة!</p>
                                    </div>
                                </div>
                                <motion.div 
                                    className="badge-accent"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    🔥 الأكثر طلباً
                                </motion.div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {flashDeals.map((product) => (
                                    <FlashDealCard key={product.id} product={product} onClick={setSelectedProduct} />
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* Filter Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-3 mb-8"
                    >
                        {[
                            { id: 'all', label: 'جميع العروض', icon: <Tag className="w-4 h-4" /> },
                            { id: 'big', label: 'خصم 20%+', icon: <Percent className="w-4 h-4" /> },
                            { id: 'flash', label: 'عروض خاطفة', icon: <Zap className="w-4 h-4" /> },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-glow-primary'
                                        : 'glass-effect text-gray-400 hover:text-white hover:border-primary/50'
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </motion.div>

                    {/* Products Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between mb-6"
                    >
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">منتجات بخصومات مميزة</h2>
                            <p className="text-gray-400">اغتنم الفرصة واحصل على أفضل الألعاب بأسعار مخفضة</p>
                        </div>
                        <div className="badge-primary hidden sm:block">
                            {filteredProducts.length} منتج
                        </div>
                    </motion.div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product, index) => (
                            <div key={product.id} onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                                <ProductCard product={product} index={index} />
                            </div>
                        ))}
                    </div>

                    {/* Benefits Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {[
                            { icon: '🚚', title: 'شحن مجاني', desc: 'على الطلبات أكثر من 500 ج.م' },
                            { icon: '🔄', title: 'استرجاع سهل', desc: 'خلال 14 يوم من الاستلام' },
                            { icon: '💳', title: 'دفع آمن', desc: 'طرق دفع متعددة وآمنة' },
                        ].map((item, i) => (
                            <div key={i} className="glass-card rounded-2xl p-6 text-center border border-gray-800 hover:border-primary/30 transition-colors">
                                <div className="text-4xl mb-3">{item.icon}</div>
                                <h3 className="font-bold text-white mb-1">{item.title}</h3>
                                <p className="text-gray-400 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Newsletter CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 glass-card rounded-2xl p-8 text-center border border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5"
                    >
                        <div className="text-4xl mb-4">🎁</div>
                        <h3 className="text-2xl font-bold text-white mb-2">عروض جديدة كل أسبوع!</h3>
                        <p className="text-gray-400 max-w-xl mx-auto mb-6">
                            اشترك في نشرتنا البريدية لتصلك أحدث العروض والخصومات الحصرية
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="بريدك الإلكتروني"
                                className="flex-1 input-dark"
                            />
                            <button className="btn-primary whitespace-nowrap">
                                اشترك الآن
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            <BackToTop />
        </main>
    )
}
