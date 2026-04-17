<script setup lang="ts">
import { useI18n } from '#imports'
import ContactSection from '~/components/sections/ContactSection.vue'

const { t } = useI18n()
useHead({ title: t('pages.contact.title') })
</script>

<template>
  <div class="pt-20">
    <ContactSection />
  </div>
</template>
