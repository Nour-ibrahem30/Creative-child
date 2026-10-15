'use client'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Heart, Shield, Truck, Award, Users, Target, Sparkles, Star, Check } from 'lucide-react'

const stats = [
  { value: '٥٠٠٠+', label: 'عميل سعيد' },
  { value: '٥٠٠+', label: 'منتج متنوع' },
  { value: '٥٠+', label: 'علامة تجارية' },
  { value: '٩٩٪', label: 'رضا العملاء' },
]

const values = [
  { icon: Heart, title: 'الجودة أولاً', description: 'نختار منتجاتنا بعناية لضمان أعلى معايير الجودة والأمان', color: '#e88a9a' },
  { icon: Shield, title: 'الأمان للأطفال', description: 'جميع منتجاتنا آمنة ومعتمدة للاستخدام من قبل الأطفال', color: '#4ade80' },
  { icon: Truck, title: 'توصيل سريع', description: 'نوصل طلباتك بسرعة وأمان إلى باب منزلك', color: '#60a5fa' },
  { icon: Award, title: 'ضمان الجودة', description: 'نقدم ضمان على جميع منتجاتنا لراحة بالك', color: '#fbbf24' },
]

const team = [
  { name: 'أحمد محمد', role: 'المؤسس والمدير التنفيذي', emoji: '👨‍💼' },
  { name: 'سارة أحمد', role: 'مديرة المشتريات', emoji: '👩‍💼' },
  { name: 'محمد علي', role: 'مدير خدمة العملاء', emoji: '👨‍💻' },
]

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="cc-container cc-about">
        <HeroSection />
        <StatsSection />
        <StorySection />
        <ValuesSection />
        <TeamSection />
      </div>
      <Footer />
    </main>
  )
}

function HeroSection() {
  return (
    <section className="cc-about-hero">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="cc-about-hero-content"
      >
        <p className="cc-eyebrow">تعرف علينا</p>
        <h1>نحن الطفل المبدع</h1>
        <p className="cc-about-hero-desc">
          متجرك المفضل لألعاب الأطفال والوسائل التعليمية. نؤمن بأن اللعب هو أفضل طريقة للتعلم،
          ولذلك نقدم مجموعة متنوعة من الألعاب التي تجمع بين المتعة والتعليم.
        </p>
      </motion.div>
      <motion.div
        className="cc-about-hero-emoji"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      >
        🎯
      </motion.div>
    </section>
  )
}

function StatsSection() {
  return (
    <section className="cc-about-stats">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="cc-about-stat"
        >
          <span className="cc-about-stat-value">{stat.value}</span>
          <span className="cc-about-stat-label">{stat.label}</span>
        </motion.div>
      ))}
    </section>
  )
}

function StorySection() {
  return (
    <section className="cc-about-story">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="cc-about-story-content"
      >
        <div className="cc-about-story-block">
          <div className="cc-about-story-icon">
            <Target size={28} />
          </div>
          <h2>رسالتنا</h2>
          <p>
            نسعى لتوفير أفضل الألعاب التعليمية والترفيهية التي تساعد في تنمية مهارات الأطفال
            وتطوير قدراتهم الإبداعية والذهنية، مع الحفاظ على أعلى معايير الجودة والأمان.
          </p>
        </div>

        <div className="cc-about-story-block">
          <div className="cc-about-story-icon cc-about-story-icon-alt">
            <Users size={28} />
          </div>
          <h2>رؤيتنا</h2>
          <p>
            أن نكون الوجهة الأولى للآباء والأمهات في مصر والوطن العربي للحصول على
            ألعاب آمنة وتعليمية تساهم في بناء جيل مبدع ومتميز.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="cc-about-story-image"
      >
        <div className="cc-about-story-emoji">🎨</div>
        <div className="cc-about-story-features">
          {['ألعاب تعليمية متنوعة', 'منتجات آمنة ١٠٠٪', 'توصيل لكل المحافظات', 'دعم فني متواصل'].map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="cc-about-feature"
            >
              <Check size={18} />
              <span>{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function ValuesSection() {
  return (
    <section className="cc-about-values">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="cc-about-values-header"
      >
        <p className="cc-eyebrow">
          <Sparkles size={16} className="inline ml-2" />
          قيمنا
        </p>
        <h2>المبادئ التي نعمل بها كل يوم</h2>
      </motion.div>

      <div className="cc-about-values-grid">
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="cc-about-value-card"
          >
            <motion.div
              className="cc-about-value-icon"
              style={{ backgroundColor: `${value.color}20`, color: value.color }}
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <value.icon size={28} />
            </motion.div>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function TeamSection() {
  return (
    <section className="cc-about-team">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="cc-about-team-header"
      >
        <p className="cc-eyebrow">فريقنا</p>
        <h2>الفريق اللي بيخدمكم</h2>
      </motion.div>

      <div className="cc-about-team-grid">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="cc-about-team-card"
          >
            <motion.div
              className="cc-about-team-avatar"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {member.emoji}
            </motion.div>
            <h3>{member.name}</h3>
            <span>{member.role}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
