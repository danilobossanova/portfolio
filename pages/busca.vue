<script setup lang="ts">
import { useI18n } from '#imports'
import SearchBar from '~/components/common/SearchBar.vue'
import ArticleCard from '~/components/common/ArticleCard.vue'
import PageHeader from '~/components/common/PageHeader.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const term = ref(String(route.query.q ?? ''))
const debounced = refDebounced(term, 300)

watch(debounced, (value) => {
  router.replace({ query: value ? { q: value } : {} })
})

const { data: results, pending } = useArticleSearch(debounced)

useHead({ title: t('pages.search.title') })
</script>

<template>
  <div>
    <PageHeader :eyebrow="t('nav.search')" :title="t('pages.search.title')" />
    <section class="max-w-5xl mx-auto px-6 md:px-8 pb-24 md:pb-32 space-y-10">
      <SearchBar v-model="term" :placeholder="t('pages.search.placeholder')" />

      <div v-if="term.length < 2" class="text-on-surface-variant">
        {{ t('pages.search.prompt') }}
      </div>
      <div v-else-if="pending" class="text-on-surface-variant opacity-60">…</div>
      <template v-else>
        <div
          class="text-xs uppercase tracking-widest text-on-secondary-container"
        >
          {{ t('pages.search.resultsCount', { count: results?.length ?? 0 }, results?.length ?? 0) }}
        </div>
        <div
          v-if="results && results.length"
          class="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <ArticleCard v-for="article in results" :key="article.slug" :article="article" />
        </div>
        <div v-else class="text-on-surface-variant">
          {{ t('pages.search.empty', { query: term }) }}
        </div>
      </template>
    </section>
  </div>
</template>
