'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { ArticleMeta } from '@/lib/mdx'
import type { Lang } from '@/lib/mdx'

const PER_PAGE = 9

function ArticleCard({
  article,
  lang,
  wide,
}: {
  article: ArticleMeta
  lang: Lang
  wide?: boolean
}) {
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
            sizes={
              wide
                ? '(max-width: 900px) 100vw, 520px'
                : '(max-width: 900px) 100vw, 380px'
            }
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
              <path
                d="M2 6h8M6.5 3.5L9 6l-2.5 2.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

interface Props {
  articles: ArticleMeta[]
  lang: Lang
}

export default function HomeArticles({ articles, lang }: Props) {
  const [visible, setVisible] = useState(PER_PAGE)
  const shown = articles.slice(0, visible)
  const hasMore = visible < articles.length

  return (
    <>
      <div className="home-grid-wrap">
        <div className="section-label-row">
          <span>{lang === 'pt' ? 'Artigos recentes' : 'Recent articles'}</span>
        </div>
        <div className="cards-grid">
          {shown.map((article, i) => (
            <ArticleCard
              key={article.slug}
              article={article}
              lang={lang}
              wide={i === 0 && shown.length > 1}
            />
          ))}
        </div>
      </div>

      {hasMore && (
        <div className="load-more-wrap">
          <button
            className="btn-load-more"
            onClick={() => setVisible((v) => v + PER_PAGE)}
          >
            {lang === 'pt' ? 'Carregar mais artigos' : 'Load more articles'}
          </button>
        </div>
      )}
    </>
  )
}
