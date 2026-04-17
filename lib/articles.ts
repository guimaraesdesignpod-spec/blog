import { getArticle, getArticleSlugs, ArticleMeta, Lang } from '@/lib/mdx'

export function getAllArticles(lang?: Lang): ArticleMeta[] {
  const langs: Lang[] = lang ? [lang] : ['en', 'pt']
  return langs
    .flatMap(l =>
      getArticleSlugs(l).map(slug => {
        const { content: _, ...meta } = getArticle(l, slug)
        return meta
      })
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getRecentArticles(limit: number = 6, lang?: Lang): ArticleMeta[] {
  return getAllArticles(lang).slice(0, limit)
}
