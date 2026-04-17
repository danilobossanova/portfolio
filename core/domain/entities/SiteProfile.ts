/**
 * Domain entity — site-wide profile / author identity.
 */
export interface SocialLink {
  readonly kind: 'email' | 'linkedin' | 'github' | 'twitter' | 'website'
  readonly label: string
  readonly href: string
}

export interface SiteProfile {
  /** Short brand label used in the navbar, browser tab title and favicon. */
  readonly brandName: string
  /** Full professional identity used in the footer, OG tags and signatures. */
  readonly fullName: string
  readonly headline: string
  readonly manifesto: readonly string[]
  readonly contactIntro: string
  readonly avatar?: string
  readonly manifestoImage?: string
  readonly social: readonly SocialLink[]
}
