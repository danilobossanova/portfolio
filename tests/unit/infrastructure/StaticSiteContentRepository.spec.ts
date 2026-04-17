import { describe, it, expect } from 'vitest'
import { StaticSiteContentRepository } from '@core/infrastructure/repositories/static/StaticSiteContentRepository'

describe('StaticSiteContentRepository', () => {
  const repo = new StaticSiteContentRepository()

  it('returns a pt-BR profile with brandName and fullName', async () => {
    const profile = await repo.getProfile('pt-BR')
    expect(profile.brandName).toBeTruthy()
    expect(profile.fullName).toBeTruthy()
    expect(profile.fullName.length).toBeGreaterThanOrEqual(profile.brandName.length)
    expect(profile.manifesto.length).toBeGreaterThan(0)
    expect(profile.social.length).toBeGreaterThan(0)
  })

  it('lists principles, experience and attitudes for en', async () => {
    const [principles, experience, attitudes] = await Promise.all([
      repo.listPrinciples('en'),
      repo.listExperience('en'),
      repo.listAttitudes('en'),
    ])
    expect(principles.length).toBe(6)
    expect(experience.length).toBe(4)
    expect(attitudes.length).toBe(6)
  })

  it('falls back to pt-BR for unknown locale', async () => {
    const profile = await repo.getProfile('xx')
    expect(profile.fullName).toContain('Engenheiro')
    expect(profile.brandName).toBe('Danilo Fernando')
  })
})
