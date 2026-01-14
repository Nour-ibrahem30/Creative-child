'use client'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useProductsStore } from '@/store/productsStore'
import { useAuthStore } from '@/store/authStore'
import { 
    Package, Plus, Edit, Trash2, Search, Filter,
    TrendingUp, ShoppingBag, DollarSign, Eye, ImageIcon,
    LayoutDashboard, Settings, LogOut, Menu, X, Home, User
} from 'lucide-react'

const categories = ['الكل', 'ألعاب تعليمية', 'ألعاب البناء', 'فنون وحرف', 'ألعاب إلكترونية', 'ألعاب خارجية', 'ألغاز وتركيب', 'ألعاب الرضع']

export default function DashboardPage() {
    const router = useRouter()
    const { products, deleteProduct } = useProductsStore()
    const { isAuthenticated, user, logout } = useAuthStore()
    const [search, setSearch] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('الكل')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    // Check authentication
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/login')
        }
    }, [isAuthenticated, router])

    const handleLogout = () => {
        logout()
        router.push('/auth/login')
    }

    // Don't render if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="text-white">جاري التحميل...</div>
            </div>
        )
    }

    const filteredProducts = products.filter(p => {
        const matchSearch = p.name.includes(search)
        const matchCategory = categoryFilter === 'الكل' || p.category === categoryFilter
        return matchSearch && matchCategory
    })

    const stats = [
        { label: 'إجمالي المنتجات', value: products.length, icon: <Package className="w-5 h-5" />, color: 'from-primary to-purple-600' },
        { label: 'منتجات بخصم', value: products.filter(p => p.discount > 0).length, icon: <TrendingUp className="w-5 h-5" />, color: 'from-green-500 to-emerald-600' },
        { label: 'منتجات مميزة', value: products.filter(p => p.featured).length, icon: <Eye className="w-5 h-5" />, color: 'from-secondary to-cyan-600' },
        { label: 'إجمالي المخزون', value: products.reduce((a, p) => a + (p.stock || 0), 0), icon: <ShoppingBag className="w-5 h-5" />, color: 'from-accent to-orange-600' },
    ]

    const handleDelete = (id) => {
        deleteProduct(id)
        setDeleteConfirm(null)
    }

    return (
        <div className="min-h-screen bg-dark flex">
            {/* Sidebar */}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} currentPath="/dashboard" onLogout={handleLogout} user={user} />
            
            {/* Main Content */}
            <div className="flex-1 lg:mr-64">
                {/* Header */}
                <header className="glass-effect border-b border-gray-800 px-6 py-4 sticky top-0 z-30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400">
                                <Menu className="w-6 h-6" />
                            </button>
                            <h1 className="text-xl font-bold text-white">لوحة التحكم</h1>
                        </div>
                        <Link href="/dashboard/products/new" className="btn-primary flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">إضافة منتج</span>
                        </Link>
                    </div>
                </header>

                <main className="p-6">
                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card rounded-2xl p-4 border border-gray-800"
                            >
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white mb-3`}>
                                    {stat.icon}
                                </div>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                                <p className="text-gray-400 text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

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

                    {/* Products Table */}
                    <div className="glass-card rounded-2xl border border-gray-800 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-800/50">
                                    <tr>
                                        <th className="text-right px-4 py-3 text-gray-400 font-medium">المنتج</th>
                                        <th className="text-right px-4 py-3 text-gray-400 font-medium hidden sm:table-cell">الفئة</th>
                                        <th className="text-right px-4 py-3 text-gray-400 font-medium">السعر</th>
                                        <th className="text-right px-4 py-3 text-gray-400 font-medium hidden md:table-cell">الخصم</th>
                                        <th className="text-right px-4 py-3 text-gray-400 font-medium hidden lg:table-cell">المخزون</th>
                                        <th className="text-center px-4 py-3 text-gray-400 font-medium">إجراءات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-800/30 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    {product.image ? (
                                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-2xl flex-shrink-0">
                                                            {product.emoji}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-white font-medium line-clamp-1">{product.name}</p>
                                                        <p className="text-gray-500 text-sm sm:hidden">{product.category}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-400 hidden sm:table-cell">{product.category}</td>
                                            <td className="px-4 py-3">
                                                <span className="text-primary font-bold">{product.price} ج.م</span>
                                                {product.oldPrice > 0 && (
                                                    <span className="text-gray-500 line-through text-sm mr-2">{product.oldPrice}</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 hidden md:table-cell">
                                                {product.discount > 0 ? (
                                                    <span className="badge-accent">{product.discount}%</span>
                                                ) : (
                                                    <span className="text-gray-500">-</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 hidden lg:table-cell">
                                                <span className={product.stock > 20 ? 'text-green-400' : 'text-red-400'}>
                                                    {product.stock || 0}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        href={`/dashboard/products/${product.id}`}
                                                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => setDeleteConfirm(product.id)}
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {filteredProducts.length === 0 && (
                            <div className="text-center py-12">
                                <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                <p className="text-gray-400">لا توجد منتجات</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card rounded-2xl p-6 max-w-sm w-full border border-gray-800"
                    >
                        <h3 className="text-xl font-bold text-white mb-2">تأكيد الحذف</h3>
                        <p className="text-gray-400 mb-6">هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-medium transition-colors"
                            >
                                حذف
                            </button>
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 glass-effect text-gray-300 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                            >
                                إلغاء
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}


function Sidebar({ open, onClose, currentPath, onLogout, user }) {
    const menuItems = [
        { icon: <LayoutDashboard className="w-5 h-5" />, label: 'لوحة التحكم', href: '/dashboard' },
        { icon: <Package className="w-5 h-5" />, label: 'المنتجات', href: '/dashboard/products' },
        { icon: <ShoppingBag className="w-5 h-5" />, label: 'الطلبات', href: '/dashboard/orders' },
        { icon: <Settings className="w-5 h-5" />, label: 'الإعدادات', href: '/dashboard/settings' },
    ]

    return (
        <>
            {/* Overlay */}
            {open && (
                <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />
            )}
            
            {/* Sidebar */}
            <aside className={`fixed top-0 right-0 h-full w-64 glass-effect border-l border-gray-800 z-50 transform transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl">🎮</span>
                            <span className="text-xl font-bold gradient-text">Creative Child</span>
                        </Link>
                        <button onClick={onClose} className="lg:hidden text-gray-400">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* User Info */}
                    {user && (
                        <div className="mb-6 p-3 bg-gray-800/50 rounded-xl border border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium text-sm">{user.name}</p>
                                    <p className="text-gray-500 text-xs truncate" dir="ltr">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <nav className="space-y-2">
                        {menuItems.map((item, i) => {
                            const isActive = currentPath === item.href || 
                                (item.href !== '/dashboard' && currentPath?.startsWith(item.href))
                            return (
                                <Link
                                    key={i}
                                    href={item.href}
                                    onClick={onClose}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                                        isActive 
                                            ? 'bg-gradient-to-r from-primary to-purple-600 text-white' 
                                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800 space-y-2">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white rounded-xl hover:bg-gray-800 transition-colors">
                        <Home className="w-5 h-5" />
                        العودة للموقع
                    </Link>
                    <button 
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 rounded-xl hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        تسجيل الخروج
                    </button>
                </div>
            </aside>
        </>
    )
}

export { Sidebar }
