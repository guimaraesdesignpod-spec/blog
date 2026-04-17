import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllArticles } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'

type Lang = 'en' | 'pt'

const META: Record<Lang, { title: string; description: string }> = {
  en: { title: 'Blog', description: 'Articles about technology and business' },
  pt: { title: 'Blog', description: 'Artigos sobre tecnologia e negócios' },
}

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const meta = META[lang as Lang]
  if (!meta) return {}
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      languages: { en: '/en', pt: '/pt' },
    },
  }
}

export default async function LangPage({ params }: Props) {
  const { lang } = await params
  if (lang !== 'en' && lang !== 'pt') notFound()

  const articles = getAllArticles(lang as Lang)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        {lang === 'en' ? 'Latest Articles' : 'Artigos Recentes'}
      </h1>
      <div className="grid gap-6 md:grid-cols-2">
        {articles.map(article => (
          <ArticleCard key={`${article.lang}-${article.slug}`} article={article} />
        ))}
      </div>
      {articles.length === 0 && (
        <p className="text-gray-500">
          {lang === 'en' ? 'No articles yet.' : 'Ainda sem artigos.'}
        </p>
      )}
    </div>
  )
}
