import type { Unit, Orientation } from '@config/constants'

export interface MarkerData {
  id: string
  posX: number
}

export interface PixelRulerPoint {
  x: number
  y: number
}

export interface RenderState {
  ppi: number
  activeUnit: Unit
  orientation: Orientation
  markers: MarkerData[]
  hoverPosX: number | null
  mode: 'ruler' | 'pixel-ruler'
  pixelPoints: PixelRulerPoint[]
  pixelActive: boolean
  canvasWidth: number
  canvasHeight: number
  scrollOffset: number
}

interface RulerColors {
  bg: string
  stripe: string
  tickMajor: string
  tickMinor: string
  tickLabel: string
  markerColor: string
  guideColor: string
  readoutBg: string
  readoutText: string
}

const MAJOR_TICK_H = 28
const MID_TICK_H = 18
const MINOR_TICK_H = 10
const RULER_TOP_PAD = 16

function getThemeColors(): RulerColors {
  const isLight = typeof document !== 'undefined'
    ? !document.documentElement.classList.contains('dark')
    : true
  const c = (light: string, dark: string) => isLight ? light : dark
  return {
    bg: c('#f8f9fc', '#1a1d2e'),
    stripe: c('#edf0f7', '#25283d'),
    tickMajor: c('#2d3142', '#c8cce0'),
    tickMinor: c('#8b8fa3', '#6b6f85'),
    tickLabel: c('#2d3142', '#e0e2ee'),
    markerColor: c('#3b82f6', '#60a5fa'),
    guideColor: c('#ef4444', '#f87171'),
    readoutBg: c('rgba(30, 32, 48, 0.92)', 'rgba(220, 222, 235, 0.92)'),
    readoutText: c('#f8f9fc', '#1a1d2e'),
  }
}

