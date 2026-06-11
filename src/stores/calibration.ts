import type { CalibrationData } from '@/types/measurement'
import { storage } from '@lib/utils/storage'

const CAL_KEY = 'calibration'

type Listener = (data: CalibrationData | null) => void

class CalibrationStore {
  private data: CalibrationData | null = null
  private listeners = new Set<Listener>()

  constructor() {
    const saved = storage.get<CalibrationData>(CAL_KEY)
    if (saved && saved.lastCalibrated > 0) {
      this.data = saved
    }
  }

  get(): CalibrationData | null {
    return this.data
  }

  isCalibrated(): boolean {
    return this.data !== null && this.data.ppi > 0
  }

  set(data: CalibrationData): void {
    this.data = data
    storage.set(CAL_KEY, data)
    this.notify()
  }

  reset(): void {
    this.data = null
    storage.remove(CAL_KEY)
    this.notify()
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener)
    if (this.data) {
      listener(this.data)
    }
    return () => this.listeners.delete(listener)
  }

  private notify(): void {
    this.listeners.forEach((l) => l(this.data))
  }
}

export const calibrationStore = new CalibrationStore()
