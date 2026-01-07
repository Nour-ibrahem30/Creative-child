'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, User, Phone, Package } from 'lucide-react'
import toast from 'react-hot-toast'

export default function RegisterPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            toast.error('كلمات المرور غير متطابقة')
            return
        }
        toast.success('تم إنشاء الحساب بنجاح!')
        router.push('/auth/login')
    }

    return (
        <main className="min-h-screen bg-dark flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 mesh-bg opacity-50" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />

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
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-white mb-2">إنشاء حساب جديد ✨</h1>
                        <p className="text-gray-400">انضم إلينا واستمتع بأفضل العروض</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputField
                            label="الاسم الكامل"
                            icon={User}
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="أدخل اسمك"
                        />
                        <InputField
                            label="البريد الإلكتروني"
                            icon={Mail}
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="example@email.com"
                        />
                        <InputField
                            label="رقم الهاتف"
                            icon={Phone}
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="01xxxxxxxxx"
                        />
                        <PasswordField
                            label="كلمة المرور"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />
                        <InputField
                            label="تأكيد كلمة المرور"
                            icon={Lock}
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            placeholder="••••••••"
                        />

                        <label className="flex items-start gap-2 cursor-pointer pt-2">
                            <input type="checkbox" required className="accent-primary w-4 h-4 mt-1" />
                            <span className="text-sm text-gray-400">
                                أوافق على{' '}
                                <Link href="/terms" className="text-primary hover:text-secondary">الشروط والأحكام</Link>
                                {' '}و{' '}
                                <Link href="/privacy" className="text-primary hover:text-secondary">سياسة الخصوصية</Link>
                            </span>
                        </label>

                        <motion.button 
                            type="submit" 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-primary w-full py-3 shadow-glow-primary"
                        >
                            إنشاء الحساب
                        </motion.button>
                    </form>

                    <div className="mt-6 text-center">
                        <span className="text-gray-500">لديك حساب بالفعل؟ </span>
                        <Link href="/auth/login" className="text-primary font-medium hover:text-secondary transition-colors">
                            سجل دخولك
                        </Link>
                    </div>
                </div>
            </motion.div>
        </main>
    )
}


function InputField({ label, icon: Icon, type, value, onChange, placeholder }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
            <div className="relative">
                <Icon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    required
                    className="w-full pr-12 pl-4 py-3 glass-effect border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}

function PasswordField({ label, value, onChange, showPassword, setShowPassword }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
            <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
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
    )
}
