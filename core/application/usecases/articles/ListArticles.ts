import type { Article } from '@core/domain/entities/Article'
import type { ArticleQuery, ArticleRepository } from '@core/domain/repositories/ArticleRepository'

export class ListArticles {
  constructor(private readonly repository: ArticleRepository) {}

  execute(locale: string, query?: ArticleQuery): Promise<readonly Article[]> {
    return this.repository.list(locale, query)
  }
}
