import type { MeasureImageState, Measurement } from './measure-image-tool'

export class MeasureImageRenderer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D | null = null
  private dpr = 1

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }

  setupCanvas(width: number, height: number): void {
    this.dpr = window.devicePixelRatio || 1
    this.canvas.width = width * this.dpr
    this.canvas.height = height * this.dpr
    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`
    const ctx = this.ctx
    if (ctx) {
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    }
  }

  render(state: MeasureImageState, canvasW: number, canvasH: number): void {
    const ctx = this.ctx
    if (!ctx) return

    ctx.clearRect(0, 0, canvasW, canvasH)

    ctx.fillStyle = '#1a1d2e'
    ctx.fillRect(0, 0, canvasW, canvasH)

    ctx.save()
    ctx.setTransform(
      this.dpr * state.zoom, 0,
      0, this.dpr * state.zoom,
      this.dpr * state.pan.x, this.dpr * state.pan.y,
    )

    if (state.image) {
      ctx.drawImage(state.image, 0, 0)
    }

    if (state.calibration) {
      this.drawCalibration(ctx, state)
    }

    for (const m of state.measurements) {
      const isSelected = m.id === state.selectedId
      this.drawMeasurement(ctx, m, state.measurements.indexOf(m), isSelected)
    }

    if (state.pendingPoint) {
      ctx.save()
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(state.pendingPoint.x, state.pendingPoint.y, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    for (const lbl of state.labels) {
      this.drawTextLabel(ctx, lbl)
    }

    ctx.restore()

    if (state.toolMode === 'calibrate' && !state.calibration) {
      ctx.save()
      ctx.fillStyle = 'rgba(255,255,255,0.7)'
      ctx.font = '600 16px Inter, ui-sans-serif, system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('Click two points to set calibration reference', canvasW / 2, 30)
      ctx.restore()
    } else if (state.toolMode === 'calibrate' && state.calibration && state.calibration.pixelsPerUnit <= 0) {
      ctx.save()
      ctx.fillStyle = 'rgba(255,255,255,0.7)'
      ctx.font = '600 16px Inter, ui-sans-serif, system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('Enter the known length in the panel and click "Set Calibration"', canvasW / 2, 30)
      ctx.restore()
    } else if (state.toolMode === 'measure' && state.pendingPoint) {
      ctx.save()
      ctx.fillStyle = 'rgba(255,255,255,0.7)'
      ctx.font = '600 16px Inter, ui-sans-serif, system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('Click second point to complete measurement', canvasW / 2, 30)
      ctx.restore()
    }
  }

  private drawCalibration(ctx: CanvasRenderingContext2D, state: MeasureImageState): void {
    const cal = state.calibration!
    ctx.save()
    ctx.strokeStyle = '#f59e0b'
    ctx.lineWidth = 2
    ctx.setLineDash([8, 4])
    ctx.beginPath()
    ctx.moveTo(cal.x1, cal.y1)
    ctx.lineTo(cal.x2, cal.y2)
    ctx.stroke()
    ctx.setLineDash([])

    ctx.fillStyle = '#f59e0b'
    ctx.beginPath()
    ctx.arc(cal.x1, cal.y1, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(cal.x2, cal.y2, 5, 0, Math.PI * 2)
    ctx.fill()

    if (cal.realLength > 0) {
      const cx = (cal.x1 + cal.x2) / 2
      const cy = (cal.y1 + cal.y2) / 2
      ctx.font = '600 13px Inter, ui-sans-serif, system-ui, sans-serif'
      const label = `Cal: ${cal.realLength} ${state.unit}`
      ctx.fillStyle = '#f59e0b'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'bottom'
      ctx.fillText(label, cx, cy - 6)
    }

    ctx.restore()
  }

  private drawMeasurement(ctx: CanvasRenderingContext2D, m: Measurement, idx: number, selected: boolean): void {
    ctx.save()
    const color = idx % 2 === 0 ? '#3b82f6' : '#8b5cf6'
    const strokeColor = selected ? '#ef4444' : color
    const lineWidth = selected ? 3 : 2

    ctx.strokeStyle = strokeColor
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.moveTo(m.x1, m.y1)
    ctx.lineTo(m.x2, m.y2)
    ctx.stroke()

    ctx.fillStyle = strokeColor
    ctx.beginPath()
    ctx.arc(m.x1, m.y1, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(m.x2, m.y2, 5, 0, Math.PI * 2)
    ctx.fill()

    const cx = (m.x1 + m.x2) / 2
    const cy = (m.y1 + m.y2) / 2
    const label = `${m.label}: ${m.value.toFixed(1)} ${m.unit}`

    ctx.font = '600 12px Inter, ui-sans-serif, system-ui, sans-serif'
    const metrics = ctx.measureText(label)
    const pad = 6
    const bw = metrics.width + pad * 2
    const bh = 22

    ctx.fillStyle = 'rgba(30, 32, 48, 0.92)'
    ctx.beginPath()
    this.roundRect(ctx, cx - bw / 2, cy - bh - 4, bw, bh, 4)
    ctx.fill()

    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, cx, cy - bh / 2 - 4)

    ctx.restore()
  }

  private drawTextLabel(ctx: CanvasRenderingContext2D, lbl: { x: number; y: number; text: string }): void {
    ctx.save()
    ctx.font = '600 13px Inter, ui-sans-serif, system-ui, sans-serif'
    const metrics = ctx.measureText(lbl.text)
    const pad = 6
    const bw = metrics.width + pad * 2
    const bh = 24

    ctx.fillStyle = 'rgba(30, 32, 48, 0.88)'
    ctx.beginPath()
    this.roundRect(ctx, lbl.x - bw / 2, lbl.y - bh / 2, bw, bh, 4)
    ctx.fill()

    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(lbl.text, lbl.x, lbl.y)
    ctx.restore()
  }

  private roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + r)
    ctx.lineTo(x + w, y + h - r)
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    ctx.lineTo(x + r, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
  }

  destroy(): void {
    this.ctx = null
  }
}
