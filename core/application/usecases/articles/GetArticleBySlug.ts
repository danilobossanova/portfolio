import type { Article } from '@core/domain/entities/Article'
import type { ArticleRepository } from '@core/domain/repositories/ArticleRepository'

export class ArticleNotFoundError extends Error {
  constructor(slug: string) {
    super(`Article with slug "${slug}" was not found.`)
    this.name = 'ArticleNotFoundError'
  }
}

export class GetArticleBySlug {
  constructor(private readonly repository: ArticleRepository) {}

  async execute(slug: string, locale: string): Promise<Article> {
    const article = await this.repository.findBySlug(slug, locale)
    if (!article) throw new ArticleNotFoundError(slug)
    return article
  }
}
