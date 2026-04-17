<script setup lang="ts">
import { useI18n } from '#imports'

const { t } = useI18n()
const { data: profile } = useSiteProfile()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-surface-container-highest py-12 px-6 md:px-8">
    <div
      class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4"
    >
      <span class="font-headline text-lg font-bold">
        {{ profile?.fullName }}
      </span>
      <span class="font-label text-[10px] uppercase tracking-widest opacity-60 text-center">
        © {{ currentYear }} {{ profile?.brandName }}.
        {{ t('common.allRightsReserved') }}.
      </span>
      <div class="flex space-x-6">
        <a
          v-for="link in profile?.social ?? []"
          :key="link.kind"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="font-label text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </footer>
</template>
