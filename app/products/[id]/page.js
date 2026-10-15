'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Minus, Plus, ArrowLeft, Check, Truck, Heart, Shield, RotateCcw, Star } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductVisual from '@/components/ProductVisual'
import ProductCard from '@/components/ProductCard'
import { catalogProducts } from '@/lib/catalog'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import toast from 'react-hot-toast'

export default function ProductPage() {
  const params = useParams()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [ready, setReady] = useState(false)
  const add = useCartStore((s) => s.addItem)
  const { items: wishlist, toggle: toggleWishlist } = useWishlistStore()

  useEffect(() => setReady(true), [])

  const product = catalogProducts.find((p) => p.id === Number(params.id))
  
  if (!product) {
    return (
      <main>
        <Navbar />
        <div className="cc-container cc-empty" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>😕</div>
            <h1 style={{ fontSize: '28px', marginBottom: '15px', color: 'var(--cc-green)' }}>
              اللعبة دي مش موجودة
            </h1>
            <p style={{ marginBottom: '25px', color: 'var(--cc-muted)' }}>
              ممكن تكون اتحذفت أو الرابط غلط
            </p>
            <Link className="cc-button" href="/products">
              اكتشف الألعاب
            </Link>
          </motion.div>
        </div>
        <Footer />
      </main>
    )
  }

  const isSaved = ready && wishlist.some((p) => p.id === product.id)
  const relatedProducts = catalogProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  function buy() {
    for (let i = 0; i < quantity; i++) add(product)
    setAdded(true)
    toast.success('تمت الإضافة إلى السلة 🛒')
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main>
      <Navbar />
      <div className="cc-container cc-catalog">
        <motion.nav
          className="cc-breadcrumb"
          aria-label="مسار الصفحة"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/">الرئيسية</Link>
          <span>/</span>
          <Link href="/products">الألعاب</Link>
          <span>/</span>
          <span>{product.category}</span>
        </motion.nav>

        <section className="cc-product-detail">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="cc-product-visual"
          >
            <ProductVisual product={product} />
          </motion.div>

          <motion.div
            className="cc-detail-copy"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="cc-detail-badges">
              <span className="cc-age-tag">{product.ageRange}</span>
              {product.isNew && <span className="cc-new-badge">جديد</span>}
            </div>

            <h1>{product.name}</h1>

            <div className="cc-detail-rating">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < product.rating ? '#d97c40' : 'none'}
                  color="#d97c40"
                />
              ))}
              <span>({product.reviews} تقييم)</span>
            </div>

            <p className="cc-detail-description">{product.description}</p>

            <div className="cc-price cc-detail-price">
              <strong>
                {product.price.toLocaleString('ar-EG')} <small>ج.م</small>
              </strong>
              {product.oldPrice && (
                <del>{product.oldPrice.toLocaleString('ar-EG')} ج.م</del>
              )}
              {product.discount > 0 && (
                <span className="cc-discount-badge">وفّر {product.discount}٪</span>
              )}
            </div>

            <ul className="cc-detail-benefits">
              {product.benefits.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Check size={17} />
                  {b}
                </motion.li>
              ))}
            </ul>

            <div className="cc-buy-row">
              <div className="cc-quantity">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="تقليل الكمية"
                  disabled={quantity === 1}
                >
                  <Minus size={17} />
                </motion.button>
                <span aria-live="polite">{quantity}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="زيادة الكمية"
                >
                  <Plus size={17} />
                </motion.button>
              </div>

              <motion.button
                onClick={buy}
                className="cc-button cc-buy-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {added ? (
                  <>
                    <Check size={20} />
                    تمت الإضافة
                  </>
                ) : (
                  <>
                    <Plus size={20} />
                    أضف للسلة
                  </>
                )}
              </motion.button>

              <motion.button
                className={`cc-wishlist-btn ${isSaved ? 'is-saved' : ''}`}
                onClick={() => toggleWishlist(product)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isSaved ? 'حذف من المفضلة' : 'أضف للمفضلة'}
              >
                <Heart size={22} fill={isSaved ? 'currentColor' : 'none'} />
              </motion.button>
            </div>

            <div className="cc-detail-features">
              {[
                { icon: Truck, text: 'توصيل مجاني فوق ٥٠٠ ج.م' },
                { icon: Shield, text: 'ضمان الجودة' },
                { icon: RotateCcw, text: 'استبدال خلال ١٤ يوم' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="cc-detail-feature"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <feature.icon size={18} />
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {relatedProducts.length > 0 && (
          <>
            <motion.div
              className="cc-section-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ marginTop: '50px' }}
            >
              <div>
                <p className="cc-eyebrow">قد يعجبك أيضًا</p>
                <h2>حكايات تانية ممكن تعجبهم</h2>
              </div>
              <Link className="cc-text-link" href="/products">
                كل الألعاب <ArrowLeft size={17} />
              </Link>
            </motion.div>

            <div className="cc-products-grid">
              {relatedProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  )
}
