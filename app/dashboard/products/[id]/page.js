'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useProductsStore } from '@/store/productsStore'
import { ArrowRight, Save, Package, Trash2 } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'

const categories = ['ألعاب تعليمية', 'ألعاب البناء', 'فنون وحرف', 'ألعاب إلكترونية', 'ألعاب خارجية', 'ألغاز وتركيب', 'ألعاب الرضع']
const emojis = ['🧱', '🧸', '🎨', '🚗', '🧩', '⚽', '🩺', '🚂', '🏗️', '🚁', '🖌️', '🚲', '🤖', '🔬', '🎮', '🎯', '🪀', '🎪']

export default function EditProductPage() {
    const router = useRouter()
    const params = useParams()
    const { getProduct, updateProduct, deleteProduct } = useProductsStore()
    const [saving, setSaving] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [form, setForm] = useState(null)

    useEffect(() => {
        const product = getProduct(Number(params.id))
        if (product) {
            setForm({
                ...product,
                benefits: product.benefits?.length >= 4 ? product.benefits : [...(product.benefits || []), '', '', '', ''].slice(0, 4)
            })
        } else {
            router.push('/dashboard')
        }
    }, [params.id, getProduct, router])

    if (!form) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="text-gray-400">جاري التحميل...</div>
            </div>
        )
    }

    const discount = form.oldPrice && form.price 
        ? Math.round(((form.oldPrice - form.price) / form.oldPrice) * 100) 
        : 0

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleBenefitChange = (index, value) => {
        const newBenefits = [...form.benefits]
        newBenefits[index] = value
        setForm(prev => ({ ...prev, benefits: newBenefits }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        
        const product = {
            ...form,
            price: Number(form.price),
            oldPrice: Number(form.oldPrice) || 0,
            stock: Number(form.stock) || 0,
            discount: discount,
            benefits: form.benefits.filter(b => b.trim())
        }
        
        updateProduct(Number(params.id), product)
        
        setTimeout(() => {
            router.push('/dashboard')
        }, 500)
    }

    const handleDelete = () => {
        deleteProduct(Number(params.id))
        router.push('/dashboard')
    }

    return (
        <div className="min-h-screen bg-dark">
            <header className="glass-effect border-b border-gray-800 px-6 py-4 sticky top-0 z-30">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                        <h1 className="text-xl font-bold text-white">تعديل المنتج</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowDelete(true)}
                            className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={saving || !form.name || !form.price}
                            className="btn-primary flex items-center gap-2 disabled:opacity-50"
                        >
                            <Save className="w-5 h-5" />
                            <span className="hidden sm:inline">{saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card rounded-2xl p-6 border border-gray-800"
                    >
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5 text-primary" />
                            معلومات المنتج الأساسية
                        </h2>
                        
                        <div className="grid gap-4">
                            <div>
                                <label className="block text-gray-400 mb-2">اسم المنتج *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full input-dark"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-400 mb-2">وصف المنتج</label>
                                <textarea
                                    name="description"
                                    value={form.description || ''}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full input-dark resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 mb-2">الفئة</label>
                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        className="w-full input-dark"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2">الفئة العمرية</label>
                                    <input
                                        type="text"
                                        name="ageRange"
                                        value={form.ageRange || ''}
                                        onChange={handleChange}
                                        className="w-full input-dark"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-2">أيقونة المنتج (اختياري)</label>
                                <div className="flex flex-wrap gap-2">
                                    {emojis.map(emoji => (
                                        <button
                                            key={emoji}
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, emoji }))}
                                            className={`w-10 h-10 text-xl rounded-lg transition-all ${
                                                form.emoji === emoji 
                                                    ? 'bg-primary ring-2 ring-primary ring-offset-2 ring-offset-gray-900' 
                                                    : 'bg-gray-800 hover:bg-gray-700'
                                            }`}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Product Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="glass-card rounded-2xl p-6 border border-gray-800"
                    >
                        <h2 className="text-lg font-bold text-white mb-4">📷 صورة المنتج</h2>
                        <ImageUpload 
                            value={form.image || ''} 
                            onChange={(image) => setForm(prev => ({ ...prev, image }))} 
                        />
                    </motion.div>

                    {/* Pricing */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card rounded-2xl p-6 border border-gray-800"
                    >
                        <h2 className="text-lg font-bold text-white mb-4">💰 التسعير</h2>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-gray-400 mb-2">السعر الحالي (ج.م) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    className="w-full input-dark"
                                    required
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">السعر قبل الخصم</label>
                                <input
                                    type="number"
                                    name="oldPrice"
                                    value={form.oldPrice || ''}
                                    onChange={handleChange}
                                    className="w-full input-dark"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">نسبة الخصم</label>
                                <div className="input-dark bg-gray-700/50 flex items-center justify-center">
                                    <span className={discount > 0 ? 'text-green-400 font-bold' : 'text-gray-500'}>
                                        {discount > 0 ? `${discount}%` : '-'}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">المخزون</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={form.stock || ''}
                                    onChange={handleChange}
                                    className="w-full input-dark"
                                    min="0"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Benefits */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card rounded-2xl p-6 border border-gray-800"
                    >
                        <h2 className="text-lg font-bold text-white mb-4">✅ مميزات المنتج</h2>
                        <div className="grid gap-3">
                            {form.benefits.map((benefit, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    value={benefit}
                                    onChange={(e) => handleBenefitChange(i, e.target.value)}
                                    placeholder={`ميزة ${i + 1}`}
                                    className="w-full input-dark"
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Options */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card rounded-2xl p-6 border border-gray-800"
                    >
                        <h2 className="text-lg font-bold text-white mb-4">⚙️ خيارات إضافية</h2>
                        <div className="flex flex-wrap gap-6">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isNew"
                                    checked={form.isNew || false}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded accent-primary"
                                />
                                <span className="text-gray-300">منتج جديد</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={form.featured || false}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded accent-primary"
                                />
                                <span className="text-gray-300">منتج مميز</span>
                            </label>
                        </div>
                    </motion.div>

                    <button
                        type="submit"
                        disabled={saving || !form.name || !form.price}
                        className="w-full btn-primary py-4 text-lg sm:hidden disabled:opacity-50"
                    >
                        {saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
                    </button>
                </form>
            </main>

            {/* Delete Modal */}
            {showDelete && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card rounded-2xl p-6 max-w-sm w-full border border-gray-800"
                    >
                        <h3 className="text-xl font-bold text-white mb-2">تأكيد الحذف</h3>
                        <p className="text-gray-400 mb-6">هل أنت متأكد من حذف هذا المنتج؟</p>
                        <div className="flex gap-3">
                            <button onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-medium">
                                حذف
                            </button>
                            <button onClick={() => setShowDelete(false)} className="flex-1 glass-effect text-gray-300 py-2.5 rounded-xl font-medium hover:bg-gray-800">
                                إلغاء
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}
