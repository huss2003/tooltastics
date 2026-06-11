export interface RingSize {
  label: string
  diameterMm: number
}

export interface RingSizerState {
  standard: string
  selectedIndex: number
  centerX: number
  centerY: number
}

interface RenderColors {
  bg: string
  circleStroke: string
  circleFill: string
  selectedStroke: string
  label: string
  selectedLabel: string
}

const RING_SIZES: Record<string, RingSize[]> = {
  us: [
    { label: '3', diameterMm: 14.1 }, { label: '3.5', diameterMm: 14.5 },
    { label: '4', diameterMm: 14.9 }, { label: '4.5', diameterMm: 15.3 },
    { label: '5', diameterMm: 15.7 }, { label: '5.5', diameterMm: 16.1 },
    { label: '6', diameterMm: 16.5 }, { label: '6.5', diameterMm: 16.9 },
    { label: '7', diameterMm: 17.3 }, { label: '7.5', diameterMm: 17.7 },
    { label: '8', diameterMm: 18.1 }, { label: '8.5', diameterMm: 18.5 },
    { label: '9', diameterMm: 18.9 }, { label: '9.5', diameterMm: 19.4 },
    { label: '10', diameterMm: 19.8 }, { label: '10.5', diameterMm: 20.2 },
    { label: '11', diameterMm: 20.6 }, { label: '11.5', diameterMm: 21.0 },
    { label: '12', diameterMm: 21.4 }, { label: '12.5', diameterMm: 21.8 },
    { label: '13', diameterMm: 22.2 }, { label: '13.5', diameterMm: 22.6 },
  ],
  uk: [
    { label: 'A', diameterMm: 12.0 }, { label: 'B', diameterMm: 12.4 },
    { label: 'C', diameterMm: 12.8 }, { label: 'D', diameterMm: 13.2 },
    { label: 'E', diameterMm: 13.6 }, { label: 'F', diameterMm: 14.0 },
    { label: 'G', diameterMm: 14.4 }, { label: 'H', diameterMm: 14.8 },
    { label: 'I', diameterMm: 15.2 }, { label: 'J', diameterMm: 15.6 },
    { label: 'K', diameterMm: 16.0 }, { label: 'L', diameterMm: 16.4 },
    { label: 'M', diameterMm: 16.8 }, { label: 'N', diameterMm: 17.2 },
    { label: 'O', diameterMm: 17.6 }, { label: 'P', diameterMm: 18.0 },
    { label: 'Q', diameterMm: 18.4 }, { label: 'R', diameterMm: 18.8 },
    { label: 'S', diameterMm: 19.2 }, { label: 'T', diameterMm: 19.6 },
    { label: 'U', diameterMm: 20.0 }, { label: 'V', diameterMm: 20.4 },
    { label: 'W', diameterMm: 20.8 }, { label: 'X', diameterMm: 21.2 },
    { label: 'Y', diameterMm: 21.6 }, { label: 'Z', diameterMm: 22.0 },
  ],
  eu: [
    { label: '44', diameterMm: 14.0 }, { label: '45', diameterMm: 14.3 },
    { label: '46', diameterMm: 14.6 }, { label: '47', diameterMm: 14.9 },
    { label: '48', diameterMm: 15.3 }, { label: '49', diameterMm: 15.6 },
    { label: '50', diameterMm: 15.9 }, { label: '51', diameterMm: 16.2 },
    { label: '52', diameterMm: 16.5 }, { label: '53', diameterMm: 16.8 },
    { label: '54', diameterMm: 17.2 }, { label: '55', diameterMm: 17.5 },
    { label: '56', diameterMm: 17.8 }, { label: '57', diameterMm: 18.1 },
    { label: '58', diameterMm: 18.5 }, { label: '59', diameterMm: 18.8 },
    { label: '60', diameterMm: 19.1 }, { label: '61', diameterMm: 19.4 },
    { label: '62', diameterMm: 19.7 }, { label: '63', diameterMm: 20.0 },
    { label: '64', diameterMm: 20.4 }, { label: '65', diameterMm: 20.7 },
    { label: '66', diameterMm: 21.0 }, { label: '67', diameterMm: 21.3 },
    { label: '68', diameterMm: 21.6 }, { label: '69', diameterMm: 22.0 },
  ],
  jp: [
    { label: '1', diameterMm: 12.0 }, { label: '2', diameterMm: 12.4 },
    { label: '3', diameterMm: 12.8 }, { label: '4', diameterMm: 13.2 },
    { label: '5', diameterMm: 13.6 }, { label: '6', diameterMm: 14.0 },
    { label: '7', diameterMm: 14.4 }, { label: '8', diameterMm: 14.8 },
    { label: '9', diameterMm: 15.2 }, { label: '10', diameterMm: 15.6 },
    { label: '11', diameterMm: 16.0 }, { label: '12', diameterMm: 16.4 },
    { label: '13', diameterMm: 16.8 }, { label: '14', diameterMm: 17.2 },
    { label: '15', diameterMm: 17.6 }, { label: '16', diameterMm: 18.0 },
    { label: '17', diameterMm: 18.4 }, { label: '18', diameterMm: 18.8 },
    { label: '19', diameterMm: 19.2 }, { label: '20', diameterMm: 19.6 },
    { label: '21', diameterMm: 20.0 }, { label: '22', diameterMm: 20.4 },
    { label: '23', diameterMm: 20.8 }, { label: '24', diameterMm: 21.2 },
    { label: '25', diameterMm: 21.6 }, { label: '26', diameterMm: 22.0 },
    { label: '27', diameterMm: 22.4 },
  ],
}

