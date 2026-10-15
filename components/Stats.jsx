'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Users, Package, Star, Truck } from 'lucide-react'

const stats = [
  { icon: Users, value: 5000, suffix: '+', label: 'عميل سعيد' },
  { icon: Package, value: 500, suffix: '+', label: 'منتج متنوع' },
  { icon: Star, value: 99, suffix: '%', label: 'رضا العملاء' },
  { icon: Truck, value: 10000, suffix: '+', label: 'طلب تم توصيله' },
]

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const duration = 2000
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count.toLocaleString('ar-EG')}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="cc-stats">
      <div className="cc-container">
        <div className="cc-stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="cc-stat-card"
            >
              <motion.div
                className="cc-stat-icon"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <stat.icon size={28} strokeWidth={1.5} />
              </motion.div>
              <div className="cc-stat-value">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="cc-stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
