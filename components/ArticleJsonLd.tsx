import type { FAQItem, HowToSchema } from '@/lib/schema-types'

export interface ArticleSchema {
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  authorName?: string
  image: string
  url: string
  lang?: string
  faq?: FAQItem[]
  howTo?: HowToSchema
}

function buildArticleNode(data: ArticleSchema) {
  const lang = data.lang || 'en'
  return {
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
}

function buildFAQPage(faq: FAQItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

function buildHowTo(howTo: HowToSchema) {
  return {
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description || '',
    ...(howTo.totalTime ? { totalTime: howTo.totalTime } : {}),
    step: howTo.steps.map(step => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
      ...(step.image ? { image: step.image } : {}),
    })),
  }
}

export default function ArticleJsonLd({ data }: { data: ArticleSchema }) {
  const article = buildArticleNode(data)
  const hasFaq = data.faq && data.faq.length > 0
  const hasHowTo = data.howTo && data.howTo.steps.length > 0

  let schema: Record<string, unknown>

  if (hasFaq || hasHowTo) {
    const graph: Record<string, unknown>[] = [article]
    if (hasFaq) graph.push(buildFAQPage(data.faq!))
    if (hasHowTo) graph.push(buildHowTo(data.howTo!))
    schema = {
      '@context': 'https://schema.org',
      '@graph': graph,
    }
  } else {
    schema = {
      '@context': 'https://schema.org',
      ...article,
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
