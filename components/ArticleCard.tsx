import Link from 'next/link'
import Image from 'next/image'
import { ArticleMeta } from '@/lib/mdx'

interface Props {
  article: ArticleMeta
}

export default function ArticleCard({ article }: Props) {
  const href = `/${article.lang}/${article.slug}`
  const date = new Date(article.date).toLocaleDateString(
    article.lang === 'pt' ? 'pt-PT' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <article className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {article.image && (
        <Link href={href}>
          <div className="relative h-48 w-full">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Link>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <time dateTime={article.date}>{date}</time>
          <span>·</span>
          <span>{article.readingTime}</span>
        </div>
        <Link href={href}>
          <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-600 mb-2 line-clamp-2">
            {article.title}
          </h2>
        </Link>
        <p className="text-sm text-gray-600 line-clamp-3">{article.description}</p>
        <div className="flex gap-2 mt-3 flex-wrap">
          {article.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
