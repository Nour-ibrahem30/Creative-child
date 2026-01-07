'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Heart, User, Search, Menu, X, Sparkles } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const cartItems = useCartStore((state) => state.items)
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { href: '/', label: 'الرئيسية' },
        { href: '/products', label: 'المنتجات' },
        { href: '/categories', label: 'الأقسام' },
        { href: '/offers', label: 'العروض' },
        { href: '/about', label: 'من نحن' },
        { href: '/contact', label: 'تواصل معنا' },
    ]

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled 
                    ? 'bg-dark-50/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-primary/5' 
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center shadow-glow-primary"
                        >
                            <Sparkles className="w-6 h-6 text-white" />
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold gradient-text">
                                الطفل المبدع
                            </span>
                            <span className="text-xs text-dark-500">Creative Child</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-light-300 hover:text-white transition-all duration-300 font-medium relative group rounded-xl hover:bg-white/5"
                            >
                                {link.label}
                                <span className="absolute bottom-0 right-1/2 translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-3/4 rounded-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex items-center bg-dark-100/50 backdrop-blur-sm border border-dark-300/30 rounded-xl px-4 py-2.5 w-72 group focus-within:border-primary/50 focus-within:shadow-glow-primary/20 transition-all duration-300">
                        <Search className="w-5 h-5 text-dark-500 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="ابحث عن لعبة..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none mr-3 w-full text-sm text-light placeholder:text-dark-500"
                        />
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-2">
                        <Link 
                            href="/wishlist" 
                            className="relative p-2.5 hover:bg-white/5 rounded-xl transition-all duration-300 group"
                        >
                            <Heart className="w-5 h-5 text-light-300 group-hover:text-primary transition-colors" />
                        </Link>

                        <Link 
                            href="/cart" 
                            className="relative p-2.5 hover:bg-white/5 rounded-xl transition-all duration-300 group"
                        >
                            <ShoppingCart className="w-5 h-5 text-light-300 group-hover:text-secondary transition-colors" />
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -left-1 w-5 h-5 bg-gradient-to-r from-primary to-secondary text-white text-xs rounded-full flex items-center justify-center font-bold shadow-glow-primary"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </Link>

                        <Link 
                            href="/auth/login" 
                            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-5 py-2.5 rounded-xl font-medium hover:shadow-glow-primary transition-all duration-300 hover:scale-105"
                        >
                            <User className="w-4 h-4" />
                            <span>دخول</span>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2.5 hover:bg-white/5 rounded-xl transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-light" />
                            ) : (
                                <Menu className="w-6 h-6 text-light" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-dark-50/95 backdrop-blur-xl border-t border-white/10"
                    >
                        <div className="px-4 py-6 space-y-2">
                            {/* Mobile Search */}
                            <div className="flex items-center bg-dark-100/50 border border-dark-300/30 rounded-xl px-4 py-3 mb-4">
                                <Search className="w-5 h-5 text-dark-500" />
                                <input
                                    type="text"
                                    placeholder="ابحث عن لعبة..."
                                    className="bg-transparent border-none outline-none mr-3 w-full text-sm text-light placeholder:text-dark-500"
                                />
                            </div>
                            
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block py-3 px-4 text-light-300 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <div className="pt-4 border-t border-white/10">
                                <Link 
                                    href="/auth/login" 
                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-medium"
                                >
                                    <User className="w-5 h-5" />
                                    تسجيل الدخول
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
