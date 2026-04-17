import Link from 'next/link'
import Image from 'next/image'
import { ArticleMeta } from '@/lib/mdx'

interface Props {
  article: ArticleMeta
  featured?: boolean
}

export default function ArticleCard({ article, featured = false }: Props) {
  const href = `/${article.lang}/${article.slug}`
  const date = new Date(article.date).toLocaleDateString(
    article.lang === 'pt' ? 'pt-PT' : 'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' }
  )

  if (featured) {
    return (
      <Link href={href} className="card" style={{
        display: 'grid',
        gridTemplateColumns: article.image ? '1fr 1fr' : '1fr',
        minHeight: '340px',
      }}>
        {article.image && (
          <div style={{ position: 'relative', overflow: 'hidden', minHeight: '280px' }}>
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(12,12,14,0.4) 0%, transparent 60%)',
            }} />
          </div>
        )}
        <div style={{
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {article.tags.slice(0, 2).map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <h2 style={{
              fontFamily: 'var(--font-instrument-serif)',
              fontSize: 'clamp(22px, 2.5vw, 32px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              color: '#F2F2EF',
              marginBottom: '14px',
            }}>
              {article.title}
            </h2>
            <p style={{
              fontSize: '14px',
              lineHeight: 1.65,
              color: '#A0A09A',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            } as React.CSSProperties}>
              {article.description}
            </p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid #252528',
          }}>
            <time style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '11px',
              letterSpacing: '0.06em',
              color: '#5A5A5F',
            }}>
              {date}
            </time>
            <span style={{ color: '#3A3A3E', fontSize: '10px' }}>—</span>
            <span style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '11px',
              letterSpacing: '0.06em',
              color: '#5A5A5F',
            }}>
              {article.readingTime}
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className="card">
      {article.image && (
        <div style={{ position: 'relative', height: '196px', overflow: 'hidden' }}>
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      )}
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {article.tags.slice(0, 2).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <h2 style={{
          fontFamily: 'var(--font-instrument-serif)',
          fontSize: '20px',
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
          color: '#F2F2EF',
          marginBottom: '10px',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        } as React.CSSProperties}>
          {article.title}
        </h2>
        <p style={{
          fontSize: '13px',
          lineHeight: 1.6,
          color: '#A0A09A',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          marginBottom: '18px',
        } as React.CSSProperties}>
          {article.description}
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          paddingTop: '14px',
          borderTop: '1px solid #1C1C1E',
        }}>
          <time style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '10px',
            letterSpacing: '0.08em',
            color: '#5A5A5F',
          }}>
            {date}
          </time>
          <span style={{ color: '#2A2A2E' }}>·</span>
          <span style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '10px',
            letterSpacing: '0.08em',
            color: '#5A5A5F',
          }}>
            {article.readingTime}
          </span>
        </div>
      </div>
    </Link>
  )
}
