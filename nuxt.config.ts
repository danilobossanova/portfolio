// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-04-14',
  devtools: { enabled: true },
  srcDir: '.',

  alias: {
    '@core': fileURLToPath(new URL('./core', import.meta.url)),
  },

  // SSG — gera HTML estático em `dist/`
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/projetos', '/artigos', '/busca', '/contato'],
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
  ],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'theme',
  },

  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700] },
      {
        name: 'Newsreader',
        provider: 'google',
        weights: [400, 700],
        styles: ['normal', 'italic'],
      },
    ],
    defaults: {
      weights: [400],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
  },

  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true,
    typeCheck: false,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Portfólio — Engenheiro de Software Senior',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Portfólio do Engenheiro de Software Senior — arquitetura, sistemas distribuídos, APIs e integrações confiáveis.',
        },
        { name: 'theme-color', content: '#171717' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Portfólio — Engenheiro de Software Senior' },
        {
          property: 'og:description',
          content:
            'Arquitetura limpa, integrações confiáveis e software construído para durar.',
        },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'pt-BR',
    locales: [
      { code: 'pt-BR', language: 'pt-BR', name: 'Português', file: 'pt-BR.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    // v9: langDir is relative to restructureDir (default 'i18n/').
    langDir: 'locales',
    lazy: true,
    bundle: {
      optimizeTranslationDirective: false,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'pt-BR',
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '',
      useHttpRepositories: process.env.NUXT_PUBLIC_USE_HTTP_REPOSITORIES === 'true',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    viewer: false,
  },
})
