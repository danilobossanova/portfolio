/**
 * Nuxt plugin — composition root for the Clean Architecture container.
 * Runs once on the client and once on the server (SSG prerender).
 * Access via `useNuxtApp().$container` or the typed `useContainer()` composable.
 */
import { buildContainer, type AppContainer } from '@core/application/container'

declare module '#app' {
  interface NuxtApp {
    $container: AppContainer
  }
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $container: AppContainer
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const container = buildContainer({
    useHttpRepositories: Boolean(config.public.useHttpRepositories),
    apiBaseUrl: String(config.public.apiBaseUrl ?? ''),
  })
  return { provide: { container } }
})
