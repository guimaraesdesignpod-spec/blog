import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getArticle, getArticleSlugs } from '@/lib/mdx'
import { getArticleAlternates } from '@/lib/articles'
import { SITE_ORIGIN } from '@/lib/config'
import ArticleLayout from '@/components/ArticleLayout'
import ArticleJsonLd from '@/components/ArticleJsonLd'

type Lang = 'en' | 'pt'

interface Props {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  const langs: Lang[] = ['en', 'pt']
  return langs.flatMap(lang =>
    getArticleSlugs(lang).map(slug => ({ lang, slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  if (lang !== 'en' && lang !== 'pt') return {}
  try {
    const article = getArticle(lang as Lang, slug)
    const canonical = `${SITE_ORIGIN}/${lang}/${slug}`
    const alternates = getArticleAlternates(slug, lang as Lang)

    // Build hreflang map when a counterpart exists
    let languages: Record<string, string> | undefined
    if (alternates?.alternate) {
      const alt = alternates.alternate
      const enSlug = lang === 'en' ? alternates.self.slug : alt.slug
      const ptSlug = lang === 'pt' ? alternates.self.slug : alt.slug
      languages = {
        'en-US': `${SITE_ORIGIN}/en/${enSlug}`,
        'pt-BR': `${SITE_ORIGIN}/pt/${ptSlug}`,
        'x-default': `${SITE_ORIGIN}/en/${enSlug}`,
      }
    }

    return {
      title: article.title,
      description: article.description,
      keywords: article.keywords,
      metadataBase: new URL(SITE_ORIGIN),
      alternates: {
        canonical,
        ...(languages ? { languages } : {}),
      },
      openGraph: {
        title: article.title,
        description: article.description,
        images: article.image ? [{ url: article.image, alt: article.imageAlt }] : [],
        type: 'article',
        publishedTime: article.date,
        tags: article.tags,
      },
    }
  } catch {
    return {}
  }
}

export default async function ArticlePage({ params }: Props) {
  const { lang, slug } = await params
  if (lang !== 'en' && lang !== 'pt') notFound()
  try {
    const article = getArticle(lang as Lang, slug)
    const url = `${SITE_ORIGIN}/${lang}/${slug}`
    return (
      <>
        <ArticleJsonLd
          data={{
            headline: article.title,
            description: article.description,
            datePublished: article.date,
            image: article.image,
            url,
            lang,
          }}
        />
        <ArticleLayout article={article}>
          <MDXRemote source={article.content} />
        </ArticleLayout>
      </>
    )
  } catch {
    notFound()
  }
}
