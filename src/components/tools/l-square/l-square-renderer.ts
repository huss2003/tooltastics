export interface LSquareState {
  unit: string
  orientation: 'normal' | 'flip-h' | 'flip-v'
  ppi: number
  markerX: number | null
  markerY: number | null
  canvasWidth: number
  canvasHeight: number
}

interface RenderColors {
  bg: string
  rulerBg: string
  rulerBorder: string
  tick: string
  label: string
  marker: string
  readoutBg: string
  readoutText: string
}

const TICK_MAJOR_H = 24
const TICK_MINOR_H = 14
const RULER_THICKNESS = 40

function getThemeColors(): RenderColors {
  const isLight = typeof document !== 'undefined'
    ? !document.documentElement.classList.contains('dark')
    : true
  const c = (light: string, dark: string) => isLight ? light : dark
  return {
    bg: c('#f8f9fc', '#1a1d2e'),
    rulerBg: c('#edf0f7', '#25283d'),
    rulerBorder: c('#2d3142', '#c8cce0'),
    tick: c('#2d3142', '#c8cce0'),
    label: c('#2d3142', '#e0e2ee'),
    marker: c('#3b82f6', '#60a5fa'),
    readoutBg: c('rgba(30, 32, 48, 0.92)', 'rgba(220, 222, 235, 0.92)'),
    readoutText: c('#f8f9fc', '#1a1d2e'),
  }
}

export class LSquareRenderer {
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

  render(state: LSquareState): void {
    const ctx = this.ctx
    if (!ctx) return

    const { canvasWidth: w, canvasHeight: h } = state
    ctx.clearRect(0, 0, w, h)

    const colors = getThemeColors()
    this.drawLSquare(ctx, state, colors)
  }

  private drawLSquare(ctx: CanvasRenderingContext2D, state: LSquareState, colors: RenderColors): void {
    const { orientation, ppi, unit, markerX, markerY } = state
    const pxPerUnit = unit === 'in' ? ppi : ppi / 2.54
    const armLength = Math.min(state.canvasWidth, state.canvasHeight) * 0.35
    const thickness = RULER_THICKNESS
    const ox = 20
    const oy = 20

    ctx.save()

    let drawX = ox
    let drawY = oy
    let hDir = 1
    let vDir = 1

    if (orientation === 'flip-h') {
      drawX = state.canvasWidth - ox - armLength
      hDir = -1
    }
    if (orientation === 'flip-v') {
      drawY = state.canvasHeight - oy - armLength
      vDir = -1
    }

    ctx.fillStyle = colors.rulerBg
    ctx.strokeStyle = colors.rulerBorder
    ctx.lineWidth = 1

    ctx.fillRect(drawX, drawY, armLength, thickness)
    ctx.strokeRect(drawX, drawY, armLength, thickness)

    ctx.fillRect(drawX, drawY, thickness, armLength)
    ctx.strokeRect(drawX, drawY, thickness, armLength)

    const numMajor = Math.floor(armLength / pxPerUnit)
    ctx.fillStyle = colors.label
    ctx.font = '400 9px Inter, ui-sans-serif, system-ui, sans-serif'

    for (let i = 0; i <= numMajor; i++) {
      const hx = drawX + (hDir === 1 ? i * pxPerUnit : 0)
      const vy = drawY + (vDir === 1 ? i * pxPerUnit : 0)

      ctx.strokeStyle = colors.tick
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(hx + (hDir === -1 ? -i * pxPerUnit : 0), drawY)
      ctx.lineTo(hx + (hDir === -1 ? -i * pxPerUnit : 0), drawY + TICK_MAJOR_H)
      ctx.stroke()

      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      const labelX = hx + (hDir === -1 ? -i * pxPerUnit : 0)
      ctx.fillText(`${i}`, labelX, drawY + TICK_MAJOR_H + 2)

      ctx.beginPath()
      ctx.moveTo(drawX, vy + (vDir === -1 ? -i * pxPerUnit : 0))
      ctx.lineTo(drawX + TICK_MAJOR_H, vy + (vDir === -1 ? -i * pxPerUnit : 0))
      ctx.stroke()

      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      const labelY = vy + (vDir === -1 ? -i * pxPerUnit : 0)
      ctx.fillText(`${i}`, drawX + TICK_MAJOR_H + 2, labelY)

      for (let s = 1; s < (unit === 'in' ? 16 : 10); s++) {
        const step = unit === 'in' ? (s / 16) * pxPerUnit : (s / 10) * pxPerUnit
        const sh = unit === 'in' && (s % 4 === 0) ? TICK_MINOR_H + 4 : TICK_MINOR_H

        ctx.strokeStyle = colors.tick
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(hx + (hDir === -1 ? -(i * pxPerUnit + step) : i * pxPerUnit + step), drawY)
        ctx.lineTo(hx + (hDir === -1 ? -(i * pxPerUnit + step) : i * pxPerUnit + step), drawY + sh)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(drawX, vy + (vDir === -1 ? -(i * pxPerUnit + step) : i * pxPerUnit + step))
        ctx.lineTo(drawX + sh, vy + (vDir === -1 ? -(i * pxPerUnit + step) : i * pxPerUnit + step))
        ctx.stroke()
      }
    }

    if (markerX !== null && markerY !== null) {
      const mx = drawX + (hDir === 1 ? markerX * pxPerUnit : -markerX * pxPerUnit)
      const my = drawY + (vDir === 1 ? markerY * pxPerUnit : -markerY * pxPerUnit)

      ctx.strokeStyle = colors.marker
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(mx, my, 5, 0, Math.PI * 2)
      ctx.stroke()
      ctx.fillStyle = colors.marker
      ctx.beginPath()
      ctx.arc(mx, my, 2, 0, Math.PI * 2)
      ctx.fill()

      const label = `X: ${markerX.toFixed(1)} Y: ${markerY.toFixed(1)} ${unit}`
      ctx.font = '600 12px Inter, ui-sans-serif, system-ui, sans-serif'
      const metrics = ctx.measureText(label)
      const pad = 8
      const bw = metrics.width + pad * 2
      const bh = 26
      const bx = Math.min(Math.max(mx - bw / 2, 2), state.canvasWidth - bw - 2)
      const by = Math.max(my - bh - 10, 2)

      ctx.fillStyle = colors.readoutBg
      ctx.beginPath()
      this.roundRect(ctx, bx, by, bw, bh, 6)
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

  destroy(): void {
    this.ctx = null
  }
}
