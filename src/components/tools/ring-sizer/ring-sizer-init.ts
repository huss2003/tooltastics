import { RingSizerRenderer, type RingSizerState, getSizes } from './ring-sizer-renderer'

let renderer: RingSizerRenderer | null = null
let currentState: RingSizerState = {
  standard: 'us',
  selectedIndex: -1,
  centerX: 0,
  centerY: 0,
}

export function initRingSizer(): RingSizerRenderer | null {
  if (renderer) return renderer

  const canvas = document.getElementById('ring-sizer-canvas') as HTMLCanvasElement | null
  const container = document.querySelector<HTMLElement>('[data-canvas-container]')

  if (!canvas || !container) return null

  renderer = new RingSizerRenderer(canvas)

  function updateSize(): void {
    const { width, height } = container!.getBoundingClientRect()
    currentState.centerX = width / 2
    currentState.centerY = height / 2
    renderer!.setupCanvas(width, height)
    renderer!.render(currentState)
  }

  const ro = new ResizeObserver(updateSize)
  ro.observe(container)
  updateSize()

  canvas.addEventListener('click', (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const sizes = getSizes(currentState.standard)
    const ppi = 96
    const pxPerMm = ppi / 25.4
    const maxDiameter = Math.max(...sizes.map((s) => s.diameterMm)) * pxPerMm
    const availableRadius = Math.min(currentState.centerX, currentState.centerY) - 30
    const scale = (availableRadius * 2) / maxDiameter

    for (let i = 0; i < sizes.length; i++) {
      const r = (sizes[i]!.diameterMm * pxPerMm * scale) / 2
      const dx = x - currentState.centerX
      const dy = y - currentState.centerY
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (Math.abs(dist - r) < 8) {
        currentState.selectedIndex = i
        renderer?.render(currentState)

        const panel = document.querySelector<HTMLElement>('[data-ring-sizer-panel]')
        if (panel) {
          panel.dispatchEvent(new CustomEvent('rulerkit:size-change', {
            detail: { size: sizes[i]!.label, standard: currentState.standard },
            bubbles: true,
          }))
        }
        break
      }
    }
  })

  const panel = document.querySelector<HTMLElement>('[data-ring-sizer-panel]')
  if (panel) {
    panel.addEventListener('rulerkit:standard-change', ((e: CustomEvent) => {
      currentState.standard = e.detail.standard
      currentState.selectedIndex = -1
      renderer?.render(currentState)
    }) as EventListener)
  }

  return renderer
}

export function initRingSizerUI(): () => void {
  const r = initRingSizer()
  if (!r) return () => {}

  return () => {
    r.destroy()
  }
}
