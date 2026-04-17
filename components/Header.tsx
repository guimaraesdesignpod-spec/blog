import Link from 'next/link'

type Lang = 'en' | 'pt'

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
          fontFamily: 'var(--font-instrument-serif)',
          fontSize: '20px',
          letterSpacing: '-0.02em',
          color: '#F4F4F5',
        }}>
          Blog
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
