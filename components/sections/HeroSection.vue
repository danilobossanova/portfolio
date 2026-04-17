<script setup lang="ts">
import { useI18n, useLocalePath } from '#imports'

const { t } = useI18n()
const localePath = useLocalePath()
const { data: profile } = useSiteProfile()
</script>

<template>
  <section
    id="inicio"
    class="max-w-7xl mx-auto px-6 md:px-8 pt-32 md:pt-40 pb-16 md:pb-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
  >
    <div class="md:col-span-7 space-y-8">
      <h1
        class="font-headline text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-balance"
      >
        {{ profile?.headline }}
      </h1>
      <p class="text-xl md:text-2xl text-on-surface-variant leading-relaxed max-w-2xl">
        {{ profile?.manifesto?.[0] }}
      </p>
      <div class="flex flex-wrap gap-4 pt-4">
        <NuxtLink
          :to="localePath('/projetos')"
          class="bg-primary text-on-primary px-8 py-4 font-medium rounded-sm hover:opacity-90 transition-all active:scale-95"
        >
          {{ t('hero.ctaProjects') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/contato')"
          class="bg-surface-container-high text-on-surface px-8 py-4 font-medium rounded-sm hover:bg-surface-container-highest transition-all"
        >
          {{ t('hero.ctaContact') }}
        </NuxtLink>
      </div>
    </div>
    <div class="md:col-span-5 relative">
      <div class="aspect-[4/5] bg-surface-container-high overflow-hidden rounded-sm editorial-shadow">
        <img
          v-if="profile?.avatar"
          :src="profile.avatar"
          :alt="profile.fullName"
          width="800"
          height="1000"
          fetchpriority="high"
          decoding="async"
          class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
        />
      </div>
      <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-container/10 -z-10" />
    </div>
  </section>
</template>
