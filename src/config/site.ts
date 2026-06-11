import type { Locale } from './constants'

export interface SiteConfig {
  url: string
  name: string
  shortName: string
  tagline: string
  defaultLocale: Locale
  locales: LocaleConfig[]
  social: {
    twitter: string
    github: string
  }
}

export interface LocaleConfig {
  code: Locale
  label: string
  lang: string
  dir: 'ltr' | 'rtl'
}

export const SITE: SiteConfig = {
  url: 'https://tooltastics.com',
  name: 'RulerKit',
  shortName: 'RulerKit',
  tagline: 'The highest-quality online ruler and screen measurement tool',
  defaultLocale: 'en',
  locales: [
    { code: 'en', label: 'English', lang: 'en-US', dir: 'ltr' },
    { code: 'es', label: 'Español', lang: 'es-ES', dir: 'ltr' },
    { code: 'de', label: 'Deutsch', lang: 'de-DE', dir: 'ltr' },
    { code: 'fr', label: 'Français', lang: 'fr-FR', dir: 'ltr' },
    { code: 'pt', label: 'Português', lang: 'pt-PT', dir: 'ltr' },
    { code: 'it', label: 'Italiano', lang: 'it-IT', dir: 'ltr' },
    { code: 'ja', label: '日本語', lang: 'ja-JP', dir: 'ltr' },
    { code: 'ko', label: '한국어', lang: 'ko-KR', dir: 'ltr' },
    { code: 'ru', label: 'Русский', lang: 'ru-RU', dir: 'ltr' },
    { code: 'zh-CN', label: '简体中文', lang: 'zh-CN', dir: 'ltr' },
  ],
  social: {
    twitter: '@rulerkit',
    github: 'rulerkit/rulerkit',
  },
}

export function getLocaleConfig(code: Locale): LocaleConfig {
  return SITE.locales.find((l) => l.code === code) ?? SITE.locales[0]!
}
