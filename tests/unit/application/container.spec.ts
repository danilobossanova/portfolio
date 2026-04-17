import { describe, it, expect } from 'vitest'
import { buildContainer } from '@core/application/container'
import { ListProjects } from '@core/application/usecases/projects/ListProjects'
import { SearchArticles } from '@core/application/usecases/articles/SearchArticles'

describe('buildContainer', () => {
  it('wires use cases with static repositories by default', () => {
    const container = buildContainer({ useHttpRepositories: false, apiBaseUrl: '' })
    expect(container.listProjects).toBeInstanceOf(ListProjects)
    expect(container.searchArticles).toBeInstanceOf(SearchArticles)
  })

  it('produces fully working use cases end-to-end (static)', async () => {
    const container = buildContainer({ useHttpRepositories: false, apiBaseUrl: '' })
    const projects = await container.listProjects.execute('pt-BR')
    expect(projects.length).toBeGreaterThan(0)

    const articles = await container.searchArticles.execute('complexidade', 'pt-BR')
    expect(articles.length).toBeGreaterThanOrEqual(1)
  })
})
