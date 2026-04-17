import type { Article } from '@core/domain/entities/Article'
import type {
  ArticleQuery,
  ArticleRepository,
} from '@core/domain/repositories/ArticleRepository'

export class HttpArticleRepository implements ArticleRepository {
  constructor(private readonly baseUrl: string) {}

  async list(locale: string, query?: ArticleQuery): Promise<readonly Article[]> {
    const params = new URLSearchParams({ locale })
    if (query?.tag) params.set('tag', query.tag)
    if (query?.category) params.set('category', query.category)
    if (query?.limit !== undefined) params.set('limit', String(query.limit))
    if (query?.offset !== undefined) params.set('offset', String(query.offset))
    const res = await fetch(`${this.baseUrl}/articles?${params.toString()}`)
    if (!res.ok) throw new Error(`Failed to fetch articles (${res.status})`)
    return (await res.json()) as Article[]
  }

  async findBySlug(slug: string, locale: string): Promise<Article | null> {
    const res = await fetch(
      `${this.baseUrl}/articles/${encodeURIComponent(slug)}?locale=${locale}`,
    )
    if (res.status === 404) return null
    if (!res.ok) throw new Error(`Failed to fetch article ${slug} (${res.status})`)
    return (await res.json()) as Article
  }

  async search(query: string, locale: string): Promise<readonly Article[]> {
    const params = new URLSearchParams({ q: query, locale })
    const res = await fetch(`${this.baseUrl}/articles/search?${params.toString()}`)
    if (!res.ok) throw new Error(`Failed to search articles (${res.status})`)
    return (await res.json()) as Article[]
  }
}
