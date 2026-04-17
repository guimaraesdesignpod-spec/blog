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
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
  const category = article.tags[0] ?? ''

  if (featured) {
    return (
      <Link href={href} className="post-card" style={{ display: 'block' }}>
        {article.image && (
          <div style={{ position: 'relative', width: '100%', aspectRatio: '21/9', overflow: 'hidden', marginBottom: '28px' }}>
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}
        <div style={{ maxWidth: '720px' }}>
          {category && <p className="category" style={{ marginBottom: '12px' }}>{category}</p>}
          <h2 style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            letterSpacing: '-0.025em',
            lineHeight: 1.12,
            color: '#F4F4F5',
            marginBottom: '16px',
          }}>
            {article.title}
          </h2>
          <p style={{
            fontSize: '15px',
            lineHeight: 1.65,
            color: '#A1A1AA',
            marginBottom: '20px',
            maxWidth: '560px',
          }}>
            {article.description}
          </p>
          <div className="post-meta">
            <time>{date}</time>
            <span>·</span>
            <span>{article.readingTime}</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className="post-card" style={{ display: 'block' }}>
      {article.image && (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', marginBottom: '20px' }}>
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 380px"
          />
        </div>
      )}
      {category && <p className="category" style={{ marginBottom: '10px' }}>{category}</p>}
      <h2 style={{
        fontFamily: 'var(--font-instrument-serif)',
        fontSize: '22px',
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
        color: '#F4F4F5',
        marginBottom: '10px',
      }}>
        {article.title}
      </h2>
      <p style={{
        fontSize: '14px',
        lineHeight: 1.6,
        color: '#A1A1AA',
        marginBottom: '14px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      } as React.CSSProperties}>
        {article.description}
      </p>
      <div className="post-meta">
        <time>{date}</time>
        <span>·</span>
        <span>{article.readingTime}</span>
      </div>
    </Link>
  )
}
