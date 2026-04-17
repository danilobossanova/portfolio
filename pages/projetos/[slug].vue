<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { useI18n, useLocalePath } from '#imports'
import MarkdownRenderer from '~/components/common/MarkdownRenderer.vue'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const { formatDate } = useFormatters()

const slug = computed(() => String(route.params.slug))
const { data: project } = await useProject(slug.value)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

useHead({
  title: project.value.title,
  meta: [
    { name: 'description', content: project.value.summary },
    { property: 'og:title', content: project.value.title },
    { property: 'og:description', content: project.value.summary },
    { property: 'og:image', content: project.value.coverImage },
  ],
})
</script>

<template>
  <article v-if="project" class="pt-32 md:pt-40 pb-24 md:pb-32">
    <header class="max-w-5xl mx-auto px-6 md:px-8 space-y-6">
      <NuxtLink
        :to="localePath('/projetos')"
        class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity"
      >
        <ArrowLeft class="w-4 h-4" /> {{ t('sections.projects.backToList') }}
      </NuxtLink>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
        >
          {{ tag }}
        </span>
      </div>
      <h1 class="font-headline text-4xl md:text-6xl font-bold leading-tight text-balance">
        {{ project.title }}
      </h1>
      <p class="text-lg md:text-xl text-on-surface-variant">{{ project.summary }}</p>
      <p class="text-xs uppercase tracking-widest opacity-60">
        {{ t('sections.projects.publishedAt') }} {{ formatDate(project.publishedAt) }}
      </p>
    </header>

    <div class="max-w-5xl mx-auto px-6 md:px-8 mt-12">
      <div class="aspect-video bg-surface-container overflow-hidden rounded-sm">
        <img
          :src="project.coverImage"
          :alt="project.title"
          referrerpolicy="no-referrer"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-6 md:px-8 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="space-y-2">
        <h2 class="text-xs font-bold uppercase tracking-widest text-primary">
          {{ t('sections.projects.context') }}
        </h2>
        <p class="text-on-surface-variant leading-relaxed">{{ project.context }}</p>
      </div>
      <div class="space-y-2">
        <h2 class="text-xs font-bold uppercase tracking-widest text-primary">
          {{ t('sections.projects.solution') }}
        </h2>
        <p class="text-on-surface-variant leading-relaxed">{{ project.solution }}</p>
      </div>
      <div class="space-y-2">
        <h2 class="text-xs font-bold uppercase tracking-widest text-primary">
          {{ t('sections.projects.result') }}
        </h2>
        <p class="text-on-surface-variant leading-relaxed italic font-headline">
          {{ project.result }}
        </p>
      </div>
    </div>

    <div
      v-if="project.metrics?.length"
      class="max-w-5xl mx-auto px-6 md:px-8 mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
    >
      <div
        v-for="metric in project.metrics"
        :key="metric.label"
        class="p-6 bg-surface-container-lowest border border-outline-variant/30 rounded-sm text-center"
      >
        <p class="font-headline text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="text-[10px] uppercase tracking-widest opacity-70 mt-2">{{ metric.label }}</p>
      </div>
    </div>

    <div v-if="project.body" class="max-w-3xl mx-auto px-6 md:px-8 mt-20">
      <MarkdownRenderer :source="project.body" />
    </div>

    <div class="max-w-5xl mx-auto px-6 md:px-8 mt-20">
      <h3 class="text-xs font-bold uppercase tracking-widest text-primary mb-4">
        {{ t('sections.projects.stack') }}
      </h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tech in project.stack"
          :key="tech"
          class="px-3 py-1 border border-outline-variant rounded-full text-xs"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </article>
</template>
