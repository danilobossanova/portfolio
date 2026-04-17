import type { Article } from '@core/domain/entities/Article'
import type {
  ArticleQuery,
  ArticleRepository,
} from '@core/domain/repositories/ArticleRepository'
import { articlesData } from '@core/infrastructure/data/articles'

const DEFAULT_LOCALE = 'pt-BR'

const normalize = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

export class StaticArticleRepository implements ArticleRepository {
  async list(locale: string, query?: ArticleQuery): Promise<readonly Article[]> {
    const all = articlesData[locale] ?? articlesData[DEFAULT_LOCALE] ?? []
    let result: readonly Article[] = [...all].sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt),
    )

    if (query?.tag) {
      const tag = query.tag.toLowerCase()
      result = result.filter((a) => a.tags.some((t) => t.toLowerCase() === tag))
    }
    if (query?.category) {
      const category = query.category.toLowerCase()
      result = result.filter((a) => a.category.toLowerCase() === category)
    }

    const offset = query?.offset ?? 0
    const limit = query?.limit ?? result.length
    return result.slice(offset, offset + limit)
  }

  async findBySlug(slug: string, locale: string): Promise<Article | null> {
    const all = articlesData[locale] ?? articlesData[DEFAULT_LOCALE] ?? []
    return all.find((a) => a.slug === slug) ?? null
  }

  async search(query: string, locale: string): Promise<readonly Article[]> {
    const needle = normalize(query)
    if (!needle) return []
    const all = articlesData[locale] ?? articlesData[DEFAULT_LOCALE] ?? []
    return all.filter((a) => {
      const haystack = normalize(
        [a.title, a.excerpt, a.category, a.body, a.tags.join(' ')].join(' '),
      )
      return haystack.includes(needle)
    })
  }
}
