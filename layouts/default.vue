<script setup lang="ts">
import AppNavbar from '~/components/common/AppNavbar.vue'
import AppFooter from '~/components/common/AppFooter.vue'
import SkipLink from '~/components/common/SkipLink.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col selection:bg-primary selection:text-on-primary">
    <SkipLink />
    <AppNavbar />
    <main id="main-content" class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
