import { notFound } from 'next/navigation'

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

  return <>{children}</>
}
