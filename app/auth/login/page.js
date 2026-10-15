'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, Sparkles, Star } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/store/authStore'

export default function LoginPage() {
    const router = useRouter()
    const { login } = useAuthStore()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ email: '', password: '' })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        const result = login(formData.email, formData.password)
        
        if (result.success) {
            toast.success('تم تسجيل الدخول بنجاح!')
            router.push('/dashboard')
        } else {
            toast.error(result.error)
        }
        
        setLoading(false)
    }

    return (
        <main className="auth-page">
            {/* Decorative Elements */}
            <div className="auth-decoration">
                <motion.div 
                    className="auth-circle auth-circle-1"
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                    className="auth-circle auth-circle-2"
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                    className="auth-circle auth-circle-3"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="auth-container"
            >
                {/* Enhanced Logo */}
                <Link href="/" className="auth-logo">
                    <motion.div 
                        className="auth-logo-icon"
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="logo-emoji">🧸</span>
                        <motion.span 
                            className="logo-sparkle logo-sparkle-1"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            ✨
                        </motion.span>
                        <motion.span 
                            className="logo-sparkle logo-sparkle-2"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                        >
                            ⭐
                        </motion.span>
                    </motion.div>
                    <div className="auth-logo-text">
                        <span className="auth-logo-title">الطفل المبدع</span>
                        <span className="auth-logo-subtitle">عالم من الخيال والإبداع</span>
                    </div>
                </Link>

                {/* Login Card */}
                <motion.div 
                    className="auth-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <div className="auth-card-header">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                            className="auth-welcome-icon"
                        >
                            👋
                        </motion.div>
                        <h1>مرحباً بعودتك!</h1>
                        <p>سجل دخولك للوصول للوحة التحكم</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="auth-field">
                            <label>البريد الإلكتروني</label>
                            <div className="auth-input-wrapper">
                                <Mail className="auth-input-icon" size={20} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    placeholder="example@email.com"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label>كلمة المرور</label>
                            <div className="auth-input-wrapper">
                                <Lock className="auth-input-icon" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    placeholder="••••••••"
                                    dir="ltr"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="auth-toggle-password"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="auth-options">
                            <label className="auth-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                <span>تذكرني</span>
                            </label>
                        </div>

                        <motion.button 
                            type="submit" 
                            className="auth-submit"
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(33, 78, 61, 0.3)" }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="auth-loading">
                                    <span className="auth-spinner"></span>
                                    جاري تسجيل الدخول...
                                </span>
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    تسجيل الدخول
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className="auth-footer">
                        <Link href="/" className="auth-back-link">
                            ← العودة للرئيسية
                        </Link>
                    </div>
                </motion.div>

                {/* Fun decorative toys */}
                <div className="auth-toys">
                    <motion.span 
                        className="auth-toy auth-toy-1"
                        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        🎨
                    </motion.span>
                    <motion.span 
                        className="auth-toy auth-toy-2"
                        animate={{ y: [0, -15, 0], rotate: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    >
                        🧩
                    </motion.span>
                    <motion.span 
                        className="auth-toy auth-toy-3"
                        animate={{ y: [0, -8, 0], rotate: [0, 20, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                    >
                        🎯
                    </motion.span>
                </div>
            </motion.div>
        </main>
    )
}
