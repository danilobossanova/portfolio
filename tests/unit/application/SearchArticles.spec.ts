import { describe, it, expect, vi } from 'vitest'
import { SearchArticles } from '@core/application/usecases/articles/SearchArticles'
import type { ArticleRepository } from '@core/domain/repositories/ArticleRepository'

const buildRepo = (result: unknown = []): ArticleRepository => ({
  list: vi.fn(),
  findBySlug: vi.fn(),
  search: vi.fn().mockResolvedValue(result),
})

describe('SearchArticles', () => {
  it('returns an empty array for queries shorter than 2 characters', async () => {
    const repo = buildRepo()
    const useCase = new SearchArticles(repo)

    expect(await useCase.execute('', 'pt-BR')).toEqual([])
    expect(await useCase.execute('a', 'pt-BR')).toEqual([])
    expect(repo.search).not.toHaveBeenCalled()
  })

  it('trims the query before delegating', async () => {
    const repo = buildRepo([{ slug: 'x' }])
    const useCase = new SearchArticles(repo)

    await useCase.execute('   clean   ', 'pt-BR')

    expect(repo.search).toHaveBeenCalledWith('clean', 'pt-BR')
  })

  it('handles null/undefined raw input', async () => {
    const repo = buildRepo()
    const useCase = new SearchArticles(repo)

    // @ts-expect-error — runtime robustness
    expect(await useCase.execute(null, 'pt-BR')).toEqual([])
    // @ts-expect-error — runtime robustness
    expect(await useCase.execute(undefined, 'pt-BR')).toEqual([])
  })
})
