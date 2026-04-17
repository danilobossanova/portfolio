import type { SiteProfile } from '@core/domain/entities/SiteProfile'
import type { Principle } from '@core/domain/entities/Principle'
import type { ExperienceStack } from '@core/domain/entities/Experience'
import type { Attitude } from '@core/domain/entities/Attitude'
import type { SiteContentRepository } from '@core/domain/repositories/SiteContentRepository'

export class HttpSiteContentRepository implements SiteContentRepository {
  constructor(private readonly baseUrl: string) {}

  private async get<T>(path: string, locale: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}?locale=${locale}`)
    if (!res.ok) throw new Error(`Failed GET ${path} (${res.status})`)
    return (await res.json()) as T
  }

  getProfile(locale: string): Promise<SiteProfile> {
    return this.get<SiteProfile>('/site/profile', locale)
  }
  listPrinciples(locale: string): Promise<readonly Principle[]> {
    return this.get<Principle[]>('/site/principles', locale)
  }
  listExperience(locale: string): Promise<readonly ExperienceStack[]> {
    return this.get<ExperienceStack[]>('/site/experience', locale)
  }
  listAttitudes(locale: string): Promise<readonly Attitude[]> {
    return this.get<Attitude[]>('/site/attitudes', locale)
  }
}
