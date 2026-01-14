'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'

export default function SpecialOffer() {
    const { theme } = useThemeStore()
    const isLight = theme === 'light'
    
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 15,
        minutes: 30,
        seconds: 45,
    })

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { days, hours, minutes, seconds } = prev
                seconds--
                if (seconds < 0) { seconds = 59; minutes-- }
                if (minutes < 0) { minutes = 59; hours-- }
                if (hours < 0) { hours = 23; days-- }
                if (days < 0) { days = 0; hours = 0; minutes = 0; seconds = 0 }
                return { days, hours, minutes, seconds }
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const TimeBox = ({ value, label }) => (
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 min-w-[80px] border border-white/30">
            <div className="text-3xl md:text-4xl font-bold text-white">{String(value).padStart(2, '0')}</div>
            <div className="text-sm text-white/80">{label}</div>
        </div>
    )

    return (
        <section className={`py-20 ${isLight ? 'bg-gray-50' : 'bg-gray-900'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-primary via-purple-600 to-secondary p-8 md:p-16 shadow-2xl"
                >
                    {/* Background */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-10 right-10 text-9xl">🎁</div>
                        <div className="absolute bottom-10 left-10 text-9xl">🎉</div>
                    </div>

                    <div className="relative grid md:grid-cols-2 gap-8 items-center">
                        <div className="text-white text-center md:text-right">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/30"
                            >
                                عرض محدود 🔥
                            </motion.span>

                            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                خصم يصل إلى 50%
                            </h2>
                            <p className="text-lg opacity-90 mb-8">
                                على جميع الألعاب التعليمية والوسائل التعليمية
                                <br />
                                لا تفوت الفرصة!
                            </p>

                            <div className="flex justify-center md:justify-start gap-3 mb-8">
                                <TimeBox value={timeLeft.days} label="يوم" />
                                <TimeBox value={timeLeft.hours} label="ساعة" />
                                <TimeBox value={timeLeft.minutes} label="دقيقة" />
                                <TimeBox value={timeLeft.seconds} label="ثانية" />
                            </div>

                            <Link
                                href="/offers"
                                className="inline-block bg-white text-primary px-8 py-4 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all"
                            >
                                تسوق العروض الآن
                            </Link>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="hidden md:flex justify-center"
                        >
                            <div className="relative">
                                <motion.div
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="text-[200px]"
                                    style={{ filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.3))' }}
                                >
                                    🎁
                                </motion.div>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                    className="absolute -top-10 -right-10 text-6xl"
                                >
                                    ⭐
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
