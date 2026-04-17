<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header class="max-w-7xl mx-auto px-6 md:px-8 pt-32 md:pt-40 pb-12 md:pb-16">
    <span
      v-if="eyebrow"
      class="font-label text-sm uppercase tracking-widest text-on-secondary-container mb-4 block"
    >
      {{ eyebrow }}
    </span>
    <h1 class="font-headline text-4xl md:text-6xl font-bold leading-tight text-balance">
      {{ title }}
    </h1>
    <p v-if="subtitle" class="mt-6 text-lg md:text-xl text-on-surface-variant max-w-3xl">
      {{ subtitle }}
    </p>
  </header>
</template>
