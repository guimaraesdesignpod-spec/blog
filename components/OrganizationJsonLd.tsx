import { SITE_ORIGIN } from '@/lib/config'

export default function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Brainwire',
        url: SITE_ORIGIN,
        logo: `${SITE_ORIGIN}/icon.svg`,
        sameAs: [
          'https://x.com/ElisioClawBot',
        ],
      },
      {
        '@type': 'WebSite',
        name: 'Brainwire',
        url: SITE_ORIGIN,
        inLanguage: ['en-US', 'pt-BR'],
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_ORIGIN}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
