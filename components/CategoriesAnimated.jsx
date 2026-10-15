'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Baby, Blocks, CarFront, Rocket } from 'lucide-react'

const ages = [
  { value: '0-2', label: '٠ – ٢ سنة', Icon: Baby },
  { value: '3-5', label: '٣ – ٥ سنوات', Icon: Blocks },
  { value: '6-8', label: '٦ – ٨ سنوات', Icon: CarFront },
  { value: '9', label: '٩+ سنوات', Icon: Rocket },
]

export default function CategoriesAnimated() {
  return (
    <section
      className="cc-container cc-ages"
      id="ages"
      aria-labelledby="age-heading"
    >
      <motion.h2
        id="age-heading"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        لكل مرحلة،
        <br />
        لعبة تحكي حكايتها
        <span className="cc-short-line" />
      </motion.h2>
      
      <div className="cc-age-options">
        {ages.map(({ value, label, Icon }, index) => (
          <motion.div
            key={value}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Link className="cc-age" href={'/products?age=' + value}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon size={44} strokeWidth={1.4} />
              </motion.div>
              <span>{label}</span>
              <motion.span 
                className="cc-age-arrow" 
                aria-hidden="true"
                initial={{ x: 0 }}
                whileHover={{ x: -5 }}
              >
                ←
              </motion.span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
