'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Search, ShoppingBag, HelpCircle, Phone, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useThemeStore } from '@/store/themeStore'

// قاعدة بيانات المنتجات الكاملة
const productsDB = [
    { id: 1, name: 'مكعبات البناء الملونة', category: 'ألعاب البناء', price: 299, oldPrice: 399, emoji: '🧱', age: '3-8', keywords: ['مكعبات', 'بناء', 'ليجو', 'تركيب', 'بلوكات', 'blocks', 'lego', 'بلوك'] },
    { id: 2, name: 'دمية تعليمية ناطقة بالعربية', category: 'ألعاب تعليمية', price: 450, emoji: '🧸', age: '2-6', keywords: ['دمية', 'دمي', 'تعليمية', 'ناطقة', 'عربي', 'دب', 'عروسة', 'بنات', 'teddy'] },
    { id: 3, name: 'لوحة الرسم المغناطيسية', category: 'فنون وحرف', price: 180, oldPrice: 220, emoji: '🎨', age: '3-10', keywords: ['رسم', 'لوحة', 'فن', 'ألوان', 'تلوين', 'مغناطيس', 'drawing', 'art'] },
    { id: 4, name: 'سيارة تحكم عن بعد', category: 'ألعاب إلكترونية', price: 550, emoji: '🚗', age: '6-12', keywords: ['سيارة', 'سيارات', 'ريموت', 'تحكم', 'إلكترونية', 'عربية', 'عربيات', 'rc', 'car', 'remote'] },
    { id: 5, name: 'بازل خشبي خريطة مصر', category: 'ألغاز وتركيب', price: 150, oldPrice: 200, emoji: '🧩', age: '4-10', keywords: ['بازل', 'puzzle', 'خشب', 'خريطة', 'مصر', 'ألغاز', 'تركيب'] },
    { id: 6, name: 'كرة قدم للأطفال', category: 'ألعاب خارجية', price: 120, emoji: '⚽', age: '4-12', keywords: ['كرة', 'كورة', 'قدم', 'رياضة', 'خارجية', 'football', 'ball', 'sport'] },
    { id: 7, name: 'مجموعة الطبيب الصغير', category: 'ألعاب تعليمية', price: 280, oldPrice: 350, emoji: '🩺', age: '3-8', keywords: ['طبيب', 'دكتور', 'مهن', 'تعليمية', 'doctor', 'medical'] },
    { id: 8, name: 'قطار موسيقي للرضع', category: 'ألعاب الرضع', price: 320, emoji: '🚂', age: '0-3', keywords: ['قطار', 'موسيقى', 'رضع', 'بيبي', 'baby', 'train', 'صغار', 'رضيع'] },
    { id: 9, name: 'طائرة درون للأطفال', category: 'ألعاب إلكترونية', price: 890, emoji: '🚁', age: '8-14', keywords: ['درون', 'drone', 'طائرة', 'تصوير', 'طيارة', 'helicopter'] },
    { id: 10, name: 'دراجة توازن للأطفال', category: 'ألعاب خارجية', price: 750, emoji: '🚲', age: '2-5', keywords: ['دراجة', 'عجلة', 'توازن', 'bike', 'bicycle', 'balance'] },
    { id: 11, name: 'مجموعة ألوان مائية', category: 'فنون وحرف', price: 95, oldPrice: 120, emoji: '🖌️', age: '4-12', keywords: ['ألوان', 'الوان', 'مائية', 'رسم', 'فن', 'colors', 'paint', 'watercolor'] },
    { id: 12, name: 'مجموعة ليجو كلاسيك', category: 'ألعاب البناء', price: 650, oldPrice: 800, emoji: '🏗️', age: '4-12', keywords: ['ليجو', 'lego', 'بناء', 'تركيب', 'كلاسيك'] },
]

// دالة البحث الذكي
const smartSearch = (query) => {
    const q = query.toLowerCase().trim()
    const words = q.split(/\s+/)
    
    return productsDB.filter(product => {
        // البحث في الاسم
        if (product.name.toLowerCase().includes(q)) return true
        // البحث في الفئة
        if (product.category.toLowerCase().includes(q)) return true
        // البحث في الكلمات المفتاحية
        for (const word of words) {
            if (word.length < 2) continue
            if (product.keywords.some(k => k.includes(word) || word.includes(k))) return true
            if (product.name.toLowerCase().includes(word)) return true
            if (product.category.toLowerCase().includes(word)) return true
        }
        return false
    })
}

