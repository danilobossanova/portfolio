<script setup lang="ts">
import { useI18n } from '#imports'

const { locale } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()
const { data: profile } = await useSiteProfile()

const brandName = computed(() => profile.value?.brandName ?? '')

useHead({
  htmlAttrs: { lang: locale },
  titleTemplate: (titleChunk) =>
    titleChunk ? `${titleChunk} — ${brandName.value}` : brandName.value,
  link: [
    {
      rel: 'canonical',
      href: `${config.public.siteUrl}${route.fullPath}`,
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
