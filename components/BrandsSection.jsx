'use client'
import { motion } from 'framer-motion'

const brands = [
  { name: 'ليجو', emoji: '🧱' },
  { name: 'هوت ويلز', emoji: '🚗' },
  { name: 'باربي', emoji: '👸' },
  { name: 'نيرف', emoji: '🔫' },
  { name: 'بلاي دو', emoji: '🎨' },
  { name: 'فيشر برايس', emoji: '🧸' },
]

export default function BrandsSection() {
  return (
    <section className="cc-brands">
      <div className="cc-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="cc-brands-header"
        >
          <p className="cc-eyebrow">ماركات عالمية</p>
          <h2>أشهر العلامات التجارية</h2>
        </motion.div>

        <div className="cc-brands-grid">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="cc-brand-card"
            >
              <span className="cc-brand-emoji">{brand.emoji}</span>
              <span className="cc-brand-name">{brand.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
