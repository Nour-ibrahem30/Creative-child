'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Blocks, Palette, Puzzle } from 'lucide-react'

export default function DiscoverSection() {
  return (
    <section className="cc-container cc-discover">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="cc-eyebrow">أكثر من مجرد لعبة</p>
        <h2>مهارات تكبر معاهم.</h2>
        <p>
          من أول مكعب لحد أول فكرة كبيرة، اختار لهم مساحة يجربوا ويكتشفوا فيها.
        </p>
        <motion.div whileHover={{ x: -5 }}>
          <Link className="cc-text-link" href="/categories">
            اكتشف كل الأقسام <ArrowLeft size={18} />
          </Link>
        </motion.div>
      </motion.div>
      
      <div className="cc-skill-links">
        {[
          { name: 'البناء والابتكار', category: 'ألعاب البناء', Icon: Blocks },
          { name: 'الفن والخيال', category: 'فنون وحرف', Icon: Palette },
          { name: 'التفكير وحل الألغاز', category: 'ألغاز وتركيب', Icon: Puzzle },
        ].map(({ name, category, Icon }, index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Link href={'/products?category=' + encodeURIComponent(category)}>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon size={32} strokeWidth={1.4} />
              </motion.div>
              <span>{name}</span>
              <ArrowLeft size={18} />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
