'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCartStore } from '@/store/cartStore'
import { CreditCard, Truck, MapPin, Check, Wallet, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', paymentMethod: 'cash',
  })

  const total = getTotal()
  const shipping = total > 500 ? 0 : 50

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      setIsSubmitting(true)
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('تم تأكيد طلبك بنجاح! 🎉 سنتواصل معك قريباً')
      clearCart()
      router.push('/')
    }
  }

  const steps = [
    { num: 1, label: 'معلومات الشحن', icon: MapPin },
    { num: 2, label: 'طريقة الدفع', icon: CreditCard },
    { num: 3, label: 'تأكيد الطلب', icon: Check },
  ]

  return (
    <main>
      <Navbar />
      <div className="cc-container cc-checkout">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cc-page-heading"
          style={{ textAlign: 'center' }}
        >
          <p className="cc-eyebrow">إتمام الشراء</p>
          <h1>خطوة واحدة من الفرحة</h1>
        </motion.div>

        <StepsIndicator steps={steps} currentStep={step} />

        <div className="cc-checkout-grid">
          <CheckoutForm 
            step={step} 
            setStep={setStep} 
            formData={formData} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
          <OrderSummary items={items} total={total} shipping={shipping} />
        </div>
      </div>
      <Footer />
    </main>
  )
}

function StepsIndicator({ steps, currentStep }) {
  return (
    <div className="cc-checkout-steps">
      {steps.map((s, index) => (
        <motion.div
          key={s.num}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`cc-checkout-step ${currentStep >= s.num ? 'active' : ''} ${currentStep > s.num ? 'completed' : ''}`}
        >
          <motion.div
            className="cc-checkout-step-icon"
            whileHover={{ scale: 1.1 }}
          >
            {currentStep > s.num ? <Check size={20} /> : <s.icon size={20} />}
          </motion.div>
          <span className="cc-checkout-step-label">{s.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

function CheckoutForm({ step, setStep, formData, handleChange, handleSubmit, isSubmitting }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleSubmit} className="cc-checkout-form">
          {step === 1 && <ShippingForm formData={formData} handleChange={handleChange} />}
          {step === 2 && <PaymentForm formData={formData} handleChange={handleChange} />}
          {step === 3 && <ConfirmationForm formData={formData} />}

          <div className="cc-checkout-form-buttons">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="cc-button cc-checkout-back-btn"
              >
                السابق
              </button>
            )}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cc-button"
            >
              {isSubmitting ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  ⏳
                </motion.span>
              ) : (
                <>
                  {step === 3 ? 'تأكيد الطلب' : 'التالي'}
                  <ArrowLeft size={18} />
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  )
}

function ShippingForm({ formData, handleChange }) {
  return (
    <>
      <h2>معلومات الشحن</h2>
      <div className="cc-checkout-form-group">
        <label>الاسم الكامل</label>
        <input
          type="text" name="name" value={formData.name} onChange={handleChange} required
          placeholder="أدخل اسمك"
        />
      </div>
      <div className="cc-checkout-form-row">
        <div className="cc-checkout-form-group">
          <label>البريد الإلكتروني</label>
          <input
            type="email" name="email" value={formData.email} onChange={handleChange} required
            placeholder="example@email.com"
          />
        </div>
        <div className="cc-checkout-form-group">
          <label>رقم الهاتف</label>
          <input
            type="tel" name="phone" value={formData.phone} onChange={handleChange} required
            placeholder="01xxxxxxxxx"
          />
        </div>
      </div>
      <div className="cc-checkout-form-group">
        <label>العنوان بالتفصيل</label>
        <textarea
          name="address" value={formData.address} onChange={handleChange} required rows={3}
          placeholder="أدخل عنوانك بالتفصيل (الشارع، المبنى، الشقة)"
        />
      </div>
      <div className="cc-checkout-form-group">
        <label>المدينة</label>
        <select name="city" value={formData.city} onChange={handleChange} required>
          <option value="">اختر المدينة</option>
          <option value="cairo">القاهرة</option>
          <option value="giza">الجيزة</option>
          <option value="alex">الإسكندرية</option>
          <option value="other">مدينة أخرى</option>
        </select>
      </div>
    </>
  )
}

function PaymentForm({ formData, handleChange }) {
  const paymentMethods = [
    { value: 'cash', icon: Truck, title: 'الدفع عند الاستلام', desc: 'ادفع نقداً عند استلام طلبك' },
    { value: 'vodafone', icon: Wallet, title: 'فودافون كاش', desc: 'ادفع عبر فودافون كاش' },
    { value: 'card', icon: CreditCard, title: 'بطاقة ائتمان', desc: 'Visa, Mastercard' },
  ]

  return (
    <>
      <h2>طريقة الدفع</h2>
      <div className="cc-checkout-payment-options">
        {paymentMethods.map((method, index) => (
          <motion.label
            key={method.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`cc-checkout-payment-option ${formData.paymentMethod === method.value ? 'selected' : ''}`}
          >
            <input
              type="radio" name="paymentMethod" value={method.value}
              checked={formData.paymentMethod === method.value}
              onChange={handleChange}
            />
            <div className="cc-checkout-payment-icon">
              <method.icon size={22} />
            </div>
            <div>
              <h3>{method.title}</h3>
              <p>{method.desc}</p>
            </div>
          </motion.label>
        ))}
      </div>
    </>
  )
}

function ConfirmationForm({ formData }) {
  return (
    <>
      <h2>تأكيد الطلب</h2>
      <div className="cc-checkout-confirmation">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="cc-checkout-confirmation-block"
        >
          <h3>معلومات الشحن</h3>
          <p><strong>{formData.name}</strong></p>
          <p>{formData.phone}</p>
          <p>{formData.email}</p>
          <p>{formData.address}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="cc-checkout-confirmation-block"
        >
          <h3>طريقة الدفع</h3>
          <p>
            {formData.paymentMethod === 'cash' ? '💵 الدفع عند الاستلام' : 
             formData.paymentMethod === 'vodafone' ? '📱 فودافون كاش' : '💳 بطاقة ائتمان'}
          </p>
        </motion.div>
      </div>
    </>
  )
}

function OrderSummary({ items, total, shipping }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="cc-checkout-summary-card"
    >
      <h2>ملخص الطلب</h2>
      <div className="cc-checkout-summary-items">
        {items.map((item) => (
          <div key={item.id} className="cc-checkout-summary-item">
            <span>{item.name} × {item.quantity}</span>
            <span>{(item.price * item.quantity).toLocaleString('ar-EG')} ج.م</span>
          </div>
        ))}
      </div>
      <div className="cc-cart-summary-rows">
        <div className="cc-cart-summary-row">
          <span>المجموع الفرعي</span>
          <span>{total.toLocaleString('ar-EG')} ج.م</span>
        </div>
        <div className="cc-cart-summary-row">
          <span>الشحن</span>
          <span className={shipping === 0 ? 'cc-free-shipping' : ''}>
            {shipping === 0 ? 'مجاني 🎉' : `${shipping} ج.م`}
          </span>
        </div>
        <div className="cc-cart-summary-total">
          <span>الإجمالي</span>
          <span>{(total + shipping).toLocaleString('ar-EG')} ج.م</span>
        </div>
      </div>
    </motion.div>
  )
}
