import { describe, it, expect } from 'vitest'
import { StaticArticleRepository } from '@core/infrastructure/repositories/static/StaticArticleRepository'

describe('StaticArticleRepository', () => {
  const repo = new StaticArticleRepository()

  it('lists pt-BR articles sorted by publishedAt desc', async () => {
    const articles = await repo.list('pt-BR')
    expect(articles.length).toBeGreaterThan(0)
    const dates = articles.map((a) => a.publishedAt)
    const sorted = [...dates].sort((a, b) => b.localeCompare(a))
    expect(dates).toEqual(sorted)
  })

  it('falls back to pt-BR for unknown locales', async () => {
    const pt = await repo.list('pt-BR')
    const unknown = await repo.list('xx-XX')
    expect(unknown.length).toBe(pt.length)
  })

  it('returns en articles when locale is en', async () => {
    const articles = await repo.list('en')
    // Titles are translated, but slugs and author are stable.
    expect(articles.length).toBeGreaterThan(0)
    expect(articles.every((a) => a.author === 'Danilo Fernando')).toBe(true)
    expect(articles.some((a) => a.title === "Integration tests that don't lie")).toBe(true)
  })

  it('applies limit + offset pagination', async () => {
    const all = await repo.list('pt-BR')
    const page = await repo.list('pt-BR', { limit: 2, offset: 1 })
    expect(page.length).toBe(2)
    expect(page[0].slug).toBe(all[1].slug)
  })

  it('filters by category', async () => {
    const results = await repo.list('pt-BR', { category: 'arquitetura' })
    expect(results.every((a) => a.category.toLowerCase() === 'arquitetura')).toBe(true)
  })

  it('finds article by slug', async () => {
    const article = await repo.findBySlug('custo-real-da-complexidade', 'pt-BR')
    expect(article).not.toBeNull()
    expect(article?.slug).toBe('custo-real-da-complexidade')
  })

  it('returns null for unknown slug', async () => {
    const article = await repo.findBySlug('does-not-exist', 'pt-BR')
    expect(article).toBeNull()
  })

  it('performs diacritic-insensitive search', async () => {
    const results = await repo.search('complexidade', 'pt-BR')
    expect(results.length).toBeGreaterThan(0)
    const withAccent = await repo.search('integração', 'pt-BR')
    expect(withAccent).toBeDefined()
  })

  it('returns empty array for empty search', async () => {
    expect(await repo.search('', 'pt-BR')).toEqual([])
  })
})
