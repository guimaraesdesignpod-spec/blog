import { getArticle, getArticleSlugs, ArticleMeta, Lang } from '@/lib/mdx'

export function getAllArticles(lang?: Lang): ArticleMeta[] {
  const langs: Lang[] = lang ? [lang] : ['en', 'pt']
  return langs
    .flatMap(l =>
      getArticleSlugs(l).map(slug => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { content: _, ...meta } = getArticle(l, slug)
        return meta
      })
    )
    .filter(a => a.type !== 'page')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/** Returns ALL articles including pages (about, hire-me) — used by sitemap */
export function getAllContent(lang?: Lang): ArticleMeta[] {
  const langs: Lang[] = lang ? [lang] : ['en', 'pt']
  const articles: ArticleMeta[] = []
  for (const l of langs) {
    for (const slug of getArticleSlugs(l)) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { content: _, ...meta } = getArticle(l, slug)
        articles.push(meta)
      } catch (e) {
        console.error(`[sitemap] Failed to read article: ${l}/${slug}`, e instanceof Error ? e.message : e)
      }
    }
  }
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getRecentArticles(limit: number = 6, lang?: Lang): ArticleMeta[] {
  return getAllArticles(lang).slice(0, limit)
}

/** Return up to `limit` articles that share the most tags with `article`, excluding the article itself. */
export function getRelatedArticles(article: ArticleMeta, limit: number = 3): ArticleMeta[] {
  const all = getAllArticles(article.lang).filter(a => a.slug !== article.slug)
  if (article.tags.length === 0) return all.slice(0, limit)

  const tagSet = new Set(article.tags)
  const scored = all.map(a => ({
    article: a,
    score: a.tags.filter(t => tagSet.has(t)).length,
  }))

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.article)
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
