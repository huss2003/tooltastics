import { MeasureImageRenderer } from './measure-image-renderer'

export interface Measurement {
  id: string
  x1: number; y1: number
  x2: number; y2: number
  label: string
  value: number
  unit: string
}

export interface CalibrationData {
  x1: number; y1: number
  x2: number; y2: number
  realLength: number
  pixelsPerUnit: number
}

export interface TextLabel {
  id: string
  x: number; y: number
  text: string
}

export interface MeasureImageState {
  image: HTMLImageElement | null
  toolMode: 'calibrate' | 'measure' | 'pan'
  unit: 'cm' | 'in' | 'mm'
  calibration: CalibrationData | null
  measurements: Measurement[]
  pendingPoint: { x: number; y: number } | null
  labels: TextLabel[]
  pan: { x: number; y: number }
  zoom: number
  selectedId: string | null
}

type Listener = (state: MeasureImageState) => void

export class MeasureImageTool {
  private renderer: MeasureImageRenderer
  private canvas: HTMLCanvasElement
  private container: HTMLElement

  private state: MeasureImageState
  private listeners: Listener[] = []
  private animFrameId = 0

  private isPointerDown = false
  private pointerStart = { x: 0, y: 0 }
  private panStart = { x: 0, y: 0 }

  constructor(canvas: HTMLCanvasElement, container: HTMLElement) {
    this.canvas = canvas
    this.container = container
    this.renderer = new MeasureImageRenderer(canvas)

    this.state = {
      image: null,
      toolMode: 'calibrate',
      unit: 'cm',
      calibration: null,
      measurements: [],
      pendingPoint: null,
      labels: [],
      pan: { x: 0, y: 0 },
      zoom: 1,
      selectedId: null,
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

  getState(): MeasureImageState {
    return { ...this.state, measurements: [...this.state.measurements], labels: [...this.state.labels] }
  }

  loadImage(file: File): void {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        this.state.image = img
        this.state.calibration = null
        this.state.measurements = []
        this.state.pendingPoint = null
        this.state.labels = []
        this.state.pan = { x: 0, y: 0 }
        this.state.zoom = 1
        this.state.selectedId = null
        this.notify()
        this.scheduleRender()
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  setToolMode(mode: 'calibrate' | 'measure' | 'pan'): void {
    this.state.toolMode = mode
    this.state.pendingPoint = null
    this.canvas.style.cursor = mode === 'pan' ? 'grab' : mode === 'measure' ? 'crosshair' : 'crosshair'
    this.notify()
    this.scheduleRender()
  }

  setUnit(unit: 'cm' | 'in' | 'mm'): void {
    this.state.unit = unit
    this.notify()
    this.scheduleRender()
  }

  setCalibrationLength(length: number): void {
    if (!this.state.calibration) return
    this.state.calibration.realLength = length
    this.notify()
  }

  applyCalibration(): void {
    const cal = this.state.calibration
    if (!cal || cal.realLength <= 0) return
    const dx = cal.x2 - cal.x1
    const dy = cal.y2 - cal.y1
    const pixelDist = Math.sqrt(dx * dx + dy * dy)
    cal.pixelsPerUnit = pixelDist / cal.realLength
    this.notify()
    this.scheduleRender()
  }

  clearCalibration(): void {
    this.state.calibration = null
    this.state.measurements = []
    this.state.pendingPoint = null
    this.notify()
    this.scheduleRender()
  }

  deleteMeasurement(id: string): void {
    this.state.measurements = this.state.measurements.filter((m) => m.id !== id)
    if (this.state.selectedId === id) this.state.selectedId = null
    this.notify()
    this.scheduleRender()
  }

  updateLabel(id: string, text: string): void {
    const m = this.state.measurements.find((m) => m.id === id)
    if (m) m.label = text
    this.notify()
    this.scheduleRender()
  }

  addLabel(x: number, y: number, text: string): void {
    const id = `l-${Date.now()}`
    this.state.labels.push({ id, x, y, text })
    this.notify()
    this.scheduleRender()
  }

  private screenToImg(screenX: number, screenY: number): { x: number; y: number } {
    return {
      x: (screenX - this.state.pan.x) / this.state.zoom,
      y: (screenY - this.state.pan.y) / this.state.zoom,
    }
  }

  exportPNG(): Promise<Blob | null> {
    return new Promise((resolve) => {
      const img = this.state.image
      if (!img) { resolve(null); return }

      const cvs = document.createElement('canvas')
      cvs.width = img.naturalWidth
      cvs.height = img.naturalHeight
      const ctx = cvs.getContext('2d')
      if (!ctx) { resolve(null); return }

      ctx.drawImage(img, 0, 0)

      const scaleX = img.naturalWidth / this.canvas.width
      const scaleY = img.naturalHeight / this.canvas.height

      if (this.state.calibration) {
        const cal = this.state.calibration
        ctx.save()
        ctx.strokeStyle = '#f59e0b'
        ctx.lineWidth = 2
        ctx.setLineDash([6, 4])
        ctx.beginPath()
        ctx.moveTo(cal.x1 * this.state.zoom * scaleX, cal.y1 * this.state.zoom * scaleY)
        ctx.lineTo(cal.x2 * this.state.zoom * scaleX, cal.y2 * this.state.zoom * scaleY)
        ctx.stroke()
        ctx.setLineDash([])
        ctx.fillStyle = '#f59e0b'
        ctx.font = '600 14px Inter, ui-sans-serif, system-ui, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'bottom'
        const cx = (cal.x1 * this.state.zoom + cal.x2 * this.state.zoom) / 2 * scaleX
        const cy = (cal.y1 * this.state.zoom + cal.y2 * this.state.zoom) / 2 * scaleY
        ctx.fillText(`Cal: ${cal.realLength} ${this.state.unit}`, cx, cy - 4)
        ctx.restore()
      }

      for (const m of this.state.measurements) {
        const idx = this.state.measurements.indexOf(m)
        ctx.save()
        ctx.strokeStyle = idx % 2 === 0 ? '#3b82f6' : '#8b5cf6'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(m.x1 * this.state.zoom * scaleX, m.y1 * this.state.zoom * scaleY)
        ctx.lineTo(m.x2 * this.state.zoom * scaleX, m.y2 * this.state.zoom * scaleY)
        ctx.stroke()

        ctx.fillStyle = ctx.strokeStyle
        ctx.beginPath()
        ctx.arc(m.x1 * this.state.zoom * scaleX, m.y1 * this.state.zoom * scaleY, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(m.x2 * this.state.zoom * scaleX, m.y2 * this.state.zoom * scaleY, 4, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = '#1a1d2e'
        ctx.font = '600 13px Inter, ui-sans-serif, system-ui, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'bottom'
        const mx = ((m.x1 + m.x2) / 2) * this.state.zoom * scaleX
        const my = ((m.y1 + m.y2) / 2) * this.state.zoom * scaleY
        ctx.fillText(`${m.label}: ${m.value.toFixed(1)} ${m.unit}`, mx, my - 4)
        ctx.restore()
      }

      for (const lbl of this.state.labels) {
        ctx.save()
        ctx.fillStyle = '#1a1d2e'
        ctx.font = '600 14px Inter, ui-sans-serif, system-ui, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(lbl.text, lbl.x * this.state.zoom * scaleX, lbl.y * this.state.zoom * scaleY)
        ctx.restore()
      }

      cvs.toBlob((blob) => resolve(blob), 'image/png')
    })
  }

  private notify(): void {
    for (const fn of this.listeners) fn(this.state)
  }

  private scheduleRender(): void {
    cancelAnimationFrame(this.animFrameId)
    this.animFrameId = requestAnimationFrame(() => this.render())
  }

  private render(): void {
    const rect = this.container.getBoundingClientRect()
    this.renderer.setupCanvas(rect.width, rect.height)
    this.renderer.render(this.state, rect.width, rect.height)
  }

  private getCanvasPos(clientX: number, clientY: number): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect()
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  private setupInteraction(): void {
    this.canvas.addEventListener('pointerdown', this.onPointerDown)
    this.canvas.addEventListener('pointermove', this.onPointerMove)
    this.canvas.addEventListener('pointerup', this.onPointerUp)
    this.canvas.addEventListener('pointerleave', this.onPointerLeave)
    this.canvas.addEventListener('wheel', this.onWheel, { passive: false })
  }

  private onPointerDown = (e: PointerEvent): void => {
    e.preventDefault()
    this.canvas.setPointerCapture(e.pointerId)

    const pos = this.getCanvasPos(e.clientX, e.clientY)
    const imgPos = this.screenToImg(pos.x, pos.y)

    if (this.state.toolMode === 'pan') {
      this.isPointerDown = true
      this.pointerStart = pos
      this.panStart = { ...this.state.pan }
      this.canvas.style.cursor = 'grabbing'
      return
    }

    if (this.state.toolMode === 'calibrate') {
      if (!this.state.calibration || (this.state.calibration && this.state.calibration.pixelsPerUnit <= 0)) {
        const cal = this.state.calibration
        if (!cal || (cal.x1 === 0 && cal.y1 === 0)) {
          this.state.calibration = { x1: imgPos.x, y1: imgPos.y, x2: 0, y2: 0, realLength: 0, pixelsPerUnit: 0 }
        } else if (cal.pixelsPerUnit <= 0) {
          if (cal.x1 !== imgPos.x || cal.y1 !== imgPos.y) {
            cal.x2 = imgPos.x
            cal.y2 = imgPos.y
          }
        }
        this.notify()
        this.scheduleRender()
      }
      return
    }

    if (this.state.toolMode === 'measure') {
      const cal = this.state.calibration
      if (!cal || cal.pixelsPerUnit <= 0) return

      if (!this.state.pendingPoint) {
        this.state.pendingPoint = { x: imgPos.x, y: imgPos.y }
        this.notify()
        this.scheduleRender()
      } else {
        const p1 = this.state.pendingPoint
        const dx = imgPos.x - p1.x
        const dy = imgPos.y - p1.y
        const pixelDist = Math.sqrt(dx * dx + dy * dy)
        const value = pixelDist / cal.pixelsPerUnit
        const id = `m-${Date.now()}`
        const num = this.state.measurements.length + 1
        this.state.measurements.push({
          id,
          x1: p1.x, y1: p1.y,
          x2: imgPos.x, y2: imgPos.y,
          label: `M${num}`,
          value,
          unit: this.state.unit,
        })
        this.state.pendingPoint = null
        this.notify()
        this.scheduleRender()
      }
      return
    }
  }

  private onPointerMove = (e: PointerEvent): void => {
    if (this.state.toolMode === 'pan' && this.isPointerDown) {
      const pos = this.getCanvasPos(e.clientX, e.clientY)
      this.state.pan.x = this.panStart.x + (pos.x - this.pointerStart.x)
      this.state.pan.y = this.panStart.y + (pos.y - this.pointerStart.y)
      this.notify()
      this.scheduleRender()
    }
  }

  private onPointerUp = (_e: PointerEvent): void => {
    this.isPointerDown = false
    if (this.state.toolMode === 'pan') {
      this.canvas.style.cursor = 'grab'
    }
  }

  private onPointerLeave = (): void => {
    this.isPointerDown = false
    if (this.state.toolMode === 'pan') {
      this.canvas.style.cursor = 'grab'
    }
  }

  private onWheel = (e: WheelEvent): void => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    const rect = this.canvas.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top

    const newZoom = Math.max(0.1, Math.min(10, this.state.zoom * delta))
    const ratio = newZoom / this.state.zoom

    this.state.pan.x = mx - ratio * (mx - this.state.pan.x)
    this.state.pan.y = my - ratio * (my - this.state.pan.y)
    this.state.zoom = newZoom

    this.notify()
    this.scheduleRender()
  }

  private setupResizeObserver(): void {
    const ro = new ResizeObserver(() => this.scheduleRender())
    ro.observe(this.container)
  }

  destroy(): void {
    cancelAnimationFrame(this.animFrameId)
    this.renderer.destroy()
    this.canvas.removeEventListener('pointerdown', this.onPointerDown)
    this.canvas.removeEventListener('pointermove', this.onPointerMove)
    this.canvas.removeEventListener('pointerup', this.onPointerUp)
    this.canvas.removeEventListener('pointerleave', this.onPointerLeave)
    this.canvas.removeEventListener('wheel', this.onWheel)
  }
}
