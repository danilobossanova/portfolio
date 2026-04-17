<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'

const model = defineModel<string>({ default: '' })
const props = defineProps<{ placeholder?: string }>()

const clear = () => (model.value = '')
</script>

<template>
  <div
    class="flex items-center gap-3 bg-surface-container-lowest border border-outline-variant/50 rounded-sm px-4 py-3 focus-within:border-primary transition-colors"
  >
    <Search :size="18" class="opacity-60" aria-hidden="true" />
    <input
      v-model="model"
      type="search"
      :placeholder="props.placeholder"
      class="flex-1 bg-transparent outline-none text-base"
    />
    <button
      v-if="model"
      type="button"
      class="opacity-60 hover:opacity-100"
      aria-label="clear"
      @click="clear"
    >
      <X :size="18" />
    </button>
  </div>
</template>
