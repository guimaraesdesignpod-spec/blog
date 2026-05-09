interface FooterProps {
  labels: {
    footer_about: string;
    footer_copyright: string;
  }
  lang?: string;
}

function LogoIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
      <circle cx="3" cy="6.5" r="1.5" fill="white" />
      <circle cx="6.5" cy="3" r="1.5" fill="white" />
      <circle cx="10" cy="6.5" r="1.5" fill="white" />
    </svg>
  )
}

export default function Footer({ labels, lang }: FooterProps) {
  const aboutHref = lang === 'pt' ? '/pt/sobre' : '/en/about'
  const hireHref = lang === 'pt' ? '/pt/contratar' : '/en/hire-me'
  const aboutLabel = lang === 'pt' ? 'Sobre' : 'About'
  const hireLabel = lang === 'pt' ? 'Contratar' : 'Hire Me'
  const copyrightText = `© ${new Date().getFullYear()} Brainwire. ${labels.footer_copyright}`

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <a href={lang === 'pt' ? '/pt' : '/en'} className="f-logo">
            <span className="logo-mark"><LogoIcon /></span>
            <span className="logo-text">brain<em>wire</em></span>
          </a>
          <p className="footer-desc">{labels.footer_about}</p>
        </div>

        {/* Pages + Connect side by side */}
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
        <span className="footer-copy">{copyrightText}</span>
      </div>
    </footer>
  )
}
