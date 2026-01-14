'use client'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'

const testimonials = [
    {
        id: 1,
        name: 'سارة أحمد',
        role: 'أم لطفلين',
        content: 'أفضل متجر للألعاب التعليمية! ابني يحب المكعبات التي اشتريتها وتعلم منها الكثير. الجودة ممتازة والتوصيل سريع.',
        rating: 5,
        avatar: '👩',
    },
    {
        id: 2,
        name: 'محمد علي',
        role: 'أب لثلاثة أطفال',
        content: 'تجربة تسوق رائعة! الأسعار مناسبة جداً مقارنة بالجودة. أنصح الجميع بالتعامل معهم.',
        rating: 5,
        avatar: '👨',
    },
    {
        id: 3,
        name: 'فاطمة محمود',
        role: 'معلمة روضة',
        content: 'أشتري منهم الوسائل التعليمية للروضة. المنتجات آمنة للأطفال ومصنوعة من مواد عالية الجودة.',
        rating: 5,
        avatar: '👩‍🏫',
    },
]

export default function Testimonials() {
    const { theme } = useThemeStore()
    const isLight = theme === 'light'

    return (
        <section className={`py-20 relative overflow-hidden ${isLight ? 'bg-white' : 'bg-gray-900'}`}>
            <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl ${isLight ? 'bg-primary/5' : 'bg-primary/5'}`} />
            <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl ${isLight ? 'bg-secondary/5' : 'bg-secondary/5'}`} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-secondary font-semibold">آراء العملاء</span>
                    <h2 className={`text-3xl md:text-4xl font-bold mt-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                        ماذا يقول عملاؤنا
                    </h2>
                    <p className={`mt-4 max-w-2xl mx-auto ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                        نفخر بثقة عملائنا ونسعى دائماً لتقديم أفضل تجربة تسوق
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`rounded-3xl p-8 transition-all relative group ${
                                isLight 
                                    ? 'bg-gray-50 border border-gray-200 hover:shadow-xl hover:border-primary/30 hover:bg-white' 
                                    : 'bg-gray-800/50 border border-gray-700 hover:border-primary/50'
                            }`}
                        >
                            <div className={`absolute top-6 left-6 w-12 h-12 rounded-full flex items-center justify-center ${
                                isLight ? 'bg-primary/10' : 'bg-primary/20'
                            }`}>
                                <Quote className="w-6 h-6 text-primary" />
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                                ))}
                            </div>

                            <p className={`leading-relaxed mb-6 ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                                {testimonial.content}
                            </p>

                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl ${
                                    isLight ? 'bg-gradient-to-br from-primary/10 to-secondary/10' : 'bg-gradient-to-br from-primary/30 to-secondary/30'
                                }`}>
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <h4 className={`font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
