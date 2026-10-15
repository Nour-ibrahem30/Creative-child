'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductVisual from '@/components/ProductVisual'
import { useCartStore } from '@/store/cartStore'
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
  const total = getTotal()
  const shipping = total > 500 ? 0 : 50

  if (items.length === 0) {
    return (
      <main>
        <Navbar />
        <div className="cc-container cc-cart-empty">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="cc-cart-empty-content"
          >
            <motion.div
              className="cc-cart-empty-emoji"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              🛒
            </motion.div>
            <h1>سلة التسوق فارغة</h1>
            <p>لم تقم بإضافة أي منتجات بعد</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/products" className="cc-button">
                <ShoppingBag size={20} />
                تصفح الألعاب
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Navbar />
      <div className="cc-container cc-cart">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cc-page-heading"
        >
          <p className="cc-eyebrow">سلة التسوق</p>
          <h1>ألعاب في انتظار الفرحة</h1>
          <p>{items.length} {items.length === 1 ? 'منتج' : 'منتجات'} في السلة</p>
        </motion.div>

        <div className="cc-cart-grid">
          <CartItems items={items} removeItem={removeItem} updateQuantity={updateQuantity} />
          <OrderSummary total={total} shipping={shipping} clearCart={clearCart} itemCount={items.length} />
        </div>
      </div>
      <Footer />
    </main>
  )
}

function CartItems({ items, removeItem, updateQuantity }) {
  return (
    <div className="cc-cart-items">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          exit={{ opacity: 0, x: -30 }}
          className="cc-cart-item"
        >
          <div className="cc-cart-item-image">
            <ProductVisual product={item} className="cc-cart-image" />
          </div>
          
          <div className="cc-cart-item-details">
            <div className="cc-cart-item-header">
              <div>
                <span className="cc-age-tag">{item.ageRange}</span>
                <h3>{item.name}</h3>
                <p>{item.category}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeItem(item.id)}
                className="cc-cart-item-remove"
                aria-label="حذف المنتج"
              >
                <Trash2 size={18} />
              </motion.button>
            </div>
            
            <div className="cc-cart-item-footer">
              <div className="cc-cart-quantity">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="تقليل الكمية"
                >
                  <Minus size={16} />
                </motion.button>
                <span>{item.quantity}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="زيادة الكمية"
                >
                  <Plus size={16} />
                </motion.button>
              </div>
              <div className="cc-cart-item-price">
                {item.price * item.quantity} <small>ج.م</small>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function OrderSummary({ total, shipping, clearCart, itemCount }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="cc-cart-summary"
    >
      <h2>ملخص الطلب</h2>

      <div className="cc-cart-summary-rows">
        <div className="cc-cart-summary-row">
          <span>المجموع الفرعي ({itemCount} منتج)</span>
          <span>{total.toLocaleString('ar-EG')} ج.م</span>
        </div>
        <div className="cc-cart-summary-row">
          <span>الشحن</span>
          <span className={shipping === 0 ? 'cc-free-shipping' : ''}>
            {shipping === 0 ? 'مجاني 🎉' : `${shipping} ج.م`}
          </span>
        </div>
        {shipping > 0 && (
          <p className="cc-cart-shipping-note">
            أضف {(500 - total).toLocaleString('ar-EG')} ج.م للحصول على شحن مجاني
          </p>
        )}
        <div className="cc-cart-summary-total">
          <span>الإجمالي</span>
          <span>{(total + shipping).toLocaleString('ar-EG')} ج.م</span>
        </div>
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link href="/checkout" className="cc-button cc-cart-checkout-btn">
          إتمام الشراء <ArrowLeft size={18} />
        </Link>
      </motion.div>

      <Link href="/products" className="cc-cart-continue-link">
        <ArrowLeft size={16} className="rotate-180" />
        متابعة التسوق
      </Link>

      <button onClick={clearCart} className="cc-cart-clear-btn">
        إفراغ السلة
      </button>

      <div className="cc-cart-features">
        {[
          { icon: Truck, text: 'شحن مجاني فوق ٥٠٠ ج.م' },
          { icon: Shield, text: 'ضمان على جميع المنتجات' },
          { icon: RotateCcw, text: 'استبدال خلال ١٤ يوم' },
        ].map((feature, i) => (
          <div key={i} className="cc-cart-feature">
            <feature.icon size={16} />
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
