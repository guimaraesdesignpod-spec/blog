import path from 'path'
import { __setContentDir } from '@/lib/mdx'
import { getAllArticles, getRecentArticles } from '@/lib/articles'

const FIXTURE_DIR = path.join(process.cwd(), '__tests__/fixtures/content')

beforeEach(() => {
  __setContentDir(FIXTURE_DIR)
})

describe('getAllArticles', () => {
  it('returns articles sorted by date descending', () => {
    const articles = getAllArticles('en')
    expect(articles.length).toBeGreaterThan(0)
    for (let i = 1; i < articles.length; i++) {
      expect(new Date(articles[i - 1].date).getTime())
        .toBeGreaterThanOrEqual(new Date(articles[i].date).getTime())
    }
  })

  it('does not include content field', () => {
    const articles = getAllArticles('en')
    articles.forEach(a => {
      expect(a).not.toHaveProperty('content')
    })
  })
})

describe('getRecentArticles', () => {
  it('respects limit', () => {
    const articles = getRecentArticles(1, 'en')
    expect(articles.length).toBeLessThanOrEqual(1)
  })
})