function getThemeColors(): RenderColors {
  const isLight = typeof document !== 'undefined'
    ? !document.documentElement.classList.contains('dark')
    : true
  const c = (light: string, dark: string) => isLight ? light : dark
  return {
    bg: c('#f8f9fc', '#1a1d2e'),
    circleStroke: c('#8b8fa3', '#6b6f85'),
    circleFill: c('transparent', 'transparent'),
    selectedStroke: c('#3b82f6', '#60a5fa'),
    label: c('#2d3142', '#c8cce0'),
    selectedLabel: c('#3b82f6', '#60a5fa'),
  }
}

export function getSizes(standard: string): RingSize[] {
  return RING_SIZES[standard] ?? RING_SIZES.us!
}

export class RingSizerRenderer {
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

  render(state: RingSizerState): void {
    const ctx = this.ctx
    if (!ctx) return

    const { standard, selectedIndex, centerX, centerY } = state
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    const colors = getThemeColors()
    const sizes = getSizes(standard)
    const ppi = 96
    const pxPerMm = ppi / 25.4
    const maxDiameter = Math.max(...sizes.map((s) => s.diameterMm)) * pxPerMm
    const availableRadius = Math.min(centerX, centerY) - 30
    const scale = (availableRadius * 2) / maxDiameter

    for (let i = sizes.length - 1; i >= 0; i--) {
      const size = sizes[i]!
      const r = (size.diameterMm * pxPerMm * scale) / 2
      const isSelected = i === selectedIndex

      ctx.strokeStyle = isSelected ? colors.selectedStroke : colors.circleStroke
      ctx.lineWidth = isSelected ? 2.5 : 1
      ctx.fillStyle = isSelected ? colors.selectedStroke + '10' : colors.circleFill
      ctx.beginPath()
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = isSelected ? colors.selectedLabel : colors.label
      ctx.font = `${isSelected ? 600 : 400} ${isSelected ? 12 : 10}px Inter, ui-sans-serif, system-ui, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(size.label, centerX, centerY - r - (isSelected ? 16 : 12))
    }
  }

  destroy(): void {
    this.ctx = null
  }
}
