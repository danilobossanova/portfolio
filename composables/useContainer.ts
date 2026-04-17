import type { AppContainer } from '@core/application/container'

/** Typed accessor for the Clean Architecture container. */
export const useContainer = (): AppContainer => {
  const { $container } = useNuxtApp()
  return $container
}
