<script setup lang="ts">
const props = defineProps<{
  source: string
}>()

const { render } = useMarkdown()
const html = computed(() => render(props.source))
</script>

<template>
  <!--
    v-html is intentional here: markdown is rendered at build time (SSG) from
    trusted repository data. markdown-it is configured with html:false to block
    raw <script> / inline HTML inside the source.
  -->
  <div class="md-body" v-html="html" />
</template>
