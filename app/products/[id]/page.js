'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { useCartStore } from '@/store/cartStore'
import { useThemeStore } from '@/store/themeStore'
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Minus, Plus, Check, Sparkles, Share2, ChevronLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import Link from 'next/link'

const products = [
    { id: 1, name: 'مكعبات البناء الملونة - 100 قطعة', price: 299, oldPrice: 399, category: 'ألعاب البناء', rating: 5, reviews: 128, emoji: '🧱', isNew: true, discount: 25, ageRange: '3-8 سنوات', description: 'مكعبات بناء ملونة عالية الجودة مصنوعة من البلاستيك الآمن. تساعد على تنمية مهارات الطفل الإبداعية والحركية. مناسبة للأطفال من 3 سنوات فما فوق.', benefits: ['تنمية المهارات الحركية الدقيقة', 'تعزيز الإبداع والخيال', 'تعلم الألوان والأشكال الهندسية', 'تحسين التركيز والانتباه', 'تنمية مهارات حل المشكلات', 'اللعب التعاوني مع الآخرين'] },
    { id: 2, name: 'دمية تعليمية ناطقة بالعربية', price: 450, category: 'ألعاب تعليمية', rating: 4, reviews: 89, emoji: '🧸', isNew: true, discount: 0, ageRange: '2-6 سنوات', description: 'دمية تعليمية تفاعلية تنطق بالعربية. تعلم الطفل الحروف والأرقام والألوان. مزودة ببطاريات قابلة للشحن.', benefits: ['تعلم اللغة العربية بطريقة ممتعة', 'تنمية مهارات الاستماع', 'التفاعل الاجتماعي', 'تعزيز الثقة بالنفس', 'تعلم الأرقام والحروف', 'تنمية المهارات اللغوية'] },
    { id: 3, name: 'لوحة الرسم المغناطيسية', price: 180, oldPrice: 220, category: 'فنون وحرف', rating: 5, reviews: 156, emoji: '🎨', isNew: false, discount: 18, ageRange: '3-10 سنوات', description: 'لوحة رسم مغناطيسية سهلة المسح. تأتي مع أقلام ملونة وأختام. مثالية لتنمية مهارات الرسم والإبداع.', benefits: ['تنمية مهارات الرسم', 'تعزيز الإبداع الفني', 'صديقة للبيئة', 'سهلة الاستخدام والتنظيف', 'آمنة للأطفال', 'قابلة لإعادة الاستخدام'] },
    { id: 4, name: 'سيارة تحكم عن بعد', price: 550, category: 'ألعاب إلكترونية', rating: 4, reviews: 72, emoji: '🚗', isNew: false, discount: 0, ageRange: '6-12 سنة', description: 'سيارة تحكم عن بعد بتصميم رياضي أنيق. سرعة عالية وتحكم سهل. تعمل بالبطاريات القابلة للشحن.', benefits: ['تنمية التنسيق الحركي', 'تعلم التحكم عن بعد', 'المرح والترفيه', 'تعزيز التركيز', 'تنمية ردود الفعل السريعة', 'اللعب في الأماكن المفتوحة'] },
    { id: 5, name: 'بازل خشبي - خريطة مصر', price: 150, oldPrice: 200, category: 'ألغاز وتركيب', rating: 5, reviews: 203, emoji: '🧩', isNew: true, discount: 25, ageRange: '4-10 سنوات', description: 'بازل خشبي تعليمي يعرض خريطة مصر. يساعد الطفل على تعلم الجغرافيا بطريقة ممتعة. مصنوع من خشب طبيعي آمن.', benefits: ['تعلم جغرافيا مصر', 'تنمية الذاكرة البصرية', 'حل المشكلات', 'التعرف على الوطن', 'تنمية الصبر', 'تحسين التركيز'] },
]

const relatedProducts = products.slice(0, 4)

