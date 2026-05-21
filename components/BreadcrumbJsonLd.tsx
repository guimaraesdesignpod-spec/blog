interface BreadcrumbItem {
  name: string
  item?: string
}

interface BreadcrumbListProps {
  items: BreadcrumbItem[]
}

export default function BreadcrumbJsonLd({ items }: BreadcrumbListProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.item ? { item: item.item } : {}),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
