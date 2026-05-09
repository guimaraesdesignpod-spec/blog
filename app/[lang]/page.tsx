import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles } from '@/lib/articles'
import { ArticleMeta } from '@/lib/mdx'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import NewsletterForm from '@/components/NewsletterForm'
import MobileNav from '@/components/MobileNav'

type Lang = 'en' | 'pt'

const META: Record<Lang, { title: string; description: string }> = {
  en: { title: 'Brainwire', description: 'AI productivity tools for professionals' },
  pt: { title: 'Brainwire', description: 'Ferramentas de IA para produtividade profissional' },
}

type LabelsType = {
  featured: string; read: string; topics: string; all: string;
  newsletter_label: string; newsletter_title: string; newsletter_em: string;
  newsletter_placeholder: string; newsletter_btn: string; back: string;
  recent: string; productivity: string; tools: string;
  footer_about: string; footer_copyright: string;
}

const LABELS: Record<Lang, LabelsType> = {
  en: {
    featured: 'Featured', read: 'Read article', topics: 'Topics', all: 'All',
    newsletter_label: 'Newsletter', newsletter_title: 'Artificial intelligence,',
    newsletter_em: 'filtered for you.', newsletter_placeholder: 'your@email.com', newsletter_btn: 'Subscribe',
    back: 'Home', recent: 'Recent articles', productivity: 'Productivity', tools: 'Tools',
    footer_about: 'Brainwire is a bilingual blog about AI-powered productivity tools.',
    footer_copyright: 'All rights reserved.',
  },
  pt: {
    featured: 'Destaque', read: 'Ler artigo', topics: 'Tópicos', all: 'Todos',
    newsletter_label: 'Newsletter', newsletter_title: 'Inteligência artificial,',
    newsletter_em: 'filtrada para você.', newsletter_placeholder: 'o.seu@email.com', newsletter_btn: 'Subscrever',
    back: 'Início', recent: 'Artigos recentes', productivity: 'Produtividade', tools: 'Ferramentas',
    footer_about: 'Brainwire é um blog bilingue sobre ferramentas de produtividade com IA.',
    footer_copyright: 'Todos os direitos reservados.',
  },
}

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const meta = META[lang as Lang]
  if (!meta) return {}
  return { title: meta.title, description: meta.description, alternates: { languages: { en: '/en', pt: '/pt' } } }
}