export default function ProductPage() {
    const params = useParams()
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState('benefits')
    const addToCart = useCartStore((state) => state.addItem)
    const { theme } = useThemeStore()
    const isLight = theme === 'light'

    const product = products.find((p) => p.id === parseInt(params.id)) || products[0]

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product)
        }
        toast.success(`تمت إضافة ${quantity} من ${product.name} إلى السلة`)
    }

    const features = [
        { icon: Truck, text: 'توصيل مجاني للطلبات فوق 500 ج.م', color: 'text-cyan-500' },
        { icon: Shield, text: 'ضمان الجودة لمدة سنة', color: 'text-green-500' },
        { icon: RotateCcw, text: 'إرجاع مجاني خلال 14 يوم', color: 'text-amber-500' },
    ]

    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm mb-8">
                        <Link href="/" className={`hover:text-primary ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>الرئيسية</Link>
                        <ChevronLeft className={`w-4 h-4 rotate-180 ${isLight ? 'text-gray-400' : 'text-gray-600'}`} />
                        <Link href="/products" className={`hover:text-primary ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>المنتجات</Link>
                        <ChevronLeft className={`w-4 h-4 rotate-180 ${isLight ? 'text-gray-400' : 'text-gray-600'}`} />
                        <span className="text-primary">{product.name}</span>
                    </nav>

                    {/* Product Details */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-20">
                        <ProductImage product={product} isLight={isLight} />
                        <ProductInfo 
                            product={product} 
                            quantity={quantity} 
                            setQuantity={setQuantity}
                            handleAddToCart={handleAddToCart}
                            features={features}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            isLight={isLight}
                        />
                    </div>

                    {/* Related Products */}
                    <RelatedProducts products={relatedProducts} isLight={isLight} />
                </div>
            </div>
            <Footer />
        </main>
    )
}

function ProductImage({ product, isLight }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
        >
            <div className={`rounded-3xl p-12 flex items-center justify-center relative overflow-hidden ${
                isLight 
                    ? 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-xl' 
                    : 'glass-card border border-gray-800'
            }`}>
                <div className="absolute inset-0 mesh-bg opacity-30" />
                
                {/* Badges */}
                <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
                    {product.isNew && (
                        <span className="bg-gradient-to-r from-secondary to-cyan-400 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                            جديد ✨
                        </span>
                    )}
                    {product.discount > 0 && (
                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                            خصم {product.discount}%
                        </span>
                    )}
                </div>

                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-[200px] relative z-10"
                    style={{ filter: 'drop-shadow(0 0 50px rgba(139, 92, 246, 0.3))' }}
                >
                    {product.emoji}
                </motion.div>
            </div>

            {/* Share Button */}
            <button className={`absolute top-6 left-6 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isLight 
                    ? 'bg-white border border-gray-200 text-gray-400 hover:text-primary shadow-md' 
                    : 'glass-effect border border-gray-700 text-gray-400 hover:text-primary'
            }`}>
                <Share2 className="w-5 h-5" />
            </button>
        </motion.div>
    )
}

