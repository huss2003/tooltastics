import { Unit } from './constants'

export interface ToolConfig {
  slug: string
  nameKey: string
  descriptionKey: string
  shortDescriptionKey: string
  icon: string
  defaultUnit: Unit
  supportedUnits: Unit[]
  metaTitleKey: string
  metaDescriptionKey: string
  schemaType: 'WebApplication' | 'HowTo'
}

export const TOOLS: ToolConfig[] = [
  {
    slug: 'online-ruler',
    nameKey: 'tools.ruler.name',
    descriptionKey: 'tools.ruler.description',
    shortDescriptionKey: 'tools.ruler.shortDescription',
    icon: 'ruler',
    defaultUnit: Unit.Centimeters,
    supportedUnits: [Unit.Centimeters, Unit.Millimeters, Unit.Inches],
    metaTitleKey: 'tools.ruler.metaTitle',
    metaDescriptionKey: 'tools.ruler.metaDescription',
    schemaType: 'WebApplication',
  },
  {
    slug: 'pixel-ruler',
    nameKey: 'tools.pixelRuler.name',
    descriptionKey: 'tools.pixelRuler.description',
    shortDescriptionKey: 'tools.pixelRuler.shortDescription',
    icon: 'pixel-ruler',
    defaultUnit: Unit.Pixels,
    supportedUnits: [Unit.Pixels, Unit.Centimeters, Unit.Inches],
    metaTitleKey: 'tools.pixelRuler.metaTitle',
    metaDescriptionKey: 'tools.pixelRuler.metaDescription',
    schemaType: 'WebApplication',
  },
  {
    slug: 'protractor',
    nameKey: 'tools.protractor.name',
    descriptionKey: 'tools.protractor.description',
    shortDescriptionKey: 'tools.protractor.shortDescription',
    icon: 'protractor',
    defaultUnit: Unit.Centimeters,
    supportedUnits: [Unit.Centimeters, Unit.Inches],
    metaTitleKey: 'tools.protractor.metaTitle',
    metaDescriptionKey: 'tools.protractor.metaDescription',
    schemaType: 'WebApplication',
  },
  {
    slug: 'printable-ruler',
    nameKey: 'tools.printableRuler.name',
    descriptionKey: 'tools.printableRuler.description',
    shortDescriptionKey: 'tools.printableRuler.shortDescription',
    icon: 'printable',
    defaultUnit: Unit.Inches,
    supportedUnits: [Unit.Inches, Unit.Centimeters],
    metaTitleKey: 'tools.printableRuler.metaTitle',
    metaDescriptionKey: 'tools.printableRuler.metaDescription',
    schemaType: 'WebApplication',
  },
  {
    slug: 'ring-sizer',
    nameKey: 'tools.ringSizer.name',
    descriptionKey: 'tools.ringSizer.description',
    shortDescriptionKey: 'tools.ringSizer.shortDescription',
    icon: 'ring',
    defaultUnit: Unit.Millimeters,
    supportedUnits: [Unit.Millimeters, Unit.Centimeters, Unit.Inches],
    metaTitleKey: 'tools.ringSizer.metaTitle',
    metaDescriptionKey: 'tools.ringSizer.metaDescription',
    schemaType: 'HowTo',
  },
  {
    slug: 'l-square',
    nameKey: 'tools.lSquare.name',
    descriptionKey: 'tools.lSquare.description',
    shortDescriptionKey: 'tools.lSquare.shortDescription',
    icon: 'l-square',
    defaultUnit: Unit.Centimeters,
    supportedUnits: [Unit.Centimeters, Unit.Inches, Unit.Pixels],
    metaTitleKey: 'tools.lSquare.metaTitle',
    metaDescriptionKey: 'tools.lSquare.metaDescription',
    schemaType: 'WebApplication',
  },
  {
    slug: 'measure-image',
    nameKey: 'tools.measureImage.name',
    descriptionKey: 'tools.measureImage.description',
    shortDescriptionKey: 'tools.measureImage.shortDescription',
    icon: 'measure-image',
    defaultUnit: Unit.Centimeters,
    supportedUnits: [Unit.Centimeters, Unit.Inches, Unit.Millimeters, Unit.Pixels],
    metaTitleKey: 'tools.measureImage.metaTitle',
    metaDescriptionKey: 'tools.measureImage.metaDescription',
    schemaType: 'WebApplication',
  },
  {
    slug: 'unit-converter',
    nameKey: 'tools.unitConverter.name',
    descriptionKey: 'tools.unitConverter.description',
    shortDescriptionKey: 'tools.unitConverter.shortDescription',
    icon: 'converter',
    defaultUnit: Unit.Centimeters,
    supportedUnits: [Unit.Centimeters, Unit.Millimeters, Unit.Inches, Unit.Pixels],
    metaTitleKey: 'tools.unitConverter.metaTitle',
    metaDescriptionKey: 'tools.unitConverter.metaDescription',
    schemaType: 'WebApplication',
  },
]

export function getTool(slug: string): ToolConfig | undefined {
  return TOOLS.find((t) => t.slug === slug)
}