function LogoMark({ size = 22 }: { size?: number }) {
  const s = Math.round(size * 0.59)
  return (
    <div style={{
      width: size, height: size, background: 'var(--accent)', borderRadius: 5,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <svg width={s} height={s} viewBox="0 0 13 13" fill="none">
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

function HeroCard({ article, lang, labels }: { article: ArticleMeta; lang: Lang; labels: LabelsType }) {
  const date = new Date(article.date).toLocaleDateString(
    lang === 'pt' ? 'pt-BR' : 'en-US',
    { day: 'numeric', month: 'short', year: 'numeric' }
  )
  const category = article.tags[0] ?? ''
  const href = `/${lang}/${article.slug}`

  return (
    <div className="home-hero">
      <div className="hero-inner">
        <div className="hero-content">
          <div>
            <div className="hero-tag">{labels.featured}</div>
            <h1 className="hero-title">{article.title}</h1>
            <p className="hero-excerpt">{article.description}</p>
          </div>
          <div className="hero-bottom">
            <div className="hero-meta">
              <span>{date}</span>
              <span>·</span>
              <strong>{article.readingTime}</strong>
              {category && <><span>·</span><span>{category}</span></>}
            </div>
            <Link href={href} className="btn-read">
              {labels.read}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 4l3.5 3-3.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
        {article.image && (
          <div className="hero-img">
            <span className="hero-img-label">{lang === 'pt' ? 'Novo' : 'New'}</span>
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover"
              sizes="340px"
              priority
              style={{ filter: 'saturate(0.8)' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function ArticleCard({ article, lang, wide }: { article: ArticleMeta; lang: Lang; wide?: boolean }) {
  const date = new Date(article.date).toLocaleDateString(
    lang === 'pt' ? 'pt-BR' : 'en-US',
    { day: 'numeric', month: 'short', year: 'numeric' }
  )
  const category = article.tags[0] ?? ''
  const href = `/${lang}/${article.slug}`

  return (
    <Link href={href} className={`home-card${wide ? ' card-wide' : ''}`}>
      {article.image && (
        <div className="card-img-wrap">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            className="card-img"
            sizes={wide ? '(max-width: 900px) 100vw, 520px' : '(max-width: 900px) 100vw, 380px'}
          />
        </div>
      )}
      <div className="card-body">
        {category && <div className="card-tag">{category}</div>}
        <div className="card-title">{article.title}</div>
        <div className="card-excerpt">{article.description}</div>
        <div className="card-footer">
          <span className="card-date">{date}</span>
          <span className="card-read">
            {article.readingTime}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6.5 3.5L9 6l-2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default async function LangPage({ params }: Props) {
  const { lang } = await params
  if (lang !== 'en' && lang !== 'pt') notFound()

  const articles = getAllArticles(lang as Lang)
  const [featured, ...rest] = articles
  const otherLang = lang === 'en' ? 'pt' : 'en'
  const labels = LABELS[lang as Lang]

  const allTags = [...new Set(articles.flatMap(a => a.tags || []))].slice(0, 6)

      const mobileLinks = [
        { href: `/${lang}`, label: labels.back },
        ...allTags.slice(0, 3).map(tag => {
          const tagSlug = (typeof tag === 'string' ? tag : '').toLowerCase().replace(/\s+/g, '-')
          return { href: `/${lang}/category/${tagSlug}`, label: tag }
        }),
        { href: `/${otherLang}`, label: lang === 'en' ? 'Português' : 'English' },
      ]

      return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <nav className="home-page-nav">
        <Link href={`/${lang}`} className="nav-logo">
          <LogoMark />
          <span className="logo-text">Brain<em style={{ fontStyle: 'italic' }}>wire</em></span>
        </Link>

        <ul className="nav-links">
          <li><Link href={`/${lang}`} className="active">{labels.back}</Link></li>
          {allTags.slice(0, 3).map(tag => {
            const tagSlug = (typeof tag === 'string' ? tag : '').toLowerCase().replace(/\s+/g, '-')
            return (
              <li key={tag}><Link href={`/${lang}/category/${tagSlug}`}>{tag}</Link></li>
            )
          })}
        </ul>

        <MobileNav lang={lang as Lang} links={mobileLinks} />

        <Link href={`/${otherLang}`} className="nav-lang">
          {lang === 'en' ? 'EN · PT' : 'PT · EN'}
        </Link>
      </nav>

      {featured && <HeroCard article={featured} lang={lang as Lang} labels={labels} />}

      {allTags.length > 0 && (
        <div className="topics-row">
          <span className="topic-pill active">{labels.all}</span>
          {allTags.map(tag => {
            const tagSlug = (typeof tag === 'string' ? tag : '').toLowerCase().replace(/\s+/g, '-')
            return (
              <Link key={tag} href={`/${lang}/category/${tagSlug}`} className="topic-pill">{tag}</Link>
            )
          })}
        </div>
      )}

      <div style={{ flex: 1 }}>
        {rest.length > 0 && (
          <div className="home-grid-wrap">
            <div className="section-label-row">
              <span>{labels.recent}</span>
            </div>
            <div className="cards-grid">
              {rest.map((article, i) => (
                <ArticleCard key={article.slug} article={article} lang={lang as Lang} wide={i === 0 && rest.length > 1} />
              ))}
            </div>
          </div>
        )}

        {articles.length === 0 && (
          <div style={{ padding: '80px 2.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: 'var(--ink-light)' }}>
              {lang === 'en' ? 'First article coming soon.' : 'Primeiro artigo em breve.'}
            </p>
          </div>
        )}
      </div>

      <NewsletterForm labels={labels} />

      <Footer labels={labels} lang={lang as Lang} />
    </div>
  )
}
