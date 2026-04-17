import { describe, it, expect, vi } from 'vitest'
import { ListProjects } from '@core/application/usecases/projects/ListProjects'
import type { ProjectRepository } from '@core/domain/repositories/ProjectRepository'
import type { Project } from '@core/domain/entities/Project'

const fakeProject: Project = {
  slug: 'test',
  title: 'Test',
  summary: 'sum',
  tags: ['tag'],
  context: 'c',
  solution: 's',
  result: 'r',
  stack: ['Java'],
  coverImage: 'img',
  publishedAt: '2024-01-01',
}

describe('ListProjects', () => {
  it('delegates to the repository with locale and query', async () => {
    const repo: ProjectRepository = {
      list: vi.fn().mockResolvedValue([fakeProject]),
      findBySlug: vi.fn(),
    }
    const useCase = new ListProjects(repo)

    const result = await useCase.execute('pt-BR', { limit: 5 })

    expect(repo.list).toHaveBeenCalledWith('pt-BR', { limit: 5 })
    expect(result).toEqual([fakeProject])
  })
})
