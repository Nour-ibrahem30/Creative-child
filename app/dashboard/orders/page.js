'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { Sidebar } from '../page'
import { 
    ShoppingBag, Menu, Eye, Package, Truck, CheckCircle, 
    XCircle, Clock, Search, Filter, Calendar, User,
    Phone, MapPin, CreditCard, MoreVertical
} from 'lucide-react'

// Mock orders data
const mockOrders = [
    {
        id: 'ORD-001',
        customer: { name: 'أحمد محمد', phone: '01012345678', address: 'القاهرة، مصر الجديدة' },
        items: [
            { name: 'مكعبات البناء الملونة', quantity: 2, price: 299 },
            { name: 'لعبة الذكاء التعليمية', quantity: 1, price: 450 }
        ],
        total: 1048,
        status: 'pending',
        date: '2024-01-15',
        paymentMethod: 'cash'
    },
    {
        id: 'ORD-002',
        customer: { name: 'سارة أحمد', phone: '01098765432', address: 'الإسكندرية، سموحة' },
        items: [
            { name: 'طقم الرسم والتلوين', quantity: 1, price: 180 }
        ],
        total: 180,
        status: 'processing',
        date: '2024-01-14',
        paymentMethod: 'card'
    },
    {
        id: 'ORD-003',
        customer: { name: 'محمد علي', phone: '01123456789', address: 'الجيزة، الدقي' },
        items: [
            { name: 'روبوت تعليمي ذكي', quantity: 1, price: 899 },
            { name: 'لعبة الألغاز الخشبية', quantity: 3, price: 150 }
        ],
        total: 1349,
        status: 'shipped',
        date: '2024-01-13',
        paymentMethod: 'cash'
    },
    {
        id: 'ORD-004',
        customer: { name: 'فاطمة حسن', phone: '01234567890', address: 'المنصورة، حي الجامعة' },
        items: [
            { name: 'دراجة أطفال مع عجلات تدريب', quantity: 1, price: 1500 }
        ],
        total: 1500,
        status: 'delivered',
        date: '2024-01-10',
        paymentMethod: 'card'
    },
    {
        id: 'ORD-005',
        customer: { name: 'خالد إبراهيم', phone: '01087654321', address: 'طنطا، شارع الجلاء' },
        items: [
            { name: 'مجموعة الصلصال الملون', quantity: 2, price: 120 }
        ],
        total: 240,
        status: 'cancelled',
        date: '2024-01-09',
        paymentMethod: 'cash'
    }
]

const statusConfig = {
    pending: { label: 'قيد الانتظار', color: 'bg-yellow-500/20 text-yellow-400', icon: Clock },
    processing: { label: 'جاري التجهيز', color: 'bg-blue-500/20 text-blue-400', icon: Package },
    shipped: { label: 'تم الشحن', color: 'bg-purple-500/20 text-purple-400', icon: Truck },
    delivered: { label: 'تم التوصيل', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
    cancelled: { label: 'ملغي', color: 'bg-red-500/20 text-red-400', icon: XCircle }
}

export default function OrdersPage() {
    const router = useRouter()
    const { isAuthenticated, user } = useAuthStore()
    const [orders, setOrders] = useState(mockOrders)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/login')
        }
    }, [isAuthenticated, router])

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="text-white">جاري التحميل...</div>
            </div>
        )
    }

    const filteredOrders = orders.filter(order => {
        const matchSearch = order.id.toLowerCase().includes(search.toLowerCase()) ||
                           order.customer.name.includes(search) ||
                           order.customer.phone.includes(search)
        const matchStatus = statusFilter === 'all' || order.status === statusFilter
        return matchSearch && matchStatus
    })

    const stats = [
        { label: 'إجمالي الطلبات', value: orders.length, color: 'from-primary to-purple-600' },
        { label: 'قيد الانتظار', value: orders.filter(o => o.status === 'pending').length, color: 'from-yellow-500 to-orange-500' },
        { label: 'تم التوصيل', value: orders.filter(o => o.status === 'delivered').length, color: 'from-green-500 to-emerald-600' },
        { label: 'إجمالي المبيعات', value: `${orders.filter(o => o.status === 'delivered').reduce((a, o) => a + o.total, 0)} ج.م`, color: 'from-secondary to-cyan-600' }
    ]

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ))
        setSelectedOrder(null)
    }

    return (
        <div className="min-h-screen bg-dark flex">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} currentPath="/dashboard/orders" user={user} />
            
            <div className="flex-1 lg:mr-64">
                <header className="glass-effect border-b border-gray-800 px-6 py-4 sticky top-0 z-30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400">
                                <Menu className="w-6 h-6" />
                            </button>
                            <h1 className="text-xl font-bold text-white">إدارة الطلبات</h1>
                        </div>
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
                                    <ShoppingBag className="w-5 h-5" />
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
                                    placeholder="بحث برقم الطلب أو اسم العميل..."
                                    className="w-full pr-10 pl-4 py-2.5 input-dark"
                                />
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="input-dark min-w-[150px]"
                            >
                                <option value="all">كل الحالات</option>
                                <option value="pending">قيد الانتظار</option>
                                <option value="processing">جاري التجهيز</option>
                                <option value="shipped">تم الشحن</option>
                                <option value="delivered">تم التوصيل</option>
                                <option value="cancelled">ملغي</option>
                            </select>
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="space-y-4">
                        {filteredOrders.map((order, i) => {
                            const StatusIcon = statusConfig[order.status].icon
                            return (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="glass-card rounded-2xl p-4 md:p-6 border border-gray-800"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                                                <ShoppingBag className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold">{order.id}</h3>
                                                <p className="text-gray-500 text-sm flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {order.date}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 ${statusConfig[order.status].color}`}>
                                                <StatusIcon className="w-4 h-4" />
                                                {statusConfig[order.status].label}
                                            </span>
                                            <button
                                                onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                                            >
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Customer Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-3 bg-gray-800/30 rounded-xl">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <User className="w-4 h-4" />
                                            <span>{order.customer.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Phone className="w-4 h-4" />
                                            <span dir="ltr">{order.customer.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <MapPin className="w-4 h-4" />
                                            <span>{order.customer.address}</span>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="border-t border-gray-800 pt-4">
                                        <div className="space-y-2">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-300">{item.name} × {item.quantity}</span>
                                                    <span className="text-gray-400">{item.price * item.quantity} ج.م</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                <CreditCard className="w-4 h-4" />
                                                {order.paymentMethod === 'cash' ? 'الدفع عند الاستلام' : 'بطاقة ائتمان'}
                                            </div>
                                            <div className="text-left">
                                                <span className="text-gray-400 text-sm">الإجمالي: </span>
                                                <span className="text-primary font-bold text-lg">{order.total} ج.م</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions Dropdown */}
                                    {selectedOrder === order.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-4 p-3 bg-gray-800 rounded-xl border border-gray-700"
                                        >
                                            <p className="text-gray-400 text-sm mb-3">تغيير حالة الطلب:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {Object.entries(statusConfig).map(([key, config]) => (
                                                    <button
                                                        key={key}
                                                        onClick={() => updateOrderStatus(order.id, key)}
                                                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                                            order.status === key 
                                                                ? config.color 
                                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                        }`}
                                                    >
                                                        {config.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>

                    {filteredOrders.length === 0 && (
                        <div className="text-center py-20 glass-card rounded-2xl border border-gray-800">
                            <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400 text-lg">لا توجد طلبات</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
