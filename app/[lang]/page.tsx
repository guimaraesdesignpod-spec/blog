import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles } from '@/lib/articles'
import { ArticleMeta } from '@/lib/mdx'

type Lang = 'en' | 'pt'

const META: Record<Lang, { title: string; description: string }> = {
  en: { title: 'Brainwire', description: 'AI productivity tools for professionals' },
  pt: { title: 'Brainwire', description: 'Ferramentas de IA para produtividade profissional' },
}

const LABELS: Record<Lang, {
  featured: string; read: string; topics: string; all: string;
  newsletter_label: string; newsletter_title: string; newsletter_em: string;
  newsletter_placeholder: string; newsletter_btn: string; back: string;
  recent: string; productivity: string; tools: string;
  footer_about: string; footer_contact: string;
}> = {
  en: {
    featured: 'Featured', read: 'Read article', topics: 'Topics', all: 'All',
    newsletter_label: 'Newsletter', newsletter_title: 'Artificial intelligence,',
    newsletter_em: 'filtered for you.', newsletter_placeholder: 'your@email.com', newsletter_btn: 'Subscribe',
    back: 'Home', recent: 'Recent articles', productivity: 'Productivity', tools: 'Tools',
    footer_about: 'About', footer_contact: 'Contact',
  },
  pt: {
    featured: 'Destaque', read: 'Ler artigo', topics: 'Tópicos', all: 'Todos',
    newsletter_label: 'Newsletter', newsletter_title: 'Inteligência artificial,',
    newsletter_em: 'filtrada para você.', newsletter_placeholder: 'o.seu@email.com', newsletter_btn: 'Subscrever',
    back: 'Início', recent: 'Artigos recentes', productivity: 'Produtividade', tools: 'Ferramentas',
    footer_about: 'Sobre', footer_contact: 'Contacto',
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
      <svg width={s} height={s} viewBox=\"0 0 13 13\" fill=\"none\">\n        <circle cx=\"3\" cy=\"6.5\" r=\"1.5\" fill=\"white\" />\n        <circle cx=\"6.5\" cy=\"3\" r=\"1.5\" fill=\"white\" />\n        <circle cx=\"10\" cy=\"6.5\" r=\"1.5\" fill=\"white\" />\n        <circle cx=\"6.5\" cy=\"10\" r=\"1.5\" fill=\"white\" />\n        <line x1=\"3\" y1=\"6.5\" x2=\"6.5\" y2=\"3\" stroke=\"white\" strokeWidth=\"1\" opacity=\"0.5\" />\n        <line x1=\"6.5\" y1=\"3\" x2=\"10\" y2=\"6.5\" stroke=\"white\" strokeWidth=\"1\" opacity=\"0.5\" />\n        <line x1=\"10\" y1=\"6.5\" x2=\"6.5\" y2=\"10\" stroke=\"white\" strokeWidth=\"1\" opacity=\"0.5\" />\n        <line x1=\"6.5\" y1=\"10\" x2=\"3\" y2=\"6.5\" stroke=\"white\" strokeWidth=\"1\" opacity=\"0.5\" />\n      </svg>
    </div>
  )
}

