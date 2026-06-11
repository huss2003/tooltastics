import { MeasureImageTool } from './measure-image-tool'

let tool: MeasureImageTool | null = null

export function initMeasureImageTool(): MeasureImageTool | null {
  if (tool) return tool

  const canvas = document.getElementById('measure-canvas') as HTMLCanvasElement | null
  const container = document.querySelector<HTMLElement>('[data-canvas-container]')

  if (!canvas || !container) return null

  tool = new MeasureImageTool(canvas, container)

  return tool
}

export function initMeasureImageUI(): () => void {
  const t = initMeasureImageTool()
  if (!t) return () => {}

  return () => {
    t.destroy()
  }
}
