import type { SiteProfile } from '../entities/SiteProfile'
import type { Principle } from '../entities/Principle'
import type { ExperienceStack } from '../entities/Experience'
import type { Attitude } from '../entities/Attitude'

export interface SiteContentRepository {
  getProfile(locale: string): Promise<SiteProfile>
  listPrinciples(locale: string): Promise<readonly Principle[]>
  listExperience(locale: string): Promise<readonly ExperienceStack[]>
  listAttitudes(locale: string): Promise<readonly Attitude[]>
}
