import type { MeasurementLine, MeasurementHistory } from '@/types/measurement'

type Listener = (state: MeasurementState) => void

interface MeasurementState {
  current: MeasurementLine | null
  history: MeasurementHistory[]
  active: boolean
}

class MeasurementStore {
  private state: MeasurementState = {
    current: null,
    history: [],
    active: false,
  }
  private listeners = new Set<Listener>()

  get(): MeasurementState {
    return this.state
  }

  start(): void {
    this.state.active = true
    this.notify()
  }

  update(line: MeasurementLine): void {
    this.state.current = line
    this.notify()
  }

  commit(line: MeasurementLine): void {
    const entry: MeasurementHistory = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      lines: [line],
    }
    this.state.history = [...this.state.history, entry]
    this.state.current = line
    this.state.active = false
    this.notify()
  }

  cancel(): void {
    this.state.current = null
    this.state.active = false
    this.notify()
  }

  clear(): void {
    this.state.current = null
    this.state.history = []
    this.state.active = false
    this.notify()
  }

  undoLast(): void {
    this.state.history = this.state.history.slice(0, -1)
    this.notify()
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener)
    listener(this.state)
    return () => this.listeners.delete(listener)
  }

  private notify(): void {
    this.listeners.forEach((l) => l(this.state))
  }
}

export const measurementStore = new MeasurementStore()
