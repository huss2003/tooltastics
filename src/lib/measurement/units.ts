import { Unit, ACCURACY_THRESHOLD_PX } from '@config/constants'

export interface Length {
  value: number
  unit: Unit
}

export function convert(value: number, from: Unit, to: Unit, ppi: number): number {
  if (from === to) return value
  const mm = toMillimeters(value, from, ppi)
  return fromMillimeters(mm, to, ppi)
}

export function toMillimeters(value: number, unit: Unit, ppi: number): number {
  switch (unit) {
    case Unit.Millimeters: return value
    case Unit.Centimeters: return value * 10
    case Unit.Inches: return value * 25.4
    case Unit.Pixels: return (value / ppi) * 25.4
  }
}

export function fromMillimeters(mm: number, unit: Unit, ppi: number): number {
  switch (unit) {
    case Unit.Millimeters: return mm
    case Unit.Centimeters: return mm / 10
    case Unit.Inches: return mm / 25.4
    case Unit.Pixels: return (mm / 25.4) * ppi
  }
}

export function formatLength(value: number, unit: Unit, fraction?: number): string {
  const precision = getPrecision(value, unit)
  const rounded = roundToPrecision(value, precision)
  switch (unit) {
    case Unit.Centimeters: return `${rounded.toFixed(precision)} cm`
    case Unit.Millimeters: return `${Math.round(rounded)} mm`
    case Unit.Inches: {
      if (fraction && (fraction === 8 || fraction === 16 || fraction === 32)) {
        return formatInchFraction(rounded, fraction as 8 | 16 | 32)
      }
      return `${rounded.toFixed(precision)} in`
    }
    case Unit.Pixels: return `${Math.round(rounded)} px`
  }
}

export function formatLengthShort(value: number, unit: Unit): string {
  switch (unit) {
    case Unit.Centimeters: return `${value.toFixed(1)}cm`
    case Unit.Millimeters: return `${Math.round(value)}mm`
    case Unit.Inches: return `${value.toFixed(2)}"`
    case Unit.Pixels: return `${Math.round(value)}px`
  }
}

export function formatInchFraction(inches: number, denominator: 8 | 16 | 32): string {
  const whole = Math.floor(inches)
  const fractional = inches - whole
  if (fractional < ACCURACY_THRESHOLD_PX / 25.4) return `${whole}"`

  const numerator = Math.round(fractional * denominator)
  const gcd = greatestCommonDivisor(numerator, denominator)
  const simplifiedNum = numerator / gcd
  const simplifiedDen = denominator / gcd

  if (simplifiedNum >= simplifiedDen) return `${whole + 1}"`
  if (whole === 0) return `${simplifiedNum}/${simplifiedDen}"`
  return `${whole} ${simplifiedNum}/${simplifiedDen}"`
}

function getPrecision(value: number, unit: Unit): number {
  switch (unit) {
    case Unit.Centimeters: return value >= 10 ? 1 : 1
    case Unit.Millimeters: return 0
    case Unit.Inches: return value >= 10 ? 1 : 2
    case Unit.Pixels: return 0
  }
}

function roundToPrecision(value: number, precision: number): number {
  const factor = Math.pow(10, precision)
  return Math.round(value * factor) / factor
}

function greatestCommonDivisor(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b > 0) { const t = b; b = a % b; a = t }
  return a
}
