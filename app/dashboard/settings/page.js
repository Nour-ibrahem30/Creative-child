'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { Sidebar } from '../page'
import { 
    Menu, Save, User, Mail, Phone, Lock, Eye, EyeOff,
    Store, Bell, Shield, Palette, Globe, Camera
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingsPage() {
    const router = useRouter()
    const { isAuthenticated, user, updateUser } = useAuthStore()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('profile')
    const [showPassword, setShowPassword] = useState(false)
    const [saving, setSaving] = useState(false)

    // Form states
    const [profileForm, setProfileForm] = useState({
        name: '',
        email: '',
        phone: ''
    })

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [storeForm, setStoreForm] = useState({
        storeName: 'الطفل المبدع',
        storeEmail: 'info@creativechild.com',
        storePhone: '01000000000',
        currency: 'EGP',
        language: 'ar'
    })

    const [notificationSettings, setNotificationSettings] = useState({
        orderNotifications: true,
        stockAlerts: true,
        emailUpdates: false,
        smsNotifications: true
    })

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/login')
        } else if (user) {
            setProfileForm({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || ''
            })
        }
    }, [isAuthenticated, user, router])

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="text-white">جاري التحميل...</div>
            </div>
        )
    }

    const tabs = [
        { id: 'profile', label: 'الملف الشخصي', icon: User },
        { id: 'store', label: 'إعدادات المتجر', icon: Store },
        { id: 'notifications', label: 'الإشعارات', icon: Bell },
        { id: 'security', label: 'الأمان', icon: Shield }
    ]

    const handleProfileSave = async () => {
        setSaving(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (updateUser) {
            updateUser(profileForm)
        }
        toast.success('تم حفظ التغييرات بنجاح')
        setSaving(false)
    }

    const handlePasswordChange = async () => {
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error('كلمات المرور غير متطابقة')
            return
        }
        if (passwordForm.newPassword.length < 6) {
            toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
            return
        }
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast.success('تم تغيير كلمة المرور بنجاح')
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
        setSaving(false)
    }

    const handleStoreSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast.success('تم حفظ إعدادات المتجر')
        setSaving(false)
    }

    const handleNotificationsSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast.success('تم حفظ إعدادات الإشعارات')
        setSaving(false)
    }

    return (
        <div className="min-h-screen bg-dark flex">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} currentPath="/dashboard/settings" user={user} />
            
            <div className="flex-1 lg:mr-64">
                <header className="glass-effect border-b border-gray-800 px-6 py-4 sticky top-0 z-30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400">
                                <Menu className="w-6 h-6" />
                            </button>
                            <h1 className="text-xl font-bold text-white">الإعدادات</h1>
                        </div>
                    </div>
                </header>

                <main className="p-6">
                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                                        activeTab === tab.id
                                            ? 'bg-gradient-to-r from-primary to-purple-600 text-white'
                                            : 'glass-effect text-gray-400 hover:text-white hover:bg-gray-800'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            )
                        })}
                    </div>

                    {/* Profile Settings */}
                    {activeTab === 'profile' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card rounded-2xl p-6 border border-gray-800"
                        >
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-primary" />
                                الملف الشخصي
                            </h2>

                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Avatar */}
                                <div className="flex flex-col items-center">
                                    <div className="relative">
                                        <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-3xl font-bold">
                                            {profileForm.name?.charAt(0) || 'A'}
                                        </div>
                                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800 border-2 border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                                            <Camera className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-gray-500 text-sm mt-2">تغيير الصورة</p>
                                </div>

                                {/* Form */}
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <label className="block text-gray-400 mb-2">الاسم الكامل</label>
                                        <div className="relative">
                                            <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="text"
                                                value={profileForm.name}
                                                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                                className="w-full pr-12 pl-4 py-3 input-dark"
                                                placeholder="أدخل اسمك"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-400 mb-2">البريد الإلكتروني</label>
                                        <div className="relative">
                                            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="email"
                                                value={profileForm.email}
                                                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                                className="w-full pr-12 pl-4 py-3 input-dark"
                                                placeholder="example@email.com"
                                                dir="ltr"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-400 mb-2">رقم الهاتف</label>
                                        <div className="relative">
                                            <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="tel"
                                                value={profileForm.phone}
                                                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                                className="w-full pr-12 pl-4 py-3 input-dark"
                                                placeholder="01xxxxxxxxx"
                                                dir="ltr"
                                            />
                                        </div>
                                    </div>

                                    <motion.button
                                        onClick={handleProfileSave}
                                        disabled={saving}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="btn-primary flex items-center gap-2 disabled:opacity-50"
                                    >
                                        <Save className="w-5 h-5" />
                                        {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Store Settings */}
                    {activeTab === 'store' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card rounded-2xl p-6 border border-gray-800"
                        >
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Store className="w-5 h-5 text-primary" />
                                إعدادات المتجر
                            </h2>

                            <div className="grid gap-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-400 mb-2">اسم المتجر</label>
                                        <input
                                            type="text"
                                            value={storeForm.storeName}
                                            onChange={(e) => setStoreForm({ ...storeForm, storeName: e.target.value })}
                                            className="w-full input-dark"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 mb-2">البريد الإلكتروني للمتجر</label>
                                        <input
                                            type="email"
                                            value={storeForm.storeEmail}
                                            onChange={(e) => setStoreForm({ ...storeForm, storeEmail: e.target.value })}
                                            className="w-full input-dark"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-400 mb-2">رقم هاتف المتجر</label>
                                        <input
                                            type="tel"
                                            value={storeForm.storePhone}
                                            onChange={(e) => setStoreForm({ ...storeForm, storePhone: e.target.value })}
                                            className="w-full input-dark"
                                            dir="ltr"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 mb-2">العملة</label>
                                        <select
                                            value={storeForm.currency}
                                            onChange={(e) => setStoreForm({ ...storeForm, currency: e.target.value })}
                                            className="w-full input-dark"
                                        >
                                            <option value="EGP">جنيه مصري (ج.م)</option>
                                            <option value="USD">دولار أمريكي ($)</option>
                                            <option value="SAR">ريال سعودي (ر.س)</option>
                                            <option value="AED">درهم إماراتي (د.إ)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-400 mb-2">لغة المتجر</label>
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-gray-500" />
                                        <select
                                            value={storeForm.language}
                                            onChange={(e) => setStoreForm({ ...storeForm, language: e.target.value })}
                                            className="flex-1 input-dark"
                                        >
                                            <option value="ar">العربية</option>
                                            <option value="en">English</option>
                                        </select>
                                    </div>
                                </div>

                                <motion.button
                                    onClick={handleStoreSave}
                                    disabled={saving}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-primary flex items-center gap-2 w-fit disabled:opacity-50"
                                >
                                    <Save className="w-5 h-5" />
                                    {saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Notifications Settings */}
                    {activeTab === 'notifications' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card rounded-2xl p-6 border border-gray-800"
                        >
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Bell className="w-5 h-5 text-primary" />
                                إعدادات الإشعارات
                            </h2>

                            <div className="space-y-4">
                                {[
                                    { key: 'orderNotifications', label: 'إشعارات الطلبات الجديدة', desc: 'استلام إشعار عند وصول طلب جديد' },
                                    { key: 'stockAlerts', label: 'تنبيهات المخزون', desc: 'إشعار عند انخفاض مخزون منتج معين' },
                                    { key: 'emailUpdates', label: 'تحديثات البريد الإلكتروني', desc: 'استلام تقارير أسبوعية على البريد' },
                                    { key: 'smsNotifications', label: 'إشعارات SMS', desc: 'استلام رسائل نصية للطلبات المهمة' }
                                ].map((item) => (
                                    <div key={item.key} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl">
                                        <div>
                                            <p className="text-white font-medium">{item.label}</p>
                                            <p className="text-gray-500 text-sm">{item.desc}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings[item.key]}
                                                onChange={(e) => setNotificationSettings({
                                                    ...notificationSettings,
                                                    [item.key]: e.target.checked
                                                })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                ))}

                                <motion.button
                                    onClick={handleNotificationsSave}
                                    disabled={saving}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-primary flex items-center gap-2 disabled:opacity-50"
                                >
                                    <Save className="w-5 h-5" />
                                    {saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Security Settings */}
                    {activeTab === 'security' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card rounded-2xl p-6 border border-gray-800"
                        >
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-primary" />
                                الأمان وكلمة المرور
                            </h2>

                            <div className="space-y-4 max-w-md">
                                <div>
                                    <label className="block text-gray-400 mb-2">كلمة المرور الحالية</label>
                                    <div className="relative">
                                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={passwordForm.currentPassword}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                            className="w-full pr-12 pl-12 py-3 input-dark"
                                            placeholder="••••••••"
                                            dir="ltr"
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

                                <div>
                                    <label className="block text-gray-400 mb-2">كلمة المرور الجديدة</label>
                                    <div className="relative">
                                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={passwordForm.newPassword}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                            className="w-full pr-12 pl-4 py-3 input-dark"
                                            placeholder="••••••••"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-400 mb-2">تأكيد كلمة المرور الجديدة</label>
                                    <div className="relative">
                                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={passwordForm.confirmPassword}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                            className="w-full pr-12 pl-4 py-3 input-dark"
                                            placeholder="••••••••"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    onClick={handlePasswordChange}
                                    disabled={saving || !passwordForm.currentPassword || !passwordForm.newPassword}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-primary flex items-center gap-2 disabled:opacity-50"
                                >
                                    <Save className="w-5 h-5" />
                                    {saving ? 'جاري التغيير...' : 'تغيير كلمة المرور'}
                                </motion.button>
                            </div>

                            {/* Security Info */}
                            <div className="mt-8 p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                                <h3 className="text-white font-medium mb-3">نصائح أمنية</h3>
                                <ul className="space-y-2 text-gray-400 text-sm">
                                    <li>• استخدم كلمة مرور قوية تحتوي على أحرف وأرقام ورموز</li>
                                    <li>• لا تشارك كلمة المرور مع أي شخص</li>
                                    <li>• قم بتغيير كلمة المرور بشكل دوري</li>
                                    <li>• سجل الخروج من الأجهزة غير الموثوقة</li>
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    )
}
