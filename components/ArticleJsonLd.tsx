export interface ArticleSchema {
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  authorName?: string
  image: string
  url: string
  lang?: string
}

export default function ArticleJsonLd({ data }: { data: ArticleSchema }) {
  const lang = data.lang || 'en'
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    image: data.image,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: {
      '@type': 'Person',
      name: data.authorName || 'Elisio Guimarães',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Brainwire',
    },
    url: data.url,
    inLanguage: lang === 'pt' ? 'pt-BR' : 'en-US',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
