import type { Article } from '../entities/Article'

export interface ArticleQuery {
  readonly tag?: string
  readonly category?: string
  readonly limit?: number
  readonly offset?: number
}

export interface ArticleRepository {
  list(locale: string, query?: ArticleQuery): Promise<readonly Article[]>
  findBySlug(slug: string, locale: string): Promise<Article | null>
  search(query: string, locale: string): Promise<readonly Article[]>
}
