<script setup lang="ts">
import { useI18n } from '#imports'

const { t } = useI18n()
</script>

<template>
  <a href="#main-content" class="skip-link">
    {{ t('common.backToTop') }}
  </a>
</template>