function HeroCard({ article, lang, labels }: { article: ArticleMeta; lang: Lang; labels: typeof LABELS[Lang] }) {
  const date = new Date(article.date).toLocaleDateString(
    lang === 'pt' ? 'pt-PT' : 'en-US',
    { day: 'numeric', month: 'short', year: 'numeric' }
  )
  const category = article.tags[0] ?? ''
  const href = `/${lang}/${article.slug}`

  return (
    <div className=\"home-hero\">\n      <div className=\"hero-inner\">\n        <div className=\"hero-content\">\n          <div>\n            <div className=\"hero-tag\">{labels.featured}</div>\n            <h1 className=\"hero-title\">{article.title}</h1>\n            <p className=\"hero-excerpt\">{article.description}</p>\n          </div>\n          <div className=\"hero-bottom\">\n            <div className=\"hero-meta\">\n              <span>{date}</span>\n              <span>·</span>\n              <strong>{article.readingTime}</strong>\n              {category && <><span>·</span><span>{category}</span></>}\n            </div>\n            <Link href={href} className=\"btn-read\">\n              {labels.read}\n              <svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\">\n                <path d=\"M3 7h8M7.5 4l3.5 3-3.5 3\" stroke=\"currentColor\" strokeWidth=\"1.5\" strokeLinecap=\"round\" strokeLinejoin=\"round\" />\n              </svg>\n            </Link>\n          </div>\n        </div>\n        {article.image && (\n          <div className=\"hero-img\">\n            <span className=\"hero-img-label\">{lang === 'pt' ? 'Novo' : 'New'}</span>\n            <Image\n              src={article.image}\n              alt={article.imageAlt}\n              fill\n              className=\"object-cover\"\n              sizes=\"340px\"\n              priority\n              style={{ filter: 'saturate(0.8)' }}\n            />\n          </div>\n        )}\n      </div>\n    </div>\n  )
}

function ArticleCard({ article, lang, wide }: { article: ArticleMeta; lang: Lang; wide?: boolean }) {
  const date = new Date(article.date).toLocaleDateString(
    lang === 'pt' ? 'pt-PT' : 'en-US',
    { day: 'numeric', month: 'short', year: 'numeric' }
  )
  const category = article.tags[0] ?? ''
  const href = `/${lang}/${article.slug}`

  return (
    <Link href={href} className={`home-card${wide ? ' card-wide' : ''}`}>\n      {article.image && (\n        <div className=\"card-img-wrap\">\n          <Image\n            src={article.image}\n            alt={article.imageAlt}\n            fill\n            className=\"card-img\"\n            sizes={wide ? '(max-width: 900px) 100vw, 520px' : '(max-width: 900px) 100vw, 380px'}\n          />\n        </div>\n      )}\n      <div className=\"card-body\">\n        {category && <div className=\"card-tag\">{category}</div>}\n        <div className=\"card-title\">{article.title}</div>\n        <div className=\"card-excerpt\">{article.description}</div>\n        <div className=\"card-footer\">\n          <span className=\"card-date\">{date}</span>\n          <span className=\"card-read\">\n            {article.readingTime}\n            <svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\">\n              <path d=\"M2 6h8M6.5 3.5L9 6l-2.5 2.5\" stroke=\"currentColor\" strokeWidth=\"1.4\" strokeLinecap=\"round\" strokeLinejoin=\"round\" />\n            </svg>\n          </span>\n        </div>\n      </div>\n    </Link>\n  )
}

export default async function LangPage({ params }: Props) {
  const { lang } = await params
  if (lang !== 'en' && lang !== 'pt') notFound()

  const articles = getAllArticles(lang as Lang)
  const [featured, ...rest] = articles
  const otherLang = lang === 'en' ? 'pt' : 'en'
  const labels = LABELS[lang as Lang]

  const allTags = [...new Set(articles.flatMap(a => a.tags))].slice(0, 6)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      <nav className=\"home-page-nav\">\n        <Link href={`/${lang}`} className=\"nav-logo\">\n          <LogoMark />\n          <span className=\"logo-text\">Brain<em>wire</em></span>\n        </Link>\n\n        <ul className=\"nav-links\">\n          <li><Link href={`/${lang}`} className=\"active\">{labels.back}</Link></li>\n          <li><Link href={`/${lang}/category/ia`}>IA</Link></li>\n          <li><Link href={`/${lang}/category/productivity`}>{labels.productivity}</Link></li>\n          <li><Link href={`/${lang}/category/tools`}>{labels.tools}</Link></li>\n        </ul>\n\n        <Link href={`/${otherLang}`} className=\"nav-lang\">\n          {lang === 'en' ? 'EN · PT' : 'PT · EN'}\n        </Link>\n      </nav>\n\n      {featured && <HeroCard article={featured} lang={lang as Lang} labels={labels} />}\n\n      {allTags.length > 0 && (\n        <div className=\"topics-row\">\n          <span className=\"topic-pill active\">{labels.all}</span>\n          {allTags.map(tag => (\n            <span key={tag} className=\"topic-pill\">{tag}</span>\n          ))}\n        </div>\n      )}\n\n      {rest.length > 0 && (\n        <div className=\"home-grid-wrap\">\n          <div className=\"section-label-row\">\n            <span>{labels.recent}</span>\n          </div>\n          <div className=\"cards-grid\">\n            {rest.map((article, i) => (\n              <ArticleCard key={article.slug} article={article} lang={lang as Lang} wide={i === 0 && rest.length > 1} />\n            ))}\n          </div>\n        </div>\n      )}\n\n      {articles.length === 0 && (\n        <div style={{ padding: '80px 2.5rem', textAlign: 'center' }}>\n          <p style={{ fontSize: '14px', color: 'var(--ink-light)' }}>\n            {lang === 'en' ? 'First article coming soon.' : 'Primeiro artigo em breve.'}\n          </p>\n        </div>\n      )}\n\n      <div className=\"newsletter-strip\">\n        <div className=\"newsletter-inner\">\n          <div>\n            <div className=\"newsletter-label\">{labels.newsletter_label}</div>\n            <div className=\"newsletter-title\">\n              {labels.newsletter_title}<br /><em>{labels.newsletter_em}</em>\n            </div>\n          </div>\n          <NewsletterForm labels={labels} />\n        </div>\n      </div>\n\n      <footer className=\"home-footer\">\n        <Link href={`/${lang}`} className=\"f-logo\">\n          <LogoMark size={18} />\n          <span>Brain<em>wire</em></span>\n        </Link>\n        <span>© {new Date().getFullYear()} Brainwire</span>\n        <ul className=\"f-links\">\n          <li><Link href={`/${lang}`}>{labels.footer_about}</Link></li>\n          <li><Link href={`/${lang}`}>{labels.newsletter_label}</Link></li>\n          <li><Link href={`/${lang}`}>{labels.footer_contact}</Link></li>\n        </ul>\n      </footer>\n\n    </div>\n  )\n}
