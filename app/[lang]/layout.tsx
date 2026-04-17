import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const VALID_LANGS = ['en', 'pt'] as const
type Lang = typeof VALID_LANGS[number]

interface Props {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return VALID_LANGS.map(lang => ({ lang }))
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params
  if (!VALID_LANGS.includes(lang as Lang)) notFound()

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang as Lang} />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
