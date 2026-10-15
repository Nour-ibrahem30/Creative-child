'use client'
import Link from "next/link";
import { motion } from "framer-motion";

export default function Brand() {
  return (
    <Link href="/" className="cc-brand" aria-label="الطفل المبدع - الرئيسية">
      <motion.div 
        className="cc-brand-icon"
        whileHover={{ rotate: [-5, 5, -5, 0], scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <span className="brand-emoji">🧸</span>
        <span className="brand-sparkle">✨</span>
      </motion.div>
      <span className="cc-brand-text">
        <strong>الطفل المبدع</strong>
        <small>عالم الإبداع والخيال</small>
      </span>
    </Link>
  );
}
