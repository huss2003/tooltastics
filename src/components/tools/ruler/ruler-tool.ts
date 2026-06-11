import { Unit, Orientation, DEFAULT_PPI, STORAGE_PREFIX } from '@config/constants'
import { RulerRenderer, type MarkerData, type PixelRulerPoint, type RenderState } from './ruler-renderer'
import { autoDetectPPI, calculatePPIFromDiagonal, calculatePPIFromCard, type PPICalculation } from '@lib/calibration/ppi'

interface ToolState {
  ppi: number
  unit: Unit
  orientation: Orientation
  mode: 'ruler' | 'pixel-ruler'
  markers: MarkerData[]
  pixelPoints: PixelRulerPoint[]
  isCalibrated: boolean
  lastCalibration: PPICalculation | null
}

type Listener = (state: ToolState) => void

const STATE_KEY = `${STORAGE_PREFIX}ruler-state`

export class RulerTool {
  private renderer: RulerRenderer
  private container: HTMLElement
  private canvas: HTMLCanvasElement
  private readoutEl: HTMLElement | null = null

  private state: ToolState
  private listeners: Listener[] = []
  private animFrameId = 0
  private isDragging = false
  private dragMarkerId: string | null = null

  private canvasWidth = 0
  private canvasHeight = 120

  private pixelRulerActive = false

  constructor(canvas: HTMLCanvasElement, container: HTMLElement) {
    this.canvas = canvas
    this.container = container
    this.renderer = new RulerRenderer(canvas)

    const saved = this.loadState()
    this.state = saved ?? {
      ppi: DEFAULT_PPI,
      unit: Unit.Centimeters,
      orientation: Orientation.Horizontal,
      mode: 'ruler',
      markers: [],
      pixelPoints: [],
      isCalibrated: false,
      lastCalibration: null,
    }

    this.setupInteraction()
    this.setupResizeObserver()
    this.setupKeyboard()

    this.scheduleRender()
  }

