import Link from 'next/link'

type Lang = 'en' | 'pt'

interface Props {
  lang: Lang
}

export default function Header({ lang }: Props) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={`/${lang}`} className="text-xl font-bold text-gray-900 hover:text-blue-600">
          Blog
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/en"
            className={`text-sm font-medium ${lang === 'en' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            EN
          </Link>
          <Link
            href="/pt"
            className={`text-sm font-medium ${lang === 'pt' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            PT
          </Link>
        </nav>
      </div>
    </header>
  )
}
