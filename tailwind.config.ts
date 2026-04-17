import type { Config } from 'tailwindcss'

/**
 * Helper that expands a CSS custom property defined as an RGB triplet
 * ("255 255 255") into a Tailwind color that supports alpha modifiers
 * (e.g. `bg-primary/40`).
 */
const withOpacity = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`

export default <Partial<Config>>{
  darkMode: 'class',
  // The `.dark` class is applied on <html> by @vueuse useDark() at runtime,
  // so Tailwind's content scanner never sees it. Without this safelist it
  // would tree-shake our custom .dark { --color-* } rules.
  safelist: ['dark'],
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './composables/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['Newsreader', 'serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Inter', 'sans-serif'],
      },
      colors: {
        background: withOpacity('--color-background'),
        surface: withOpacity('--color-surface'),
        'on-surface': withOpacity('--color-on-surface'),
        'on-surface-variant': withOpacity('--color-on-surface-variant'),
        primary: withOpacity('--color-primary'),
        'on-primary': withOpacity('--color-on-primary'),
        'surface-container': withOpacity('--color-surface-container'),
        'surface-container-low': withOpacity('--color-surface-container-low'),
        'surface-container-high': withOpacity('--color-surface-container-high'),
        'surface-container-highest': withOpacity('--color-surface-container-highest'),
        'surface-container-lowest': withOpacity('--color-surface-container-lowest'),
        'outline-variant': withOpacity('--color-outline-variant'),
        'secondary-container': withOpacity('--color-secondary-container'),
        'on-secondary-container': withOpacity('--color-on-secondary-container'),
        'primary-container': withOpacity('--color-primary-container'),
      },
    },
  },
  plugins: [],
}
