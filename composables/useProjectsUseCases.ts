import type { Project } from '@core/domain/entities/Project'

/**
 * Vue composable wrapping project use cases with Nuxt's data layer (SSR/SSG friendly).
 */
export const useProjectList = () => {
  const container = useContainer()
  const { locale } = useI18n()
  return useAsyncData<readonly Project[]>(
    () => `projects-${locale.value}`,
    () => container.listProjects.execute(locale.value),
    { watch: [locale], default: () => [] },
  )
}

export const useProject = (slug: string) => {
  const container = useContainer()
  const { locale } = useI18n()
  return useAsyncData<Project | null>(
    () => `project-${slug}-${locale.value}`,
    async () => {
      try {
        return await container.getProjectBySlug.execute(slug, locale.value)
      } catch {
        return null
      }
    },
    { watch: [locale] },
  )
}
