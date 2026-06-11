import { ProtractorRenderer, type ProtractorState } from './protractor-renderer'

type Listener = (angle: number) => void

export class ProtractorTool {
  private renderer: ProtractorRenderer
  private canvas: HTMLCanvasElement
  private container: HTMLElement

  private angle = 0
  private centerX = 0
  private centerY = 0
  private radius = 0
  private listeners: Listener[] = []
  private animFrameId = 0

  constructor(canvas: HTMLCanvasElement, container: HTMLElement) {
    this.canvas = canvas
    this.container = container
    this.renderer = new ProtractorRenderer(canvas)
    this.setupInteraction()
    this.setupResizeObserver()
    this.scheduleRender()
  }

  subscribe(fn: Listener): () => void {
    this.listeners.push(fn)
    fn(this.angle)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn)
    }
  }

  getAngle(): number {
    return this.angle
  }

  reset(): void {
    this.angle = 0
    this.notify()
    this.scheduleRender()
  }

  private notify(): void {
    for (const fn of this.listeners) fn(this.angle)
  }

  private scheduleRender(): void {
    cancelAnimationFrame(this.animFrameId)
    this.animFrameId = requestAnimationFrame(() => this.render())
  }

  private render(): void {
    const { width, height } = this.container.getBoundingClientRect()
    this.centerX = width / 2
    this.centerY = height / 2 + 20
    this.radius = Math.min(width, height * 2) / 2 - 20

    this.renderer.setupCanvas(width, height)

    const state: ProtractorState = {
      angle: this.angle,
      centerX: this.centerX,
      centerY: this.centerY,
      radius: this.radius,
    }

    this.renderer.render(state)
  }

  private setupInteraction(): void {
    this.canvas.addEventListener('click', this.onClick)
    this.canvas.addEventListener('pointermove', this.onPointerMove)
  }

  private onClick = (e: MouseEvent): void => {
    const rect = this.canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const dx = x - this.centerX
    const dy = y - this.centerY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist > this.radius) return

    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
    if (angle < 0) angle += 360
    if (angle > 180) angle = 180

    this.angle = Math.round(angle)
    this.notify()
    this.scheduleRender()
  }

  private onPointerMove = (e: PointerEvent): void => {
    const rect = this.canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const dx = x - this.centerX
    const dy = y - this.centerY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist > this.radius) {
      this.canvas.style.cursor = 'default'
      return
    }

    this.canvas.style.cursor = 'crosshair'
  }

  private setupResizeObserver(): void {
    const ro = new ResizeObserver(() => this.scheduleRender())
    ro.observe(this.container)
  }

  destroy(): void {
    cancelAnimationFrame(this.animFrameId)
    this.renderer.destroy()
    this.canvas.removeEventListener('click', this.onClick)
    this.canvas.removeEventListener('pointermove', this.onPointerMove)
  }
}
