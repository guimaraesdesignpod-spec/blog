import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@/lib/mdx'
import AdUnit from '@/components/AdUnit'

interface Props {
  article: Article
  children: React.ReactNode
}

export default function ArticleLayout({ article, children }: Props) {
  const date = new Date(article.date).toLocaleDateString(
    article.lang === 'pt' ? 'pt-PT' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <article className="max-w-2xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <Link href={`/${article.lang}`} className="hover:text-blue-600">
            {article.lang === 'pt' ? '← Artigos' : '← Articles'}
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{article.title}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <time dateTime={article.date}>{date}</time>
          <span>·</span>
          <span>{article.readingTime}</span>
        </div>
        {article.image && (
          <div className="relative h-64 w-full rounded-lg overflow-hidden mb-6">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 672px"
            />
            {article.imageCredit && (
              <p className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-0.5 rounded">
                Photo:{' '}
                <a href={article.imageCreditUrl} target="_blank" rel="noopener noreferrer" className="underline">
                  {article.imageCredit}
                </a>{' '}
                / Unsplash
              </p>
            )}
          </div>
        )}
        <AdUnit slot="top-article" />
      </header>

      <div className="prose prose-gray max-w-none">
        {children}
      </div>

      <footer className="mt-12 pt-6 border-t border-gray-200">
        <AdUnit slot="bottom-article" />
        <div className="flex flex-wrap gap-2 mt-4">
          {article.tags.map(tag => (
            <span key={tag} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </footer>
    </article>
  )
}
