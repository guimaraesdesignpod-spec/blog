import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getArticle, getArticleSlugs } from '@/lib/mdx'
import { getArticleAlternates, getRelatedArticles } from '@/lib/articles'
import { SITE_ORIGIN } from '@/lib/config'
import ArticleLayout from '@/components/ArticleLayout'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'

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

  let article
  try {
    article = getArticle(lang as Lang, slug)
  } catch {
    return {}
  }

  const canonical = `${SITE_ORIGIN}/${lang}/${slug}`
  const alternates = getArticleAlternates(slug, lang as Lang)

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
}

export default async function ArticlePage({ params }: Props) {
  const { lang, slug } = await params
  if (lang !== 'en' && lang !== 'pt') notFound()

  let article
  try {
    article = getArticle(lang as Lang, slug)
  } catch {
    notFound()
  }

  const url = `${SITE_ORIGIN}/${lang}/${slug}`
  const related = getRelatedArticles(article, 3)
  const category = article.tags[0] ?? ''
  const homeLabel = lang === 'pt' ? 'Início' : 'Home'
  const breadcrumbItems = [
    { name: homeLabel, item: `${SITE_ORIGIN}/${lang}` },
    ...(category ? [{ name: category, item: `${SITE_ORIGIN}/${lang}/category/${category.toLowerCase().replace(/\s+/g, '-')}` }] : []),
    { name: article.title },
  ]

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
          faq: article.faq,
          howTo: article.howTo,
        }}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ArticleLayout article={article} related={related}>
        <MDXRemote source={article.content} />
      </ArticleLayout>
    </>
  )
}
