'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { catalogProducts } from '@/lib/catalog'

export default function OffersPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 45,
    seconds: 30,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
        }
        if (minutes < 0) {
          minutes = 59
          hours--
        }
        if (hours < 0) {
          hours = 23
          days--
        }
        if (days < 0) {
          days = 0
          hours = 0
          minutes = 0
          seconds = 0
        }
        return { days, hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const offerProducts = catalogProducts.filter((p) => p.discount > 0)

  return (
    <main>
      <Navbar />
      <div className="cc-container cc-catalog">
        <motion.div
          className="cc-page-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="cc-eyebrow">فرحة أكبر، بسعر أصغر</p>
          <h1>اكتشافات حلوة بأسعار أحلى</h1>
          <p>اختيارات من ألعابنا التعليمية بأسعار مخفّضة.</p>
        </motion.div>

        <motion.div
          className="cc-offers-banner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="cc-offers-banner-content">
            <h2>🎉 عرض نهاية الأسبوع</h2>
            <p>خصومات تصل حتى ٢٥٪ على ألعاب مختارة</p>
            <div className="cc-offer-countdown">
              {[
                { value: timeLeft.days, label: 'يوم' },
                { value: timeLeft.hours, label: 'ساعة' },
                { value: timeLeft.minutes, label: 'دقيقة' },
                { value: timeLeft.seconds, label: 'ثانية' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="cc-countdown-item"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1, type: 'spring' }}
                >
                  <span>{item.value.toString().padStart(2, '0')}</span>
                  <small>{item.label}</small>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            className="cc-offers-banner-emoji"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎁
          </motion.div>
        </motion.div>

        <motion.p
          className="cc-result-count"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {offerProducts.length} عرض متاح
        </motion.p>

        <div className="cc-products-grid">
          {offerProducts.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
