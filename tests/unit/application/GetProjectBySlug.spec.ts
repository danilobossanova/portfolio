import { describe, it, expect, vi } from 'vitest'
import {
  GetProjectBySlug,
  ProjectNotFoundError,
} from '@core/application/usecases/projects/GetProjectBySlug'
import type { ProjectRepository } from '@core/domain/repositories/ProjectRepository'
import type { Project } from '@core/domain/entities/Project'

const project: Project = {
  slug: 'fintech-engine',
  title: 'Fintech',
  summary: 'x',
  tags: [],
  context: '',
  solution: '',
  result: '',
  stack: [],
  coverImage: '',
  publishedAt: '2024-01-01',
}

describe('GetProjectBySlug', () => {
  it('returns the project when found', async () => {
    const repo: ProjectRepository = {
      list: vi.fn(),
      findBySlug: vi.fn().mockResolvedValue(project),
    }
    const useCase = new GetProjectBySlug(repo)

    const result = await useCase.execute('fintech-engine', 'pt-BR')

    expect(result).toBe(project)
    expect(repo.findBySlug).toHaveBeenCalledWith('fintech-engine', 'pt-BR')
  })

  it('throws ProjectNotFoundError when repository returns null', async () => {
    const repo: ProjectRepository = {
      list: vi.fn(),
      findBySlug: vi.fn().mockResolvedValue(null),
    }
    const useCase = new GetProjectBySlug(repo)

    await expect(useCase.execute('missing', 'pt-BR')).rejects.toBeInstanceOf(
      ProjectNotFoundError,
    )
  })
})
