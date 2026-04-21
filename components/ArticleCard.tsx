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
      <Link href={href} className="article-card" style={{ display: 'block', textDecoration: 'none' }}>
        {article.image && (
          <div style={{ position: 'relative', width: '100%', aspectRatio: '21/9', overflow: 'hidden' }}>
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
        <div className="article-card-body" style={{ maxWidth: '720px' }}>
          {category && <p className="category">{category}</p>}
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
            lineHeight: 1.12,
            color: 'var(--ink)',
            marginBottom: '0.75rem',
            fontWeight: 700,
          }}>
            {article.title}
          </h2>
          <p style={{
            fontSize: '15px',
            lineHeight: 1.65,
            color: 'var(--ink-mid)',
            marginBottom: '1.25rem',
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
    <Link href={href} className="article-card" style={{ display: 'block', textDecoration: 'none' }}>
      {article.image && (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 380px"
          />
        </div>
      )}
      <div className="article-card-body">
        {category && <p className="category">{category}</p>}
        <h2 style={{
          fontFamily: 'var(--serif)',
          fontSize: '1.25rem',
          lineHeight: 1.25,
          color: 'var(--ink)',
          marginBottom: '0.6rem',
          fontWeight: 700,
        }}>
          {article.title}
        </h2>
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ink-mid)',
          marginBottom: '1rem',
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
      </div>
    </Link>
  )
}
