import { permanentRedirect } from 'next/navigation'
import { headers } from 'next/headers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: '/en',
    languages: { en: '/en', 'pt-BR': '/pt' },
  },
}

export default async function Home() {
  const headersList = await headers()
  const acceptLang = headersList.get('accept-language') ?? ''
  const lang = acceptLang.toLowerCase().startsWith('pt') ? 'pt' : 'en'
  permanentRedirect(`/${lang}`)
}