  subscribe(fn: Listener): () => void {
    this.listeners.push(fn)
    fn(this.state)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn)
    }
  }

  private notify(): void {
    this.saveState()
    for (const fn of this.listeners) fn(this.state)
  }

  getState(): ToolState {
    return { ...this.state }
  }

  setPPI(ppi: number): void {
    if (ppi <= 0 || !isFinite(ppi)) return
    this.state.ppi = Math.round(ppi)
    this.state.isCalibrated = true
    this.dispatchCalibrationEvent()
    this.notify()
    this.scheduleRender()
  }

  setCalibration(cal: PPICalculation): void {
    this.state.ppi = cal.ppi
    this.state.isCalibrated = true
    this.state.lastCalibration = cal
    this.dispatchCalibrationEvent()
    this.notify()
    this.scheduleRender()
  }

  autoCalibrate(): PPICalculation {
    const cal = autoDetectPPI()
    this.setCalibration(cal)
    return cal
  }

  calibrateDiagonal(diagonal: number): PPICalculation {
    const cal = calculatePPIFromDiagonal(diagonal)
    this.setCalibration(cal)
    return cal
  }

  calibrateCard(cardWidthPx: number): PPICalculation {
    const cal = calculatePPIFromCard(cardWidthPx)
    this.setCalibration(cal)
    return cal
  }

  resetCalibration(): void {
    this.state.ppi = DEFAULT_PPI
    this.state.isCalibrated = false
    this.state.lastCalibration = null
    this.setCalibration({ ppi: DEFAULT_PPI, method: 'auto-detect', accuracy: 5 })
  }

  setUnit(unit: Unit): void {
    this.state.unit = unit
    this.notify()
    this.scheduleRender()
  }

  setOrientation(orientation: Orientation): void {
    this.state.orientation = orientation
    this.resize()
    this.notify()
  }

  setMode(mode: 'ruler' | 'pixel-ruler'): void {
    this.state.mode = mode
    if (mode === 'pixel-ruler') {
      this.state.pixelPoints = []
      this.canvas.style.cursor = 'crosshair'
    } else {
      this.canvas.style.cursor = 'default'
    }
    this.notify()
    this.scheduleRender()
  }

  clearMarkers(): void {
    this.state.markers = []
    this.state.pixelPoints = []
    this.notify()
    this.scheduleRender()
  }

  private loadState(): ToolState | null {
    try {
      const raw = localStorage.getItem(STATE_KEY)
      if (!raw) return null
      return JSON.parse(raw) as ToolState
    } catch {
      return null
    }
  }

  private saveState(): void {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(this.state))
    } catch { /* noop */ }
  }

  private dispatchCalibrationEvent(): void {
    this.container.dispatchEvent(new CustomEvent('rulerkit:calibrated', {
      detail: { ppi: this.state.ppi, isCalibrated: this.state.isCalibrated },
      bubbles: true,
    }))
  }

  private scheduleRender(): void {
    cancelAnimationFrame(this.animFrameId)
    this.animFrameId = requestAnimationFrame(() => this.render())
  }

  private render(): void {
    const { width, height } = this.container.getBoundingClientRect()
    const isHorizontal = this.state.orientation === 'horizontal'

    // Fixed: Use the container width, not max with 30cm which causes overflow
    if (isHorizontal) {
      this.canvasWidth = width
      this.canvasHeight = height
    } else {
      this.canvasWidth = width
      this.canvasHeight = height
    }

    this.renderer.setupCanvas(this.canvasWidth, this.canvasHeight)

    const state: RenderState = {
      ppi: this.state.ppi,
      activeUnit: this.state.unit,
      orientation: this.state.orientation,
      markers: this.state.markers,
      hoverPosX: null,
      mode: this.state.mode,
      pixelPoints: this.state.pixelPoints,
      pixelActive: this.pixelRulerActive,
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
      scrollOffset: 0,
    }

    this.renderer.render(state)
    this.updateReadout()
  }

  private updateReadout(): void {
    if (!this.readoutEl) return
    const marker = this.state.markers[this.state.markers.length - 1]
    if (!marker) {
      this.readoutEl.textContent = 'Click on the ruler to measure'
      return
    }

    const ppi = this.state.ppi
    const cm = this.renderer.pxToCm(marker.posX, ppi)
    const inches = this.renderer.pxToIn(marker.posX, ppi)

    this.readoutEl.innerHTML = `
      <span class="ruler__readout-value">${cm.toFixed(1)}</span>
      <span class="ruler__readout-unit">cm</span>
      <span class="ruler__readout-sep">|</span>
      <span class="ruler__readout-value">${(cm * 10).toFixed(0)}</span>
      <span class="ruler__readout-unit">mm</span>
      <span class="ruler__readout-sep">|</span>
      <span class="ruler__readout-value">${inches.toFixed(2)}</span>
      <span class="ruler__readout-unit">in</span>
    `
  }

  private setupInteraction(): void {
    this.canvas.addEventListener('pointerdown', this.onPointerDown)
    this.canvas.addEventListener('pointermove', this.onPointerMove)
    this.canvas.addEventListener('pointerup', this.onPointerUp)
    this.canvas.addEventListener('pointerleave', this.onPointerLeave)
    this.canvas.addEventListener('click', this.onClick)
  }

  private getCanvasPos(clientX: number, clientY: number): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect()
    const isH = this.state.orientation === 'horizontal'
    return {
      x: clientX - rect.left + (isH ? this.container.scrollLeft : 0),
      y: clientY - rect.top + (!isH ? this.container.scrollTop : 0),
    }
  }

  private onPointerDown = (e: PointerEvent): void => {
    e.preventDefault()
    this.canvas.setPointerCapture(e.pointerId)

    const pos = this.getCanvasPos(e.clientX, e.clientY)
    const x = Math.max(0, pos.x)
    const y = Math.max(0, pos.y)

    if (this.state.mode === 'pixel-ruler') {
      this.state.pixelPoints.push({ x, y })
      if (this.state.pixelPoints.length > 2) {
        this.state.pixelPoints = [this.state.pixelPoints[this.state.pixelPoints.length - 1]!]
      }
      this.notify()
      this.scheduleRender()
      return
    }

    const isH = this.state.orientation === 'horizontal'
    const posPx = isH ? x : y

    const existing = this.state.markers.find(
      (m) => Math.abs(m.posX - posPx) < 15,
    )

    if (existing) {
      this.isDragging = true
      this.dragMarkerId = existing.id
    } else {
      const marker: MarkerData = {
        id: `m-${Date.now()}`,
        posX: posPx,
      }
      this.state.markers = [marker]
      this.isDragging = true
      this.dragMarkerId = marker.id
      this.notify()
      this.scheduleRender()
    }
  }

  private onPointerMove = (e: PointerEvent): void => {
    const pos = this.getCanvasPos(e.clientX, e.clientY)

    if (this.isDragging && this.dragMarkerId) {
      const isH = this.state.orientation === 'horizontal'
      const posPx = isH ? Math.max(0, pos.x) : Math.max(0, pos.y)

      const marker = this.state.markers.find((m) => m.id === this.dragMarkerId)
      if (marker) {
        marker.posX = posPx
        this.notify()
        this.scheduleRender()
      }
    }
  }

  private onPointerUp = (_e: PointerEvent): void => {
    this.isDragging = false
    this.dragMarkerId = null

    if (this.state.mode === 'pixel-ruler' && this.state.pixelPoints.length >= 2) {
      this.scheduleRender()
    }
  }

  private onPointerLeave = (): void => {
    if (!this.isDragging) {
      this.scheduleRender()
    }
  }

  private onClick = (e: MouseEvent): void => {
    if (this.isDragging) return
    if (this.state.mode === 'pixel-ruler') return

    const pos = this.getCanvasPos(e.clientX, e.clientY)
    const isH = this.state.orientation === 'horizontal'
    const posPx = isH ? Math.max(0, pos.x) : Math.max(0, pos.y)

    const marker: MarkerData = {
      id: `m-${Date.now()}`,
      posX: posPx,
    }
    this.state.markers = [marker]
    this.notify()
    this.scheduleRender()
  }

  private setupResizeObserver(): void {
    const ro = new ResizeObserver(() => {
      this.resize()
    })
    ro.observe(this.container)
  }

  private resize(): void {
    this.scheduleRender()
  }

  private setupKeyboard(): void {
    this.canvas.addEventListener('keydown', (e: KeyboardEvent) => {
      const marker = this.state.markers[this.state.markers.length - 1]
      if (!marker) return

      const step = e.shiftKey ? 10 : 1

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        marker.posX = Math.min(
          this.canvasWidth,
          marker.posX + step,
        )
        this.notify()
        this.scheduleRender()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        marker.posX = Math.max(0, marker.posX - step)
        this.notify()
        this.scheduleRender()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        this.clearMarkers()
      }
    })
  }

  setReadoutElement(el: HTMLElement): void {
    this.readoutEl = el
  }

  destroy(): void {
    cancelAnimationFrame(this.animFrameId)
    this.renderer.destroy()
    this.canvas.removeEventListener('pointerdown', this.onPointerDown)
    this.canvas.removeEventListener('pointermove', this.onPointerMove)
    this.canvas.removeEventListener('pointerup', this.onPointerUp)
    this.canvas.removeEventListener('pointerleave', this.onPointerLeave)
    this.canvas.removeEventListener('click', this.onClick)
  }
}
