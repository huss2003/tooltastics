export type Locale = 'en' | 'es' | 'de' | 'fr' | 'pt' | 'it' | 'ja' | 'ko' | 'ru' | 'zh-CN'

export enum Unit {
  Centimeters = 'cm',
  Millimeters = 'mm',
  Inches = 'in',
  Pixels = 'px',
}

export enum Orientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export enum CalibrationMethod {
  AutoDetect = 'auto-detect',
  Diagonal = 'diagonal',
  CreditCard = 'credit-card',
}

export enum InchFraction {
  Eighth = 8,
  Sixteenth = 16,
  ThirtySecond = 32,
}

export enum Theme {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export enum InteractionMode {
  Measure = 'measure',
  Mark = 'mark',
  Pan = 'pan',
  None = 'none',
}

export const RULER_MAX_LENGTH_CM = 50
export const RULER_MAX_LENGTH_IN = 20
export const CREDIT_CARD_WIDTH_MM = 85.6
export const CREDIT_CARD_WIDTH_IN = 3.37
export const DEFAULT_PPI = 96
export const STORAGE_PREFIX = 'rulerkit:'
export const ACCURACY_THRESHOLD_PX = 0.5
