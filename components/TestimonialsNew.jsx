'use client'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'سارة أحمد',
    role: 'أم لطفلين',
    content: 'ابني بيحب المكعبات جدًا! الجودة ممتازة والألوان زاهية. شكرًا على الخدمة الرائعة.',
    rating: 5,
    avatar: '👩',
  },
  {
    id: 2,
    name: 'محمد علي',
    role: 'أب لثلاثة أطفال',
    content: 'أفضل متجر للألعاب التعليمية. الأسعار مناسبة والتوصيل سريع جدًا.',
    rating: 5,
    avatar: '👨',
  },
  {
    id: 3,
    name: 'فاطمة محمود',
    role: 'معلمة روضة',
    content: 'بشتري منهم للروضة. المنتجات آمنة ومفيدة للأطفال. أنصح كل الأمهات بيهم.',
    rating: 5,
    avatar: '👩‍🏫',
  },
]

export default function TestimonialsNew() {
  return (
    <section className="cc-testimonials">
      <div className="cc-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="cc-testimonials-header"
        >
          <p className="cc-eyebrow">آراء العملاء</p>
          <h2>كلام من قلب الأمهات والآباء</h2>
        </motion.div>

        <div className="cc-testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="cc-testimonial-card"
            >
              <motion.div
                className="cc-quote-icon"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.2, type: 'spring' }}
              >
                <Quote size={24} />
              </motion.div>

              <div className="cc-testimonial-stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + i * 0.05 }}
                  >
                    <Star size={18} fill="#d97c40" color="#d97c40" />
                  </motion.div>
                ))}
              </div>

              <p className="cc-testimonial-content">{testimonial.content}</p>

              <div className="cc-testimonial-author">
                <span className="cc-testimonial-avatar">{testimonial.avatar}</span>
                <div>
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
