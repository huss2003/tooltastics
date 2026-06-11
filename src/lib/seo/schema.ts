import type { Locale } from '@config/constants'
import { SITE } from '@config/site'

export type Schema =
  | WebApplicationSchema
  | HowToSchema
  | ArticleSchema
  | BreadcrumbListSchema
  | OrganizationSchema
  | WebSiteSchema
  | FAQPageSchema

export interface JSONLD {
  '@context': 'https://schema.org'
  '@type': string
  [key: string]: unknown
}

export interface SchemaOptions {
  locale: Locale
  canonical: string
  title: string
  description: string
  image?: string
  datePublished?: string
  dateModified?: string
}

export function webApplication(
  name: string,
  description: string,
  options: SchemaOptions,
): WebApplicationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: options.canonical,
    inLanguage: options.locale,
    applicationCategory: 'Multimedia',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript and HTML5 Canvas support',
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    featureList: [
      'Accurate on-screen measurements in cm, mm, and inches',
      'Credit card calibration for screen-specific accuracy',
      'Auto-detect device PPI',
      'Horizontal and vertical orientations',
      'Fullscreen mode',
    ],
    ...(options.image ? { image: options.image } : {}),
  }
}

export function howTo(
  name: string,
  description: string,
  steps: HowToStep[],
  options: SchemaOptions,
): HowToSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    url: options.canonical,
    inLanguage: options.locale,
    ...(options.image ? { image: options.image } : {}),
    ...(options.datePublished ? { datePublished: options.datePublished } : {}),
    ...(options.dateModified ? { dateModified: options.dateModified } : {}),
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
      ...(step.image ? { image: step.image } : {}),
    })),
    tool: [{ '@type': 'HowToTool', name: 'RulerKit online ruler' }],
  }
}

export function article(
  headline: string,
  description: string,
  options: SchemaOptions,
): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url: options.canonical,
    inLanguage: options.locale,
    ...(options.image ? { image: options.image } : {}),
    ...(options.datePublished ? { datePublished: options.datePublished } : {}),
    ...(options.dateModified ? { dateModified: options.dateModified } : {}),
    author: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/icons/icon-512.png`,
    },
  }
}

export function breadcrumbList(
  items: { name: string; url: string }[],
): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function organization(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/icons/icon-512.png`,
    sameAs: [
      `https://github.com/${SITE.social.github}`,
      `https://twitter.com/${SITE.social.twitter.replace('@', '')}`,
    ],
  }
}

export function webSite(options: SchemaOptions): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: options.canonical,
    inLanguage: options.locale,
    description: options.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/${options.locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function faqPage(
  mainEntity: { question: string; answer: string }[],
  options: SchemaOptions,
): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: options.canonical,
    inLanguage: options.locale,
    mainEntity: mainEntity.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

interface HowToStep {
  name: string
  text: string
  image?: string
}

interface WebApplicationSchema extends JSONLD {
  '@type': 'WebApplication'
  name: string
  description: string
  url: string
  applicationCategory: string
  operatingSystem: string
  browserRequirements: string
  offers: {
    '@type': 'Offer'
    price: number
    priceCurrency: string
    availability: string
  }
  featureList: string[]
}

interface HowToSchema extends JSONLD {
  '@type': 'HowTo'
  name: string
  description: string
  step: {
    '@type': 'HowToStep'
    position: number
    name: string
    text: string
    image?: string
  }[]
  tool: { '@type': 'HowToTool'; name: string }[]
}

interface ArticleSchema extends JSONLD {
  '@type': 'Article'
  headline: string
  description: string
  author: { '@type': 'Organization'; name: string; url: string }
  publisher: { '@type': 'Organization'; name: string; url: string; logo: string }
}

interface BreadcrumbListSchema extends JSONLD {
  '@type': 'BreadcrumbList'
  itemListElement: {
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }[]
}

interface OrganizationSchema extends JSONLD {
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  sameAs: string[]
}

interface WebSiteSchema extends JSONLD {
  '@type': 'WebSite'
  name: string
  url: string
  description: string
  potentialAction: {
    '@type': 'SearchAction'
    target: { '@type': 'EntryPoint'; urlTemplate: string }
    'query-input': string
  }
}

interface FAQPageSchema extends JSONLD {
  '@type': 'FAQPage'
  mainEntity: {
    '@type': 'Question'
    name: string
    acceptedAnswer: { '@type': 'Answer'; text: string }
  }[]
}
