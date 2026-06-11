export interface PrintableRulerConfig {
  unit: 'in' | 'cm'
  lengthIn: number
  lengthCm: number
  ppi: number
}

interface RenderColors {
  bg: string
  tick: string
  label: string
}

const TICK_MAJOR_H = 36
const TICK_MID_H = 24
const TICK_MINOR_H = 14
const RULER_HEIGHT = 100

export class PrintableRulerRenderer {
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

  render(config: PrintableRulerConfig): void {
    const ctx = this.ctx
    if (!ctx) return

    const isInches = config.unit === 'in'
    const length = isInches ? config.lengthIn : config.lengthCm
    const ppi = config.ppi
    const pxPerUnit = isInches ? ppi : ppi / 2.54
    const totalPx = length * pxPerUnit
    const width = Math.max(totalPx, 400)
    const height = RULER_HEIGHT

    this.setupCanvas(width, height)
    ctx.clearRect(0, 0, width, height)

    const colors: RenderColors = {
      bg: '#ffffff',
      tick: '#1a1a2e',
      label: '#1a1a2e',
    }

    ctx.fillStyle = colors.bg
    ctx.fillRect(0, 0, width, height)

    if (isInches) {
      this.drawInchRuler(ctx, length, pxPerUnit, colors)
    } else {
      this.drawCmRuler(ctx, length, pxPerUnit, colors)
    }
  }

  private drawInchRuler(ctx: CanvasRenderingContext2D, length: number, pxPerIn: number, colors: RenderColors): void {
    ctx.strokeStyle = colors.tick
    ctx.lineWidth = 0.5
    ctx.strokeRect(0, 0, length * pxPerIn, RULER_HEIGHT)

    for (let inch = 0; inch <= length; inch++) {
      const x = inch * pxPerIn

      ctx.strokeStyle = colors.tick
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, TICK_MAJOR_H)
      ctx.stroke()

      ctx.fillStyle = colors.label
      ctx.font = '600 11px Inter, ui-sans-serif, system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillText(`${inch}`, x, TICK_MAJOR_H + 4)

      for (let frac = 1; frac < 16; frac++) {
        const fx = x + (frac / 16) * pxPerIn
        if (fx > length * pxPerIn) break

        const isHalf = frac % 8 === 0
        const isQuarter = frac % 4 === 0
        const isEighth = frac % 2 === 0

        ctx.strokeStyle = colors.tick
        if (isHalf) {
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(fx, 0)
          ctx.lineTo(fx, TICK_MID_H)
          ctx.stroke()
        } else if (isQuarter) {
          ctx.lineWidth = 0.75
          ctx.beginPath()
          ctx.moveTo(fx, 0)
          ctx.lineTo(fx, TICK_MINOR_H + 6)
          ctx.stroke()
        } else if (isEighth) {
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(fx, 0)
          ctx.lineTo(fx, TICK_MINOR_H)
          ctx.stroke()
        } else {
          ctx.lineWidth = 0.3
          ctx.beginPath()
          ctx.moveTo(fx, 0)
          ctx.lineTo(fx, 8)
          ctx.stroke()
        }
      }
    }
  }

  private drawCmRuler(ctx: CanvasRenderingContext2D, length: number, pxPerCm: number, colors: RenderColors): void {
    ctx.strokeStyle = colors.tick
    ctx.lineWidth = 0.5
    ctx.strokeRect(0, 0, length * pxPerCm, RULER_HEIGHT)

    for (let cm = 0; cm <= length; cm++) {
      const x = cm * pxPerCm

      ctx.strokeStyle = colors.tick
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, TICK_MAJOR_H)
      ctx.stroke()

      ctx.fillStyle = colors.label
      ctx.font = '600 11px Inter, ui-sans-serif, system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillText(`${cm}`, x, TICK_MAJOR_H + 4)

      for (let mm = 1; mm < 10; mm++) {
        const mx = x + (mm / 10) * pxPerCm
        if (mx > length * pxPerCm) break

        ctx.strokeStyle = colors.tick
        if (mm === 5) {
          ctx.lineWidth = 0.75
          ctx.beginPath()
          ctx.moveTo(mx, 0)
          ctx.lineTo(mx, TICK_MID_H)
          ctx.stroke()
        } else {
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(mx, 0)
          ctx.lineTo(mx, TICK_MINOR_H)
          ctx.stroke()
        }
      }
    }
  }

  generateImage(_unit: string): string {
    return this.canvas.toDataURL('image/png')
  }

  destroy(): void {
    this.ctx = null
  }
}
