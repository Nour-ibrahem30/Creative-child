'use client'
import Link from 'next/link'
import { Package, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
    const footerLinks = {
        quickLinks: [
            { label: 'الرئيسية', href: '/' },
            { label: 'المنتجات', href: '/products' },
            { label: 'العروض', href: '/offers' },
            { label: 'من نحن', href: '/about' },
            { label: 'تواصل معنا', href: '/contact' },
        ],
        categories: [
            { label: 'ألعاب تعليمية', href: '/products?category=ألعاب تعليمية' },
            { label: 'ألعاب البناء', href: '/products?category=ألعاب البناء' },
            { label: 'دمى وعرائس', href: '/products?category=دمى وعرائس' },
            { label: 'ألعاب إلكترونية', href: '/products?category=ألعاب إلكترونية' },
        ],
        support: [
            { label: 'الأسئلة الشائعة', href: '/faq' },
            { label: 'سياسة الإرجاع', href: '/return-policy' },
            { label: 'سياسة الخصوصية', href: '/privacy' },
            { label: 'الشروط والأحكام', href: '/terms' },
        ],
    }

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Youtube, href: '#', label: 'Youtube' },
    ]

    return (
        <footer className="bg-dark border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <FooterBrand socialLinks={socialLinks} />
                    <FooterColumn title="روابط سريعة" links={footerLinks.quickLinks} />
                    <FooterColumn title="الأقسام" links={footerLinks.categories} />
                    <FooterContact />
                </div>
                <FooterBottom links={footerLinks.support} />
            </div>
        </footer>
    )
}


function FooterBrand({ socialLinks }) {
    return (
        <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-glow-primary">
                    <Package className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">الطفل المبدع</span>
            </Link>
            <p className="text-gray-400 mb-6">
                متجرك المفضل لألعاب الأطفال والوسائل التعليمية. نقدم أفضل المنتجات بأعلى جودة وأفضل الأسعار.
            </p>
            <div className="flex gap-4">
                {socialLinks.map((social) => (
                    <a
                        key={social.label}
                        href={social.href}
                        className="w-10 h-10 glass-effect rounded-full flex items-center justify-center hover:bg-primary transition-colors border border-gray-700 hover:border-primary"
                        aria-label={social.label}
                    >
                        <social.icon className="w-5 h-5 text-gray-400 hover:text-white" />
                    </a>
                ))}
            </div>
        </div>
    )
}

function FooterColumn({ title, links }) {
    return (
        <div>
            <h3 className="text-lg font-bold text-white mb-6">{title}</h3>
            <ul className="space-y-3">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function FooterContact() {
    return (
        <div>
            <h3 className="text-lg font-bold text-white mb-6">تواصل معنا</h3>
            <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-400">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>القاهرة، مصر</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                    <Phone className="w-5 h-5 text-primary" />
                    <span dir="ltr">+20 111 319 087</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-sm">creative.kid.world.online@gmail.com</span>
                </li>
            </ul>
        </div>
    )
}

function FooterBottom({ links }) {
    return (
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
                © 2025 الطفل المبدع. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-gray-500 text-sm hover:text-primary transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}
