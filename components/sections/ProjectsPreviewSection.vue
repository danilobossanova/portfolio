<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { useI18n, useLocalePath } from '#imports'
import ProjectCard from '~/components/common/ProjectCard.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const { data: projects } = useProjectList()
const preview = computed(() => (projects.value ?? []).slice(0, 3))
</script>

<template>
  <section id="projetos" class="bg-surface py-24 md:py-32">
    <div class="max-w-7xl mx-auto px-6 md:px-8">
      <div class="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span
            class="font-label text-sm uppercase tracking-widest text-on-secondary-container mb-4 block"
          >
            {{ t('sections.projects.eyebrow') }}
          </span>
          <h2 class="font-headline text-4xl md:text-5xl font-bold max-w-3xl">
            {{ t('sections.projects.title') }}
          </h2>
        </div>
        <NuxtLink
          :to="localePath('/projetos')"
          class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
        >
          {{ t('sections.projects.viewAll') }} <ArrowRight class="w-4 h-4" />
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ProjectCard v-for="project in preview" :key="project.slug" :project="project" />
      </div>
    </div>
  </section>
</template>
