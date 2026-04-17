<script setup lang="ts">
import { useI18n } from '#imports'

const { t } = useI18n()
const { data: stacks } = useExperience()
</script>

<template>
  <section id="experiencia" class="py-24 md:py-32 bg-surface-container-low">
    <div class="max-w-7xl mx-auto px-6 md:px-8">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-16">
        <div class="md:col-span-4">
          <span
            class="font-label text-sm uppercase tracking-widest text-on-secondary-container mb-4 block"
          >
            {{ t('sections.experience.eyebrow') }}
          </span>
          <h2 class="font-headline text-4xl font-bold">
            {{ t('sections.experience.title') }}
          </h2>
          <p class="mt-6 text-on-surface-variant leading-relaxed">
            {{ t('sections.experience.description') }}
          </p>
        </div>
        <div class="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-12">
          <div v-for="stack in stacks ?? []" :key="stack.id">
            <h3 class="font-bold uppercase tracking-widest text-xs mb-6 text-primary">
              {{ stack.title }}
            </h3>
            <ul class="space-y-4 text-on-surface-variant">
              <li
                v-for="item in stack.items"
                :key="item.name"
                class="flex justify-between border-b border-outline-variant pb-2 gap-4"
              >
                <span class="text-sm font-medium">{{ item.name }}</span>
                <span class="text-[10px] opacity-50 uppercase tracking-tighter pt-1">
                  {{ item.level }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
