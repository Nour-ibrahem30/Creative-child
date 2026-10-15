'use client'
import Link from "next/link";
import { ArrowLeft, Sparkle } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="cc-hero">
      <motion.div 
        className="cc-hero-photo"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src="/images/design/hero.png"
          alt="مكعبات بناء ملونة وقوس قزح وسيارة من الخشب"
          fetchPriority="high"
        />
      </motion.div>
      <div className="cc-container cc-hero-inner">
        <div className="cc-hero-copy">
          <motion.p 
            className="cc-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            اللعب بداية كل اكتشاف
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            ألعاب صغيرة،
            <br />
            <span>اكتشافات كبيرة.</span>
          </motion.h1>
          <motion.p 
            className="cc-hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            اختار لطفلك لعبة تنمّي خياله، وتخلّي كل يوم حكاية جديدة.
          </motion.p>
          <motion.div 
            className="cc-hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link className="cc-button" href="/products">
                اكتشف الألعاب <ArrowLeft size={20} />
              </Link>
            </motion.div>
            <Link className="cc-text-link" href="#ages">
              اختار حسب العمر
            </Link>
          </motion.div>
          <motion.p 
            className="cc-hero-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            ألعاب تعليمية <span>•</span> اختيار يناسب عمر طفلك
          </motion.p>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, rotate: -180, scale: 0 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 1, type: "spring" }}
      >
        <Sparkle className="cc-hero-star" size={40} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
