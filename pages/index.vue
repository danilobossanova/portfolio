<script setup lang="ts">
import { useI18n } from '#imports'
import HeroSection from '~/components/sections/HeroSection.vue'
import ManifestoSection from '~/components/sections/ManifestoSection.vue'
import PrinciplesSection from '~/components/sections/PrinciplesSection.vue'
import ProjectsPreviewSection from '~/components/sections/ProjectsPreviewSection.vue'
import ExperienceSection from '~/components/sections/ExperienceSection.vue'
import AttitudeSection from '~/components/sections/AttitudeSection.vue'
import WritingPreviewSection from '~/components/sections/WritingPreviewSection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'

const { t } = useI18n()
useHead({ title: t('nav.home') })
</script>

<template>
  <div>
    <HeroSection />
    <ManifestoSection />
    <PrinciplesSection />
    <ProjectsPreviewSection />
    <ExperienceSection />
    <AttitudeSection />
    <WritingPreviewSection />
    <ContactSection />
  </div>
</template>
