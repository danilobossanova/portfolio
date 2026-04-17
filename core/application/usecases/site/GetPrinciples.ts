import type { Principle } from '@core/domain/entities/Principle'
import type { SiteContentRepository } from '@core/domain/repositories/SiteContentRepository'

export class GetPrinciples {
  constructor(private readonly repository: SiteContentRepository) {}
  execute(locale: string): Promise<readonly Principle[]> {
    return this.repository.listPrinciples(locale)
  }
}
