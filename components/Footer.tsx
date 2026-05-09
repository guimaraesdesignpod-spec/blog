interface FooterProps {
  labels: {
    footer_about: string;
    footer_copyright: string;
  }
  lang?: string;
}

function LogoMark() {
  return (
    <span className="logo-mark">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <circle cx="3" cy="6.5" r="1.5" fill="white" />
        <circle cx="6.5" cy="3" r="1.5" fill="white" />
        <circle cx="10" cy="6.5" r="1.5" fill="white" />
        <circle cx="6.5" cy="10" r="1.5" fill="white" />
        <line x1="3" y1="6.5" x2="6.5" y2="3" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="6.5" y1="3" x2="10" y2="6.5" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="10" y1="6.5" x2="6.5" y2="10" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="6.5" y1="10" x2="3" y2="6.5" stroke="white" strokeWidth="1" opacity="0.5" />
      </svg>
    </span>
  )
}

export default function Footer({ labels, lang }: FooterProps) {
  const aboutHref = lang === 'pt' ? '/pt/sobre' : '/en/about'
  const hireHref = lang === 'pt' ? '/pt/contratar' : '/en/hire-me'
  const aboutLabel = lang === 'pt' ? 'Sobre' : 'About'
  const hireLabel = lang === 'pt' ? 'Contratar' : 'Hire Me'

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <a href={lang === 'pt' ? '/pt' : '/en'} className="f-logo">
            <LogoMark />
            <span className="logo-text">brain<em>wire</em></span>
          </a>
          <p className="footer-desc">{labels.footer_about}</p>
        </div>

        {/* Pages + Connect — always side by side */}
        <div className="footer-links-row">
          <div className="footer-col">
            <span className="footer-col-label">{lang === 'pt' ? 'Páginas' : 'Pages'}</span>
            <a href={aboutHref}>{aboutLabel}</a>
            <a href={hireHref}>{hireLabel}</a>
          </div>
          <div className="footer-col">
            <span className="footer-col-label">{lang === 'pt' ? 'Conectar' : 'Connect'}</span>
            <a href="https://x.com/elisio" target="_blank" rel="noopener noreferrer">X / @elisio</a>
            <a href="https://github.com/guimaraesdesignpod-spec" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© {new Date().getFullYear()} Brainwire. {labels.footer_copyright}</span>
      </div>
    </footer>
  )
}
