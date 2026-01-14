'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore()

    useEffect(() => {
        // Apply theme to body
        document.body.classList.remove('light', 'dark')
        document.body.classList.add(theme)
    }, [theme])

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`relative p-2.5 rounded-xl transition-all duration-300 ${
                theme === 'light' 
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                    : 'bg-white/5 hover:bg-white/10 text-gray-300'
            }`}
            title={theme === 'light' ? 'تفعيل الوضع الداكن' : 'تفعيل الوضع الفاتح'}
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'light' ? 0 : 180 }}
                transition={{ duration: 0.3 }}
            >
                {theme === 'light' ? (
                    <Moon className="w-5 h-5" />
                ) : (
                    <Sun className="w-5 h-5" />
                )}
            </motion.div>
        </motion.button>
    )
}
