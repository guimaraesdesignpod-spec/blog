import path from 'path'
import { getArticle, getArticleSlugs, __setContentDir } from '@/lib/mdx'

const FIXTURE_DIR = path.join(process.cwd(), '__tests__/fixtures/content')

beforeEach(() => {
  __setContentDir(FIXTURE_DIR)
})

describe('getArticleSlugs', () => {
  it('returns slugs for existing language directory', () => {
    const slugs = getArticleSlugs('en')
    expect(slugs).toContain('test-article')
  })

  it('returns empty array for missing language directory', () => {
    const slugs = getArticleSlugs('pt')
    expect(slugs).toEqual([])
  })
})

describe('getArticle', () => {
  it('parses frontmatter correctly', () => {
    const article = getArticle('en', 'test-article')
    expect(article.title).toBe('Test Article Title')
    expect(article.description).toBe('A test article for unit testing')
    expect(article.lang).toBe('en')
    expect(article.tags).toEqual(['testing', 'nextjs'])
    expect(article.keywords).toEqual(['test', 'article', 'nextjs'])
  })

  it('includes reading time', () => {
    const article = getArticle('en', 'test-article')
    expect(article.readingTime).toMatch(/\d+ min read/)
  })

  it('includes raw MDX content', () => {
    const article = getArticle('en', 'test-article')
    expect(article.content).toContain('Test Article')
  })
})
