import './globals.css'
import { Toaster } from 'react-hot-toast'
import { generateMetadata as genMeta, generateOrganizationSchema, generateLocalBusinessSchema, siteConfig } from '@/lib/seo'
import Script from 'next/script'
import Chatbot from '@/components/Chatbot'
import ThemeProvider from '@/components/ThemeProvider'
import BackToTop from '@/components/BackToTop'

export const metadata = genMeta({
  title: null,
  description: 'متجر الطفل المبدع - أفضل متجر لألعاب الأطفال والوسائل التعليمية في مصر. ألعاب آمنة وتعليمية بأسعار مناسبة مع توصيل لجميع المحافظات. ألعاب مونتيسوري، ألعاب خشبية، ألعاب تعليمية.',
  keywords: ['ألعاب أطفال مصر', 'متجر ألعاب القاهرة', 'ألعاب تعليمية للأطفال', 'هدايا أطفال'],
})

export default function RootLayout({ children }) {
  const organizationSchema = generateOrganizationSchema()
  const localBusinessSchema = generateLocalBusinessSchema()

  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color */}
        <meta name="theme-color" content="#0F172A" />
        <meta name="msapplication-TileColor" content="#8B5CF6" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-arabic light">
        <ThemeProvider>
          <Toaster position="top-center" />
          {children}
          <Chatbot />
          <BackToTop />
        </ThemeProvider>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>

        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  )
}
