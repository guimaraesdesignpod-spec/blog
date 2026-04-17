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
  const category = article.tags[0] ?? ''

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>

      {/* Back */}
      <div style={{ padding: '40px 0 0' }}>
        <Link href={`/${article.lang}`} style={{
          fontSize: '13px',
          color: '#52525B',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          ← {article.lang === 'pt' ? 'Todos os artigos' : 'All articles'}
        </Link>
      </div>

      {/* Header */}
      <header style={{ padding: '40px 0 0', maxWidth: '760px' }}>
        {category && <p className="category" style={{ marginBottom: '16px' }}>{category}</p>}
        <h1 style={{
          fontFamily: 'var(--font-instrument-serif)',
          fontSize: 'clamp(32px, 5vw, 54px)',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: '#F4F4F5',
          marginBottom: '24px',
        }}>
          {article.title}
        </h1>
        <div className="post-meta" style={{ marginBottom: '40px' }}>
          <time>{date}</time>
          <span>·</span>
          <span>{article.readingTime}</span>
        </div>
      </header>

      {/* Hero image */}
      {article.image && (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '21/9', overflow: 'hidden', marginBottom: '56px' }}>
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1100px) 100vw, 1100px"
          />
          {article.imageCredit && (
            <p style={{
              position: 'absolute',
              bottom: '10px',
              right: '14px',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.4)',
              background: 'rgba(0,0,0,0.35)',
              padding: '3px 7px',
              backdropFilter: 'blur(4px)',
            }}>
              {article.imageCredit} / Unsplash
            </p>
          )}
        </div>
      )}

      <AdUnit slot="top-article" />

      {/* Body */}
      <article style={{ maxWidth: '680px', margin: '0 auto', paddingBottom: '80px' }}>
        <div className="prose article-prose max-w-none">
          {children}
        </div>

        <footer style={{ marginTop: '56px', paddingTop: '32px', borderTop: '1px solid #232326' }}>
          <AdUnit slot="bottom-article" />
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '20px' }}>
            {article.tags.map(tag => (
              <span key={tag} style={{
                fontSize: '12px',
                color: '#52525B',
                background: '#131315',
                border: '1px solid #232326',
                padding: '4px 10px',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </footer>
      </article>
    </div>
  )
}
