/**
 * Application container (composition root).
 *
 * Wires domain ports to concrete infrastructure adapters and exposes
 * use-case instances. The consumer (Nuxt plugin) chooses between
 * static in-memory adapters or HTTP adapters depending on runtime config.
 */
import type { ProjectRepository } from '@core/domain/repositories/ProjectRepository'
import type { ArticleRepository } from '@core/domain/repositories/ArticleRepository'
import type { SiteContentRepository } from '@core/domain/repositories/SiteContentRepository'

import { ListProjects } from './usecases/projects/ListProjects'
import { GetProjectBySlug } from './usecases/projects/GetProjectBySlug'
import { ListArticles } from './usecases/articles/ListArticles'
import { GetArticleBySlug } from './usecases/articles/GetArticleBySlug'
import { SearchArticles } from './usecases/articles/SearchArticles'
import { GetSiteProfile } from './usecases/site/GetSiteProfile'
import { GetPrinciples } from './usecases/site/GetPrinciples'
import { GetExperience } from './usecases/site/GetExperience'
import { GetAttitudes } from './usecases/site/GetAttitudes'

import { StaticProjectRepository } from '@core/infrastructure/repositories/static/StaticProjectRepository'
import { StaticArticleRepository } from '@core/infrastructure/repositories/static/StaticArticleRepository'
import { StaticSiteContentRepository } from '@core/infrastructure/repositories/static/StaticSiteContentRepository'
import { HttpProjectRepository } from '@core/infrastructure/repositories/http/HttpProjectRepository'
import { HttpArticleRepository } from '@core/infrastructure/repositories/http/HttpArticleRepository'
import { HttpSiteContentRepository } from '@core/infrastructure/repositories/http/HttpSiteContentRepository'

export interface ContainerConfig {
  readonly useHttpRepositories: boolean
  readonly apiBaseUrl: string
}

export interface AppContainer {
  // projects
  listProjects: ListProjects
  getProjectBySlug: GetProjectBySlug
  // articles
  listArticles: ListArticles
  getArticleBySlug: GetArticleBySlug
  searchArticles: SearchArticles
  // site
  getSiteProfile: GetSiteProfile
  getPrinciples: GetPrinciples
  getExperience: GetExperience
  getAttitudes: GetAttitudes
}

export function buildContainer(config: ContainerConfig): AppContainer {
  const projectRepo: ProjectRepository = config.useHttpRepositories
    ? new HttpProjectRepository(config.apiBaseUrl)
    : new StaticProjectRepository()

  const articleRepo: ArticleRepository = config.useHttpRepositories
    ? new HttpArticleRepository(config.apiBaseUrl)
    : new StaticArticleRepository()

  const siteRepo: SiteContentRepository = config.useHttpRepositories
    ? new HttpSiteContentRepository(config.apiBaseUrl)
    : new StaticSiteContentRepository()

  return {
    listProjects: new ListProjects(projectRepo),
    getProjectBySlug: new GetProjectBySlug(projectRepo),
    listArticles: new ListArticles(articleRepo),
    getArticleBySlug: new GetArticleBySlug(articleRepo),
    searchArticles: new SearchArticles(articleRepo),
    getSiteProfile: new GetSiteProfile(siteRepo),
    getPrinciples: new GetPrinciples(siteRepo),
    getExperience: new GetExperience(siteRepo),
    getAttitudes: new GetAttitudes(siteRepo),
  }
}
