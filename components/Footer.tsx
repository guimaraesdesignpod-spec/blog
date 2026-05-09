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
  const copyrightText = lang === 'pt' ? `© ${new Date().getFullYear()} Brainwire. ${labels.footer_copyright}` : `© ${new Date().getFullYear()} Brainwire. ${labels.footer_copyright}`

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <a href={lang === 'pt' ? '/pt' : '/en'} className="f-logo">
            <span className="logo-mark" />
            <span className="logo-text">brain<em>wire</em></span>
          </a>
          <p className="footer-desc">{labels.footer_about}</p>
        </div>

        {/* Pages */}
        <div className="footer-col">
          <span className="footer-col-label">{lang === 'pt' ? 'Páginas' : 'Pages'}</span>
          <a href={aboutHref}>{aboutLabel}</a>
          <a href={hireHref}>{hireLabel}</a>
        </div>

        {/* Connect */}
        <div className="footer-col">
          <span className="footer-col-label">{lang === 'pt' ? 'Conectar' : 'Connect'}</span>
          <a href="https://x.com/elisio" target="_blank" rel="noopener noreferrer">X / @elisio</a>
          <a href="https://github.com/guimaraesdesignpod-spec" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">{copyrightText}</span>
      </div>
    </footer>
  )
}
