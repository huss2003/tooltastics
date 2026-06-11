import type { Unit } from '@config/constants'

export interface Point {
  x: number
  y: number
}

export interface MeasurementLine {
  start: Point
  end: Point
  pixelDistance: number
  physicalDistance: number
  unit: Unit
  angle?: number
}

export interface MeasurementHistory {
  id: string
  timestamp: number
  lines: MeasurementLine[]
  notes?: string
}

export interface Marker {
  id: string
  position: Point
  label?: string
  color?: string
}

export interface CalibrationData {
  ppi: number
  method: 'auto-detect' | 'diagonal' | 'credit-card'
  screenDiagonal: number
  accuracy: number
  lastCalibrated: number
  deviceName?: string
}

export interface DeviceEntry {
  name: string
  brand: string
  type: 'phone' | 'tablet' | 'laptop' | 'monitor'
  widthPx: number
  heightPx: number
  diagonalInches: number
  ppi: number
}

export interface ViewportBounds {
  x: number
  y: number
  width: number
  height: number
}
