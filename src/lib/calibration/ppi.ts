import { DEFAULT_PPI, CREDIT_CARD_WIDTH_MM } from '@config/constants'
import { findDevice } from './deviceDatabase'
import { calculatePPI } from '@lib/utils/math'

export interface PPICalculation {
  ppi: number
  method: 'auto-detect' | 'diagonal' | 'credit-card'
  accuracy: number
  deviceName?: string
}

export function getScreenInfo(): { width: number; height: number; dpr: number } {
  return {
    width: screen.width,
    height: screen.height,
    dpr: window.devicePixelRatio || 1,
  }
}

export function autoDetectPPI(): PPICalculation {
  const { width, height } = getScreenInfo()
  const device = findDevice(width, height)

  if (device) {
    return {
      ppi: device.ppi,
      method: 'auto-detect',
      accuracy: device.type === 'phone' || device.type === 'tablet' ? 1 : 2,
      deviceName: device.name,
    }
  }

  return {
    ppi: DEFAULT_PPI,
    method: 'auto-detect',
    accuracy: 5,
  }
}

export function calculatePPIFromDiagonal(
  diagonalInches: number,
): PPICalculation {
  const { width, height } = getScreenInfo()
  const ppi = calculatePPI(width, height, diagonalInches)

  if (!isFinite(ppi) || ppi <= 0) {
    return { ppi: DEFAULT_PPI, method: 'diagonal', accuracy: 10 }
  }

  return {
    ppi: Math.round(ppi),
    method: 'diagonal',
    accuracy: diagonalInches > 0 ? 2 : 10,
  }
}

export function calculatePPIFromCard(
  cardWidthPx: number,
): PPICalculation {
  if (cardWidthPx <= 0) {
    return { ppi: DEFAULT_PPI, method: 'credit-card', accuracy: 10 }
  }

  const cardPPI = (cardWidthPx / CREDIT_CARD_WIDTH_MM) * 25.4

  if (!isFinite(cardPPI) || cardPPI <= 0) {
    return { ppi: DEFAULT_PPI, method: 'credit-card', accuracy: 10 }
  }

  return {
    ppi: Math.round(cardPPI),
    method: 'credit-card',
    accuracy: 0.5,
  }
}

export function accuracyLabel(accuracyPercent: number): string {
  if (accuracyPercent <= 0.5) return 'Excellent (±0.5%)'
  if (accuracyPercent <= 1) return 'Very Good (±1%)'
  if (accuracyPercent <= 2) return 'Good (±2%)'
  if (accuracyPercent <= 5) return 'Fair (±5%)'
  return 'Low (±10%+)'
}
