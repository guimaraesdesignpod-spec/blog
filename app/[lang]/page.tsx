import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllArticles } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'

type Lang = 'en' | 'pt'

const META: Record<Lang, { title: string; description: string }> = {
  en: { title: 'Brainwire', description: 'AI productivity tools for professionals' },
  pt: { title: 'Brainwire', description: 'Ferramentas de IA para produtividade profissional' },
}

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const meta = META[lang as Lang]
  if (!meta) return {}
  return { title: meta.title, description: meta.description, alternates: { languages: { en: '/en', pt: '/pt' } } }
}

export default async function LangPage({ params }: Props) {
  const { lang } = await params
  if (lang !== 'en' && lang !== 'pt') notFound()

  const articles = getAllArticles(lang as Lang)
  const [featured, ...rest] = articles

  return (
    <>
      <nav className="home-nav">
        <span className="nav-logo">
          <span className="logo-mark">
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
          </span>
          <span className="logo-text">Brain<em>wire</em></span>
        </span>
        <span className="nav-meta">
          {lang === 'en' ? 'AI · Productivity · Tools' : 'IA · Produtividade · Ferramentas'}
        </span>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {articles.length === 0 ? (
          <div style={{ padding: '80px 0', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: 'var(--ink-light)' }}>
              {lang === 'en' ? 'First article coming soon.' : 'Primeiro artigo em breve.'}
            </p>
          </div>
        ) : (
          <>
            {featured && (
              <div style={{ padding: '3.5rem 0', borderBottom: '1px solid var(--rule)' }}>
                <ArticleCard article={featured} featured />
              </div>
            )}

            {rest.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem',
                padding: '3.5rem 0 5rem',
              }}>
                {rest.map(article => (
                  <ArticleCard key={`${article.lang}-${article.slug}`} article={article} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
