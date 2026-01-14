'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send, Gift } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import toast from 'react-hot-toast'

export default function Newsletter() {
    const [email, setEmail] = useState('')
    const { theme } = useThemeStore()
    const isLight = theme === 'light'

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email) {
            toast.success('تم الاشتراك بنجاح! سنرسل لك أحدث العروض')
            setEmail('')
        }
    }

    return (
        <section className={`py-20 relative overflow-hidden ${isLight ? 'bg-white' : 'bg-gray-900'}`}>
            <div className="absolute inset-0 mesh-bg opacity-30" />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl ${isLight ? 'bg-primary/5' : 'bg-primary/10'}`} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mb-6 shadow-lg"
                    >
                        <Gift className="w-10 h-10 text-white" />
                    </motion.div>

                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                        اشترك واحصل على خصم <span className="gradient-text">10%</span>
                    </h2>
                    <p className={`mb-8 max-w-xl mx-auto ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                        اشترك في نشرتنا البريدية لتصلك أحدث العروض والمنتجات الجديدة
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="أدخل بريدك الإلكتروني"
                            className={`flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                                isLight 
                                    ? 'bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400' 
                                    : 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500'
                            }`}
                            required
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="btn-primary flex items-center justify-center gap-2"
                        >
                            <Send className="w-5 h-5" />
                            اشترك الآن
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </section>
    )
}
