<script setup lang="ts">
import { useI18n } from '#imports'

const { t } = useI18n()
const { data: principles } = usePrinciples()
</script>

<template>
  <section id="especialidades" class="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-8">
    <div class="mb-16">
      <span
        class="font-label text-sm uppercase tracking-widest text-on-secondary-container mb-4 block"
      >
        {{ t('sections.principles.eyebrow') }}
      </span>
      <h2 class="font-headline text-4xl md:text-5xl font-bold">
        {{ t('sections.principles.title') }}
      </h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <article
        v-for="principle in principles ?? []"
        :key="principle.id"
        class="p-8 bg-surface-container-lowest border-b-2 border-transparent hover:border-primary transition-all duration-300 group editorial-shadow"
      >
        <component
          :is="useIcon(principle.icon)"
          class="w-10 h-10 mb-6 text-on-surface-variant group-hover:text-primary transition-colors"
          aria-hidden="true"
        />
        <h3 class="font-headline text-2xl font-bold mb-4">{{ principle.title }}</h3>
        <p class="text-on-surface-variant leading-relaxed">{{ principle.description }}</p>
      </article>
    </div>
  </section>
</template>
