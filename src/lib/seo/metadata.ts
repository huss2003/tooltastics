import type { Locale } from '@config/constants'
import { SITE, getLocaleConfig } from '@config/site'
import type { Schema } from './schema'

export interface Metadata {
  title: string
  titleTemplate: string
  description: string
  canonical: string
  locale: Locale
  lang: string
  dir: 'ltr' | 'rtl'
  ogType: 'website' | 'article'
  ogImage?: string
  ogImageAlt?: string
  twitterCard: 'summary_large_image' | 'summary'
  noindex: boolean
  nofollow: boolean
  schema: Schema[]
  breadcrumbs: { name: string; url: string }[]
  publishedTime?: string
  modifiedTime?: string
}

export interface MetadataInput {
  title: string
  description: string
  locale: Locale
  path: string
  ogImage?: string
  ogType?: 'website' | 'article'
  noindex?: boolean
  nofollow?: boolean
  schema?: Schema[]
  breadcrumbs?: { name: string; url: string }[]
  publishedTime?: string
  modifiedTime?: string
}

const PAGE_TITLE_SUFFIX = '| RulerKit'

export function createMetadata(input: MetadataInput): Metadata {
  const localeConfig = getLocaleConfig(input.locale)
  const baseUrl = `${SITE.url}/${input.locale}`
  const canonical = `${baseUrl}${input.path === '/' ? '' : input.path}`

  return {
    title: input.title,
    titleTemplate: `${input.title} ${PAGE_TITLE_SUFFIX}`.trim(),
    description: input.description,
    canonical,
    locale: input.locale,
    lang: localeConfig.lang,
    dir: localeConfig.dir,
    ogType: input.ogType ?? 'website',
    ogImage: input.ogImage ?? `${SITE.url}/og/default.png`,
    ogImageAlt: input.title,
    twitterCard: 'summary_large_image',
    noindex: input.noindex ?? false,
    nofollow: input.nofollow ?? false,
    schema: input.schema ?? [],
    breadcrumbs: input.breadcrumbs ?? [],
    publishedTime: input.publishedTime,
    modifiedTime: input.modifiedTime,
  }
}

export function toolMetadata(
  locale: Locale,
  toolSlug: string,
  toolName: string,
  toolDescription: string,
  schema: Schema[],
): Metadata {
  return createMetadata({
    title: toolName,
    description: toolDescription,
    locale,
    path: `/${toolSlug}`,
    schema,
    breadcrumbs: [
      { name: 'RulerKit', url: SITE.url + '/' + locale },
      { name: toolName, url: `${SITE.url}/${locale}/${toolSlug}` },
    ],
  })
}

export function contentMetadata(
  locale: Locale,
  slug: string,
  title: string,
  description: string,
  section: string,
  schema: Schema[],
  publishedTime?: string,
  modifiedTime?: string,
): Metadata {
  return createMetadata({
    title,
    description,
    locale,
    path: `/${section}/${slug}`,
    schema,
    ogType: 'article',
    breadcrumbs: [
      { name: 'RulerKit', url: SITE.url + '/' + locale },
      { name: section, url: `${SITE.url}/${locale}/${section}` },
    ],
    publishedTime,
    modifiedTime,
  })
}
