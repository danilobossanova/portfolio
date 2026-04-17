import type { ExperienceStack } from '@core/domain/entities/Experience'
import type { SiteContentRepository } from '@core/domain/repositories/SiteContentRepository'

export class GetExperience {
  constructor(private readonly repository: SiteContentRepository) {}
  execute(locale: string): Promise<readonly ExperienceStack[]> {
    return this.repository.listExperience(locale)
  }
}
