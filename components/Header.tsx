import Link from 'next/link'

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
    <header style={{ borderBottom: '1px solid #232326', background: '#0D0D0F' }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 32px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href={`/${lang}`} style={{
          display: 'flex', alignItems: 'center', gap: '0.5em',
          fontFamily: 'var(--sans)',
          fontSize: '1.05rem',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: '#F4F4F5',
        }}>
          <LogoMark />
          <span>Brain<em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>wire</em></span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href={`/${lang === 'en' ? 'pt' : 'en'}`} style={{
            fontSize: '13px',
            color: '#52525B',
            letterSpacing: '0.04em',
          }}>
            {lang === 'en' ? 'PT' : 'EN'}
          </Link>
        </div>
      </div>
    </header>
  )
}
