import type { Project } from '../entities/Project'

export interface ProjectQuery {
  readonly tag?: string
  readonly limit?: number
  readonly offset?: number
}

/**
 * Port (Clean Architecture) — consumers depend on this interface,
 * not on any concrete source (static data, CMS, REST).
 */
export interface ProjectRepository {
  list(locale: string, query?: ProjectQuery): Promise<readonly Project[]>
  findBySlug(slug: string, locale: string): Promise<Project | null>
}
