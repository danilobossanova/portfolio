<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { useI18n, useLocalePath } from '#imports'
import ArticleCard from '~/components/common/ArticleCard.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const { data: articles } = useArticleList({ limit: 3 })
</script>

<template>
  <section id="conteudo" class="py-24 md:py-32 bg-surface-container">
    <div class="max-w-7xl mx-auto px-6 md:px-8">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-16 mb-16">
        <div class="md:col-span-5">
          <span
            class="font-label text-sm uppercase tracking-widest text-on-secondary-container mb-4 block"
          >
            {{ t('sections.writing.eyebrow') }}
          </span>
          <h2 class="font-headline text-4xl md:text-5xl font-bold">
            {{ t('sections.writing.title') }}
          </h2>
        </div>
        <div class="md:col-span-7 flex items-end justify-between gap-6">
          <p class="text-on-surface-variant text-lg leading-relaxed">
            {{ t('sections.writing.description') }}
          </p>
          <NuxtLink
            :to="localePath('/artigos')"
            class="hidden md:inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest whitespace-nowrap hover:text-primary transition-colors"
          >
            {{ t('sections.writing.viewAll') }} <ArrowRight class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ArticleCard
          v-for="article in articles ?? []"
          :key="article.slug"
          :article="article"
        />
      </div>
    </div>
  </section>
</template>
