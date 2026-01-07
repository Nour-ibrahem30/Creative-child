'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Facebook, Instagram, Twitter } from 'lucide-react'
import toast from 'react-hot-toast'

const contactInfo = [
    { icon: Phone, title: 'الهاتف', value: '+20 111 319 087', href: 'tel:+20111319087' },
    { icon: Phone, title: 'هاتف آخر', value: '+20 102 184 3420', href: 'tel:+201021843420' },
    { icon: Mail, title: 'البريد الإلكتروني', value: 'creative.kid.world.online@gmail.com', href: 'mailto:creative.kid.world.online@gmail.com' },
    { icon: MapPin, title: 'العنوان', value: 'القاهرة، مصر', href: '#' },
    { icon: Clock, title: 'ساعات العمل', value: 'السبت - الخميس: 9ص - 9م', href: '#' },
]

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً')
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }

    return (
        <main className="min-h-screen bg-dark">
            <Navbar />
            <div className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <PageHeader />
                    <div className="grid lg:grid-cols-3 gap-8">
                        <ContactInfoCard />
                        <ContactForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

function PageHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
        >
            <h1 className="text-4xl font-bold text-white mb-4">تواصل معنا</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
                نحن هنا لمساعدتك! تواصل معنا لأي استفسار أو اقتراح
            </p>
        </motion.div>
    )
}

function ContactInfoCard() {
    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
        { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
        { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
        { icon: MessageCircle, href: 'https://wa.me/20111319087', label: 'WhatsApp', color: 'hover:bg-green-600' },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
        >
            <div className="glass-card rounded-3xl p-8 h-full border border-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                <div className="relative">
                    <h2 className="text-2xl font-bold text-white mb-6">معلومات التواصل</h2>
                    <div className="space-y-5">
                        {contactInfo.map((info, index) => (
                            <motion.a
                                key={index}
                                href={info.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-4 group"
                            >
                                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                                    <info.icon className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-300">{info.title}</h3>
                                    <p className="text-gray-500 text-sm">{info.value}</p>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-700">
                        <h3 className="font-medium text-white mb-4">تابعنا على</h3>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className={`w-11 h-11 glass-effect rounded-xl flex items-center justify-center text-gray-400 hover:text-white ${social.color} transition-all border border-gray-700`}
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}


function ContactForm({ formData, setFormData, handleSubmit }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
        >
            <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">أرسل لنا رسالة</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">الاسم</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full px-4 py-3 glass-effect border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                            placeholder="أدخل اسمك"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">البريد الإلكتروني</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full px-4 py-3 glass-effect border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                            placeholder="example@email.com"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">رقم الهاتف</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 glass-effect border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                            placeholder="01xxxxxxxxx"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">الموضوع</label>
                        <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            required
                            className="w-full px-4 py-3 glass-effect border border-gray-700 rounded-xl text-white focus:border-primary focus:outline-none transition-colors bg-transparent"
                        >
                            <option value="" className="bg-dark">اختر الموضوع</option>
                            <option value="inquiry" className="bg-dark">استفسار عام</option>
                            <option value="order" className="bg-dark">استفسار عن طلب</option>
                            <option value="complaint" className="bg-dark">شكوى</option>
                            <option value="suggestion" className="bg-dark">اقتراح</option>
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">الرسالة</label>
                    <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="w-full px-4 py-3 glass-effect border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors resize-none"
                        placeholder="اكتب رسالتك هنا..."
                    />
                </div>

                <motion.button 
                    type="submit" 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary flex items-center gap-2 shadow-glow-primary"
                >
                    <Send className="w-5 h-5" />
                    إرسال الرسالة
                </motion.button>
            </form>
        </motion.div>
    )
}
