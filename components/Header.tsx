import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

type Lang = 'en' | 'pt'

function LogoMark() {
  return (
    <div style={{
      width: '22px', height: '22px',
      background: 'var(--accent)',
      borderRadius: '5px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="3" cy="6.5" r="1.5" fill="white" />
        <circle cx="6.5" cy="3" r="1.5" fill="white" />
        <circle cx="10" cy="6.5" r="1.5" fill="white" />
        <circle cx="6.5" cy="10" r="1.5" fill="white" />
        <line x1="3" y1="6.5" x2="6.5" y2="3" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="6.5" y1="3" x2="10" y2="6.5" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="10" y1="6.5" x2="6.5" y2="10" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="6.5" y1="10" x2="3" y2="6.5" stroke="white" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  )
}

export default function Header({ lang }: { lang: Lang }) {
  return (
    <header className="border-b border-[#232326] bg-[#0D0D0F]">
      <div className="mx-auto max-w-[1100px] px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2 font-sans text-base font-semibold tracking-tight text-[#F4F4F5]">
          <LogoMark />
          <span>Brain<em className="font-normal text-[var(--accent)]">wire</em></span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href={`/${lang === 'en' ? 'pt' : 'en'}`} className="text-[13px] text-[#52525B] tracking-wide">
            {lang === 'en' ? 'PT' : 'EN'}
          </Link>
        </div>
      </div>
    </header>
  )
}