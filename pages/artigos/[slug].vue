<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { useI18n, useLocalePath } from '#imports'
import MarkdownRenderer from '~/components/common/MarkdownRenderer.vue'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const { formatDate } = useFormatters()

const slug = computed(() => String(route.params.slug))
const { data: article } = await useArticle(slug.value)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}

useHead({
  title: article.value.title,
  meta: [
    { name: 'description', content: article.value.excerpt },
    { name: 'author', content: article.value.author },
    { property: 'og:title', content: article.value.title },
    { property: 'og:description', content: article.value.excerpt },
    { property: 'og:type', content: 'article' },
    { property: 'article:published_time', content: article.value.publishedAt },
    ...(article.value.coverImage
      ? [{ property: 'og:image', content: article.value.coverImage }]
      : []),
  ],
})
</script>

<template>
  <article v-if="article" class="pt-32 md:pt-40 pb-24 md:pb-32">
    <header class="max-w-3xl mx-auto px-6 md:px-8 space-y-6">
      <NuxtLink
        :to="localePath('/artigos')"
        class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity"
      >
        <ArrowLeft class="w-4 h-4" /> {{ t('sections.writing.backToList') }}
      </NuxtLink>
      <span
        class="font-label text-[10px] uppercase tracking-widest text-on-secondary-container block"
      >
        {{ article.category }} • {{ article.readTimeMinutes }}
        {{ t('sections.writing.readTime') }}
      </span>
      <h1 class="font-headline text-4xl md:text-6xl font-bold leading-tight text-balance">
        {{ article.title }}
      </h1>
      <p class="text-xl text-on-surface-variant leading-relaxed">{{ article.excerpt }}</p>
      <div
        class="text-[10px] uppercase tracking-widest opacity-60 flex flex-wrap gap-4 pt-2 border-t border-outline-variant/30"
      >
        <span>{{ t('sections.writing.author') }}: {{ article.author }}</span>
        <span>{{ t('sections.writing.publishedAt') }} {{ formatDate(article.publishedAt) }}</span>
      </div>
    </header>

    <div v-if="article.coverImage" class="max-w-5xl mx-auto px-6 md:px-8 mt-12">
      <div class="aspect-video bg-surface-container overflow-hidden rounded-sm">
        <img
          :src="article.coverImage"
          :alt="article.title"
          referrerpolicy="no-referrer"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-6 md:px-8 mt-16">
      <MarkdownRenderer :source="article.body" />
    </div>

    <div class="max-w-3xl mx-auto px-6 md:px-8 mt-16 flex flex-wrap gap-2">
      <span
        v-for="tag in article.tags"
        :key="tag"
        class="px-3 py-1 border border-outline-variant rounded-full text-xs"
      >
        #{{ tag }}
      </span>
    </div>
  </article>
</template>
