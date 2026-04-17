<script setup lang="ts">
import { useI18n, useSwitchLocalePath } from '#imports'

const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const available = computed(() =>
  (locales.value as Array<{ code: string; name: string }>).filter((l) => l.code !== locale.value),
)
</script>

<template>
  <div class="flex items-center gap-2" :aria-label="t('common.language')">
    <span class="text-[10px] uppercase tracking-widest opacity-60">
      {{ locale }}
    </span>
    <NuxtLink
      v-for="item in available"
      :key="item.code"
      :to="switchLocalePath(item.code)"
      class="text-xs font-medium uppercase tracking-widest hover:text-primary transition-colors"
    >
      {{ item.code }}
    </NuxtLink>
  </div>
</template>
