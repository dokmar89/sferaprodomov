'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { TopBar } from '@/components/ui/top-bar'
import { Footer } from '@/components/layout/footer'
import { Toaster } from '@/components/ui/toaster'
import { WelcomePopupProvider } from '@/components/welcome-popup-provider'
import { CookieConsent } from '@/components/ui/cookie-consent'

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname.startsWith('/studio')

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <WelcomePopupProvider>
      <TopBar />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <Toaster />
      <CookieConsent />
    </WelcomePopupProvider>
  )
}
