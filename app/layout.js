import './globals.css'
import { Toaster } from 'react-hot-toast'
import dynamic from 'next/dynamic'

// Lazy load non-critical components
const Chatbot = dynamic(() => import('@/components/Chatbot'), { ssr: false })
const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: false })

export const metadata = {
  title: 'الطفل المبدع | ألعاب أطفال تعليمية',
  description: 'متجر ألعاب الأطفال التعليمية',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="light">
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        {children}
        <Chatbot />
        <BackToTop />
      </body>
    </html>
  )
}
