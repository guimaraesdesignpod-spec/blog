import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'
import { SITE_ORIGIN } from '@/lib/config'
import type { ArticleMeta } from '@/lib/mdx'

export default function sitemap(): MetadataRoute.Sitemap {
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

  const articleEntries: MetadataRoute.Sitemap = []
  for (const group of groups.values()) {
    const enArticle = group.find(a => a.lang === 'en')
    const ptArticle = group.find(a => a.lang === 'pt')
    const isPaired = !!(enArticle && ptArticle)

    for (const article of group) {
      const entry: MetadataRoute.Sitemap[number] = {
        url: `${SITE_ORIGIN}/${article.lang}/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }

      if (isPaired) {
        entry.alternates = {
          languages: {
            'en-US': `${SITE_ORIGIN}/en/${enArticle!.slug}`,
            'pt-BR': `${SITE_ORIGIN}/pt/${ptArticle!.slug}`,
            'x-default': `${SITE_ORIGIN}/en/${enArticle!.slug}`,
          },
        }
      }

      articleEntries.push(entry)
    }
  }

  return [
    { url: `${SITE_ORIGIN}/en`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_ORIGIN}/pt`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    ...articleEntries,
  ]
}
