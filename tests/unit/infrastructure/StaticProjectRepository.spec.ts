import { describe, it, expect } from 'vitest'
import { StaticProjectRepository } from '@core/infrastructure/repositories/static/StaticProjectRepository'

describe('StaticProjectRepository', () => {
  const repo = new StaticProjectRepository()

  it('lists all projects for pt-BR', async () => {
    const projects = await repo.list('pt-BR')
    expect(projects.length).toBeGreaterThan(0)
  })

  it('localises for en', async () => {
    const pt = await repo.list('pt-BR')
    const en = await repo.list('en')
    expect(en.length).toBe(pt.length)
    // Slugs are stable across locales, titles are translated.
    expect(en[0].slug).toBe(pt[0].slug)
    expect(en[0].title).not.toBe(pt[0].title)
  })

  it('filters by tag (case-insensitive)', async () => {
    const all = await repo.list('pt-BR')
    const targetTag = all[0].tags[0]
    const filtered = await repo.list('pt-BR', { tag: targetTag.toUpperCase() })
    expect(filtered.length).toBeGreaterThan(0)
    expect(filtered.every((p) => p.tags.includes(targetTag))).toBe(true)
  })

  it('finds project by slug', async () => {
    const project = await repo.findBySlug('motor-liquidacao-tempo-real', 'pt-BR')
    expect(project?.title).toContain('Motor')
  })

  it('returns null for unknown slug', async () => {
    expect(await repo.findBySlug('nope', 'pt-BR')).toBeNull()
  })
})
