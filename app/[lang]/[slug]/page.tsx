import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getArticle, getArticleSlugs } from '@/lib/mdx'
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
    const otherLang = lang === 'en' ? 'pt' : 'en'
    // Find corresponding slug in other language
    const otherSlug = article.slug // simplified: same slug across EN/PT
    return {
      title: article.title,
      description: article.description,
      keywords: article.keywords,
      openGraph: {
        title: article.title,
        description: article.description,
        images: article.image ? [{ url: article.image, alt: article.imageAlt }] : [],
        type: 'article',
        publishedTime: article.date,
        tags: article.tags,
      },
      alternates: {
        languages: {
          en: `/en/${otherSlug}`,
          pt: `/pt/${otherSlug}`,
        },
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
    const url = `/${lang}/${slug}`
    return (
      <>
        <ArticleJsonLd
          data={{
            headline: article.title,
            description: article.description,
            datePublished: article.date,
            image: article.image,
            url,
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
