'use client'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

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
    return (
        <section className="py-20 bg-dark-lighter relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <SectionHeader />
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}


function SectionHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
        >
            <span className="text-secondary font-semibold">آراء العملاء</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">ماذا يقول عملاؤنا</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                نفخر بثقة عملائنا ونسعى دائماً لتقديم أفضل تجربة تسوق
            </p>
        </motion.div>
    )
}

function TestimonialCard({ testimonial, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 border border-gray-800 hover:border-primary/50 transition-all relative group"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            
            <div className="absolute top-6 left-6 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-primary" />
            </div>

            <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
            </div>

            <p className="text-gray-300 leading-relaxed mb-6">{testimonial.content}</p>

            <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center text-3xl">
                    {testimonial.avatar}
                </div>
                <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
            </div>
        </motion.div>
    )
}
