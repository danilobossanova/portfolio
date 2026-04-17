import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

/**
 * Single shared instance. Markdown-it is stateless per render, so a module-level
 * instance is both safe and the most efficient choice for SSG.
 *
 * Security posture:
 * - `html: false` blocks raw <script>/inline HTML inside markdown.
 * - Links are linkified but rendered through markdown-it's sanitised renderer.
 * - Content source is trusted (owner-authored in repository / future CMS).
 *   If we ever accept third-party markdown, wrap the output in DOMPurify.
 */
const md: MarkdownIt = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  breaks: false,
  highlight(code, lang) {
    const language = lang && hljs.getLanguage(lang) ? lang : ''
    if (language) {
      try {
        const highlighted = hljs.highlight(code, { language, ignoreIllegals: true }).value
        return `<pre class="hljs"><code class="language-${language}">${highlighted}</code></pre>`
      } catch {
        /* fall through to plain */
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(code)}</code></pre>`
  },
})

// External links open in a new tab with noopener
const defaultLinkOpen =
  md.renderer.rules.link_open ??
  function (tokens, idx, options, _env, self) {
    return self.renderToken(tokens, idx, options)
  }

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const token = tokens[idx]
  const href = token.attrGet('href') ?? ''
  const isExternal = /^https?:\/\//.test(href)
  if (isExternal) {
    token.attrSet('target', '_blank')
    token.attrSet('rel', 'noopener noreferrer')
  }
  return defaultLinkOpen(tokens, idx, options, env, self)
}

/**
 * Render a markdown source string to a trusted HTML string.
 * Stateless. Safe to call in SSR and client.
 */
export const useMarkdown = () => ({
  render: (source: string): string => (source ? md.render(source) : ''),
})
