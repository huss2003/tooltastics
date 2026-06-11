export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function roundToNearest(value: number, nearest: number): number {
  return Math.round(value / nearest) * nearest
}

export function floorToNearest(value: number, nearest: number): number {
  return Math.floor(value / nearest) * nearest
}

export function ceilToNearest(value: number, nearest: number): number {
  return Math.ceil(value / nearest) * nearest
}

export function pixelsToMM(pixels: number, ppi: number): number {
  return (pixels / ppi) * 25.4
}

export function mmToPixels(mm: number, ppi: number): number {
  return (mm / 25.4) * ppi
}

export function pixelsToInches(pixels: number, ppi: number): number {
  return pixels / ppi
}

export function inchesToPixels(inches: number, ppi: number): number {
  return inches * ppi
}

export function pixelsToCM(pixels: number, ppi: number): number {
  return pixelsToMM(pixels, ppi) / 10
}

export function cmToPixels(cm: number, ppi: number): number {
  return mmToPixels(cm * 10, ppi)
}

export function diagonalInPixels(widthPx: number, heightPx: number): number {
  return Math.sqrt(widthPx * widthPx + heightPx * heightPx)
}

export function calculatePPI(
  widthPx: number,
  heightPx: number,
  diagonalInches: number,
): number {
  if (diagonalInches <= 0) return 96
  const diagPx = diagonalInPixels(widthPx, heightPx)
  return diagPx / diagonalInches
}

export function precisionOf(value: number): number {
  if (value >= 10) return 1
  if (value >= 1) return 0.1
  if (value >= 0.1) return 0.01
  return 0.001
}
