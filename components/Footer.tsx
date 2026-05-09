interface FooterProps {
  labels: {
    footer_about: string;
    footer_copyright: string;
  }
  lang?: string;
}

export default function Footer({ labels, lang }: FooterProps) {
  const aboutHref = lang === 'pt' ? '/pt/sobre' : '/en/about'
  const hireHref = lang === 'pt' ? '/pt/contratar' : '/en/hire-me'
  const aboutLabel = lang === 'pt' ? 'Sobre' : 'About'
  const hireLabel = lang === 'pt' ? 'Contratar' : 'Hire Me'

  return (
    <footer style={{
      borderTop: '1px solid var(--rule)',
      padding: '2rem 2.5rem',
      marginTop: 'auto',
      textAlign: 'center',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
        marginBottom: '1rem',
      }}>
        <a href={aboutHref} style={{
          fontSize: '13px',
          color: 'var(--ink-mid)',
          textDecoration: 'none',
        }}>{aboutLabel}</a>
        <a href={hireHref} style={{
          fontSize: '13px',
          color: 'var(--ink-mid)',
          textDecoration: 'none',
        }}>{hireLabel}</a>
      </div>
      <p style={{
        fontSize: '13px',
        color: 'var(--ink-light)',
        margin: '0 0 6px',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        {labels.footer_about}
      </p>
      <p style={{
        fontSize: '11px',
        color: 'var(--ink-light)',
        opacity: 0.6,
        margin: 0,
      }}>
        © {new Date().getFullYear()} Brainwire. {labels.footer_copyright}
      </p>
    </footer>
  )
}
