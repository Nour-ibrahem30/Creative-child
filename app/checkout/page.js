'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCartStore } from '@/store/cartStore'
import { CreditCard, Truck, MapPin, Check, Wallet } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
    const router = useRouter()
    const { items, getTotal, clearCart } = useCartStore()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', address: '', city: '', paymentMethod: 'cash',
    })

    const total = getTotal()
    const shipping = total > 500 ? 0 : 50

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (step < 3) {
            setStep(step + 1)
        } else {
            toast.success('تم تأكيد طلبك بنجاح! سنتواصل معك قريباً')
            clearCart()
            router.push('/')
        }
    }

    const steps = [
        { num: 1, label: 'معلومات الشحن', icon: MapPin },
        { num: 2, label: 'طريقة الدفع', icon: CreditCard },
        { num: 3, label: 'تأكيد الطلب', icon: Check },
    ]

    return (
        <main className="min-h-screen bg-dark">
            <Navbar />
            <div className="pt-24 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <StepsIndicator steps={steps} currentStep={step} />
                    <div className="grid lg:grid-cols-3 gap-8">
                        <CheckoutForm 
                            step={step} 
                            setStep={setStep} 
                            formData={formData} 
                            handleChange={handleChange} 
                            handleSubmit={handleSubmit} 
                        />
                        <OrderSummary items={items} total={total} shipping={shipping} />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

function StepsIndicator({ steps, currentStep }) {
    return (
        <div className="flex justify-center mb-12">
            {steps.map((s, index) => (
                <div key={s.num} className="flex items-center">
                    <div className={`flex items-center gap-2 ${currentStep >= s.num ? 'text-primary' : 'text-gray-600'}`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                            currentStep >= s.num 
                                ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-glow-primary' 
                                : 'bg-gray-800 border border-gray-700'
                        }`}>
                            <s.icon className="w-5 h-5" />
                        </div>
                        <span className="hidden sm:block font-medium">{s.label}</span>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`w-12 sm:w-24 h-1 mx-2 rounded ${currentStep > s.num ? 'bg-primary' : 'bg-gray-800'}`} />
                    )}
                </div>
            ))}
        </div>
    )
}

function CheckoutForm({ step, setStep, formData, handleChange, handleSubmit }) {
    return (
        <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
        >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 border border-gray-800">
                {step === 1 && <ShippingForm formData={formData} handleChange={handleChange} />}
                {step === 2 && <PaymentForm formData={formData} handleChange={handleChange} />}
                {step === 3 && <ConfirmationForm formData={formData} />}

                <div className="flex gap-4 mt-8">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="flex-1 py-3 glass-effect border border-gray-700 rounded-xl font-medium text-gray-300 hover:bg-gray-800 transition-colors"
                        >
                            السابق
                        </button>
                    )}
                    <motion.button 
                        type="submit" 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 btn-primary shadow-glow-primary"
                    >
                        {step === 3 ? 'تأكيد الطلب' : 'التالي'}
                    </motion.button>
                </div>
            </form>
        </motion.div>
    )
}


function ShippingForm({ formData, handleChange }) {
    return (
        <>
            <h2 className="text-xl font-bold text-white mb-6">معلومات الشحن</h2>
            <div className="grid gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">الاسم الكامل</label>
                    <input
                        type="text" name="name" value={formData.name} onChange={handleChange} required
                        className="w-full px-4 py-3 glass-effect border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                        placeholder="أدخل اسمك"
                    />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">البريد الإلكتروني</label>
                        <input
                            type="email" name="email" value={formData.email} onChange={handleChange} required
                            className="w-full px-4 py-3 glass-effect border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                            placeholder="example@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">رقم الهاتف</label>
                        <input
                            type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                            className="w-full px-4 py-3 glass-effect border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                            placeholder="01xxxxxxxxx"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">العنوان</label>
                    <textarea
                        name="address" value={formData.address} onChange={handleChange} required rows={3}
                        className="w-full px-4 py-3 glass-effect border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:outline-none resize-none"
                        placeholder="أدخل عنوانك بالتفصيل"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">المدينة</label>
                    <select
                        name="city" value={formData.city} onChange={handleChange} required
                        className="w-full px-4 py-3 glass-effect border border-gray-700 rounded-xl text-white focus:border-primary focus:outline-none bg-transparent"
                    >
                        <option value="" className="bg-dark">اختر المدينة</option>
                        <option value="cairo" className="bg-dark">القاهرة</option>
                        <option value="giza" className="bg-dark">الجيزة</option>
                        <option value="alex" className="bg-dark">الإسكندرية</option>
                        <option value="other" className="bg-dark">مدينة أخرى</option>
                    </select>
                </div>
            </div>
        </>
    )
}

function PaymentForm({ formData, handleChange }) {
    const paymentMethods = [
        { value: 'cash', icon: Truck, title: 'الدفع عند الاستلام', desc: 'ادفع نقداً عند استلام طلبك' },
        { value: 'vodafone', icon: Wallet, title: 'فودافون كاش', desc: 'ادفع عبر فودافون كاش' },
        { value: 'card', icon: CreditCard, title: 'بطاقة ائتمان', desc: 'Visa, Mastercard' },
    ]

    return (
        <>
            <h2 className="text-xl font-bold text-white mb-6">طريقة الدفع</h2>
            <div className="space-y-4">
                {paymentMethods.map((method) => (
                    <label
                        key={method.value}
                        className={`flex items-center gap-4 p-4 glass-effect border-2 rounded-xl cursor-pointer transition-all ${
                            formData.paymentMethod === method.value 
                                ? 'border-primary bg-primary/10' 
                                : 'border-gray-700 hover:border-gray-600'
                        }`}
                    >
                        <input
                            type="radio" name="paymentMethod" value={method.value}
                            checked={formData.paymentMethod === method.value}
                            onChange={handleChange}
                            className="accent-primary w-4 h-4"
                        />
                        <method.icon className="w-6 h-6 text-primary" />
                        <div>
                            <span className="font-medium text-white">{method.title}</span>
                            <p className="text-sm text-gray-500">{method.desc}</p>
                        </div>
                    </label>
                ))}
            </div>
        </>
    )
}

function ConfirmationForm({ formData }) {
    return (
        <>
            <h2 className="text-xl font-bold text-white mb-6">تأكيد الطلب</h2>
            <div className="space-y-4">
                <div className="glass-effect rounded-xl p-4 border border-gray-700">
                    <h3 className="font-medium text-gray-300 mb-2">معلومات الشحن</h3>
                    <p className="text-white">{formData.name}</p>
                    <p className="text-gray-400">{formData.phone}</p>
                    <p className="text-gray-400">{formData.address}</p>
                </div>
                <div className="glass-effect rounded-xl p-4 border border-gray-700">
                    <h3 className="font-medium text-gray-300 mb-2">طريقة الدفع</h3>
                    <p className="text-white">
                        {formData.paymentMethod === 'cash' ? 'الدفع عند الاستلام' : 
                         formData.paymentMethod === 'vodafone' ? 'فودافون كاش' : 'بطاقة ائتمان'}
                    </p>
                </div>
            </div>
        </>
    )
}

function OrderSummary({ items, total, shipping }) {
    return (
        <div className="glass-card rounded-2xl p-6 border border-gray-800 h-fit">
            <h2 className="text-xl font-bold text-white mb-4">ملخص الطلب</h2>
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-400">{item.name} × {item.quantity}</span>
                        <span className="text-white">{item.price * item.quantity} ج.م</span>
                    </div>
                ))}
            </div>
            <div className="border-t border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-400">المجموع الفرعي</span>
                    <span className="text-white">{total} ج.م</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">الشحن</span>
                    <span className={shipping === 0 ? 'text-green-400' : 'text-white'}>
                        {shipping === 0 ? 'مجاني' : `${shipping} ج.م`}
                    </span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-700">
                    <span className="text-white">الإجمالي</span>
                    <span className="gradient-text">{total + shipping} ج.م</span>
                </div>
            </div>
        </div>
    )
}
