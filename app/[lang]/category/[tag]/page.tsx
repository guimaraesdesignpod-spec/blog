import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles } from '@/lib/articles'
import { ArticleMeta } from '@/lib/mdx'

type Lang = 'en' | 'pt'

interface Props { params: Promise<{ lang: string; tag: string }> }

const LABELS: Record<Lang, { 
  title: string; 
  back: string; 
  no_articles: string;
}> = {
  en: {
    title: 'Category',
    back: 'Back to home',
    no_articles: 'No articles found for this category.',
  },
  pt: {
    title: 'Categoria',
    back: 'Voltar ao início',
    no_articles: 'Nenhum artigo encontrado para esta categoria.',
  },
}

export async function generateStaticParams() {
  const articlesEn = getAllArticles('en')
  const articlesPt = getAllArticles('pt')
  
  const allTags = [
    ...new Set([
      ...articlesEn.flatMap(a => a.tags || []), 
      ...articlesPt.flatMap(a => a.tags || [])
    ])
  ].filter((tag): tag is string => typeof tag === 'string' && tag.length > 0)
  
  return allTags.flatMap(tag => [
    { lang: 'en', tag: tag.toLowerCase().replace(/\s+/g, '-') },
    { lang: 'pt', tag: tag.toLowerCase().replace(/\s+/g, '-') },
  ])
}

export default async function CategoryPage({ params }: Props) {
  const { lang, tag } = await params
  if (!['en', 'pt'].includes(lang)) notFound()
  
  const currentLang = lang as Lang
  const labels = LABELS[currentLang]
  
  // Decode URL-encoded tag (e.g. programa%C3%A7%C3%A3o -> programação)
  const decodedTag = decodeURIComponent(tag)
  
  const articles = getAllArticles(currentLang).filter(a => 
    (a.tags || []).some(t => typeof t === 'string' && t.toLowerCase().replace(/\s+/g, '-') === decodedTag.toLowerCase().replace(/\s+/g, '-'))
  )

  if (articles.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto p-8 text-center">
        <h1 className="text-2xl font-serif mb-4">{labels.title}: {decodedTag}</h1>
        <p className="mb-8 text-zinc-500">{labels.no_articles}</p>
        <Link href={`/${currentLang}`} className="text-accent underline">{labels.back}</Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto p-8">
      <header className="mb-12">
        <Link href={`/${currentLang}`} className="text-xs uppercase tracking-widest text-zinc-500 hover:text-accent transition-colors">
          ← {labels.back}
        </Link>
        <h1 className="text-4xl font-serif mt-4 capitalize">{labels.title}: {decodedTag.replace(/-/g, ' ')}</h1>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <div key={article.slug} className="border border-zinc-200 p-4 rounded-lg hover:border-accent transition-colors">
            <Link href={`/${currentLang}/${article.slug}`}>
              <h3 className="font-serif text-lg font-bold mb-2">{article.title}</h3>
              <p className="text-sm text-zinc-600 line-clamp-3">{article.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
