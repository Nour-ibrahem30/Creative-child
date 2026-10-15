'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, Star } from 'lucide-react'
import ProductCard from './ProductCard'
import { catalogProducts } from '@/lib/catalog'

export default function BestSellers() {
  // Get top rated products
  const bestSellers = catalogProducts
    .filter(p => p.rating >= 4)
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 4)

  return (
    <section className="cc-best-sellers">
      <div className="cc-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="cc-section-heading"
        >
          <div>
            <p className="cc-eyebrow">
              <TrendingUp size={16} className="inline ml-2" />
              الأكثر مبيعًا
            </p>
            <h2>اختيارات الآباء والأمهات</h2>
          </div>
          <Link className="cc-text-link" href="/products?sort=rating">
            كل الألعاب <ArrowLeft size={19} />
          </Link>
        </motion.div>

        <div className="cc-products-grid">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
