import type { Project } from '@core/domain/entities/Project'
import type {
  ProjectQuery,
  ProjectRepository,
} from '@core/domain/repositories/ProjectRepository'

/**
 * HTTP adapter — stub. Ready to consume a future REST/GraphQL CMS (Strapi, Directus)
 * or a custom backend (Spring Boot, Laravel). All methods isolate the fetch boundary
 * so the domain never has to know about transport concerns.
 */
export class HttpProjectRepository implements ProjectRepository {
  constructor(private readonly baseUrl: string) {}

  async list(locale: string, query?: ProjectQuery): Promise<readonly Project[]> {
    const params = new URLSearchParams({ locale })
    if (query?.tag) params.set('tag', query.tag)
    if (query?.limit !== undefined) params.set('limit', String(query.limit))
    if (query?.offset !== undefined) params.set('offset', String(query.offset))
    const res = await fetch(`${this.baseUrl}/projects?${params.toString()}`)
    if (!res.ok) throw new Error(`Failed to fetch projects (${res.status})`)
    return (await res.json()) as Project[]
  }

  async findBySlug(slug: string, locale: string): Promise<Project | null> {
    const res = await fetch(
      `${this.baseUrl}/projects/${encodeURIComponent(slug)}?locale=${locale}`,
    )
    if (res.status === 404) return null
    if (!res.ok) throw new Error(`Failed to fetch project ${slug} (${res.status})`)
    return (await res.json()) as Project
  }
}
