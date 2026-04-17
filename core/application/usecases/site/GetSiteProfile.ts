import type { SiteProfile } from '@core/domain/entities/SiteProfile'
import type { SiteContentRepository } from '@core/domain/repositories/SiteContentRepository'

export class GetSiteProfile {
  constructor(private readonly repository: SiteContentRepository) {}
  execute(locale: string): Promise<SiteProfile> {
    return this.repository.getProfile(locale)
  }
}
