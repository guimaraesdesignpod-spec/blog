import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@/lib/mdx'
import AdUnit from '@/components/AdUnit'

interface Props {
  article: Article
  children: React.ReactNode
}

export default function ArticleLayout({ article, children }: Props) {
  const date = new Date(article.date).toLocaleDateString(
    article.lang === 'pt' ? 'pt-PT' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <article style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
      <header style={{ paddingTop: '56px' }}>
        <Link href={`/${article.lang}`} style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '11px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#5A5A5F',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '40px',
          transition: 'color 150ms',
        }}>
          ← {article.lang === 'pt' ? 'Artigos' : 'Articles'}
        </Link>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {article.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <h1 style={{
          fontFamily: 'var(--font-instrument-serif)',
          fontSize: 'clamp(32px, 5vw, 58px)',
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          color: '#F2F2EF',
          maxWidth: '860px',
          marginBottom: '28px',
        }}>
          {article.title}
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          paddingBottom: '40px',
          borderBottom: '1px solid #252528',
        }}>
          <time style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: '#5A5A5F',
          }}>
            {date}
          </time>
          <span style={{ color: '#252528', fontSize: '12px' }}>—</span>
          <span style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: '#5A5A5F',
          }}>
            {article.readingTime}
          </span>
        </div>

        {article.image && (
          <div style={{
            position: 'relative',
            height: 'clamp(240px, 38vw, 520px)',
            width: '100%',
            marginTop: '48px',
            overflow: 'hidden',
          }}>
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(12,12,14,0.5) 0%, transparent 50%)',
            }} />
            {article.imageCredit && (
              <p style={{
                position: 'absolute',
                bottom: '12px',
                right: '16px',
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '10px',
                letterSpacing: '0.05em',
                color: 'rgba(255,255,255,0.45)',
                background: 'rgba(0,0,0,0.45)',
                padding: '4px 8px',
                backdropFilter: 'blur(4px)',
              }}>
                {article.imageCredit} / Unsplash
              </p>
            )}
          </div>
        )}

        <AdUnit slot="top-article" />
      </header>

      <div style={{ maxWidth: '680px', margin: '56px auto 0', paddingBottom: '80px' }}>
        <div className="prose article-prose max-w-none">
          {children}
        </div>

        <footer style={{
          marginTop: '64px',
          paddingTop: '32px',
          borderTop: '1px solid #252528',
        }}>
          <AdUnit slot="bottom-article" />
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '24px' }}>
            {article.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </footer>
      </div>
    </article>
  )
}
