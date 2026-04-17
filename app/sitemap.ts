import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourblog.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()
  const articleEntries = articles.map(a => ({
    url: `${BASE_URL}/${a.lang}/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: `${BASE_URL}/en`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/pt`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    ...articleEntries,
  ]
}
