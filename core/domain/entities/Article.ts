/**
 * Domain entity — Article (blog post).
 */
export interface Article {
  readonly slug: string
  readonly title: string
  readonly excerpt: string
  readonly category: string
  readonly tags: readonly string[]
  readonly readTimeMinutes: number
  readonly publishedAt: string // ISO 8601
  readonly coverImage?: string
  readonly body: string // markdown / HTML
  readonly author: string
}
