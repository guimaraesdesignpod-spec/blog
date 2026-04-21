'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@/lib/mdx'
import AdUnit from '@/components/AdUnit'

interface TocItem {
  id: string
  text: string
  level: 'h2' | 'h3'
}

interface Props {
  article: Article
  children: React.ReactNode
}

export default function ArticleLayout({ article, children }: Props) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState('')

  const date = new Date(article.date).toLocaleDateString(
    article.lang === 'pt' ? 'pt-PT' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
  const category = article.tags[0] ?? ''

  useEffect(() => {
    const bar = document.getElementById('progress-bar')
    if (!bar) return
    const onScroll = () => {
      const doc = document.documentElement
      const scrolled = doc.scrollTop || document.body.scrollTop
      const total = doc.scrollHeight - doc.clientHeight
      bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll<HTMLElement>('article h2, article h3'))
    const items: TocItem[] = headings.map((h) => {
      if (!h.id) {
        h.id = (h.textContent ?? '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      }
      return { id: h.id, text: h.textContent ?? '', level: h.tagName.toLowerCase() as 'h2' | 'h3' }
    })
    setToc(items)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id) })
      },
      { threshold: 0.5 }
    )
    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div id="progress-bar" />

      <nav>
        <Link href={`/${article.lang}`} className="nav-logo">Blog</Link>
        <span className="nav-meta">{category}{category ? ' · ' : ''}{article.readingTime}</span>
        <Link href={`/${article.lang}`} className="nav-back">
          ← {article.lang === 'pt' ? 'Todos os artigos' : 'All articles'}
        </Link>
      </nav>

      <div className={`hero${!article.image ? ' hero--no-image' : ''}`} style={!article.image ? { gridTemplateColumns: '1fr' } : undefined}>
        <div className="hero-left">
          {category && <span className="hero-tag">{category}</span>}
          <h1>{article.title}</h1>
          <div className="hero-byline">
            <time>{date}</time>
            <span>·</span>
            <span>{article.readingTime}</span>
          </div>
        </div>
        {article.image && (
          <div className="hero-img-wrap">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover"
              priority
              sizes="400px"
            />
          </div>
        )}
      </div>

      <div className="content-wrap">
        <article>
          <AdUnit slot="top-article" />
          {article.description && (
            <p className="intro-text">{article.description}</p>
          )}
          <div className="prose article-prose max-w-none">
            {children}
          </div>
          <footer style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid var(--rule)' }}>
            <AdUnit slot="bottom-article" />
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '1.25rem' }}>
              {article.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: '12px',
                  color: 'var(--ink-light)',
                  background: 'white',
                  border: '1px solid var(--rule)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </footer>
        </article>

        <aside className="sidebar">
          {toc.length > 0 && (
            <div className="sidebar-box">
              <p className="sidebar-title">
                {article.lang === 'pt' ? 'Neste artigo' : 'In this article'}
              </p>
              <ul className="toc-list">
                {toc.map(item => (
                  <li key={item.id} style={{ paddingLeft: item.level === 'h3' ? '1rem' : 0 }}>
                    <a href={`#${item.id}`} className={activeId === item.id ? 'active' : ''}>
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="sidebar-box">
            <p className="sidebar-title">{article.lang === 'pt' ? 'Detalhes' : 'Details'}</p>
            <div style={{ fontSize: '0.85rem', color: 'var(--ink-mid)', lineHeight: 1.7 }}>
              <div>{date}</div>
              <div>{article.readingTime}</div>
              {article.tags.map(tag => (
                <div key={tag} style={{ color: 'var(--ink-light)' }}>{tag}</div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
