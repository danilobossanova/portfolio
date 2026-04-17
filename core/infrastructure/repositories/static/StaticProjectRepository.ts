import type { Project } from '@core/domain/entities/Project'
import type {
  ProjectQuery,
  ProjectRepository,
} from '@core/domain/repositories/ProjectRepository'
import { projectsData } from '@core/infrastructure/data/projects'

const DEFAULT_LOCALE = 'pt-BR'

export class StaticProjectRepository implements ProjectRepository {
  async list(locale: string, query?: ProjectQuery): Promise<readonly Project[]> {
    const all = projectsData[locale] ?? projectsData[DEFAULT_LOCALE] ?? []
    let result: readonly Project[] = all

    if (query?.tag) {
      const tag = query.tag.toLowerCase()
      result = result.filter((p) => p.tags.some((t) => t.toLowerCase() === tag))
    }

    const offset = query?.offset ?? 0
    const limit = query?.limit ?? result.length
    return result.slice(offset, offset + limit)
  }

  async findBySlug(slug: string, locale: string): Promise<Project | null> {
    const all = projectsData[locale] ?? projectsData[DEFAULT_LOCALE] ?? []
    return all.find((p) => p.slug === slug) ?? null
  }
}
