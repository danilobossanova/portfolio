import type { Ref } from 'vue'
import type { Article } from '@core/domain/entities/Article'
import type { ArticleQuery } from '@core/domain/repositories/ArticleRepository'

export const useArticleList = (query?: ArticleQuery) => {
  const container = useContainer()
  const { locale } = useI18n()
  return useAsyncData<readonly Article[]>(
    () => `articles-${locale.value}-${JSON.stringify(query ?? {})}`,
    () => container.listArticles.execute(locale.value, query),
    { watch: [locale], default: () => [] },
  )
}

export const useArticle = (slug: string) => {
  const container = useContainer()
  const { locale } = useI18n()
  return useAsyncData<Article | null>(
    () => `article-${slug}-${locale.value}`,
    async () => {
      try {
        return await container.getArticleBySlug.execute(slug, locale.value)
      } catch {
        return null
      }
    },
    { watch: [locale] },
  )
}

export const useArticleSearch = (searchTerm: Ref<string>) => {
  const container = useContainer()
  const { locale } = useI18n()
  return useAsyncData<readonly Article[]>(
    () => `article-search-${locale.value}-${searchTerm.value}`,
    () => container.searchArticles.execute(searchTerm.value, locale.value),
    { watch: [searchTerm, locale], default: () => [] },
  )
}
