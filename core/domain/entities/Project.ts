/**
 * Domain entity — Project (Case Study).
 * Pure TypeScript: no Vue, no Nuxt, no framework leakage.
 */
export interface Project {
  readonly slug: string
  readonly title: string
  readonly summary: string
  readonly tags: readonly string[]
  readonly context: string
  readonly solution: string
  readonly result: string
  readonly stack: readonly string[]
  readonly coverImage: string
  readonly publishedAt: string // ISO 8601
  readonly body?: string // rich markdown for detail page
  readonly metrics?: readonly ProjectMetric[]
}

export interface ProjectMetric {
  readonly label: string
  readonly value: string
}
