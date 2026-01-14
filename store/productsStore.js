import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialProducts = [
    { id: 1, name: 'مكعبات البناء الملونة - 100 قطعة', price: 299, oldPrice: 399, category: 'ألعاب البناء', rating: 5, reviews: 128, emoji: '🧱', image: '', isNew: true, discount: 25, ageRange: '3-8 سنوات', description: 'مكعبات بناء ملونة عالية الجودة مصنوعة من البلاستيك الآمن.', benefits: ['تنمية المهارات الحركية', 'تعزيز الإبداع والخيال', 'تعلم الألوان والأشكال', 'تحسين التركيز'], stock: 50, featured: true },
    { id: 2, name: 'دمية تعليمية ناطقة بالعربية', price: 450, oldPrice: 0, category: 'ألعاب تعليمية', rating: 4, reviews: 89, emoji: '🧸', image: '', isNew: true, discount: 0, ageRange: '2-6 سنوات', description: 'دمية تعليمية تفاعلية تنطق بالعربية وتعلم الحروف والأرقام.', benefits: ['تعلم اللغة العربية', 'تنمية مهارات الاستماع', 'التفاعل الاجتماعي', 'تعزيز الثقة بالنفس'], stock: 30, featured: false },
    { id: 3, name: 'لوحة الرسم المغناطيسية', price: 180, oldPrice: 220, category: 'فنون وحرف', rating: 5, reviews: 156, emoji: '🎨', image: '', isNew: false, discount: 18, ageRange: '3-10 سنوات', description: 'لوحة رسم مغناطيسية سهلة المسح مع أقلام ملونة.', benefits: ['تنمية مهارات الرسم', 'تعزيز الإبداع الفني', 'صديقة للبيئة', 'سهلة الاستخدام'], stock: 75, featured: true },
    { id: 4, name: 'سيارة تحكم عن بعد', price: 550, oldPrice: 0, category: 'ألعاب إلكترونية', rating: 4, reviews: 72, emoji: '🚗', image: '', isNew: false, discount: 0, ageRange: '6-12 سنة', description: 'سيارة تحكم عن بعد بتصميم رياضي وسرعة عالية.', benefits: ['تنمية التنسيق الحركي', 'تعلم التحكم عن بعد', 'المرح والترفيه', 'تعزيز التركيز'], stock: 25, featured: false },
    { id: 5, name: 'بازل خشبي - خريطة مصر', price: 150, oldPrice: 200, category: 'ألغاز وتركيب', rating: 5, reviews: 203, emoji: '🧩', image: '', isNew: true, discount: 25, ageRange: '4-10 سنوات', description: 'بازل خشبي تعليمي يعرض خريطة مصر بالمحافظات.', benefits: ['تعلم الجغرافيا', 'تنمية الذاكرة', 'حل المشكلات', 'التعرف على الوطن'], stock: 100, featured: true },
    { id: 6, name: 'كرة قدم للأطفال', price: 120, oldPrice: 0, category: 'ألعاب خارجية', rating: 4, reviews: 95, emoji: '⚽', image: '', isNew: false, discount: 0, ageRange: '4-12 سنة', description: 'كرة قدم مناسبة للأطفال بحجم مثالي وخامة عالية الجودة.', benefits: ['تنمية اللياقة البدنية', 'العمل الجماعي', 'تعزيز الصحة', 'المرح في الهواء الطلق'], stock: 60, featured: false },
]

export const useProductsStore = create(
    persist(
        (set, get) => ({
            products: initialProducts,
            
            addProduct: (product) => set((state) => ({
                products: [...state.products, { ...product, id: Date.now(), reviews: 0, rating: 0 }]
            })),
            
            updateProduct: (id, updates) => set((state) => ({
                products: state.products.map(p => p.id === id ? { ...p, ...updates } : p)
            })),
            
            deleteProduct: (id) => set((state) => ({
                products: state.products.filter(p => p.id !== id)
            })),
            
            getProduct: (id) => get().products.find(p => p.id === id),
            
            getProductsByCategory: (category) => {
                if (category === 'الكل') return get().products
                return get().products.filter(p => p.category === category)
            },
            
            getFeaturedProducts: () => get().products.filter(p => p.featured),
            
            getOffersProducts: () => get().products.filter(p => p.discount > 0),
        }),
        { name: 'products-storage' }
    )
)
