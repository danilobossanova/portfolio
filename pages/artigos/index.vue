<script setup lang="ts">
import { useI18n } from '#imports'
import ArticleCard from '~/components/common/ArticleCard.vue'
import PageHeader from '~/components/common/PageHeader.vue'

const { t } = useI18n()
const { data: articles } = useArticleList()

useHead({ title: t('pages.articles.title') })
</script>

<template>
  <div>
    <PageHeader
      :eyebrow="t('sections.writing.eyebrow')"
      :title="t('pages.articles.title')"
      :subtitle="t('pages.articles.subtitle')"
    />
    <section class="max-w-7xl mx-auto px-6 md:px-8 pb-24 md:pb-32">
      <div
        v-if="articles && articles.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <ArticleCard v-for="article in articles" :key="article.slug" :article="article" />
      </div>
      <p v-else class="text-on-surface-variant">{{ t('pages.articles.empty') }}</p>
    </section>
  </div>
</template>
