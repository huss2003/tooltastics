import { LSquareRenderer, type LSquareState } from './l-square-renderer'
import { DEFAULT_PPI } from '@config/constants'

type Listener = (state: LSquareState) => void

export class LSquareTool {
  private renderer: LSquareRenderer
  private canvas: HTMLCanvasElement
  private container: HTMLElement
  private readoutEl: HTMLElement | null = null

  private state: LSquareState
  private listeners: Listener[] = []
  private animFrameId = 0

  constructor(canvas: HTMLCanvasElement, container: HTMLElement) {
    this.canvas = canvas
    this.container = container
    this.renderer = new LSquareRenderer(canvas)

    this.state = {
      unit: 'cm',
      orientation: 'normal',
      ppi: DEFAULT_PPI,
      markerX: null,
      markerY: null,
      canvasWidth: 0,
      canvasHeight: 0,
    }

    this.setupInteraction()
    this.setupResizeObserver()
    this.scheduleRender()
  }

  subscribe(fn: Listener): () => void {
    this.listeners.push(fn)
    fn(this.state)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn)
    }
  }

  getState(): LSquareState {
    return { ...this.state }
  }

  setUnit(unit: string): void {
    this.state.unit = unit
    this.notify()
    this.scheduleRender()
  }

  setOrientation(orientation: 'normal' | 'flip-h' | 'flip-v'): void {
    this.state.orientation = orientation
    this.notify()
    this.scheduleRender()
  }

  setMarker(x: number, y: number): void {
    this.state.markerX = x
    this.state.markerY = y
    this.notify()
    this.scheduleRender()
  }

  clear(): void {
    this.state.markerX = null
    this.state.markerY = null
    this.notify()
    this.scheduleRender()
    if (this.readoutEl) {
      this.readoutEl.textContent = 'Click on the L-square to measure'
    }
  }

  setReadoutElement(el: HTMLElement): void {
    this.readoutEl = el
  }

  private notify(): void {
    for (const fn of this.listeners) fn(this.state)
  }

  private scheduleRender(): void {
    cancelAnimationFrame(this.animFrameId)
    this.animFrameId = requestAnimationFrame(() => this.render())
  }

  private render(): void {
    const { width, height } = this.container.getBoundingClientRect()
    this.state.canvasWidth = width
    this.state.canvasHeight = height

    this.renderer.setupCanvas(width, height)
    this.renderer.render(this.state)
    this.updateReadout()
  }

  private updateReadout(): void {
    if (!this.readoutEl) return
    const { markerX, markerY, unit } = this.state
    if (markerX === null || markerY === null) {
      this.readoutEl.textContent = 'Click on the L-square to measure'
      return
    }
    this.readoutEl.innerHTML = `
      <span class="font-medium">X: ${markerX.toFixed(1)} ${unit}</span>
      <span class="mx-2 text-surface-400">|</span>
      <span class="font-medium">Y: ${markerY.toFixed(1)} ${unit}</span>
    `
  }

  private setupInteraction(): void {
    this.canvas.addEventListener('click', this.onClick)
  }

  private onClick = (e: MouseEvent): void => {
    const rect = this.canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const pxPerUnit = this.state.unit === 'in' ? this.state.ppi : this.state.ppi / 2.54
    const markerX = Math.max(0, x / pxPerUnit)
    const markerY = Math.max(0, y / pxPerUnit)

    this.setMarker(parseFloat(markerX.toFixed(1)), parseFloat(markerY.toFixed(1)))
  }

  private setupResizeObserver(): void {
    const ro = new ResizeObserver(() => this.scheduleRender())
    ro.observe(this.container)
  }

  destroy(): void {
    cancelAnimationFrame(this.animFrameId)
    this.renderer.destroy()
    this.canvas.removeEventListener('click', this.onClick)
  }
}
