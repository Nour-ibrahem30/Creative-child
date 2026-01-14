'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useThemeStore } from '@/store/themeStore'

export default function ThemeProvider({ children }) {
    const { theme } = useThemeStore()
    const pathname = usePathname()
    
    const isDashboard = pathname?.startsWith('/dashboard')

    useEffect(() => {
        // Remove all theme classes first
        document.body.classList.remove('light', 'dark', 'dashboard')
        
        if (isDashboard) {
            // Dashboard is always dark
            document.body.classList.add('dashboard')
        } else {
            // Apply user's theme preference for website
            document.body.classList.add(theme)
        }
    }, [theme, isDashboard])

    return <>{children}</>
}
