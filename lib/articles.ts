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
    .filter(a => a.type !== 'page')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getRecentArticles(limit: number = 6, lang?: Lang): ArticleMeta[] {
  return getAllArticles(lang).slice(0, limit)
}

export interface ArticleAlternates {
  self: ArticleMeta
  alternate?: ArticleMeta
}

export function getArticleAlternates(slug: string, lang: Lang): ArticleAlternates | undefined {
  const articles = getAllArticles()
  const self = articles.find(article => article.lang === lang && article.slug === slug)
  const alternateLang: Lang = lang === 'en' ? 'pt' : 'en'

  if (!self) return undefined
  if (!self.translationKey) return { self }

  return {
    self,
    alternate: articles.find(article => article.lang === alternateLang && article.translationKey === self.translationKey),
  }
}
