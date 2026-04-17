import type { Project } from '@core/domain/entities/Project'
import type { ProjectRepository } from '@core/domain/repositories/ProjectRepository'

export class ProjectNotFoundError extends Error {
  constructor(slug: string) {
    super(`Project with slug "${slug}" was not found.`)
    this.name = 'ProjectNotFoundError'
  }
}

export class GetProjectBySlug {
  constructor(private readonly repository: ProjectRepository) {}

  async execute(slug: string, locale: string): Promise<Project> {
    const project = await this.repository.findBySlug(slug, locale)
    if (!project) throw new ProjectNotFoundError(slug)
    return project
  }
}
