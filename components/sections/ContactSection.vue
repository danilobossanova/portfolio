<script setup lang="ts">
import { useI18n } from '#imports'

const { t } = useI18n()
const { data: profile } = useSiteProfile()
</script>

<template>
  <section id="contato" class="py-24 md:py-48 bg-surface">
    <div class="max-w-7xl mx-auto px-6 md:px-8 text-center space-y-12">
      <div class="max-w-3xl mx-auto space-y-6">
        <span
          class="font-label text-sm uppercase tracking-widest text-on-secondary-container block"
        >
          {{ t('sections.contact.eyebrow') }}
        </span>
        <h2 class="font-headline text-5xl md:text-7xl font-bold">
          {{ t('sections.contact.title') }}
        </h2>
        <p class="text-xl text-on-surface-variant leading-relaxed">
          {{ profile?.contactIntro }}
        </p>
      </div>
      <div class="flex flex-wrap justify-center gap-8 pt-8">
        <a
          v-for="link in profile?.social ?? []"
          :key="link.kind"
          :href="link.href"
          :target="link.kind === 'email' ? undefined : '_blank'"
          :rel="link.kind === 'email' ? undefined : 'noopener noreferrer'"
          class="text-2xl font-headline font-bold border-b-2 border-primary hover:pb-2 transition-all"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </section>
</template>
