'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function HelpBanner() {
  return (
    <motion.section 
      className="cc-container cc-help-banner"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <p className="cc-eyebrow">نختار معاك</p>
        <h2>محتار تبدأ بأي لعبة؟</h2>
        <p>احكيلنا عن عمر طفلك واهتماماته، ونساعدك تلاقي الاختيار المناسب.</p>
      </div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link href="/contact" className="cc-button">
          خلّينا نساعدك <ArrowLeft size={19} />
        </Link>
      </motion.div>
    </motion.section>
  )
}
