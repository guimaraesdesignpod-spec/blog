import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Lora, DM_Mono, DM_Sans } from 'next/font/google'
import Script from 'next/script'
import { headers } from 'next/headers'
import './globals.css'

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Brainwire',
    default: 'Brainwire',
  },
  description: 'Bilingual blog about AI productivity tools and technology',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID
  const headersList = await headers()
  const lang = headersList.get('x-lang') || 'en'

  return (
    <html
      lang={lang}
      className={`${lora.variable} ${dmMono.variable} ${dmSans.variable}`}
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        {publisherId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
      </head>
      <body>{children}<Analytics /></body>
    </html>
  )
}
