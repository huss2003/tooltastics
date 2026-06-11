import type { APIRoute } from 'astro'

export const prerender = true

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('/sitemap-index.xml', site).href
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /cdn-cgi/',
    '',
    `Sitemap: ${sitemapUrl}`,
    '',
    '# ToolTastics — Free online tools and measurement utilities',
  ].join('\n')
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=3600',
    },
  })
}
