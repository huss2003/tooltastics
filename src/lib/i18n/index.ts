import type { Locale } from '@config/constants'
import { SITE } from '@config/site'

type TranslationMap = Record<string, string>
type TranslationStore = Record<Locale, TranslationMap>

const loaded: Partial<TranslationStore> = {}

async function loadLocale(locale: Locale): Promise<TranslationMap> {
  if (loaded[locale]) return loaded[locale]!

  const module = await import(
    /* @vite-ignore */ `./translations/${locale}.json`
  )
  const map = module.default as TranslationMap
  loaded[locale] = map
  return map
}

const fallbackLocale = SITE.defaultLocale
let fallbackMap: TranslationMap | null = null

async function ensureFallback(): Promise<TranslationMap> {
  if (!fallbackMap) {
    fallbackMap = await loadLocale(fallbackLocale)
  }
  return fallbackMap
}

export function translator(locale: Locale) {
  let localeMap: TranslationMap | null = null

  const t = async (key: string, params?: Record<string, string | number>): Promise<string> => {
    if (!localeMap) {
      try {
        localeMap = await loadLocale(locale)
      } catch {
        localeMap = await ensureFallback()
      }
    }

    let value = localeMap[key]
    if (value === undefined && locale !== fallbackLocale) {
      const fallback = await ensureFallback()
      value = fallback[key]
    }

    if (value === undefined) return key

    if (params) {
      return Object.entries(params).reduce(
        (str, [k, v]) => str.replaceAll(`{${k}}`, String(v)),
        value,
      )
    }

    return value
  }

  const tSync = (key: string, params?: Record<string, string | number>): string => {
    if (!localeMap) return key

    let value = localeMap[key]
    if (value === undefined && locale !== fallbackLocale) {
      value = fallbackMap?.[key]
    }
    if (value === undefined) return key

    if (params) {
      return Object.entries(params).reduce(
        (str, [k, v]) => str.replaceAll(`{${k}}`, String(v)),
        value,
      )
    }
    return value
  }

  const has = (key: string): boolean => {
    return localeMap?.[key] !== undefined || fallbackMap?.[key] !== undefined
  }

  return { t, tSync, has, loaded: !!localeMap }
}

export type Translator = ReturnType<typeof translator>
