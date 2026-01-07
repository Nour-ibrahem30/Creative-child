'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, Package, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LoginPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({ email: '', password: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        toast.success('تم تسجيل الدخول بنجاح!')
        router.push('/')
    }

    return (
        <main className="min-h-screen bg-dark flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 mesh-bg opacity-50" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-glow-primary">
                        <Package className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-3xl font-bold gradient-text">الطفل المبدع</span>
                </Link>

                <div className="glass-card rounded-3xl p-8 border border-gray-800">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">مرحباً بعودتك! 👋</h1>
                        <p className="text-gray-400">سجل دخولك للمتابعة</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">البريد الإلكتروني</label>
                            <div className="relative">
                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full pr-12 pl-4 py-3 glass-effect border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                                    placeholder="example@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">كلمة المرور</label>
                            <div className="relative">
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    className="w-full pr-12 pl-12 py-3 glass-effect border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="accent-primary w-4 h-4" />
                                <span className="text-sm text-gray-400">تذكرني</span>
                            </label>
                            <Link href="/auth/forgot-password" className="text-sm text-primary hover:text-secondary transition-colors">
                                نسيت كلمة المرور؟
                            </Link>
                        </div>

                        <motion.button 
                            type="submit" 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-primary w-full py-3 shadow-glow-primary"
                        >
                            تسجيل الدخول
                        </motion.button>
                    </form>

                    <div className="mt-6 text-center">
                        <span className="text-gray-500">ليس لديك حساب؟ </span>
                        <Link href="/auth/register" className="text-primary font-medium hover:text-secondary transition-colors">
                            سجل الآن
                        </Link>
                    </div>
                </div>
            </motion.div>
        </main>
    )
}
