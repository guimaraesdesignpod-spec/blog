import Link from 'next/link'
import { ArticleMeta } from '@/lib/mdx'
export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return <article><Link href={`/${article.lang}/${article.slug}`}>{article.title}</Link></article>
}