export class RulerRenderer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }

  setupCanvas(width: number, height: number): void {
    const dpr = window.devicePixelRatio || 1
    this.canvas.width = width * dpr
    this.canvas.height = height * dpr
    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`
    const ctx = this.ctx
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
  }

  render(state: RenderState): void {
    const ctx = this.ctx
    if (!ctx) return

    const { canvasWidth: w, canvasHeight: h, orientation } = state
    ctx.clearRect(0, 0, w, h)

    const colors = getThemeColors()

    if (orientation === 'horizontal') {
      this.drawHorizontalRuler(ctx, state, colors)
    } else {
      this.drawVerticalRuler(ctx, state, colors)
    }

    if (state.mode === 'pixel-ruler') {
      this.drawPixelRulerOverlay(ctx, state, colors)
    }
  }

  private drawHorizontalRuler(ctx: CanvasRenderingContext2D, state: RenderState, colors: RulerColors): void {
    const { canvasWidth: w, canvasHeight: h, ppi, activeUnit, markers, hoverPosX } = state
    const cmPx = ppi / 2.54
    const inPx = ppi
    const totalCm = w / cmPx

    ctx.fillStyle = colors.bg
    ctx.fillRect(0, 0, w, h)

    for (let cm = 0; cm < totalCm; cm++) {
      if (cm % 2 === 0) {
        ctx.fillStyle = colors.stripe
        ctx.fillRect(cm * cmPx, 0, cmPx, h)
      }
    }

    this.drawCMMarks(ctx, w, cmPx, colors.tickMajor, colors.tickMinor, colors.tickLabel)
    this.drawInchMarks(ctx, w, inPx, colors.tickMajor, colors.tickMinor, colors.tickLabel)

    ctx.strokeStyle = colors.tickMinor
    ctx.lineWidth = 0.5
    ctx.beginPath()
    ctx.moveTo(0, h / 2)
    ctx.lineTo(w, h / 2)
    ctx.stroke()

    if (hoverPosX !== null) {
      this.drawGuideLine(ctx, hoverPosX, h, colors.guideColor)
    }

    for (const marker of markers) {
      this.drawMarker(ctx, marker.posX, h, colors.markerColor)
      this.drawReadout(ctx, marker.posX, h, ppi, activeUnit, colors.readoutBg, colors.readoutText)
    }
  }

  private drawVerticalRuler(ctx: CanvasRenderingContext2D, state: RenderState, colors: RulerColors): void {
    const { canvasWidth: w, canvasHeight: h, ppi, activeUnit, markers, hoverPosX } = state
    const cmPx = ppi / 2.54
    const inPx = ppi

    ctx.fillStyle = colors.bg
    ctx.fillRect(0, 0, w, h)

    ctx.save()
    ctx.translate(w, 0)
    ctx.rotate(Math.PI / 2)

    this.drawCMMarks(ctx, h, cmPx, colors.tickMajor, colors.tickMinor, colors.tickLabel)
    this.drawInchMarks(ctx, h, inPx, colors.tickMajor, colors.tickMinor, colors.tickLabel)

    ctx.restore()

    if (hoverPosX !== null) {
      this.drawGuideLineVertical(ctx, hoverPosX, w, colors.guideColor)
    }

    for (const marker of markers) {
      this.drawMarkerVertical(ctx, marker.posX, w, colors.markerColor)
      this.drawReadoutVertical(ctx, marker.posX, w, ppi, activeUnit, colors.readoutBg, colors.readoutText)
    }
  }

  private drawCMMarks(ctx: CanvasRenderingContext2D, length: number, cmPx: number, majorColor: string, minorColor: string, labelColor: string): void {
    const totalCm = Math.ceil(length / cmPx)
    ctx.fillStyle = labelColor
    ctx.font = '500 10px Inter, ui-sans-serif, system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'

    for (let cm = 0; cm <= totalCm; cm++) {
      const x = cm * cmPx
      ctx.strokeStyle = majorColor
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x, RULER_TOP_PAD)
      ctx.lineTo(x, RULER_TOP_PAD + MAJOR_TICK_H)
      ctx.stroke()

      ctx.fillText(`${cm}`, x, RULER_TOP_PAD + MAJOR_TICK_H + 16)

      for (let mm = 1; mm < 10; mm++) {
        const mmX = x + (mm / 10) * cmPx
        if (mmX > length) break

        if (mm === 5) {
          ctx.strokeStyle = minorColor
          ctx.lineWidth = 0.75
          ctx.beginPath()
          ctx.moveTo(mmX, RULER_TOP_PAD)
          ctx.lineTo(mmX, RULER_TOP_PAD + MID_TICK_H)
          ctx.stroke()
        } else {
          ctx.strokeStyle = minorColor
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(mmX, RULER_TOP_PAD)
          ctx.lineTo(mmX, RULER_TOP_PAD + MINOR_TICK_H)
          ctx.stroke()
        }
      }
    }
  }

  private drawInchMarks(ctx: CanvasRenderingContext2D, length: number, inPx: number, majorColor: string, minorColor: string, labelColor: string): void {
    const totalIn = Math.ceil(length / inPx)
    const midY = 30
    const inchBaseY = midY + RULER_TOP_PAD + MAJOR_TICK_H + 8

    ctx.fillStyle = labelColor
    ctx.font = '500 10px Inter, ui-sans-serif, system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'

    for (let inch = 0; inch <= totalIn; inch++) {
      const x = inch * inPx
      if (x > length) break

      ctx.strokeStyle = majorColor
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x, inchBaseY)
      ctx.lineTo(x, inchBaseY + MAJOR_TICK_H)
      ctx.stroke()

      ctx.fillText(`${inch}`, x, inchBaseY + MAJOR_TICK_H + 16)

      for (let frac = 1; frac < 16; frac++) {
        const fracX = x + (frac / 16) * inPx
        if (fracX > length) break

        const isHalf = frac % 8 === 0
        const isQuarter = frac % 4 === 0
        const isEighth = frac % 2 === 0

        if (isHalf) {
          ctx.strokeStyle = majorColor
          ctx.lineWidth = 0.75
          ctx.beginPath()
          ctx.moveTo(fracX, inchBaseY)
          ctx.lineTo(fracX, inchBaseY + MID_TICK_H)
          ctx.stroke()
        } else if (isQuarter) {
          ctx.strokeStyle = minorColor
          ctx.lineWidth = 0.75
          ctx.beginPath()
          ctx.moveTo(fracX, inchBaseY)
          ctx.lineTo(fracX, inchBaseY + MINOR_TICK_H + 4)
          ctx.stroke()
        } else if (isEighth) {
          ctx.strokeStyle = minorColor
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(fracX, inchBaseY)
          ctx.lineTo(fracX, inchBaseY + MINOR_TICK_H)
          ctx.stroke()
        } else {
          ctx.strokeStyle = minorColor
          ctx.lineWidth = 0.3
          ctx.beginPath()
          ctx.moveTo(fracX, inchBaseY)
          ctx.lineTo(fracX, inchBaseY + 6)
          ctx.stroke()
        }
      }
    }
  }

  private drawGuideLine(ctx: CanvasRenderingContext2D, x: number, h: number, color: string): void {
    ctx.save()
    ctx.strokeStyle = color
    ctx.lineWidth = 1.5
    ctx.setLineDash([6, 4])
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
    ctx.stroke()
    ctx.restore()
  }

  private drawGuideLineVertical(ctx: CanvasRenderingContext2D, y: number, w: number, color: string): void {
    ctx.save()
    ctx.strokeStyle = color
    ctx.lineWidth = 1.5
    ctx.setLineDash([6, 4])
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.stroke()
    ctx.restore()
  }

  private drawMarker(ctx: CanvasRenderingContext2D, x: number, h: number, color: string): void {
    ctx.save()
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(x, h / 2, 10, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, h / 2, 3, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  private drawMarkerVertical(ctx: CanvasRenderingContext2D, y: number, w: number, color: string): void {
    ctx.save()
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(w / 2, y, 10, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(w / 2, y, 3, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  private drawReadout(ctx: CanvasRenderingContext2D, x: number, h: number, ppi: number, unit: Unit, bg: string, textColor: string): void {
    const cm = x / (ppi / 2.54)
    const value = unit === 'in' ? x / ppi : cm
    const unitLabel = unit === 'in' ? '"' : 'cm'
    const label = `${value.toFixed(unit === 'in' ? 2 : 1)} ${unitLabel}`

    ctx.save()
    ctx.font = '600 13px Inter, ui-sans-serif, system-ui, sans-serif'
    const metrics = ctx.measureText(label)
    const pad = 8
    const bw = metrics.width + pad * 2
    const bh = 28
    const bx = Math.max(2, Math.min(x - bw / 2, h - bw - 2))

    ctx.fillStyle = bg
    ctx.beginPath()
    this.roundRect(ctx, bx, 4, bw, bh, 6)
    ctx.fill()

    ctx.fillStyle = textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, bx + bw / 2, 4 + bh / 2)
    ctx.restore()
  }

  private drawReadoutVertical(ctx: CanvasRenderingContext2D, y: number, w: number, ppi: number, unit: Unit, bg: string, textColor: string): void {
    const cm = y / (ppi / 2.54)
    const value = unit === 'in' ? y / ppi : cm
    const unitLabel = unit === 'in' ? '"' : 'cm'
    const label = `${value.toFixed(unit === 'in' ? 2 : 1)} ${unitLabel}`

    ctx.save()
    ctx.font = '600 13px Inter, ui-sans-serif, system-ui, sans-serif'
    const metrics = ctx.measureText(label)
    const pad = 8
    const bw = metrics.width + pad * 2
    const bh = 28
    const by = Math.max(2, Math.min(y - bh / 2, w - bh - 2))

    ctx.fillStyle = bg
    ctx.beginPath()
    this.roundRect(ctx, 4, by, bw, bh, 6)
    ctx.fill()

    ctx.fillStyle = textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, 4 + bw / 2, by + bh / 2)
    ctx.restore()
  }

  private drawPixelRulerOverlay(ctx: CanvasRenderingContext2D, state: RenderState, colors: RulerColors): void {
    const { pixelPoints, canvasWidth: w } = state

    if (pixelPoints.length === 0) return

    ctx.save()
    ctx.strokeStyle = colors.markerColor
    ctx.lineWidth = 1.5
    ctx.setLineDash([3, 3])

    for (const pt of pixelPoints) {
      ctx.beginPath()
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = colors.markerColor
      ctx.fill()
      ctx.stroke()
    }

    if (pixelPoints.length >= 2) {
      const a = pixelPoints[0]!
      const b = pixelPoints[1]!
      const dx = b.x - a.x
      const dy = b.y - a.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      ctx.strokeStyle = colors.guideColor
      ctx.lineWidth = 1.5
      ctx.setLineDash([])
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()

      const midX = (a.x + b.x) / 2
      const midY = (a.y + b.y) / 2
      const label = `${Math.round(dist)} px`

      ctx.font = '600 12px Inter, ui-sans-serif, system-ui, sans-serif'
      const metrics = ctx.measureText(label)
      const pad = 6
      const bw = metrics.width + pad * 2
      const bh = 24
      const bx = Math.max(2, Math.min(midX - bw / 2, w - bw - 2))
      const by = Math.max(2, midY - bh - 4)

      ctx.fillStyle = colors.readoutBg
      ctx.beginPath()
      this.roundRect(ctx, bx, by, bw, bh, 4)
      ctx.fill()

      ctx.fillStyle = colors.readoutText
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(label, bx + bw / 2, by + bh / 2)
    }

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

  pxToCm(px: number, ppi: number): number {
    return px / (ppi / 2.54)
  }

  pxToIn(px: number, ppi: number): number {
    return px / ppi
  }

  destroy(): void {
    this.ctx = null
  }
}
