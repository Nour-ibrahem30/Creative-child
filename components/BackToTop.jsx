'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false)
    const { theme } = useThemeStore()
    const isLight = theme === 'light'

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 400)
        }
        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className={`fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                        isLight 
                            ? 'bg-primary text-white shadow-primary/30 hover:bg-primary/90' 
                            : 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-primary/30'
                    }`}
                    aria-label="العودة للأعلى"
                >
                    <ArrowUp className="w-5 h-5" />
                </motion.button>
            )}
        </AnimatePresence>
    )
}
