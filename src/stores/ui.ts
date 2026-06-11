import { InteractionMode } from '@config/constants'
import type { Point } from '@/types/measurement'

type Listener = (state: UIState) => void

interface UIState {
  fullscreen: boolean
  activeTool: string | null
  interactionMode: InteractionMode
  cursorPosition: Point | null
  sidebarOpen: boolean
  calibrationModalOpen: boolean
}

class UIStore {
  private state: UIState = {
    fullscreen: false,
    activeTool: null,
    interactionMode: InteractionMode.None,
    cursorPosition: null,
    sidebarOpen: true,
    calibrationModalOpen: false,
  }
  private listeners = new Set<Listener>()

  get(): UIState {
    return this.state
  }

  setFullscreen(v: boolean): void {
    this.state.fullscreen = v
    this.notify()
  }

  setActiveTool(slug: string): void {
    this.state.activeTool = slug
    this.state.interactionMode = InteractionMode.Measure
    this.notify()
  }

  setInteractionMode(mode: InteractionMode): void {
    this.state.interactionMode = mode
    this.notify()
  }

  setCursorPosition(pos: Point | null): void {
    this.state.cursorPosition = pos
    this.notify()
  }

  toggleSidebar(): void {
    this.state.sidebarOpen = !this.state.sidebarOpen
    this.notify()
  }

  setCalibrationModalOpen(v: boolean): void {
    this.state.calibrationModalOpen = v
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

export const uiStore = new UIStore()
