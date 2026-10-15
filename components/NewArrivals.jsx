'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Sparkles } from 'lucide-react'
import ProductCard from './ProductCard'
import { catalogProducts } from '@/lib/catalog'

export default function NewArrivals() {
  // Get new products
  const newProducts = catalogProducts
    .filter(p => p.isNew)
    .slice(0, 4)

  return (
    <section className="cc-new-arrivals">
      <div className="cc-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="cc-section-heading"
        >
          <div>
            <p className="cc-eyebrow">
              <Sparkles size={16} className="inline ml-2" />
              وصل حديثًا
            </p>
            <h2>ألعاب جديدة تستنى الاكتشاف</h2>
          </div>
          <Link className="cc-text-link" href="/products">
            كل الجديد <ArrowLeft size={19} />
          </Link>
        </motion.div>

        <div className="cc-products-grid">
          {newProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
