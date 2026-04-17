import { Article } from '@/lib/mdx'
export default function ArticleLayout({ article, children }: { article: Article; children: React.ReactNode }) {
  return <div><h1>{article.title}</h1>{children}</div>
}
