import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Admin credentials
const ADMIN_EMAIL = 'creative.kid.world.online@gmail.com'
const ADMIN_PASSWORD = '16122003'

export const useAuthStore = create(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            user: null,
            
            login: (email, password) => {
                if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                    set({ 
                        isAuthenticated: true, 
                        user: { 
                            email: ADMIN_EMAIL, 
                            name: 'مدير المتجر',
                            role: 'admin' 
                        } 
                    })
                    return { success: true }
                }
                return { success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' }
            },
            
            logout: () => {
                set({ isAuthenticated: false, user: null })
            },
            
            checkAuth: () => {
                return get().isAuthenticated
            }
        }),
        { name: 'auth-storage' }
    )
)
