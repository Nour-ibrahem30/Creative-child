'use client'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Heart, Shield, Truck, Award, Users, Target, Sparkles } from 'lucide-react'

const stats = [
    { value: '10K+', label: 'عميل سعيد' },
    { value: '500+', label: 'منتج متنوع' },
    { value: '50+', label: 'علامة تجارية' },
    { value: '99%', label: 'رضا العملاء' },
]

const values = [
    { icon: Heart, title: 'الجودة أولاً', description: 'نختار منتجاتنا بعناية لضمان أعلى معايير الجودة والأمان', color: 'from-pink-500 to-rose-500' },
    { icon: Shield, title: 'الأمان للأطفال', description: 'جميع منتجاتنا آمنة ومعتمدة للاستخدام من قبل الأطفال', color: 'from-green-500 to-emerald-500' },
    { icon: Truck, title: 'توصيل سريع', description: 'نوصل طلباتك بسرعة وأمان إلى باب منزلك', color: 'from-cyan-500 to-blue-500' },
    { icon: Award, title: 'ضمان الجودة', description: 'نقدم ضمان على جميع منتجاتنا لراحة بالك', color: 'from-amber-500 to-orange-500' },
]

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-dark">
            <Navbar />
            <div className="pt-24 pb-20">
                <HeroSection />
                <StatsSection />
                <MissionSection />
                <ValuesSection />
            </div>
            <Footer />
        </main>
    )
}

function HeroSection() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 mesh-bg opacity-50" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        من نحن <span className="gradient-text">؟</span>
                    </h1>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        الطفل المبدع هو متجرك المفضل لألعاب الأطفال والوسائل التعليمية. نؤمن بأن اللعب هو أفضل طريقة للتعلم،
                        ولذلك نقدم مجموعة متنوعة من الألعاب التي تجمع بين المتعة والتعليم.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

function StatsSection() {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center glass-card rounded-2xl p-6 border border-gray-800"
                        >
                            <div className="text-4xl md:text-5xl font-bold gradient-text">
                                {stat.value}
                            </div>
                            <div className="text-gray-400 mt-2">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function MissionSection() {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                                <Target className="w-6 h-6 text-primary" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">رسالتنا</h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            نسعى لتوفير أفضل الألعاب التعليمية والترفيهية التي تساعد في تنمية مهارات الأطفال
                            وتطوير قدراتهم الإبداعية والذهنية، مع الحفاظ على أعلى معايير الجودة والأمان.
                        </p>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-secondary" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">رؤيتنا</h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            أن نكون الوجهة الأولى للآباء والأمهات في مصر والوطن العربي للحصول على
                            ألعاب آمنة وتعليمية تساهم في بناء جيل مبدع ومتميز.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-center"
                    >
                        <div className="text-[200px]" style={{ filter: 'drop-shadow(0 0 40px rgba(139, 92, 246, 0.3))' }}>🎯</div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

function ValuesSection() {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-2">
                        <Sparkles className="w-8 h-8 text-primary" />
                        قيمنا
                    </h2>
                    <p className="text-gray-400 mt-4">المبادئ التي نعمل بها كل يوم</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card rounded-2xl p-6 text-center border border-gray-800 hover:border-primary/50 transition-all group"
                        >
                            <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                <value.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-bold text-white mb-2">{value.title}</h3>
                            <p className="text-gray-500 text-sm">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
