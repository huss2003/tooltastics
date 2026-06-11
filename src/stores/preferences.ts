import { Unit, Orientation, Theme, InchFraction } from '@config/constants'
import { storage } from '@lib/utils/storage'
import { prefersColorSchemeDark } from '@lib/utils/dom'

interface Preferences {
  unit: Unit
  orientation: Orientation
  theme: Theme
  inchFraction: InchFraction
  lastLocale: string
}

type Listener = (prefs: Preferences) => void

const PREFS_KEY = 'preferences'

const DEFAULTS: Preferences = {
  unit: Unit.Centimeters,
  orientation: Orientation.Horizontal,
  theme: Theme.System,
  inchFraction: InchFraction.Sixteenth,
  lastLocale: 'en',
}

class PreferenceStore {
  private prefs: Preferences

  constructor() {
    this.prefs = { ...DEFAULTS, ...storage.get<Partial<Preferences>>(PREFS_KEY) }
    this.applyTheme()
  }

  get(): Preferences {
    return { ...this.prefs }
  }

  set<K extends keyof Preferences>(key: K, value: Preferences[K]): void {
    this.prefs[key] = value
    storage.set(PREFS_KEY, this.prefs)
    if (key === 'theme') this.applyTheme()
    this.notify()
  }

  getEffectiveTheme(): 'light' | 'dark' {
    if (this.prefs.theme === Theme.System) {
      return prefersColorSchemeDark() ? 'dark' : 'light'
    }
    return this.prefs.theme
  }

  private applyTheme(): void {
    const theme = this.getEffectiveTheme()
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener)
    listener(this.prefs)
    return () => this.listeners.delete(listener)
  }

  private listeners = new Set<Listener>()

  private notify(): void {
    this.listeners.forEach((l) => l(this.prefs))
  }
}

export const preferencesStore = new PreferenceStore()
