/**
 * Domain entity — technical stacks / experience buckets.
 */
export interface ExperienceItem {
  readonly name: string
  readonly level: string
}

export interface ExperienceStack {
  readonly id: string
  readonly title: string
  readonly items: readonly ExperienceItem[]
}
