import { ProtractorTool } from './protractor-tool'

let tool: ProtractorTool | null = null

export function initProtractor(): ProtractorTool | null {
  if (tool) return tool

  const canvas = document.getElementById('protractor-canvas') as HTMLCanvasElement | null
  const container = document.querySelector<HTMLElement>('[data-canvas-container]')

  if (!canvas || !container) return null

  tool = new ProtractorTool(canvas, container)
  return tool
}

export function initProtractorUI(): () => void {
  const t = initProtractor()
  if (!t) return () => {}

  return () => {
    t.destroy()
  }
}
