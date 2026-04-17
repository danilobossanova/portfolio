<script setup lang="ts">
import { useLocalePath } from '#imports'
import type { Project } from '@core/domain/entities/Project'

defineProps<{ project: Project }>()
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink
    :to="localePath(`/projetos/${project.slug}`)"
    class="group block bg-surface-container-lowest border border-outline-variant/20 rounded-sm overflow-hidden editorial-shadow hover:-translate-y-1 transition-all duration-300"
  >
    <div class="aspect-video bg-surface-container overflow-hidden">
      <img
        :src="project.coverImage"
        :alt="project.title"
        loading="lazy"
        referrerpolicy="no-referrer"
        class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
      />
    </div>
    <div class="p-6 space-y-4">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider"
        >
          {{ tag }}
        </span>
      </div>
      <h3 class="font-headline text-2xl font-bold group-hover:text-primary transition-colors">
        {{ project.title }}
      </h3>
      <p class="text-on-surface-variant text-sm leading-relaxed line-clamp-3">
        {{ project.summary }}
      </p>
    </div>
  </NuxtLink>
</template>
