<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { Menu, X, Sun, Moon, Search } from 'lucide-vue-next'
import { useI18n, useLocalePath } from '#imports'
import LocaleSwitcher from './LocaleSwitcher.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const { data: profile } = useSiteProfile()

// Tema: useDark retorna uma WritableComputedRef. Atribuição direta é
// mais confiável que useToggle() nesse caso (evita um bug conhecido).
const isDark = useDark()
const toggleDark = () => {
  isDark.value = !isDark.value
}

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navLinks = computed(() => [
  { name: t('nav.home'), to: localePath('/') },
  { name: t('nav.projects'), to: localePath('/projetos') },
  { name: t('nav.writing'), to: localePath('/artigos') },
  { name: t('nav.contact'), to: localePath('/contato') },
])

const onScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav
    :class="[
      'fixed top-0 w-full z-50 transition-all duration-300 border-b',
      isScrolled
        ? 'bg-background/85 backdrop-blur-md py-4 border-outline-variant/20'
        : 'bg-transparent py-6 border-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center gap-6">
      <NuxtLink
        :to="localePath('/')"
        class="font-headline italic font-bold text-2xl tracking-tight"
      >
        {{ profile?.brandName }}
      </NuxtLink>

      <!-- Desktop -->
      <div class="hidden md:flex items-center space-x-6">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest"
        >
          {{ link.name }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/busca')"
          class="p-2 rounded-full hover:bg-surface-container transition-colors"
          :aria-label="t('nav.search')"
        >
          <Search :size="18" />
        </NuxtLink>
        <LocaleSwitcher />
        <button
          type="button"
          class="p-2 rounded-full hover:bg-surface-container transition-colors"
          :aria-label="t('common.toggleTheme')"
          @click="toggleDark"
        >
          <ClientOnly>
            <Sun v-if="isDark" :size="18" />
            <Moon v-else :size="18" />
            <template #fallback>
              <div class="w-[18px] h-[18px]" aria-hidden="true" />
            </template>
          </ClientOnly>
        </button>
      </div>

      <!-- Mobile -->
      <div class="md:hidden flex items-center space-x-2">
        <NuxtLink
          :to="localePath('/busca')"
          class="p-2"
          :aria-label="t('nav.search')"
        >
          <Search :size="20" />
        </NuxtLink>
        <button
          type="button"
          class="p-2"
          :aria-label="t('common.toggleTheme')"
          @click="toggleDark"
        >
          <ClientOnly>
            <Sun v-if="isDark" :size="20" />
            <Moon v-else :size="20" />
            <template #fallback>
              <div class="w-[20px] h-[20px]" aria-hidden="true" />
            </template>
          </ClientOnly>
        </button>
        <button
          type="button"
          class="p-2"
          :aria-label="isMenuOpen ? t('common.closeMenu') : t('common.openMenu')"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          @click="isMenuOpen = !isMenuOpen"
        >
          <Menu v-if="!isMenuOpen" :size="22" />
          <X v-else :size="22" />
        </button>
      </div>
    </div>

    <div
      v-if="isMenuOpen"
      id="mobile-menu"
      class="md:hidden absolute top-full left-0 w-full bg-background border-b border-outline-variant/20 p-8 space-y-4"
    >
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="block text-lg font-medium"
        @click="isMenuOpen = false"
      >
        {{ link.name }}
      </NuxtLink>
      <LocaleSwitcher class="pt-4 border-t border-outline-variant/30" />
    </div>
  </nav>
</template>
