'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ProductCard from './ProductCard'
import { catalogProducts } from '@/lib/catalog'

export default function FeaturedProductsAnimated() {
  const products = [1, 5, 3, 2].map((id) =>
    catalogProducts.find((p) => p.id === id)
  )

  return (
    <section className="cc-container cc-featured">
      <motion.div
        className="cc-section-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <p className="cc-eyebrow">لعب، تعلّم، واكتشاف</p>
          <h2>اختيارات تنمّي خيالهم</h2>
        </div>
        <motion.div whileHover={{ x: -5 }}>
          <Link className="cc-text-link" href="/products">
            كل الألعاب <ArrowLeft size={19} />
          </Link>
        </motion.div>
      </motion.div>

      <div className="cc-products-grid">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
