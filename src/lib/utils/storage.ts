import { STORAGE_PREFIX } from '@config/constants'

interface StorageAdapter {
  get<T>(key: string): T | null
  set<T>(key: string, value: T): void
  remove(key: string): void
  has(key: string): boolean
}

function createStorage(prefix: string): StorageAdapter {
  function fullKey(key: string): string {
    return `${prefix}${key}`
  }

  return {
    get<T>(key: string): T | null {
      try {
        const raw = localStorage.getItem(fullKey(key))
        if (raw === null) return null
        return JSON.parse(raw) as T
      } catch {
        return null
      }
    },

    set<T>(key: string, value: T): void {
      try {
        localStorage.setItem(fullKey(key), JSON.stringify(value))
      } catch (e) {
        if (e instanceof DOMException && e.name === 'QuotaExceededError') {
          console.warn('Storage quota exceeded for key:', key)
        }
      }
    },

    remove(key: string): void {
      try {
        localStorage.removeItem(fullKey(key))
      } catch {
        /* noop */
      }
    },

    has(key: string): boolean {
      try {
        return localStorage.getItem(fullKey(key)) !== null
      } catch {
        return false
      }
    },
  }
}

export const storage = createStorage(STORAGE_PREFIX)

export function isStorageAvailable(): boolean {
  try {
    const testKey = `${STORAGE_PREFIX}test`
    localStorage.setItem(testKey, '1')
    localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}
