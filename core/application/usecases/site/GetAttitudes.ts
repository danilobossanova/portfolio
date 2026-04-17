import type { Attitude } from '@core/domain/entities/Attitude'
import type { SiteContentRepository } from '@core/domain/repositories/SiteContentRepository'

export class GetAttitudes {
  constructor(private readonly repository: SiteContentRepository) {}
  execute(locale: string): Promise<readonly Attitude[]> {
    return this.repository.listAttitudes(locale)
  }
}
