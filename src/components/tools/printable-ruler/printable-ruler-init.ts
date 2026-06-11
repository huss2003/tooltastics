import { PrintableRulerRenderer, type PrintableRulerConfig } from './printable-ruler-renderer'
import { DEFAULT_PPI } from '@config/constants'

let renderer: PrintableRulerRenderer | null = null

export function initPrintableRuler(): PrintableRulerRenderer | null {
  if (renderer) return renderer

  const canvas = document.getElementById('printable-ruler-canvas') as HTMLCanvasElement | null
  if (!canvas) return null

  renderer = new PrintableRulerRenderer(canvas)

  const config: PrintableRulerConfig = {
    unit: 'in',
    lengthIn: 12,
    lengthCm: 30,
    ppi: DEFAULT_PPI,
  }

  renderer.render(config)

  const panel = document.querySelector<HTMLElement>('[data-printable-ruler-panel]')
  if (panel) {
    panel.addEventListener('rulerkit:print', ((e: CustomEvent) => {
      const { unit, lengthIn, lengthCm } = e.detail
      renderer?.render({ unit, lengthIn, lengthCm, ppi: DEFAULT_PPI })
    }) as EventListener)
  }

  return renderer
}

export function initPrintableRulerUI(): () => void {
  const r = initPrintableRuler()
  if (!r) return () => {}

  return () => {
    r.destroy()
  }
}
