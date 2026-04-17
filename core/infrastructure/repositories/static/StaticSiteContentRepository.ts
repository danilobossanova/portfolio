import type { SiteProfile } from '@core/domain/entities/SiteProfile'
import type { Principle } from '@core/domain/entities/Principle'
import type { ExperienceStack } from '@core/domain/entities/Experience'
import type { Attitude } from '@core/domain/entities/Attitude'
import type { SiteContentRepository } from '@core/domain/repositories/SiteContentRepository'
import { siteProfileData } from '@core/infrastructure/data/site-profile'
import { principlesData } from '@core/infrastructure/data/principles'
import { experienceData } from '@core/infrastructure/data/experience'
import { attitudesData } from '@core/infrastructure/data/attitudes'

const DEFAULT_LOCALE = 'pt-BR'

export class StaticSiteContentRepository implements SiteContentRepository {
  async getProfile(locale: string): Promise<SiteProfile> {
    return siteProfileData[locale] ?? siteProfileData[DEFAULT_LOCALE]!
  }
  async listPrinciples(locale: string): Promise<readonly Principle[]> {
    return principlesData[locale] ?? principlesData[DEFAULT_LOCALE] ?? []
  }
  async listExperience(locale: string): Promise<readonly ExperienceStack[]> {
    return experienceData[locale] ?? experienceData[DEFAULT_LOCALE] ?? []
  }
  async listAttitudes(locale: string): Promise<readonly Attitude[]> {
    return attitudesData[locale] ?? attitudesData[DEFAULT_LOCALE] ?? []
  }
}
