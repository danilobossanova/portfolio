import type { Project } from '@core/domain/entities/Project'
import type { ProjectQuery, ProjectRepository } from '@core/domain/repositories/ProjectRepository'

export class ListProjects {
  constructor(private readonly repository: ProjectRepository) {}

  execute(locale: string, query?: ProjectQuery): Promise<readonly Project[]> {
    return this.repository.list(locale, query)
  }
}
