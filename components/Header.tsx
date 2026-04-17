import Link from 'next/link'

type Lang = 'en' | 'pt'

interface Props {
  lang: Lang
}

export default function Header({ lang }: Props) {
  return (
    <header style={{
      borderBottom: '1px solid #252528',
      background: '#0C0C0E',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href={`/${lang}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: '22px',
            color: '#F2F2EF',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>
            Blog
          </span>
          <span style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#E8A838',
            display: 'inline-block',
            flexShrink: 0,
          }} />
        </Link>

        <nav>
          <div style={{
            display: 'flex',
            background: '#141416',
            border: '1px solid #252528',
            borderRadius: '4px',
            padding: '3px',
            gap: '2px',
          }}>
            {(['en', 'pt'] as Lang[]).map(l => (
              <Link
                key={l}
                href={`/${l}`}
                className={`lang-pill${lang === l ? ' active' : ''}`}
              >
                {l}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
