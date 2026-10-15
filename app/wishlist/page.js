'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { useWishlistStore } from '@/store/wishlistStore'
import { Heart } from 'lucide-react'

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items)
  const [ready, setReady] = useState(false)

  useEffect(() => setReady(true), [])

  return (
    <main>
      <Navbar />
      <div className="cc-container cc-catalog">
        <motion.div
          className="cc-page-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="cc-eyebrow">لوقت اللعب الجاي</p>
          <h1>ألعاب عجبتك</h1>
          <p>كل اختياراتك المفضلة، في مكان واحد.</p>
        </motion.div>

        {ready && items.length > 0 ? (
          <>
            <motion.p
              className="cc-result-count"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {items.length} لعبة في المفضلة
            </motion.p>
            <div className="cc-products-grid">
              {items.map((p, index) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <motion.div
            className="cc-wishlist-empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="cc-wishlist-empty-emoji"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <Heart size={80} strokeWidth={1} color="var(--cc-muted)" />
            </motion.div>
            <h2>
              {ready ? 'المفضلة فاضية' : 'جاري تحميل اختياراتك...'}
            </h2>
            <p>
              {ready
                ? 'اضغط على القلب جنب أي لعبة عشان تحفظها هنا.'
                : 'استنى ثواني...'}
            </p>
            {ready && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/products" className="cc-button">
                  اكتشف الألعاب
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
      <Footer />
    </main>
  )
}