// دالة تحديد العمر
const getAgeFromMessage = (msg) => {
    // أنماط مختلفة للعمر
    const patterns = [
        /(\d+)\s*(سنة|سنين|سنوات|year|years)/i,
        /(\d+)\s*(شهر|شهور|month|months)/i,
        /عمر[هو]?\s*(\d+)/i,
        /(\d+)\s*سن/i,
        /طفل[ي]?\s*(\d+)/i,
        /ابن[ي]?\s*(\d+)/i,
        /بنت[ي]?\s*(\d+)/i,
    ]
    
    for (const pattern of patterns) {
        const match = msg.match(pattern)
        if (match) {
            const num = parseInt(match[1])
            const isMonths = msg.includes('شهر') || msg.includes('month')
            return isMonths ? num / 12 : num
        }
    }
    return null
}

// دالة توليد الرد الذكي
const generateSmartResponse = (userMessage) => {
    const msg = userMessage.toLowerCase().trim()
    
    // === التحيات ===
    const greetings = ['مرحبا', 'اهلا', 'أهلا', 'السلام', 'هاي', 'hi', 'hello', 'صباح', 'مساء', 'ازيك', 'عامل']
    if (greetings.some(g => msg.includes(g))) {
        const responses = [
            'أهلاً بيك! 😊 أنا مساعدك في متجر الطفل المبدع.\n\nإزاي أقدر أساعدك النهاردة؟',
            'مرحباً! 👋 نورت متجر الطفل المبدع.\n\nبتدور على لعبة معينة؟',
            'أهلاً وسهلاً! 🌟 أنا هنا عشان أساعدك تلاقي أحلى الألعاب لطفلك!'
        ]
        return { text: responses[Math.floor(Math.random() * responses.length)], products: [] }
    }

    // === الشكر ===
    if (['شكرا', 'شكر', 'thanks', 'thank', 'متشكر'].some(t => msg.includes(t))) {
        return { text: 'العفو! 😊 لو محتاج أي حاجة تانية أنا موجود.\n\nتقدر تسألني عن أي لعبة!', products: [] }
    }

    // === الوداع ===
    if (['باي', 'bye', 'مع السلامة', 'سلام'].some(b => msg.includes(b))) {
        return { text: 'مع السلامة! 👋 نورتنا وفي انتظارك دايماً.\n\nلو محتاج حاجة ارجعلنا! 🛒', products: [] }
    }

    // === المساعدة ===
    if (['مساعدة', 'ساعدني', 'ساعد', 'help', 'ازاي', 'كيف استخدم', 'بتعمل ايه'].some(h => msg.includes(h))) {
        return { 
            text: '🤖 أنا مساعدك الذكي! أقدر أساعدك في:\n\n🔍 البحث عن ألعاب - اكتب اسم اللعبة\n👶 اقتراح ألعاب حسب العمر - قولي عمر طفلك\n💰 معرفة الأسعار والعروض\n📞 معلومات التواصل والشحن\n\n✨ جرب تكتب:\n• "عايز سيارة"\n• "لعبة لطفل 5 سنين"\n• "إيه العروض؟"', 
            products: [] 
        }
    }

    // === التواصل ===
    if (['تواصل', 'رقم', 'هاتف', 'تليفون', 'موبايل', 'فون', 'إيميل', 'ايميل', 'عنوان', 'اتصل', 'كلم'].some(c => msg.includes(c))) {
        return { 
            text: '📞 معلومات التواصل:\n\n📱 هاتف: +20 111 319 087\n📱 هاتف: +20 102 184 3420\n📧 إيميل: creative.kid.world.online@gmail.com\n📍 العنوان: القاهرة، مصر\n⏰ مواعيد العمل: السبت - الخميس من 9ص لـ 9م\n\n💬 أو تقدر تتواصل معانا على واتساب!', 
            products: [] 
        }
    }

    // === الشحن والتوصيل ===
    if (['شحن', 'توصيل', 'delivery', 'يوصل', 'كام يوم', 'بيوصل', 'التوصيل'].some(s => msg.includes(s))) {
        return { 
            text: '🚚 معلومات التوصيل:\n\n✅ توصيل مجاني للطلبات فوق 500 ج.م\n📦 مدة التوصيل: 2-5 أيام عمل\n🔄 إرجاع مجاني خلال 14 يوم\n💵 الدفع عند الاستلام متاح\n🏙️ نوصل لجميع المحافظات\n\nعندك سؤال تاني؟ 😊', 
            products: [] 
        }
    }

    // === الدفع ===
    if (['دفع', 'فلوس', 'payment', 'كاش', 'فيزا', 'فودافون', 'ادفع', 'طريقة الدفع'].some(p => msg.includes(p))) {
        return { 
            text: '💳 طرق الدفع المتاحة:\n\n💵 الدفع عند الاستلام (كاش)\n📱 فودافون كاش\n🏦 تحويل بنكي\n💳 بطاقة ائتمان (Visa/Mastercard)\n\nاختار الطريقة اللي تناسبك! 😊', 
            products: [] 
        }
    }

    // === العروض والخصومات ===
    if (['عرض', 'عروض', 'خصم', 'خصومات', 'تخفيض', 'offer', 'discount', 'sale', 'اوفر', 'رخيص'].some(o => msg.includes(o))) {
        const discountedProducts = productsDB.filter(p => p.oldPrice)
        return { 
            text: '🔥 العروض الحالية:\n\n' + 
                discountedProducts.map(p => `${p.emoji} ${p.name}\n   💰 ${p.price} ج.م بدلاً من ${p.oldPrice} ج.م (خصم ${Math.round((1 - p.price/p.oldPrice) * 100)}%)`).join('\n\n') +
                '\n\n🎁 + توصيل مجاني للطلبات فوق 500 ج.م!\n\nعايز تشوف منتج معين؟', 
            products: discountedProducts.slice(0, 3) 
        }
    }

    // === الأقسام ===
    if (['قسم', 'أقسام', 'اقسام', 'categories', 'انواع', 'فئات', 'تصنيف'].some(c => msg.includes(c))) {
        return { 
            text: '📂 الأقسام المتاحة:\n\n📚 ألعاب تعليمية - تنمي ذكاء طفلك\n🧱 ألعاب البناء - للإبداع والتركيب\n🎨 فنون وحرف - للرسم والتلوين\n🎮 ألعاب إلكترونية - سيارات ودرون\n⚽ ألعاب خارجية - رياضة ونشاط\n👶 ألعاب الرضع - آمنة للصغار\n🧩 ألغاز وتركيب - لتنمية التفكير\n\nاختار قسم وهقولك المنتجات! 🛒', 
            products: [] 
        }
    }

    // === البحث حسب العمر ===
    const age = getAgeFromMessage(msg)
    if (age !== null) {
        let ageProducts = []
        let ageText = ''
        
        if (age < 1) {
            ageProducts = productsDB.filter(p => p.age.startsWith('0'))
            ageText = `للرضع (أقل من سنة)`
        } else if (age <= 2) {
            ageProducts = productsDB.filter(p => p.age.includes('0-') || p.age.includes('2-') || p.age.startsWith('2'))
            ageText = `للأطفال ${age} سنة`
        } else if (age <= 5) {
            ageProducts = productsDB.filter(p => {
                const [min] = p.age.split('-').map(Number)
                return min <= age && age <= 8
            })
            ageText = `للأطفال ${age} سنوات`
        } else if (age <= 8) {
            ageProducts = productsDB.filter(p => {
                const parts = p.age.split('-').map(Number)
                return parts[0] <= age && age <= (parts[1] || parts[0])
            })
            ageText = `للأطفال ${age} سنوات`
        } else {
            ageProducts = productsDB.filter(p => {
                const parts = p.age.split('-').map(Number)
                return (parts[1] || parts[0]) >= 8
            })
            ageText = `للأطفال ${age} سنوات`
        }

        if (ageProducts.length > 0) {
            return {
                text: `🎯 أفضل الألعاب ${ageText}:\n\n` +
                    ageProducts.slice(0, 4).map(p => 
                        `${p.emoji} ${p.name}\n   💰 ${p.price} ج.م ${p.oldPrice ? `(خصم!)` : ''}`
                    ).join('\n\n') +
                    `\n\n✨ كل الألعاب دي مناسبة وآمنة لهذا العمر!\nعايز تعرف تفاصيل أكتر عن أي منتج؟`,
                products: ageProducts.slice(0, 4)
            }
        }
    }

    // === البحث عن منتجات ===
    const foundProducts = smartSearch(msg)
    if (foundProducts.length > 0) {
        if (foundProducts.length === 1) {
            const p = foundProducts[0]
            return {
                text: `🎯 لقيت اللي بتدور عليه!\n\n${p.emoji} ${p.name}\n💰 السعر: ${p.price} ج.م ${p.oldPrice ? `(بدلاً من ${p.oldPrice} ج.م)` : ''}\n📁 القسم: ${p.category}\n👶 العمر المناسب: ${p.age} سنوات\n\n✅ متوفر للطلب الآن!\nعايز تضيفه للسلة؟ 🛒`,
                products: foundProducts
            }
        } else {
            return {
                text: `🔍 لقيت ${foundProducts.length} منتج:\n\n` +
                    foundProducts.slice(0, 4).map(p => 
                        `${p.emoji} ${p.name}\n   💰 ${p.price} ج.م`
                    ).join('\n\n') +
                    `\n\n${foundProducts.length > 4 ? `\n📦 وفيه ${foundProducts.length - 4} منتجات تانية...\n` : ''}\nعايز تفاصيل أكتر عن أي منتج؟`,
                products: foundProducts.slice(0, 4)
            }
        }
    }

    // === أسئلة عن السعر ===
    if (['سعر', 'كام', 'بكام', 'price', 'تكلفة', 'تكلف', 'ثمن'].some(p => msg.includes(p))) {
        return { 
            text: '💰 أسعارنا تبدأ من 95 ج.م وتصل لـ 890 ج.م\n\n📊 نطاق الأسعار:\n• ألوان وأدوات رسم: 95-180 ج.م\n• ألعاب تعليمية: 150-450 ج.م\n• ألعاب إلكترونية: 550-890 ج.م\n\n🔍 قولي اسم اللعبة وهقولك سعرها بالظبط!', 
            products: [] 
        }
    }

    // === أسئلة عن الجودة والأمان ===
    if (['جودة', 'أمان', 'امان', 'آمن', 'امن', 'ضمان', 'اصلي', 'أصلي', 'مضمون'].some(q => msg.includes(q))) {
        return { 
            text: '✅ ضمان الجودة والأمان:\n\n🛡️ جميع منتجاتنا أصلية 100%\n👶 آمنة للأطفال ومعتمدة دولياً\n📦 ضمان سنة على جميع المنتجات\n🔄 إرجاع مجاني خلال 14 يوم\n⭐ تقييم 4.9/5 من عملائنا\n\nراحة بالك أهم حاجة عندنا! 😊', 
            products: [] 
        }
    }

    // === البحث حسب الفئة ===
    const categoryKeywords = {
        'تعليمية': ['تعليم', 'تعليمية', 'تعلم', 'ذكاء', 'educational'],
        'بناء': ['بناء', 'تركيب', 'مكعبات', 'ليجو', 'building'],
        'فنون': ['رسم', 'تلوين', 'فن', 'ألوان', 'art'],
        'إلكترونية': ['إلكتروني', 'الكتروني', 'ريموت', 'تحكم', 'electronic'],
        'خارجية': ['خارجي', 'رياضة', 'حديقة', 'outdoor'],
        'رضع': ['رضيع', 'بيبي', 'رضع', 'صغير', 'baby'],
    }

    for (const [cat, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(k => msg.includes(k))) {
            const catProducts = productsDB.filter(p => p.category.includes(cat))
            if (catProducts.length > 0) {
                return {
                    text: `📂 منتجات ${cat === 'فنون' ? 'الفنون والحرف' : cat === 'رضع' ? 'الرضع' : 'ال' + cat}:\n\n` +
                        catProducts.map(p => `${p.emoji} ${p.name}\n   💰 ${p.price} ج.م`).join('\n\n') +
                        '\n\nعايز تفاصيل أكتر؟',
                    products: catProducts
                }
            }
        }
    }

    // === رد افتراضي محسن ===
    const defaultResponses = [
        `🤔 مش متأكد فهمت قصدك...\n\nجرب تكتب:\n• اسم لعبة (مثلاً: سيارة، مكعبات)\n• عمر طفلك (مثلاً: 5 سنين)\n• أو اسألني عن العروض والأسعار!`,
        `🤖 معلش مفهمتش...\n\nممكن تقولي:\n• بتدور على لعبة إيه؟\n• عمر الطفل كام سنة؟\n• أو اضغط على الأزرار السريعة تحت!`,
    ]
    
    return { 
        text: defaultResponses[Math.floor(Math.random() * defaultResponses.length)], 
        products: [] 
    }
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { 
            type: 'bot', 
            text: '👋 أهلاً بيك في متجر الطفل المبدع!\n\nأنا مساعدك الذكي، أقدر أساعدك تلاقي أحلى الألعاب لطفلك.\n\n✨ جرب تسألني:\n• "عايز لعبة لطفل 4 سنين"\n• "عندكم سيارات؟"\n• "إيه العروض؟"', 
            time: new Date(),
            products: []
        }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef(null)
    const { theme } = useThemeStore()
    const isLight = theme === 'light'

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = (messageText = null) => {
        const textToSend = messageText || input
        if (!textToSend.trim()) return

        setMessages(prev => [...prev, { type: 'user', text: textToSend, time: new Date() }])
        setInput('')
        setIsTyping(true)

        setTimeout(() => {
            const response = generateSmartResponse(textToSend)
            setMessages(prev => [...prev, { 
                type: 'bot', 
                text: response.text, 
                time: new Date(),
                products: response.products 
            }])
            setIsTyping(false)
        }, 600 + Math.random() * 400)
    }

    const quickActions = [
        { icon: Sparkles, text: 'العروض 🔥', action: 'إيه العروض والخصومات؟' },
        { icon: Search, text: 'الأقسام', action: 'إيه الأقسام المتاحة؟' },
        { icon: ShoppingBag, text: 'ألعاب 3 سنين', action: 'عايز لعبة لطفل 3 سنين' },
        { icon: Phone, text: 'تواصل معنا', action: 'إزاي أتواصل معاكم؟' },
    ]

    return (
        <>
            {/* زر فتح الشات */}
            <motion.button
                aria-label="فتح مساعد المتجر" onClick={() => setIsOpen(true)}
                className={`fixed bottom-4 left-4 z-50 ${isOpen ? 'hidden' : 'flex'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="relative">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                        <MessageCircle className="w-7 h-7 text-white" />
                    </div>
                    <span className={`absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 flex items-center justify-center ${isLight ? 'border-white' : 'border-dark'}`}>
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </span>
                    <motion.div 
                        className={`absolute -top-12 left-1/2 -translate-x-1/2 text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap ${
                            isLight ? 'bg-gray-900 text-white' : 'bg-white text-dark'
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, duration: 0.3 }}
                    >
                        محتاج مساعدة؟ 💬
                    </motion.div>
                </div>
            </motion.button>

            {/* نافذة الشات */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className={`fixed bottom-4 left-4 z-50 w-[calc(100vw-32px)] sm:w-[400px] h-[min(600px,80dvh)] rounded-3xl overflow-hidden flex flex-col shadow-2xl shadow-primary/10 ${
                            isLight 
                                ? 'bg-white border border-gray-200' 
                                : 'bg-dark-lighter border border-gray-700'
                        }`}
                    >
                        <ChatHeader onClose={() => setIsOpen(false)} />
                        <ChatMessages messages={messages} isTyping={isTyping} messagesEndRef={messagesEndRef} isLight={isLight} />
                        <QuickActions actions={quickActions} onAction={handleSend} isLight={isLight} />
                        <ChatInput input={input} setInput={setInput} onSend={() => handleSend()} isLight={isLight} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}


function ChatHeader({ onClose }) {
    return (
        <div className="bg-primary p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Bot className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">مساعد الطفل المبدع</h3>
                        <p className="text-xs text-white/80 flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            متصل الآن • يرد فوراً
                        </p>
                    </div>
                </div>
                <button 
                    onClick={onClose} 
                    className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                    <X className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>
    )
}

function ChatMessages({ messages, isTyping, messagesEndRef, isLight }) {
    return (
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isLight ? 'bg-gray-50' : 'bg-dark'}`}>
            {messages.map((msg, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                    <div className={`flex items-end gap-2 max-w-[90%] ${msg.type === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.type === 'user' 
                                ? isLight ? 'bg-gray-200' : 'bg-gray-700'
                                : 'bg-primary'
                        }`}>
                            {msg.type === 'user' 
                                ? <User className={`w-4 h-4 ${isLight ? 'text-gray-600' : 'text-gray-300'}`} /> 
                                : <Bot className="w-4 h-4 text-white" />
                            }
                        </div>
                        <div className="space-y-2">
                            <div className={`rounded-2xl px-4 py-3 ${
                                msg.type === 'user' 
                                    ? isLight 
                                        ? 'bg-gray-200 text-gray-900 rounded-br-sm' 
                                        : 'bg-gray-800 text-white rounded-br-sm'
                                    : isLight
                                        ? 'bg-white text-gray-800 rounded-bl-sm border border-gray-200 shadow-sm'
                                        : 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 rounded-bl-sm border border-gray-700'
                            }`}>
                                <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                            </div>
                            
                            {/* عرض المنتجات المقترحة */}
                            {msg.products && msg.products.length > 0 && (
                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    {msg.products.slice(0, 3).map(product => (
                                        <Link 
                                            key={product.id} 
                                            href={`/products/${product.id}`}
                                            className={`flex-shrink-0 rounded-xl p-2 transition-colors ${
                                                isLight 
                                                    ? 'bg-white hover:bg-gray-100 border border-gray-200' 
                                                    : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                                            }`}
                                        >
                                            <div className="text-2xl text-center mb-1">{product.emoji}</div>
                                            <div className={`text-xs w-20 truncate text-center ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>{product.name.split(' ').slice(0, 2).join(' ')}</div>
                                            <div className="text-xs text-primary font-bold text-center">{product.price} ج.م</div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
            
            {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className={`rounded-2xl px-4 py-3 ${
                            isLight ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
                        }`}>
                            <div className="flex gap-1.5">
                                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
            <div ref={messagesEndRef} />
        </div>
    )
}

function QuickActions({ actions, onAction, isLight }) {
    return (
        <div className={`px-4 py-3 border-t ${isLight ? 'border-gray-200 bg-white' : 'border-gray-800 bg-dark-lighter'}`}>
            <p className={`text-xs mb-2 ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>اختصارات سريعة:</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
                {actions.map((action, index) => (
                    <motion.button
                        key={index}
                        onClick={() => onAction(action.action)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all ${
                            isLight 
                                ? 'bg-gray-100 hover:bg-primary/10 text-gray-600 hover:text-primary border border-gray-200 hover:border-primary/30' 
                                : 'bg-gray-800 hover:bg-primary/20 text-gray-300 hover:text-white border border-gray-700 hover:border-primary/50'
                        }`}
                    >
                        <action.icon className="w-3.5 h-3.5" />
                        {action.text}
                    </motion.button>
                ))}
            </div>
        </div>
    )
}

function ChatInput({ input, setInput, onSend, isLight }) {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onSend()
        }
    }

    return (
        <div className={`p-4 border-t ${isLight ? 'border-gray-200 bg-white' : 'border-gray-800 bg-dark-lighter'}`}>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="اكتب رسالتك هنا... 💬"
                    className={`flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all text-sm ${
                        isLight 
                            ? 'bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary focus:bg-white' 
                            : 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-primary'
                    }`}
                />
                <motion.button
                    onClick={onSend}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!input.trim()}
                    className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                    <Send className="w-5 h-5 text-white" />
                </motion.button>
            </div>
        </div>
    )
}

