import { LogoMark } from '@/components/Logo'

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
    <footer className="site-footer">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <a href={lang === 'pt' ? '/pt' : '/en'} className="f-logo">
            <LogoMark />
            <span className="logo-text">Brain<em>wire</em></span>
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