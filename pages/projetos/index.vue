<script setup lang="ts">
import { useI18n } from '#imports'
import ProjectCard from '~/components/common/ProjectCard.vue'
import PageHeader from '~/components/common/PageHeader.vue'

const { t } = useI18n()
const { data: projects } = useProjectList()

useHead({ title: t('pages.projects.title') })
</script>

<template>
  <div>
    <PageHeader
      :eyebrow="t('sections.projects.eyebrow')"
      :title="t('pages.projects.title')"
      :subtitle="t('pages.projects.subtitle')"
    />
    <section class="max-w-7xl mx-auto px-6 md:px-8 pb-24 md:pb-32">
      <div v-if="projects && projects.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
      </div>
      <p v-else class="text-on-surface-variant">{{ t('pages.projects.empty') }}</p>
    </section>
  </div>
</template>
