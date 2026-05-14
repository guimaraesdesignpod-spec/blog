import { NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/articles'
import { SITE_ORIGIN } from '@/lib/config'
import type { ArticleMeta } from '@/lib/mdx'

export const dynamic = 'force-static'
export const revalidate = 3600 // 1 hour

export async function GET() {
  const articles = getAllArticles()

  const groups = new Map<string, ArticleMeta[]>()
  for (const article of articles) {
    const key = article.translationKey || article.slug
    const existing = groups.get(key)
    if (existing) {
      existing.push(article)
    } else {
      groups.set(key, [article])
    }
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'

  // Home pages
  const now = new Date().toISOString()
  xml += '  <url>\n'
  xml += `    <loc>${SITE_ORIGIN}/en</loc>\n`
  xml += `    <lastmod>${now}</lastmod>\n`
  xml += '    <changefreq>daily</changefreq>\n'
  xml += '    <priority>1</priority>\n'
  xml += '  </url>\n'
  xml += '  <url>\n'
  xml += `    <loc>${SITE_ORIGIN}/pt</loc>\n`
  xml += `    <lastmod>${now}</lastmod>\n`
  xml += '    <changefreq>daily</changefreq>\n'
  xml += '    <priority>1</priority>\n'
  xml += '  </url>\n'

  for (const group of groups.values()) {
    const enArticle = group.find(a => a.lang === 'en')
    const ptArticle = group.find(a => a.lang === 'pt')
    const isPaired = !!(enArticle && ptArticle)

    for (const article of group) {
      xml += '  <url>\n'
      xml += `    <loc>${SITE_ORIGIN}/${article.lang}/${article.slug}</loc>\n`
      xml += `    <lastmod>${new Date(article.date).toISOString()}</lastmod>\n`
      xml += '    <changefreq>weekly</changefreq>\n'
      xml += '    <priority>0.8</priority>\n'

      if (isPaired) {
        xml += `    <xhtml:link rel="alternate" hreflang="en-US" href="${SITE_ORIGIN}/en/${enArticle!.slug}" />\n`
        xml += `    <xhtml:link rel="alternate" hreflang="pt-BR" href="${SITE_ORIGIN}/pt/${ptArticle!.slug}" />\n`
        xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/en/${enArticle!.slug}" />\n`
      }

      xml += '  </url>\n'
    }
  }

  xml += '</urlset>'

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
