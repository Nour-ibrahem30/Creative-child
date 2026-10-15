'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send, Gift, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

export default function NewsletterNew() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    toast.success('تم الاشتراك بنجاح! سنرسل لك أحدث العروض')
    setEmail('')
    setIsSubmitting(false)
  }

  return (
    <section className="cc-newsletter">
      <div className="cc-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="cc-newsletter-inner"
        >
          <motion.div
            className="cc-newsletter-icon"
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Gift size={40} />
          </motion.div>

          <h2>اشترك واحصل على خصم <span>١٠٪</span></h2>
          <p>كن أول من يعرف عن العروض الجديدة والألعاب الحصرية</p>

          <form onSubmit={handleSubmit} className="cc-newsletter-form">
            <div className="cc-newsletter-input-wrapper">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني"
                required
                disabled={isSubmitting}
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
                    اشترك الآن
                    <Send size={18} />
                  </>
                )}
              </motion.button>
            </div>
          </form>

          <motion.div
            className="cc-newsletter-decoration"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
