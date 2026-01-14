'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useProductsStore } from '@/store/productsStore'
import { Sidebar } from '../page'
import { 
    Package, Plus, Edit, Trash2, Search, Eye, Menu, X,
    LayoutDashboard, Settings, ShoppingBag, Home
} from 'lucide-react'

const categories = ['الكل', 'ألعاب تعليمية', 'ألعاب البناء', 'فنون وحرف', 'ألعاب إلكترونية', 'ألعاب خارجية', 'ألغاز وتركيب', 'ألعاب الرضع']

export default function ProductsListPage() {
    const { products, deleteProduct } = useProductsStore()
    const [search, setSearch] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('الكل')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    const filteredProducts = products.filter(p => {
        const matchSearch = p.name.includes(search)
        const matchCategory = categoryFilter === 'الكل' || p.category === categoryFilter
        return matchSearch && matchCategory
    })

    const handleDelete = (id) => {
        deleteProduct(id)
        setDeleteConfirm(null)
    }

    return (
        <div className="min-h-screen bg-dark flex">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} currentPath="/dashboard/products" />
            
            <div className="flex-1 lg:mr-64">
                <header className="glass-effect border-b border-gray-800 px-6 py-4 sticky top-0 z-30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400">
                                <Menu className="w-6 h-6" />
                            </button>
                            <h1 className="text-xl font-bold text-white">إدارة المنتجات</h1>
                        </div>
                        <Link href="/dashboard/products/new" className="btn-primary flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">إضافة منتج</span>
                        </Link>
                    </div>
                </header>

                <main className="p-6">
                    {/* Filters */}
                    <div className="glass-card rounded-2xl p-4 border border-gray-800 mb-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="بحث عن منتج..."
                                    className="w-full pr-10 pl-4 py-2.5 input-dark"
                                />
                            </div>
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="input-dark min-w-[150px]"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="glass-card rounded-2xl border border-gray-800 overflow-hidden group"
                            >
                                <div className="aspect-square bg-gray-800 flex items-center justify-center relative">
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-6xl">{product.emoji}</span>
                                    )}
                                    {product.discount > 0 && (
                                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                            -{product.discount}%
                                        </span>
                                    )}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <Link
                                            href={`/dashboard/products/${product.id}`}
                                            className="p-3 bg-primary rounded-xl text-white hover:bg-primary/80 transition-colors"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => setDeleteConfirm(product.id)}
                                            className="p-3 bg-red-500 rounded-xl text-white hover:bg-red-600 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-medium text-white line-clamp-1 mb-1">{product.name}</h3>
                                    <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-primary font-bold">{product.price} ج.م</span>
                                            {product.oldPrice > 0 && (
                                                <span className="text-gray-500 line-through text-sm mr-2">{product.oldPrice}</span>
                                            )}
                                        </div>
                                        <span className={`text-sm ${product.stock > 20 ? 'text-green-400' : 'text-red-400'}`}>
                                            {product.stock || 0} قطعة
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20 glass-card rounded-2xl border border-gray-800">
                            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400 text-lg">لا توجد منتجات</p>
                            <Link href="/dashboard/products/new" className="btn-primary inline-flex items-center gap-2 mt-4">
                                <Plus className="w-5 h-5" />
                                إضافة منتج جديد
                            </Link>
                        </div>
                    )}
                </main>
            </div>

            {/* Delete Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card rounded-2xl p-6 max-w-sm w-full border border-gray-800"
                    >
                        <h3 className="text-xl font-bold text-white mb-2">تأكيد الحذف</h3>
                        <p className="text-gray-400 mb-6">هل أنت متأكد من حذف هذا المنتج؟</p>
                        <div className="flex gap-3">
                            <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-medium">
                                حذف
                            </button>
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 glass-effect text-gray-300 py-2.5 rounded-xl font-medium hover:bg-gray-800">
                                إلغاء
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}
