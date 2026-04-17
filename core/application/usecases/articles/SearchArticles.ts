import type { Article } from '@core/domain/entities/Article'
import type { ArticleRepository } from '@core/domain/repositories/ArticleRepository'

/**
 * Application-level use case: accepts an arbitrary query, normalises it,
 * and delegates to the infrastructure layer. Returns empty array for
 * empty queries instead of leaking the "empty means all" convention.
 */
export class SearchArticles {
  constructor(private readonly repository: ArticleRepository) {}

  async execute(rawQuery: string, locale: string): Promise<readonly Article[]> {
    const query = (rawQuery ?? '').trim()
    if (query.length < 2) return []
    return this.repository.search(query, locale)
  }
}
