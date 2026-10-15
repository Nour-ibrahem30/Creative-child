'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { catalogProducts } from '@/lib/catalog'

const categories = [
  'ألعاب تعليمية',
  'ألعاب البناء',
  'فنون وحرف',
  'ألعاب إلكترونية',
  'ألعاب خارجية',
  'ألغاز وتركيب',
  'ألعاب الرضع',
]

const ages = {
  '0-2': '٠ – ٢ سنة',
  '3-5': '٣ – ٥ سنوات',
  '6-8': '٦ – ٨ سنوات',
  '9': '٩+ سنوات',
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main>
          <Navbar />
          <div className="cc-container cc-catalog">
            <div className="cc-page-heading">
              <div className="cc-skeleton" style={{ width: 120, height: 20, marginBottom: 10 }} />
              <div className="cc-skeleton" style={{ width: 280, height: 36 }} />
            </div>
          </div>
          <Footer />
        </main>
      }
    >
      <ProductsContent />
    </Suspense>
  )
}

function ProductsContent() {
  const params = useSearchParams()
  return <Catalog key={params.toString()} params={params} />
}

function Catalog({ params }) {
  const [search, setSearch] = useState(null)
  const [category, setCategory] = useState(null)
  const [age, setAge] = useState(null)
  const [sort, setSort] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(1000)

  const currentSearch = search ?? params.get('search') ?? ''
  const currentCategory = category ?? params.get('category') ?? ''
  const currentAge = age ?? params.get('age') ?? ''

  const products = catalogProducts
    .filter((p) => {
      if (p.price > maxPrice) return false
      if (
        currentSearch &&
        !(p.name + ' ' + p.description + ' ' + p.benefits.join(' ')).includes(currentSearch)
      )
        return false
      if (currentCategory && p.category !== currentCategory) return false
      if (currentAge) {
        const range = p.ageRange.match(/\d+/g).map(Number)
        const min = p.ageRange.includes('أشهر') ? 0 : range[0]
        const max = range[1]
        const [from, to] = currentAge === '9' ? [9, 18] : currentAge.split('-').map(Number)
        if (min > to || max < from) return false
      }
      return true
    })
    .sort((a, b) =>
      sort === 'low'
        ? a.price - b.price
        : sort === 'high'
          ? b.price - a.price
          : sort === 'rating'
            ? b.rating - a.rating
            : 0
    )

  const clearFilters = () => {
    setSearch('')
    setCategory('')
    setAge('')
    setMaxPrice(1000)
  }

  return (
    <main className="cc-products-page">
      <Navbar />
      <div className="cc-container cc-catalog">
        <motion.div
          className="cc-page-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="cc-eyebrow">مساحة للعب، وعالم للاكتشاف</p>
          <h1>لعبتهم الجديدة هنا.</h1>
          <p>اختار حسب العمر والاهتمام، وسيب الباقي لخيالهم.</p>
        </motion.div>

        <motion.div
          className="cc-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <input
            aria-label="البحث عن لعبة أو مهارة"
            placeholder="ابحث عن لعبة أو مهارة ..."
            value={currentSearch}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            aria-label="القسم"
            value={currentCategory}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">كل الأقسام</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            aria-label="عمر الطفل"
            value={currentAge}
            onChange={(e) => setAge(e.target.value)}
          >
            <option value="">كل الأعمار</option>
            {Object.entries(ages).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
          <select
            aria-label="ترتيب المنتجات"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="featured">اختيارات المتجر</option>
            <option value="low">السعر: من الأقل</option>
            <option value="high">السعر: من الأعلى</option>
            <option value="rating">الأعلى تقييمًا</option>
          </select>
          <label className="cc-price-filter">
            حتى {maxPrice.toLocaleString('ar-EG')} ج.م
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="أقصى سعر"
            />
          </label>
        </motion.div>

        <motion.p
          className="cc-result-count"
          aria-live="polite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {products.length.toLocaleString('ar-EG')} لعبة للاكتشاف
        </motion.p>

        <div className="cc-products-grid">
          {products.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>

        {products.length === 0 && (
          <motion.div
            className="cc-empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔍</div>
            <p>مفيش ألعاب مطابقة للاختيارات دي. جرّب بحث مختلف.</p>
            <motion.button
              className="cc-button"
              onClick={clearFilters}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              عرض كل الألعاب
            </motion.button>
          </motion.div>
        )}
      </div>
      <Footer />
    </main>
  )
}
