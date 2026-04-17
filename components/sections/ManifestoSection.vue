<script setup lang="ts">
import { useI18n } from '#imports'

const { t } = useI18n()
const { data: profile } = useSiteProfile()
</script>

<template>
  <section id="sobre" class="bg-surface-container-low py-24 md:py-32">
    <div class="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-16">
      <div class="md:col-span-4">
        <div class="sticky top-32">
          <span
            class="font-label text-sm uppercase tracking-widest text-on-secondary-container mb-4 block"
          >
            {{ t('sections.about.eyebrow') }}
          </span>
          <h2 class="font-headline text-4xl md:text-5xl font-bold leading-tight">
            {{ t('sections.about.title') }}
          </h2>
        </div>
      </div>
      <div class="md:col-span-8 space-y-8">
        <div
          v-if="profile?.manifestoImage"
          class="aspect-video bg-surface-container w-full overflow-hidden rounded-sm mb-12 shadow-sm"
        >
          <img
            :src="profile.manifestoImage"
            :alt="profile.fullName"
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
            class="w-full h-full object-cover opacity-80"
          />
        </div>
        <div class="text-lg text-on-surface-variant leading-relaxed space-y-6">
          <p v-for="(paragraph, i) in profile?.manifesto ?? []" :key="i">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
