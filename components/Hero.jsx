'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, Gift, Truck, Shield } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'

export default function Hero() {
    const { theme } = useThemeStore()
    const isLight = theme === 'light'

    const features = [
        { icon: Truck, text: 'توصيل مجاني', color: 'from-cyan-400 to-cyan-600' },
        { icon: Shield, text: 'ضمان الجودة', color: 'from-emerald-400 to-emerald-600' },
        { icon: Gift, text: 'هدايا مميزة', color: 'from-purple-400 to-purple-600' },
    ]

    return (
        <section className={`relative min-h-screen overflow-hidden ${isLight ? 'bg-gradient-to-br from-white via-purple-50/30 to-cyan-50/30' : 'bg-gray-900'}`}>
            {/* Mesh Background */}
            <div className="absolute inset-0 mesh-bg opacity-50" />
            
            {/* Animated Glow Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${isLight ? 'bg-primary/10' : 'bg-primary/20'}`} />
                <div className={`absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${isLight ? 'bg-secondary/10' : 'bg-secondary/20'}`} />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                            background: i % 2 === 0 ? '#8B5CF6' : '#06B6D4',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            boxShadow: i % 2 === 0 ? '0 0 20px #8B5CF6' : '0 0 20px #06B6D4',
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-right"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border ${
                                isLight 
                                    ? 'bg-white shadow-md border-primary/20' 
                                    : 'bg-gray-800/50 border-primary/30'
                            }`}
                        >
                            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                            <span className="font-medium text-primary">عروض حصرية تصل إلى 50%</span>
                        </motion.div>

                        <h1 className={`text-4xl md:text-6xl font-bold leading-tight mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                            عالم من{' '}
                            <span className="gradient-text">المرح والتعلم</span>
                            <br />
                            <span className='mt-3'>لأطفالك</span>
                        </h1>

                        <p className={`text-lg mb-8 max-w-lg mx-auto lg:mx-0 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                            اكتشف مجموعة واسعة من الألعاب التعليمية والترفيهية التي تنمي مهارات طفلك وتجعل التعلم متعة لا تنتهي
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/products" className="btn-primary text-lg px-8 py-4">
                                تسوق الآن
                            </Link>
                            <Link
                                href="/categories"
                                className={`px-8 py-4 border-2 rounded-full font-semibold transition-all ${
                                    isLight 
                                        ? 'border-gray-300 text-gray-700 hover:border-primary hover:text-primary bg-white shadow-sm' 
                                        : 'border-gray-600 text-white hover:border-primary hover:text-primary'
                                }`}
                            >
                                تصفح الأقسام
                            </Link>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-12">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                                        isLight 
                                            ? 'bg-white shadow-md border border-gray-100' 
                                            : 'bg-gray-800/50 border border-gray-700'
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}>
                                        <feature.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <span className={`font-medium ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{feature.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            {/* Decorative circles */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className={`absolute inset-0 border-4 border-dashed rounded-full ${isLight ? 'border-primary/20' : 'border-primary/30'}`}
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                                className={`absolute inset-8 border-4 border-dashed rounded-full ${isLight ? 'border-secondary/20' : 'border-secondary/30'}`}
                            />

                            {/* Main Image Container */}
                            <div className={`absolute inset-16 rounded-full flex items-center justify-center ${
                                isLight 
                                    ? 'bg-gradient-to-br from-primary/10 to-secondary/10 shadow-2xl border border-white' 
                                    : 'bg-gradient-to-br from-primary/20 to-secondary/20'
                            }`}>
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="text-8xl filter drop-shadow-2xl"
                                >
                                    🧸
                                </motion.div>
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute top-10 right-10 text-5xl filter drop-shadow-lg"
                            >
                                🎨
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity }}
                                className="absolute bottom-20 left-10 text-5xl"
                            >
                                🎮
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="absolute top-1/2 left-0 text-4xl"
                            >
                                📚
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Wave Divider */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                        fill={isLight ? '#ffffff' : '#111827'}
                    />
                </svg>
            </div>
        </section>
    )
}
