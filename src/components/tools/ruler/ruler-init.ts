import { RulerTool } from './ruler-tool'
import { initCalibrationPanel } from './calibration-panel-client'

let tool: RulerTool | null = null

export function initRulerTool(): RulerTool | null {
  if (tool) return tool

  const canvas = document.getElementById('ruler-canvas') as HTMLCanvasElement | null
  const container = document.querySelector<HTMLElement>('[data-canvas-container]')
  const readout = document.querySelector<HTMLElement>('[data-readout]')

  if (!canvas || !container) return null

  tool = new RulerTool(canvas, container)
  if (readout) tool.setReadoutElement(readout)

  return tool
}

export function initRulerUI(): () => void {
  const t = initRulerTool()
  if (!t) return () => {}

  const panel = document.querySelector<HTMLElement>('[data-calibration-panel]')
  const cleanups: (() => void)[] = []

  if (panel) {
    cleanups.push(initCalibrationPanel(panel, t))
  }

  return () => {
    t.destroy()
    for (const fn of cleanups) fn()
  }
}
