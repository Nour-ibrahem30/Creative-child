'use client'
import { motion } from 'framer-motion'
import { Shield, Truck, HeadphonesIcon, Award, Sparkles, Heart } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'آمنة ١٠٠٪',
    description: 'كل لعبة مختارة بعناية، من مواد آمنة ومعتمدة دوليًا.',
    color: '#4ade80',
  },
  {
    icon: Truck,
    title: 'توصيل سريع',
    description: 'نوصّل لباب بيتك، وشحن مجاني للطلبات فوق ٥٠٠ جنيه.',
    color: '#60a5fa',
  },
  {
    icon: HeadphonesIcon,
    title: 'دعم متواصل',
    description: 'فريقنا جاهز يساعدك تختار اللعبة المناسبة لطفلك.',
    color: '#f472b6',
  },
  {
    icon: Award,
    title: 'ضمان الجودة',
    description: 'استبدال مجاني لأي منتج فيه عيب صناعة.',
    color: '#fbbf24',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="cc-why-us">
      <div className="cc-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="cc-why-header"
        >
          <p className="cc-eyebrow">ليه الطفل المبدع؟</p>
          <h2>لأن أطفالكم يستاهلوا الأفضل.</h2>
        </motion.div>

        <div className="cc-why-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="cc-why-card"
            >
              <motion.div
                className="cc-why-icon"
                style={{ backgroundColor: `${feature.color}20`, color: feature.color }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <feature.icon size={28} strokeWidth={1.5} />
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
