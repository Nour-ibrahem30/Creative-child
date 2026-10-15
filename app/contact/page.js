'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Facebook, Instagram, Twitter } from 'lucide-react'
import toast from 'react-hot-toast'
import { siteConfig } from '@/lib/seo'

const contactInfo = [
  { icon: Phone, title: 'الهاتف', value: siteConfig.contact.phone, href: 'tel:' + siteConfig.contact.phone.replace(/\s/g, '') },
  { icon: Phone, title: 'هاتف آخر', value: siteConfig.contact.phone2, href: 'tel:' + siteConfig.contact.phone2.replace(/\s/g, '') },
  { icon: Mail, title: 'البريد الإلكتروني', value: siteConfig.contact.email, href: 'mailto:' + siteConfig.contact.email },
  { icon: MapPin, title: 'العنوان', value: 'القاهرة، مصر', href: '#' },
  { icon: Clock, title: 'ساعات العمل', value: 'السبت - الخميس: ٩ص - ٩م', href: '#' },
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook', color: '#1877f2' },
  { icon: Instagram, href: '#', label: 'Instagram', color: '#e4405f' },
  { icon: Twitter, href: '#', label: 'Twitter', color: '#1da1f2' },
  { icon: MessageCircle, href: 'https://wa.me/20111319087', label: 'WhatsApp', color: '#25d366' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <main>
      <Navbar />
      <div className="cc-container cc-contact">
        <PageHeader />
        <div className="cc-contact-grid">
          <ContactInfoCard />
          <ContactForm 
            formData={formData} 
            setFormData={setFormData} 
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
        <FAQSection />
      </div>
      <Footer />
    </main>
  )
}

function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cc-contact-header"
    >
      <p className="cc-eyebrow">نحب نسمع منك</p>
      <h1>تواصل معنا</h1>
      <p>نحن هنا لمساعدتك! تواصل معنا لأي استفسار أو اقتراح</p>
    </motion.div>
  )
}

function ContactInfoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="cc-contact-info"
    >
      <h2>معلومات التواصل</h2>
      
      <div className="cc-contact-info-list">
        {contactInfo.map((info, index) => (
          <motion.a
            key={index}
            href={info.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: -5 }}
            className="cc-contact-info-item"
          >
            <div className="cc-contact-info-icon">
              <info.icon size={20} />
            </div>
            <div>
              <h3>{info.title}</h3>
              <p>{info.value}</p>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="cc-contact-social">
        <h3>تابعنا على</h3>
        <div className="cc-contact-social-links">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.15, backgroundColor: social.color, color: '#fff' }}
              className="cc-contact-social-link"
              aria-label={social.label}
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ContactForm({ formData, setFormData, handleSubmit, isSubmitting }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="cc-contact-form-wrapper"
    >
      <form onSubmit={handleSubmit} className="cc-contact-form">
        <h2>أرسل لنا رسالة</h2>

        <div className="cc-contact-form-row">
          <div className="cc-contact-form-group">
            <label>الاسم</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="أدخل اسمك"
            />
          </div>
          <div className="cc-contact-form-group">
            <label>البريد الإلكتروني</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="example@email.com"
            />
          </div>
        </div>

        <div className="cc-contact-form-row">
          <div className="cc-contact-form-group">
            <label>رقم الهاتف</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="01xxxxxxxxx"
            />
          </div>
          <div className="cc-contact-form-group">
            <label>الموضوع</label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            >
              <option value="">اختر الموضوع</option>
              <option value="inquiry">استفسار عام</option>
              <option value="order">استفسار عن طلب</option>
              <option value="complaint">شكوى</option>
              <option value="suggestion">اقتراح</option>
            </select>
          </div>
        </div>

        <div className="cc-contact-form-group">
          <label>الرسالة</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={5}
            placeholder="اكتب رسالتك هنا..."
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="cc-button cc-contact-submit"
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
              <Send size={18} />
              إرسال الرسالة
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}

function FAQSection() {
  const faqs = [
    { q: 'ما هي طرق الدفع المتاحة؟', a: 'نقبل الدفع عند الاستلام، فودافون كاش، والبطاقات الائتمانية.' },
    { q: 'كم يستغرق التوصيل؟', a: 'التوصيل داخل القاهرة والجيزة خلال ٢-٣ أيام عمل، والمحافظات الأخرى ٥-٧ أيام.' },
    { q: 'هل يمكن استبدال أو إرجاع المنتج؟', a: 'نعم، يمكنك الاستبدال أو الإرجاع خلال ١٤ يوم من الاستلام بشرط أن يكون المنتج في حالته الأصلية.' },
    { q: 'هل المنتجات آمنة للأطفال؟', a: 'نعم، جميع منتجاتنا مختارة بعناية ومعتمدة دوليًا وآمنة ١٠٠٪ للأطفال.' },
  ]

  return (
    <section className="cc-contact-faq">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="cc-contact-faq-header"
      >
        <p className="cc-eyebrow">أسئلة شائعة</p>
        <h2>الأسئلة الأكثر تكرارًا</h2>
      </motion.div>

      <div className="cc-contact-faq-grid">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="cc-contact-faq-item"
          >
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