function ProductInfo({ product, quantity, setQuantity, handleAddToCart, features, activeTab, setActiveTab, isLight }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <div className="flex items-center gap-3 mb-2">
                <span className="text-secondary font-medium">{product.category}</span>
                <span className={isLight ? 'text-gray-400' : 'text-gray-600'}>•</span>
                <span className={isLight ? 'text-gray-500' : 'text-gray-500'}>{product.ageRange}</span>
            </div>
            
            <h1 className={`text-3xl md:text-4xl font-bold mt-2 mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}>{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-5 h-5 ${i < product.rating ? 'text-amber-400 fill-amber-400' : isLight ? 'text-gray-300' : 'text-gray-600'}`}
                        />
                    ))}
                </div>
                <span className={isLight ? 'text-gray-500' : 'text-gray-400'}>({product.reviews} تقييم)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold gradient-text">{product.price} ج.م</span>
                {product.oldPrice && (
                    <>
                        <span className={`text-xl line-through ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>{product.oldPrice} ج.م</span>
                        <span className="bg-red-500/20 text-red-500 px-3 py-1 rounded-full text-sm font-bold border border-red-500/30">
                            وفر {product.oldPrice - product.price} ج.م
                        </span>
                    </>
                )}
            </div>

            <p className={`mb-8 leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{product.description}</p>

            {/* Tabs */}
            <div className="mb-6">
                <div className={`flex gap-4 mb-4 border-b ${isLight ? 'border-gray-200' : 'border-gray-800'}`}>
                    <button
                        onClick={() => setActiveTab('benefits')}
                        className={`pb-3 px-2 font-medium transition-colors ${activeTab === 'benefits' ? 'text-primary border-b-2 border-primary' : isLight ? 'text-gray-500' : 'text-gray-500'}`}
                    >
                        فوائد المنتج
                    </button>
                    <button
                        onClick={() => setActiveTab('specs')}
                        className={`pb-3 px-2 font-medium transition-colors ${activeTab === 'specs' ? 'text-primary border-b-2 border-primary' : isLight ? 'text-gray-500' : 'text-gray-500'}`}
                    >
                        المواصفات
                    </button>
                </div>

                {activeTab === 'benefits' && (
                    <div className="grid grid-cols-2 gap-3">
                        {product.benefits?.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center gap-2"
                            >
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-3 h-3 text-primary" />
                                </div>
                                <span className={`text-sm ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>{benefit}</span>
                            </motion.div>
                        ))}
                    </div>
                )}

                {activeTab === 'specs' && (
                    <div className="space-y-3">
                        <div className={`flex justify-between py-2 border-b ${isLight ? 'border-gray-200' : 'border-gray-800'}`}>
                            <span className={isLight ? 'text-gray-500' : 'text-gray-500'}>الفئة العمرية</span>
                            <span className={isLight ? 'text-gray-900' : 'text-white'}>{product.ageRange}</span>
                        </div>
                        <div className={`flex justify-between py-2 border-b ${isLight ? 'border-gray-200' : 'border-gray-800'}`}>
                            <span className={isLight ? 'text-gray-500' : 'text-gray-500'}>القسم</span>
                            <span className={isLight ? 'text-gray-900' : 'text-white'}>{product.category}</span>
                        </div>
                        <div className={`flex justify-between py-2 border-b ${isLight ? 'border-gray-200' : 'border-gray-800'}`}>
                            <span className={isLight ? 'text-gray-500' : 'text-gray-500'}>التقييم</span>
                            <span className={isLight ? 'text-gray-900' : 'text-white'}>{product.rating}/5</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
                <span className={`font-medium ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>الكمية:</span>
                <div className={`flex items-center rounded-full ${
                    isLight 
                        ? 'bg-gray-100 border border-gray-200' 
                        : 'glass-effect border border-gray-700'
                }`}>
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                            isLight ? 'hover:bg-gray-200 text-gray-500' : 'hover:bg-gray-700 text-gray-400'
                        }`}
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className={`w-12 text-center font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                            isLight ? 'hover:bg-gray-200 text-gray-500' : 'hover:bg-gray-700 text-gray-400'
                        }`}
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="flex-1 btn-primary flex items-center justify-center gap-2 py-4 shadow-lg shadow-primary/30"
                >
                    <ShoppingCart className="w-5 h-5" />
                    أضف للسلة
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                        isLight 
                            ? 'bg-gray-100 border border-gray-200 text-gray-400 hover:border-red-500 hover:text-red-500' 
                            : 'glass-effect border border-gray-700 text-gray-400 hover:border-red-500 hover:text-red-500'
                    }`}
                >
                    <Heart className="w-6 h-6" />
                </motion.button>
            </div>

            {/* Features */}
            <div className={`space-y-3 pt-6 border-t ${isLight ? 'border-gray-200' : 'border-gray-800'}`}>
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isLight ? 'bg-gray-100' : 'bg-gray-800'
                        }`}>
                            <feature.icon className={`w-5 h-5 ${feature.color}`} />
                        </div>
                        <span className={isLight ? 'text-gray-600' : 'text-gray-400'}>{feature.text}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

function RelatedProducts({ products, isLight }) {
    return (
        <div>
            <h2 className={`text-2xl font-bold mb-8 flex items-center gap-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                <Sparkles className="w-6 h-6 text-primary" />
                منتجات مشابهة
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                ))}
            </div>
        </div>
    )
}
