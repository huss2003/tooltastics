import type { RulerTool } from './ruler-tool'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports -- Unit and Orientation are enums used at runtime
import { Unit, Orientation } from '@config/constants'

export function initCalibrationPanel(
  panel: HTMLElement,
  tool: RulerTool,
): () => void {
  const tabs = panel.querySelectorAll<HTMLElement>('[data-tab]')
  const panels: Record<string, HTMLElement | null> = {
    auto: panel.querySelector('[data-panel="auto"]'),
    diagonal: panel.querySelector('[data-panel="diagonal"]'),
    card: panel.querySelector('[data-panel="card"]'),
  }

  const ppiDisplay = panel.querySelector<HTMLElement>('[data-ppi-display]')
  const autoBtn = panel.querySelector<HTMLButtonElement>('[data-auto-detect]')
  const autoStatus = panel.querySelector<HTMLElement>('[data-auto-status]')
  const diagInput = panel.querySelector<HTMLInputElement>('[data-diagonal-input]')
  const diagApply = panel.querySelector<HTMLButtonElement>('[data-diagonal-apply]')
  const cardSlider = panel.querySelector<HTMLInputElement>('[data-card-slider]')
  const cardFill = panel.querySelector<HTMLElement>('[data-card-fill]')
  const cardSave = panel.querySelector<HTMLButtonElement>('[data-card-save]')
  const calSuccess = panel.querySelector<HTMLElement>('[data-cal-success]')
  const calSuccessMsg = panel.querySelector<HTMLElement>('[data-cal-success-msg]')

  const unitBtns = panel.querySelectorAll<HTMLElement>('[data-unit]')
  const orientBtns = panel.querySelectorAll<HTMLElement>('[data-orientation]')
  const modeBtns = panel.querySelectorAll<HTMLElement>('[data-mode]')
  const clearBtn = panel.querySelector<HTMLButtonElement>('[data-clear-btn]')

  let successTimeout: ReturnType<typeof setTimeout> | null = null

  function showSuccess(msg: string): void {
    if (!calSuccess || !calSuccessMsg) return
    calSuccessMsg.textContent = msg
    calSuccess.classList.remove('hidden')
    if (successTimeout) clearTimeout(successTimeout)
    successTimeout = setTimeout(() => {
      calSuccess?.classList.add('hidden')
    }, 3000)
  }

  function updatePpiDisplay(ppi: number): void {
    if (ppiDisplay) ppiDisplay.textContent = `PPI: ${ppi}`
  }

  function switchTab(method: string): void {
    for (const tab of tabs) {
      tab.ariaSelected = String(tab.dataset.tab === method)
    }
    for (const [key, el] of Object.entries(panels)) {
      if (el) el.hidden = key !== method
    }
  }

  for (const tab of tabs) {
    tab.addEventListener('click', () => {
      switchTab(tab.dataset.tab ?? 'auto')
    })
  }

  if (autoBtn) {
    autoBtn.addEventListener('click', () => {
      const cal = tool.autoCalibrate()
      updatePpiDisplay(cal.ppi)
      if (autoStatus) autoStatus.textContent = `Detected: ${cal.ppi} PPI (${cal.accuracy}% accuracy)`
      showSuccess(`Auto-calibrated at ${cal.ppi} PPI`)
    })
  }

  if (diagApply && diagInput) {
    const applyDiagonal = (): void => {
      const val = parseFloat(diagInput.value)
      if (!val || val < 3 || val > 50) {
        diagInput.classList.add('input-error')
        return
      }
      diagInput.classList.remove('input-error')
      const cal = tool.calibrateDiagonal(val)
      updatePpiDisplay(cal.ppi)
      showSuccess(`Calibrated at ${cal.ppi} PPI (${val}" diagonal)`)
    }
    diagApply.addEventListener('click', applyDiagonal)
    diagInput.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') applyDiagonal()
    })
  }

  if (cardSlider && cardFill) {
    const updateCardFill = (): void => {
      const val = parseInt(cardSlider.value, 10)
      cardFill.style.width = `${val}%`
    }
    cardSlider.addEventListener('input', updateCardFill)
    updateCardFill()
  }

  if (cardSave && cardSlider) {
    cardSave.addEventListener('click', () => {
      const pct = parseInt(cardSlider.value, 10)
      const guideEl = panel.querySelector<HTMLElement>('[data-card-guide]')
      if (!guideEl) return
      const guideWidth = guideEl.offsetWidth
      const cardWidthPx = (pct / 100) * guideWidth
      const cal = tool.calibrateCard(cardWidthPx)
      updatePpiDisplay(cal.ppi)
      showSuccess(`Card calibration: ${cal.ppi} PPI`)
    })
  }

  for (const btn of unitBtns) {
    btn.addEventListener('click', () => {
      const unit = btn.dataset.unit as Unit | undefined
      if (!unit) return
      tool.setUnit(unit)
      for (const b of unitBtns) {
        b.ariaChecked = String(b.dataset.unit === unit)
      }
    })
  }

  for (const btn of orientBtns) {
    btn.addEventListener('click', () => {
      const orientation = btn.dataset.orientation as Orientation | undefined
      if (!orientation) return
      tool.setOrientation(orientation)
      for (const b of orientBtns) {
        b.ariaChecked = String(b.dataset.orientation === orientation)
      }
    })
  }

  for (const btn of modeBtns) {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode as 'ruler' | 'pixel-ruler' | undefined
      if (!mode) return
      tool.setMode(mode)
      for (const b of modeBtns) {
        b.ariaChecked = String(b.dataset.mode === mode)
      }
    })
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      tool.clearMarkers()
    })
  }

  const unsub = tool.subscribe((state) => {
    updatePpiDisplay(state.ppi)
  })

  updatePpiDisplay(tool.getState().ppi)

  return () => {
    unsub()
  }
}
