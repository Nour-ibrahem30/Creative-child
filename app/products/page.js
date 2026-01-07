'use client'
import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import ProductModal from '@/components/ProductModal'
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react'

const allProducts = [
    { id: 1, name: 'مكعبات البناء الملونة - 100 قطعة', price: 299, oldPrice: 399, category: 'ألعاب البناء', rating: 5, reviews: 128, emoji: '🧱', isNew: true, discount: 25, ageRange: '3-8 سنوات', description: 'مكعبات بناء ملونة عالية الجودة مصنوعة من البلاستيك الآمن.', benefits: ['تنمية المهارات الحركية', 'تعزيز الإبداع والخيال', 'تعلم الألوان والأشكال', 'تحسين التركيز'] },
    { id: 2, name: 'دمية تعليمية ناطقة بالعربية', price: 450, category: 'ألعاب تعليمية', rating: 4, reviews: 89, emoji: '🧸', isNew: true, discount: 0, ageRange: '2-6 سنوات', description: 'دمية تعليمية تفاعلية تنطق بالعربية وتعلم الحروف والأرقام.', benefits: ['تعلم اللغة العربية', 'تنمية مهارات الاستماع', 'التفاعل الاجتماعي', 'تعزيز الثقة بالنفس'] },
    { id: 3, name: 'لوحة الرسم المغناطيسية', price: 180, oldPrice: 220, category: 'فنون وحرف', rating: 5, reviews: 156, emoji: '🎨', isNew: false, discount: 18, ageRange: '3-10 سنوات', description: 'لوحة رسم مغناطيسية سهلة المسح مع أقلام ملونة.', benefits: ['تنمية مهارات الرسم', 'تعزيز الإبداع الفني', 'صديقة للبيئة', 'سهلة الاستخدام'] },
    { id: 4, name: 'سيارة تحكم عن بعد', price: 550, category: 'ألعاب إلكترونية', rating: 4, reviews: 72, emoji: '🚗', isNew: false, discount: 0, ageRange: '6-12 سنة', description: 'سيارة تحكم عن بعد بتصميم رياضي وسرعة عالية.', benefits: ['تنمية التنسيق الحركي', 'تعلم التحكم عن بعد', 'المرح والترفيه', 'تعزيز التركيز'] },
    { id: 5, name: 'بازل خشبي - خريطة مصر', price: 150, oldPrice: 200, category: 'ألغاز وتركيب', rating: 5, reviews: 203, emoji: '🧩', isNew: true, discount: 25, ageRange: '4-10 سنوات', description: 'بازل خشبي تعليمي يعرض خريطة مصر بالمحافظات.', benefits: ['تعلم الجغرافيا', 'تنمية الذاكرة', 'حل المشكلات', 'التعرف على الوطن'] },
    { id: 6, name: 'كرة قدم للأطفال', price: 120, category: 'ألعاب خارجية', rating: 4, reviews: 95, emoji: '⚽', isNew: false, discount: 0, ageRange: '4-12 سنة', description: 'كرة قدم مناسبة للأطفال بحجم مثالي وخامة عالية الجودة.', benefits: ['تنمية اللياقة البدنية', 'العمل الجماعي', 'تعزيز الصحة', 'المرح في الهواء الطلق'] },
    { id: 7, name: 'مجموعة الطبيب الصغير', price: 280, oldPrice: 350, category: 'ألعاب تعليمية', rating: 5, reviews: 167, emoji: '🩺', isNew: true, discount: 20, ageRange: '3-8 سنوات', description: 'مجموعة أدوات طبية للعب التخيلي وتعلم المهن.', benefits: ['التعرف على المهن', 'تقليل الخوف من الأطباء', 'اللعب التخيلي', 'تنمية المهارات الاجتماعية'] },
    { id: 8, name: 'قطار موسيقي للرضع', price: 320, category: 'ألعاب الرضع', rating: 4, reviews: 84, emoji: '🚂', isNew: false, discount: 0, ageRange: '6 أشهر - 3 سنوات', description: 'قطار موسيقي ملون يصدر أصوات وأضواء جذابة.', benefits: ['تنمية الحواس', 'تعلم الألوان', 'تحفيز السمع', 'المرح والترفيه'] },
    { id: 9, name: 'مجموعة ليجو كلاسيك', price: 650, oldPrice: 800, category: 'ألعاب البناء', rating: 5, reviews: 245, emoji: '🏗️', isNew: false, discount: 19, ageRange: '4-12 سنة', description: 'مجموعة ليجو كلاسيكية مع قطع متنوعة للبناء الإبداعي.', benefits: ['تنمية الإبداع', 'حل المشكلات', 'التفكير المنطقي', 'الصبر والمثابرة'] },
    { id: 10, name: 'طائرة درون للأطفال', price: 890, category: 'ألعاب إلكترونية', rating: 4, reviews: 56, emoji: '🚁', isNew: true, discount: 0, ageRange: '8-14 سنة', description: 'طائرة درون سهلة التحكم مع كاميرا للتصوير.', benefits: ['تعلم التكنولوجيا', 'التنسيق الحركي', 'التصوير الجوي', 'المرح والمغامرة'] },
    { id: 11, name: 'مجموعة ألوان مائية', price: 95, oldPrice: 120, category: 'فنون وحرف', rating: 5, reviews: 189, emoji: '🖌️', isNew: false, discount: 21, ageRange: '4-12 سنة', description: 'مجموعة ألوان مائية آمنة وقابلة للغسل.', benefits: ['تنمية الإبداع الفني', 'التعبير عن المشاعر', 'تعلم الألوان', 'الاسترخاء'] },
    { id: 12, name: 'دراجة توازن للأطفال', price: 750, category: 'ألعاب خارجية', rating: 5, reviews: 134, emoji: '🚲', isNew: true, discount: 0, ageRange: '2-5 سنوات', description: 'دراجة توازن بدون دواسات لتعلم التوازن.', benefits: ['تعلم التوازن', 'تنمية الثقة', 'اللياقة البدنية', 'التحضير لركوب الدراجة'] },
]

