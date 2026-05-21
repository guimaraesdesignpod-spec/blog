'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LogoMark } from '@/components/Logo'
import { Article, ArticleMeta } from '@/lib/mdx'
import AdUnit from '@/components/AdUnit'
import ThemeToggle from '@/components/ThemeToggle'

interface TocItem {
  id: string
  text: string
  level: 'h2' | 'h3'
}

interface Props {
  article: Article
  children: React.ReactNode
  related?: ArticleMeta[]
}

export default function ArticleLayout({ article, children, related }: Props) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState('')

  const date = new Date(article.date).toLocaleDateString(
    article.lang === 'pt' ? 'pt-BR' : 'en-US',
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
    const frame = requestAnimationFrame(() => {
      const headings = Array.from(document.querySelectorAll<HTMLElement>('article h2, article h3'))
      const items: TocItem[] = headings.map((h) => {
        if (!h.id) {
          h.id = (h.textContent ?? '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        }
        return { id: h.id, text: h.textContent ?? '', level: h.tagName.toLowerCase() as 'h2' | 'h3' }
      })
      setToc(items)
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id) })
      },
      { threshold: 0.5 }
    )
    const headings = document.querySelectorAll<HTMLElement>('article h2, article h3')
    headings.forEach((h) => observer.observe(h))
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div id="progress-bar" />

      <nav className="home-page-nav">
        <Link href={`/${article.lang}`} className="nav-logo">
          <LogoMark />
          <span className="logo-text">Brain<em style={{ fontStyle: 'italic' }}>wire</em></span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link href={`/${article.lang}`}>
              {article.lang === 'pt' ? 'Início' : 'Home'}
            </Link>
          </li>
          {category && (
            <li>
              <Link
                href={`/${article.lang}/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="active"
              >
                {category}
              </Link>
            </li>
          )}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ThemeToggle />
          <Link
            href={`/${article.lang === 'en' ? 'pt' : 'en'}`}
            className="nav-lang"
          >
            {article.lang === 'en' ? 'EN · PT' : 'PT · EN'}
          </Link>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href={`/${article.lang}`}>{article.lang === 'pt' ? 'Início' : 'Home'}</Link>
        <span className="breadcrumb-sep">›</span>
        {category && (
          <>
            <Link href={`/${article.lang}/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>{category}</Link>
            <span className="breadcrumb-sep">›</span>
          </>
        )}
        <span className="breadcrumb-current">{article.title}</span>
      </div>

      <div className={`hero${!article.image ? ' hero--no-image' : ''}`}>
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
        <article id="main-content">
          <AdUnit slot="top-article" />
          {article.description && (
            <p className="intro-text">{article.description}</p>
          )}
          {article.tldr && (
            <div className="tldr-box">
              <span className="tldr-label">
                {article.lang === 'pt' ? '⚡ TL;DR' : '⚡ TL;DR'}
              </span>
              <p>{article.tldr}</p>
            </div>
          )}
          <div className="prose article-prose">
            {children}
          </div>
          <footer>
            <AdUnit slot="bottom-article" />
            <div className="article-footer-tags">
              {article.tags.map(tag => (
                <span key={tag} className="article-tag">
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

      {related && related.length > 0 && (
        <section className="related-articles">
          <h2 className="related-title">
            {article.lang === 'pt' ? 'Artigos relacionados' : 'Related articles'}
          </h2>
          <div className="related-grid">
            {related.map((r) => {
              const rDate = new Date(r.date).toLocaleDateString(
                article.lang === 'pt' ? 'pt-BR' : 'en-US',
                { day: 'numeric', month: 'short', year: 'numeric' }
              )
              return (
                <Link key={r.slug} href={`/${article.lang}/${r.slug}`} className="related-card">
                  {r.image && (
                    <div className="related-img">
                      <Image src={r.image} alt={r.imageAlt} fill className="object-cover" sizes="200px" />
                    </div>
                  )}
                  <div className="related-body">
                    <span className="related-date">{rDate}</span>
                    <span className="related-card-title">{r.title}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </>
  )
}
