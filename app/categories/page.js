'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CategoriesAnimated from '@/components/CategoriesAnimated'
import {
  Blocks,
  Palette,
  Puzzle,
  CarFront,
  Baby,
  GraduationCap,
  Sun,
} from 'lucide-react'

const categories = [
  { name: 'ألعاب تعليمية', Icon: GraduationCap, count: 45, desc: 'تعلم ممتع ومفيد' },
  { name: 'ألعاب البناء', Icon: Blocks, count: 32, desc: 'ابني واكتشف' },
  { name: 'فنون وحرف', Icon: Palette, count: 28, desc: 'أطلق العنان للإبداع' },
  { name: 'ألعاب إلكترونية', Icon: CarFront, count: 25, desc: 'تكنولوجيا وتحكم' },
  { name: 'ألعاب خارجية', Icon: Sun, count: 20, desc: 'لعب في الهواء الطلق' },
  { name: 'ألغاز وتركيب', Icon: Puzzle, count: 35, desc: 'تفكير وحل مشكلات' },
  { name: 'ألعاب الرضع', Icon: Baby, count: 18, desc: 'للصغار من ٠-٢ سنة' },
]

export default function CategoriesPage() {
  return (
    <main>
      <Navbar />
      <div className="cc-container cc-catalog">
        <motion.div
          className="cc-page-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="cc-eyebrow">كل اهتمام، بداية حكاية</p>
          <h1>بيحب يكتشف إيه؟</h1>
          <p>ألعاب للبناء والرسم والتفكير، وكل ما يحرّك خيالهم.</p>
        </motion.div>

        <div className="cc-category-grid">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Link href={'/products?category=' + encodeURIComponent(category.name)}>
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <category.Icon size={44} strokeWidth={1.3} />
                </motion.div>
                <h2>{category.name}</h2>
                <span className="cc-category-desc">{category.desc}</span>
                <span className="cc-category-count">{category.count} لعبة</span>
                <span className="cc-category-arrow">اكتشف الألعاب ←</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <CategoriesAnimated />
      <Footer />
    </main>
  )
}
