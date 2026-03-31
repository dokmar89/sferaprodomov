import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteLayout } from '@/components/layout/site-layout'
import { GoogleAnalytics } from '@/components/ui/google-analytics'
import { FacebookPixel } from '@/components/ui/facebook-pixel'
import { GoogleTagManager } from '@/components/ui/google-tag-manager'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { UtmCapture } from '@/components/utm-capture'

// Inter - moderní a čitelný webový font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SFERA - Klimatizace, Tepelná čerpadla, Rekuperace, Elektroinstalace',
  description:
    'Profesionální klimatizace, tepelná čerpadla a rekuperace. Nadstandardní servis, montáž do 14 dnů, 0% záloha na skladové zboží. Opava.',
  keywords: 'klimatizace, tepelná čerpadla, rekuperace, elektroinstalace, servis, montáž, Opava',
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-32x32.png',
    apple: '/favicon/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <GoogleAnalytics />
        <FacebookPixel />
        <GoogleTagManager />
        <Analytics />
        <SpeedInsights />
        <UtmCapture />
        <ThemeProvider theme="default">
          <SiteLayout>{children}</SiteLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