const categories = ['الكل', 'ألعاب تعليمية', 'ألعاب البناء', 'فنون وحرف', 'ألعاب إلكترونية', 'ألعاب خارجية', 'ألغاز وتركيب', 'ألعاب الرضع']

export default function ProductsPage() {
    return (
        <Suspense fallback={<ProductsPageLoading />}>
            <ProductsContent />
        </Suspense>
    )
}

function ProductsPageLoading() {
    return (
        <main className="min-h-screen bg-dark">
            <Navbar />
            <div className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-4">جميع المنتجات</h1>
                        <p className="text-gray-400">جاري التحميل...</p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

function ProductsContent() {
    const searchParams = useSearchParams()
    const categoryFromUrl = searchParams.get('category')
    
    const [selectedCategory, setSelectedCategory] = useState('الكل')
    const [sortBy, setSortBy] = useState('newest')
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [searchQuery, setSearchQuery] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    // تحديث الفئة من الـ URL
    useEffect(() => {
        if (categoryFromUrl && categories.includes(categoryFromUrl)) {
            setSelectedCategory(categoryFromUrl)
        }
    }, [categoryFromUrl])

    const filteredProducts = allProducts.filter((product) => {
        if (selectedCategory !== 'الكل' && product.category !== selectedCategory) return false
        if (product.price < priceRange[0] || product.price > priceRange[1]) return false
        if (searchQuery && !product.name.includes(searchQuery)) return false
        return true
    })

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low': return a.price - b.price
            case 'price-high': return b.price - a.price
            case 'rating': return b.rating - a.rating
            default: return b.isNew - a.isNew
        }
    })

    return (
        <main className="min-h-screen bg-dark">
            <Navbar />
            <div className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <PageHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} setShowFilters={setShowFilters} showFilters={showFilters} />
                    <div className="flex flex-col lg:flex-row gap-8">
                        <FilterSidebar 
                            categories={categories} 
                            selectedCategory={selectedCategory} 
                            setSelectedCategory={setSelectedCategory}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            showFilters={showFilters}
                            setShowFilters={setShowFilters}
                        />
                        <ProductsGrid 
                            products={sortedProducts} 
                            sortBy={sortBy} 
                            setSortBy={setSortBy}
                            onProductClick={setSelectedProduct}
                        />
                    </div>
                </div>
            </div>
            <Footer />
            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        </main>
    )
}


function PageHeader({ searchQuery, setSearchQuery, setShowFilters, showFilters }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
        >
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">جميع المنتجات</h1>
                <p className="text-gray-400">اكتشف مجموعتنا الواسعة من الألعاب والوسائل التعليمية</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md w-full">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ابحث عن منتج..."
                        className="w-full pr-12 pl-4 py-3 glass-effect border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                    />
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-3 glass-effect border border-gray-700 rounded-xl text-white"
                >
                    <SlidersHorizontal className="w-5 h-5" />
                    الفلاتر
                </button>
            </div>
        </motion.div>
    )
}

function FilterSidebar({ categories, selectedCategory, setSelectedCategory, priceRange, setPriceRange, showFilters, setShowFilters }) {
    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                        onClick={() => setShowFilters(false)}
                    />
                )}
            </AnimatePresence>

            <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`lg:w-72 flex-shrink-0 ${showFilters ? 'fixed inset-y-0 right-0 z-50 w-80 p-4 bg-dark-lighter' : 'hidden lg:block'}`}
            >
                <div className="glass-card rounded-2xl p-6 border border-gray-800 sticky top-24">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg text-white flex items-center gap-2">
                            <Filter className="w-5 h-5 text-primary" />
                            تصفية النتائج
                        </h3>
                        <button onClick={() => setShowFilters(false)} className="lg:hidden text-gray-400">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-gray-300">الأقسام</h4>
                        <div className="space-y-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`block w-full text-right px-4 py-2.5 rounded-xl transition-all ${
                                        selectedCategory === cat
                                            ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-glow-primary'
                                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3 text-gray-300">نطاق السعر</h4>
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                            className="w-full accent-primary"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                            <span>0 ج.م</span>
                            <span className="text-primary font-bold">{priceRange[1]} ج.م</span>
                        </div>
                    </div>
                </div>
            </motion.aside>
        </>
    )
}

function ProductsGrid({ products, sortBy, setSortBy, onProductClick }) {
    return (
        <div className="flex-1">
            <div className="flex items-center justify-between mb-6 glass-card rounded-xl p-4 border border-gray-800">
                <span className="text-gray-400">{products.length} منتج</span>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none border border-gray-700 focus:border-primary"
                >
                    <option value="newest">الأحدث</option>
                    <option value="price-low">السعر: من الأقل</option>
                    <option value="price-high">السعر: من الأعلى</option>
                    <option value="rating">التقييم</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product, index) => (
                    <div key={product.id} onClick={() => onProductClick(product)} className="cursor-pointer">
                        <ProductCard product={product} index={index} />
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <div className="text-center py-20 glass-card rounded-2xl border border-gray-800">
                    <p className="text-gray-400 text-lg">لا توجد منتجات تطابق البحث</p>
                </div>
            )}
        </div>
    )
}
