export interface ProtractorState {
  angle: number
  centerX: number
  centerY: number
  radius: number
}

interface ProtractorColors {
  bg: string
  arc: string
  tickMajor: string
  tickMinor: string
  label: string
  angleLine: string
  readoutBg: string
  readoutText: string
}

function getThemeColors(): ProtractorColors {
  const isLight = typeof document !== 'undefined'
    ? !document.documentElement.classList.contains('dark')
    : true
  const c = (light: string, dark: string) => isLight ? light : dark
  return {
    bg: c('#f8f9fc', '#1a1d2e'),
    arc: c('#e2e6f0', '#2a2d42'),
    tickMajor: c('#2d3142', '#c8cce0'),
    tickMinor: c('#8b8fa3', '#6b6f85'),
    label: c('#2d3142', '#e0e2ee'),
    angleLine: c('#3b82f6', '#60a5fa'),
    readoutBg: c('rgba(30, 32, 48, 0.92)', 'rgba(220, 222, 235, 0.92)'),
    readoutText: c('#f8f9fc', '#1a1d2e'),
  }
}

export class ProtractorRenderer {
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

  render(state: ProtractorState): void {
    const ctx = this.ctx
    if (!ctx) return

    const { centerX, centerY, radius, angle } = state
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    const colors = getThemeColors()
    this.drawProtractor(ctx, centerX, centerY, radius, colors)
    this.drawAngleLine(ctx, centerX, centerY, radius, angle, colors)
    this.drawAngleReadout(ctx, centerX, centerY, radius, angle, colors)
  }

  private drawProtractor(
    ctx: CanvasRenderingContext2D,
    cx: number, cy: number, r: number,
    colors: ProtractorColors,
  ): void {
    ctx.save()

    ctx.fillStyle = colors.bg
    ctx.beginPath()
    ctx.arc(cx, cy, r, Math.PI, 0)
    ctx.closePath()
    ctx.fill()

    ctx.strokeStyle = colors.arc
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(cx, cy, r, Math.PI, 0)
    ctx.stroke()

    for (let deg = 0; deg <= 180; deg += 1) {
      const rad = (deg - 90) * (Math.PI / 180)
      const isMajor = deg % 10 === 0
      const isMid = deg % 5 === 0
      const inner = isMajor ? r - 20 : isMid ? r - 12 : r - 8
      const outer = r - 4

      ctx.strokeStyle = isMajor ? colors.tickMajor : colors.tickMinor
      ctx.lineWidth = isMajor ? 1.5 : 0.5
      ctx.beginPath()
      ctx.moveTo(cx + Math.cos(rad) * inner, cy + Math.sin(rad) * inner)
      ctx.lineTo(cx + Math.cos(rad) * outer, cy + Math.sin(rad) * outer)
      ctx.stroke()

      if (isMajor) {
        ctx.fillStyle = colors.label
        ctx.font = '500 10px Inter, ui-sans-serif, system-ui, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        const labelR = r - 28
        ctx.fillText(`${deg}`, cx + Math.cos(rad) * labelR, cy + Math.sin(rad) * labelR)
      }
    }

    ctx.restore()
  }

  private drawAngleLine(
    ctx: CanvasRenderingContext2D,
    cx: number, cy: number, r: number, angle: number,
    colors: ProtractorColors,
  ): void {
    if (angle <= 0) return

    const rad = (angle - 90) * (Math.PI / 180)
    const ex = cx + Math.cos(rad) * (r - 4)
    const ey = cy + Math.sin(rad) * (r - 4)

    ctx.save()
    ctx.strokeStyle = colors.angleLine
    ctx.lineWidth = 2.5
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(ex, ey)
    ctx.stroke()

    ctx.fillStyle = colors.angleLine
    ctx.beginPath()
    ctx.arc(cx, cy, 3, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(ex, ey, 4, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  private drawAngleReadout(
    ctx: CanvasRenderingContext2D,
    cx: number, cy: number, r: number, angle: number,
    colors: ProtractorColors,
  ): void {
    if (angle <= 0) return

    const rad = (angle - 90) * (Math.PI / 180)
    const midR = r * 0.6
    const mx = cx + Math.cos(rad) * midR
    const my = cy + Math.sin(rad) * midR

    const label = `${Math.round(angle)}°`
    ctx.save()
    ctx.font = '600 14px Inter, ui-sans-serif, system-ui, sans-serif'
    const metrics = ctx.measureText(label)
    const pad = 8
    const bw = metrics.width + pad * 2
    const bh = 28

    ctx.fillStyle = colors.readoutBg
    ctx.beginPath()
    this.roundRect(ctx, mx - bw / 2, my - bh / 2, bw, bh, 6)
    ctx.fill()

    ctx.fillStyle = colors.readoutText
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, mx, my)
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
