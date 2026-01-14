'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Heart, User, Search, Menu, X, Sparkles, LayoutDashboard } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useThemeStore } from '@/store/themeStore'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
    const router = useRouter()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const cartItems = useCartStore((state) => state.items)
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
    const { theme } = useThemeStore()

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery('')
            setIsSearchOpen(false)
        }
    }

    const navLinks = [
        { href: '/', label: 'الرئيسية' },
        { href: '/products', label: 'المنتجات' },
        { href: '/categories', label: 'الأقسام' },
        { href: '/offers', label: 'العروض' },
        { href: '/about', label: 'من نحن' },
        { href: '/contact', label: 'تواصل معنا' },
    ]

    const isLight = theme === 'light'

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled 
                    ? isLight 
                        ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg shadow-gray-200/50' 
                        : 'bg-gray-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-primary/5'
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 lg:gap-3 group flex-shrink-0">
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg"
                        >
                            <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                        </motion.div>
                        <div className="hidden sm:flex flex-col">
                            <span className="text-lg lg:text-xl font-bold gradient-text leading-tight">
                                الطفل المبدع
                            </span>
                            <span className={`text-[10px] lg:text-xs ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Creative Child</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation - Center */}
                    <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
                        <div className="flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3 xl:px-4 py-2 transition-all duration-300 font-medium text-sm relative group rounded-lg ${
                                        isLight 
                                            ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 right-1/2 translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-3/4 rounded-full" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Icons */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        {/* Search Button (Mobile) */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className={`md:hidden p-2 rounded-lg transition-colors ${
                                isLight ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-white/5 text-gray-300'
                            }`}
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Search Bar (Desktop) */}
                        <form onSubmit={handleSearch} className={`hidden md:flex items-center rounded-lg px-3 py-2 w-48 xl:w-56 group transition-all duration-300 ${
                            isLight 
                                ? 'bg-gray-100 border border-gray-200 focus-within:border-primary focus-within:bg-white' 
                                : 'bg-gray-800/50 border border-gray-700 focus-within:border-primary'
                        }`}>
                            <button type="submit" className="flex-shrink-0">
                                <Search className={`w-4 h-4 ${isLight ? 'text-gray-400' : 'text-gray-500'} group-focus-within:text-primary transition-colors`} />
                            </button>
                            <input
                                type="text"
                                placeholder="ابحث..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`bg-transparent border-none outline-none mr-2 w-full text-sm ${
                                    isLight ? 'text-gray-900 placeholder:text-gray-400' : 'text-white placeholder:text-gray-500'
                                }`}
                            />
                        </form>

                        {/* Divider */}
                        <div className={`hidden md:block w-px h-6 mx-1 ${isLight ? 'bg-gray-200' : 'bg-gray-700'}`} />

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Wishlist */}
                        <Link 
                            href="/wishlist" 
                            className={`relative p-2 rounded-lg transition-all duration-300 group ${
                                isLight ? 'hover:bg-gray-100' : 'hover:bg-white/5'
                            }`}
                        >
                            <Heart className={`w-5 h-5 ${isLight ? 'text-gray-600' : 'text-gray-300'} group-hover:text-primary transition-colors`} />
                        </Link>

                        {/* Cart */}
                        <Link 
                            href="/cart" 
                            className={`relative p-2 rounded-lg transition-all duration-300 group ${
                                isLight ? 'hover:bg-gray-100' : 'hover:bg-white/5'
                            }`}
                        >
                            <ShoppingCart className={`w-5 h-5 ${isLight ? 'text-gray-600' : 'text-gray-300'} group-hover:text-secondary transition-colors`} />
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-0.5 -left-0.5 w-4 h-4 bg-gradient-to-r from-primary to-secondary text-white text-[10px] rounded-full flex items-center justify-center font-bold"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </Link>

                        {/* Dashboard */}
                        <Link 
                            href="/dashboard" 
                            className={`hidden sm:flex p-2 rounded-lg transition-all duration-300 group ${
                                isLight ? 'hover:bg-gray-100' : 'hover:bg-white/5'
                            }`}
                            title="لوحة التحكم"
                        >
                            <LayoutDashboard className={`w-5 h-5 ${isLight ? 'text-gray-600' : 'text-gray-300'} group-hover:text-accent transition-colors`} />
                        </Link>

                        {/* Login Button */}
                        <Link 
                            href="/auth/login" 
                            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-primary to-purple-600 text-white px-3 lg:px-4 py-2 rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
                        >
                            <User className="w-4 h-4" />
                            <span className="hidden lg:inline">دخول</span>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`lg:hidden p-2 rounded-lg transition-colors ${
                                isLight ? 'hover:bg-gray-100' : 'hover:bg-white/5'
                            }`}
                        >
                            {isMobileMenuOpen ? (
                                <X className={`w-5 h-5 ${isLight ? 'text-gray-700' : 'text-white'}`} />
                            ) : (
                                <Menu className={`w-5 h-5 ${isLight ? 'text-gray-700' : 'text-white'}`} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`md:hidden border-t ${isLight ? 'bg-white border-gray-200' : 'bg-gray-900 border-gray-800'}`}
                    >
                        <form onSubmit={handleSearch} className="px-4 py-3">
                            <div className={`flex items-center rounded-lg px-3 py-2.5 ${
                                isLight ? 'bg-gray-100 border border-gray-200' : 'bg-gray-800 border border-gray-700'
                            }`}>
                                <button type="submit">
                                    <Search className={`w-5 h-5 ${isLight ? 'text-gray-400' : 'text-gray-500'}`} />
                                </button>
                                <input
                                    type="text"
                                    placeholder="ابحث عن لعبة..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    className={`bg-transparent border-none outline-none mr-3 w-full text-sm ${
                                        isLight ? 'text-gray-900 placeholder:text-gray-400' : 'text-white placeholder:text-gray-500'
                                    }`}
                                />
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`lg:hidden backdrop-blur-xl border-t ${
                            isLight 
                                ? 'bg-white/98 border-gray-200' 
                                : 'bg-gray-900/98 border-white/10'
                        }`}
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block py-2.5 px-4 rounded-lg transition-all font-medium ${
                                            isLight 
                                                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            
                            <div className={`pt-3 mt-2 border-t flex gap-2 ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
                                <Link 
                                    href="/auth/login" 
                                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white py-2.5 rounded-lg font-medium"
                                >
                                    <User className="w-4 h-4" />
                                    تسجيل الدخول
                                </Link>
                                <Link 
                                    href="/dashboard" 
                                    className={`p-2.5 rounded-lg transition-colors ${
                                        isLight ? 'bg-gray-100 text-gray-600' : 'bg-gray-800 text-gray-300'
                                    }`}
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
