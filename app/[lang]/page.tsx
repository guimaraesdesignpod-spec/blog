import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllArticles } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'

type Lang = 'en' | 'pt'

const META: Record<Lang, { title: string; description: string; tagline: string; sub: string }> = {
  en: {
    title: 'Blog',
    description: 'AI productivity tools for professionals',
    tagline: 'AI tools,\ntested.',
    sub: 'Practical guides and honest comparisons — so you can work smarter, not just faster.',
  },
  pt: {
    title: 'Blog',
    description: 'Ferramentas de IA para produtividade profissional',
    tagline: 'Ferramentas IA,\ntestadas.',
    sub: 'Guias práticos e comparações honestas — para trabalhar melhor, não só mais rápido.',
  },
}

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const meta = META[lang as Lang]
  if (!meta) return {}
  return {
    title: meta.title,
    description: meta.description,
    alternates: { languages: { en: '/en', pt: '/pt' } },
  }
}

export default async function LangPage({ params }: Props) {
  const { lang } = await params
  if (lang !== 'en' && lang !== 'pt') notFound()

  const articles = getAllArticles(lang as Lang)
  const meta = META[lang]
  const [featured, ...rest] = articles

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
      {/* Hero */}
      <div style={{
        padding: '72px 0 56px',
        borderBottom: '1px solid #252528',
        marginBottom: '64px',
      }}>
        <p style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '10px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#E8A838',
          marginBottom: '20px',
        }}>
          AI Productivity · {lang === 'en' ? 'Professional Tools' : 'Ferramentas Profissionais'}
        </p>
        <h1 style={{
          fontFamily: 'var(--font-instrument-serif)',
          fontSize: 'clamp(44px, 7.5vw, 88px)',
          lineHeight: 1.02,
          letterSpacing: '-0.035em',
          color: '#F2F2EF',
          maxWidth: '760px',
          marginBottom: '28px',
          whiteSpace: 'pre-line',
        }}>
          {meta.tagline}
        </h1>
        <p style={{
          fontSize: '15px',
          color: '#A0A09A',
          maxWidth: '460px',
          lineHeight: 1.65,
        }}>
          {meta.sub}
        </p>
      </div>

      {/* Articles */}
      {articles.length === 0 ? (
        <div style={{ padding: '80px 0', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#3A3A3E',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#E8A838', opacity: 0.4, display: 'inline-block',
            }} />
            {lang === 'en' ? 'First article coming soon' : 'Primeiro artigo em breve'}
          </div>
        </div>
      ) : (
        <div style={{ paddingBottom: '80px' }}>
          {featured && (
            <div style={{ marginBottom: '40px' }}>
              <ArticleCard article={featured} featured />
            </div>
          )}
          {rest.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
            }}>
              {rest.map(article => (
                <ArticleCard key={`${article.lang}-${article.slug}`} article={article} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
