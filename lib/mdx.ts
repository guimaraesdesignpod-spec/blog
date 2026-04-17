import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

// Exported as a mutable reference so tests can override via __setContentDir
const _defaults = {
  contentDir: path.join(process.cwd(), 'content'),
}

export const CONTENT_DIR = _defaults.contentDir

// Internal getter — reads from _defaults so tests can mutate it
function contentDir(): string {
  return _defaults.contentDir
}

/** Test-only helper: override the content directory */
export function __setContentDir(dir: string): void {
  _defaults.contentDir = dir
}

export type Lang = 'en' | 'pt'

export interface ArticleMeta {
  slug: string
  title: string
  description: string
  date: string
  lang: Lang
  tags: string[]
  image: string
  imageAlt: string
  imageCredit: string
  imageCreditUrl: string
  keywords: string[]
  readingTime: string
}

export interface Article extends ArticleMeta {
  content: string
}

export function getArticleSlugs(lang: Lang): string[] {
  const dir = path.join(contentDir(), lang)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''))
}

export function getArticle(lang: Lang, slug: string): Article {
  const filePath = path.join(contentDir(), lang, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    lang,
    content,
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    tags: data.tags ?? [],
    image: data.image ?? '',
    imageAlt: data.imageAlt ?? data.title ?? '',
    imageCredit: data.imageCredit ?? '',
    imageCreditUrl: data.imageCreditUrl ?? '',
    keywords: data.keywords ?? [],
    readingTime: readingTime(content).text,
  }
}
