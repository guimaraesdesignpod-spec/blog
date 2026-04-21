import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllArticles } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'

type Lang = 'en' | 'pt'

const META: Record<Lang, { title: string; description: string }> = {
  en: { title: 'Blog', description: 'AI productivity tools for professionals' },
  pt: { title: 'Blog', description: 'Ferramentas de IA para produtividade profissional' },
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
        <span className="nav-logo">Blog</span>
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
