import { initRulerTool as initBaseRuler } from '../ruler/ruler-init'
import { Unit } from '@config/constants'

let tool: ReturnType<typeof initBaseRuler> | null = null

export function initRulerTool() {
  if (tool) return tool

  tool = initBaseRuler()
  if (tool) {
    const state = tool.getState()
    if (state.unit !== Unit.Pixels) {
      tool.setUnit(Unit.Pixels)
    }
    if (state.mode !== 'pixel-ruler') {
      tool.setMode('pixel-ruler')
    }
  }

  return tool
}
