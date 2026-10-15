'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Sparkle, Star, Heart } from 'lucide-react'

export default function HeroAnimated() {
  return (
    <section className="cc-hero">
      <div className="cc-hero-photo">
        <motion.img
          src="/images/design/hero.png"
          alt="مكعبات بناء ملونة وقوس قزح وسيارة من الخشب"
          fetchPriority="high"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
      
      <div className="cc-container cc-hero-inner">
        <div className="cc-hero-copy">
          <motion.p
            className="cc-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            اللعب بداية كل اكتشاف
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            ألعاب صغيرة،
            <br />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              اكتشافات كبيرة.
            </motion.span>
          </motion.h1>
          
          <motion.p
            className="cc-hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            اختار لطفلك لعبة تنمّي خياله، وتخلّي كل يوم حكاية جديدة.
          </motion.p>
          
          <motion.div
            className="cc-hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link className="cc-button" href="/products">
                اكتشف الألعاب <ArrowLeft size={20} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ x: -5 }}>
              <Link className="cc-text-link" href="#ages">
                اختار حسب العمر
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.p
            className="cc-hero-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            ألعاب تعليمية <span>•</span> اختيار يناسب عمر طفلك
          </motion.p>
        </div>
      </div>
      
      <motion.div
        className="cc-hero-star"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          scale: { duration: 2, repeat: Infinity }
        }}
      >
        <Sparkle size={40} strokeWidth={1.5} />
      </motion.div>

      {/* Floating decorations */}
      <motion.div
        className="cc-hero-float cc-hero-float-1"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Star size={24} fill="#d97c40" color="#d97c40" />
      </motion.div>
      
      <motion.div
        className="cc-hero-float cc-hero-float-2"
        animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart size={20} fill="#e88a9a" color="#e88a9a" />
      </motion.div>
    </section>
  )
}
