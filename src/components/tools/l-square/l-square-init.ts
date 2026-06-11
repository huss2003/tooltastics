import { LSquareTool } from './l-square-tool'

let tool: LSquareTool | null = null

export function initLSquare(): LSquareTool | null {
  if (tool) return tool

  const canvas = document.getElementById('l-square-canvas') as HTMLCanvasElement | null
  const container = document.querySelector<HTMLElement>('[data-canvas-container]')
  const readout = document.querySelector<HTMLElement>('[data-readout]')

  if (!canvas || !container) return null

  tool = new LSquareTool(canvas, container)
  if (readout) tool.setReadoutElement(readout)

  return tool
}

export function initLSquareUI(): () => void {
  const t = initLSquare()
  if (!t) return () => {}

  return () => {
    t.destroy()
  }
}
