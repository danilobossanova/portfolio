<script setup lang="ts">
import type { NuxtError } from '#app'
import { useI18n, useLocalePath } from '#imports'

defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()
const handleError = () => clearError({ redirect: localePath('/') })
</script>

<template>
  <NuxtLayout>
    <section class="min-h-[60vh] flex items-center justify-center px-6 md:px-8">
      <div class="max-w-xl text-center space-y-6">
        <p class="font-headline text-7xl font-bold">{{ error.statusCode }}</p>
        <h1 class="font-headline text-3xl md:text-4xl font-bold">
          {{ t('pages.notFound.title') }}
        </h1>
        <p class="text-on-surface-variant">{{ t('pages.notFound.description') }}</p>
        <button
          type="button"
          class="bg-primary text-on-primary px-8 py-4 font-medium rounded-sm hover:opacity-90 transition-all"
          @click="handleError"
        >
          {{ t('pages.notFound.home') }}
        </button>
      </div>
    </section>
  </NuxtLayout>
</template>
