'use client'
import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="cc-loading-page">
      <div className="cc-loading-content">
        {/* Logo Animation */}
        <motion.div
          className="cc-loading-logo"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <motion.div
            className="cc-loading-icon"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🧸
          </motion.div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          className="cc-loading-brand"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          الطفل المبدع
        </motion.h1>

        {/* Loading Dots */}
        <div className="cc-loading-dots">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="cc-loading-dot"
              initial={{ opacity: 0.3, scale: 0.8 }}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <motion.p
          className="cc-loading-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          جاري تحضير المفاجآت...
        </motion.p>
      </div>

      {/* Background Decorations */}
      <div className="cc-loading-decorations">
        {['🎈', '⭐', '🎨', '🚀', '🎁', '🌈'].map((emoji, i) => (
          <motion.span
            key={i}
            className="cc-loading-decoration"
            style={{
              left: `${15 + (i % 3) * 35}%`,
              top: `${20 + Math.floor(i / 3) * 50}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [0.8, 1.2, 0.8],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
