/// <reference types="astro/client" />

declare module '*.json' {
  const value: Record<string, string>
  export default value
}

declare module '*.mdx' {
  import type { AstroComponentFactory } from 'astro/runtime/server/index.js'
  export const frontmatter: Record<string, unknown>
  export const Content: AstroComponentFactory
  export default Content
}

interface Window {
  __RULERKIT_INITIALIZED__?: boolean
}
