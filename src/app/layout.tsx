import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import type { Metadata, Viewport } from 'next'
import { SITE_URL } from '@/lib/seo-utils'
import { Inter } from 'next/font/google'

// Optimize font loading with proper display strategy
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  fallback: ['system-ui', 'sans-serif'],
})

// Base metadata for the entire site
export const metadata: Metadata = {
  title: {
    template: '%s | Oussama Hattan',
    default: 'Oussama Hattan - Full Stack Developer'
  },
  description: 'Full Stack Developer specializing in modern web technologies',
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  verification: {
    google: 'google-site-verification-code', // Replace with your verification code if available
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body suppressHydrationWarning className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
