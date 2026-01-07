'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send, Gift } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Newsletter() {
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email) {
            toast.success('تم الاشتراك بنجاح! سنرسل لك أحدث العروض')
            setEmail('')
        }
    }

    return (
        <section className="py-20 bg-gradient-to-r from-dark via-dark-lighter to-dark relative overflow-hidden">
            <div className="absolute inset-0 mesh-bg opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
            
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
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mb-6 shadow-glow-primary"
                    >
                        <Gift className="w-10 h-10 text-white" />
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        اشترك واحصل على خصم <span className="gradient-text">10%</span>
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        اشترك في نشرتنا البريدية لتصلك أحدث العروض والمنتجات الجديدة
                    </p>

                    <NewsletterForm email={email} setEmail={setEmail} handleSubmit={handleSubmit} />
                </motion.div>
            </div>
        </section>
    )
}


function NewsletterForm({ email, setEmail, handleSubmit }) {
    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-6 py-4 rounded-full glass-effect border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                required
            />
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn-primary flex items-center justify-center gap-2 shadow-glow-primary"
            >
                <Send className="w-5 h-5" />
                اشترك الآن
            </motion.button>
        </form>
    )
}
