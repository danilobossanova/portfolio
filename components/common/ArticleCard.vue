<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { useI18n, useLocalePath } from '#imports'
import type { Article } from '@core/domain/entities/Article'

defineProps<{ article: Article }>()
const { t } = useI18n()
const localePath = useLocalePath()
const { formatDate } = useFormatters()
</script>

<template>
  <NuxtLink
    :to="localePath(`/artigos/${article.slug}`)"
    class="group block bg-surface-container-lowest p-8 h-full transition-all hover:bg-surface-container editorial-shadow border border-outline-variant/20 rounded-sm"
  >
    <span
      class="font-label text-[10px] uppercase tracking-widest text-on-secondary-container mb-4 block"
    >
      {{ article.category }} • {{ article.readTimeMinutes }} {{ t('sections.writing.readTime') }}
    </span>
    <h3
      class="font-headline text-2xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2"
    >
      {{ article.title }}
    </h3>
    <p class="text-on-surface-variant text-sm leading-relaxed line-clamp-3">
      {{ article.excerpt }}
    </p>
    <div
      class="mt-8 pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs font-bold uppercase tracking-widest"
    >
      <span class="opacity-60">{{ formatDate(article.publishedAt) }}</span>
      <span class="flex items-center group-hover:gap-3 gap-2 transition-all">
        {{ t('sections.writing.readArticle') }} <ArrowRight class="w-4 h-4" />
      </span>
    </div>
  </NuxtLink>
</template>
