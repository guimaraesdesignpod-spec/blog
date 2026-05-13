import Link from 'next/link'
import { LogoMark } from '@/components/Logo'
import ThemeToggle from '@/components/ThemeToggle'

type Lang = 'en' | 'pt'

export default function Header({ lang }: { lang: Lang }) {
  return (
    <header className="border-b border-[var(--rule)]" style={{ background: 'color-mix(in srgb, var(--bg) 92%, transparent)' }}>
      <div className="mx-auto max-w-[1280px] px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2 font-sans text-base font-semibold tracking-tight text-[var(--ink)]">
          <LogoMark />
          <span>Brain<em className="font-normal text-[var(--accent)]">wire</em></span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href={`/${lang === 'en' ? 'pt' : 'en'}${typeof window !== 'undefined' ? window.location.pathname.replace(/^\/(en|pt)/, '') : ''}`}
            className="text-xs uppercase tracking-widest text-[var(--ink-light)] hover:text-[var(--accent)] transition-colors font-sans"
          >
            {lang === 'en' ? 'PT' : 'EN'}
          </Link>
        </div>
      </div>
    </header>
  )
}