import type { SiteProfile } from '@core/domain/entities/SiteProfile'
import type { Principle } from '@core/domain/entities/Principle'
import type { ExperienceStack } from '@core/domain/entities/Experience'
import type { Attitude } from '@core/domain/entities/Attitude'

export const useSiteProfile = () => {
  const container = useContainer()
  const { locale } = useI18n()
  return useAsyncData<SiteProfile | null>(
    () => `profile-${locale.value}`,
    () => container.getSiteProfile.execute(locale.value),
    { watch: [locale] },
  )
}

export const usePrinciples = () => {
  const container = useContainer()
  const { locale } = useI18n()
  return useAsyncData<readonly Principle[]>(
    () => `principles-${locale.value}`,
    () => container.getPrinciples.execute(locale.value),
    { watch: [locale], default: () => [] },
  )
}

export const useExperience = () => {
  const container = useContainer()
  const { locale } = useI18n()
  return useAsyncData<readonly ExperienceStack[]>(
    () => `experience-${locale.value}`,
    () => container.getExperience.execute(locale.value),
    { watch: [locale], default: () => [] },
  )
}

export const useAttitudes = () => {
  const container = useContainer()
  const { locale } = useI18n()
  return useAsyncData<readonly Attitude[]>(
    () => `attitudes-${locale.value}`,
    () => container.getAttitudes.execute(locale.value),
    { watch: [locale], default: () => [] },
  )
}
