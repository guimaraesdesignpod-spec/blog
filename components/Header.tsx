import Link from 'next/link'
type Lang = 'en' | 'pt'
export default function Header({ lang }: { lang: Lang }) {
  return <header><Link href={`/${lang}`}>Blog</Link></header>
}
