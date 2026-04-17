import { describe, it, expect } from 'vitest'
import { useMarkdown } from '@/composables/useMarkdown'

describe('useMarkdown', () => {
  const { render } = useMarkdown()

  it('renders an empty string for empty input', () => {
    expect(render('')).toBe('')
  })

  it('renders headings', () => {
    const html = render('## Section\n\nBody text.')
    expect(html).toContain('<h2>Section</h2>')
    expect(html).toContain('<p>Body text.</p>')
  })

  it('renders fenced code blocks with highlight.js classes', () => {
    const html = render('```js\nconst x = 1\n```')
    expect(html).toContain('<pre class="hljs">')
    expect(html).toContain('language-js')
    expect(html).toContain('hljs-keyword')
  })

  it('falls back to escaped plain text for unknown language', () => {
    const html = render('```\n<script>alert(1)</script>\n```')
    expect(html).toContain('<pre class="hljs">')
    expect(html).toContain('&lt;script&gt;')
    expect(html).not.toContain('<script>alert')
  })

  it('strips raw HTML from markdown source', () => {
    const html = render('<script>alert("xss")</script>\n\nhello')
    expect(html).not.toContain('<script>')
    expect(html).toContain('hello')
  })

  it('adds target=_blank and rel="noopener noreferrer" to external links', () => {
    const html = render('[site](https://example.com)')
    expect(html).toContain('href="https://example.com"')
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener noreferrer"')
  })

  it('does not add target=_blank to relative links', () => {
    const html = render('[interno](/artigos/foo)')
    expect(html).toContain('href="/artigos/foo"')
    expect(html).not.toMatch(/href="\/artigos\/foo"[^>]*target="_blank"/)
  })

  it('renders blockquotes and lists', () => {
    const html = render('> quote\n\n- one\n- two')
    expect(html).toContain('<blockquote>')
    expect(html).toContain('<ul>')
    expect(html).toContain('<li>one</li>')
  })
})
