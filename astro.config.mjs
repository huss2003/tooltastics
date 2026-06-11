import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import AstroPWA from '@vite-pwa/astro'

const siteUrl = 'https://tooltastics.com'

export default defineConfig({
  site: siteUrl,
  output: 'static',
  adapter: cloudflare({
    imageService: 'passthrough',
    platformProxy: { enabled: false },
  }),
  integrations: [
    AstroPWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.svg', 'fonts/*.woff2'],
      manifest: {
        name: 'RulerKit',
        short_name: 'RulerKit',
        description: 'Free online ruler and screen measurement tools. Measure in cm, inches, mm, and pixels.',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'any',
        start_url: '/en/',
        scope: '/',
        lang: 'en',
        dir: 'ltr',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          es: 'es-ES',
          de: 'de-DE',
          fr: 'fr-FR',
          pt: 'pt-PT',
          it: 'it-IT',
          ja: 'ja-JP',
          ko: 'ko-KR',
          ru: 'ru-RU',
          'zh-CN': 'zh-CN',
        },
      },
      serialize: (entry) => ({
        ...entry,
        changefreq: entry.changefreq ?? 'weekly',
        priority: entry.priority ?? 0.7,
        lastmod: entry.lastmod ?? new Date().toISOString(),
      }),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
      rollupOptions: {
        output: {
          assetFileNames: (asset) => {
            if (asset.name?.endsWith('.woff2')) return 'fonts/[name][extname]'
            return 'assets/[hash][extname]'
          },
        },
      },
    },
    ssr: {
      noExternal: ['@fontsource/inter'],
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'de', 'fr', 'pt', 'it', 'ja', 'ko', 'ru', 'zh-CN'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  image: {
    service: { entrypoint: 'astro/assets/services/noop' },
  },
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  compressHTML: true,
  scopedStyleStrategy: 'where',
  server: { port: 4321 },
})
