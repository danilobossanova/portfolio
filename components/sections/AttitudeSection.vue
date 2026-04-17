<script setup lang="ts">
import { useI18n } from '#imports'

const { t } = useI18n()
const { data: attitudes } = useAttitudes()
</script>

<template>
  <section class="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-8">
    <div class="text-center mb-16">
      <span
        class="font-label text-sm uppercase tracking-widest text-on-secondary-container mb-4 block"
      >
        {{ t('sections.attitude.eyebrow') }}
      </span>
      <h2 class="font-headline text-4xl md:text-5xl font-bold">
        {{ t('sections.attitude.title') }}
      </h2>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div
        v-for="attitude in attitudes ?? []"
        :key="attitude.id"
        class="text-center p-6 border border-outline-variant rounded-sm hover:bg-surface-container transition-colors group"
      >
        <span class="block font-bold text-on-surface mb-4 uppercase text-[10px] tracking-widest">
          {{ attitude.name }}
        </span>
        <component
          :is="useIcon(attitude.icon)"
          class="w-8 h-8 mx-auto opacity-30 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        />
      </div>
    </div>
  </section>
</template>
