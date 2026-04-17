/**
 * Domain entity — Principle (how I build software).
 * `icon` is a string key resolved on the presentation layer (lucide map),
 * so the domain stays free of UI concerns.
 */
export interface Principle {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly icon: string
}
