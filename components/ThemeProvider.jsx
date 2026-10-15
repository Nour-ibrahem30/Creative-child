'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useThemeStore } from '@/store/themeStore'

export default function ThemeProvider({ children }) {
    const { theme, setTheme } = useThemeStore()
    const pathname = usePathname()
    
    const isDashboard = pathname?.startsWith('/dashboard')

    useEffect(() => {
        // The storefront follows the approved light art direction.
        if (!isDashboard && theme !== 'light') setTheme('light')
        // Remove all theme classes first
        document.body.classList.remove('light', 'dark', 'dashboard')
        
        if (isDashboard) {
            // Dashboard is always dark
            document.body.classList.add('dashboard')
        } else {
            // Apply user's theme preference for website
            document.body.classList.add('light')
        }
    }, [theme, isDashboard, setTheme])

    return <>{children}</>
}

