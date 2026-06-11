export interface ConversionPair {
  slug: string
  fromUnit: string
  toUnit: string
  fromLabel: string
  toLabel: string
  category: 'length' | 'digital' | 'all'
  formula: string
  description: string
}

export const CONVERSION_PAIRS: ConversionPair[] = [
  { slug: 'cm-to-inches', fromUnit: 'cm', toUnit: 'in', fromLabel: 'Centimeters', toLabel: 'Inches', category: 'length', formula: 'cm ÷ 2.54 = in', description: 'Convert centimeters to inches for general length measurements. Used in engineering, construction, and everyday measurements.' },
  { slug: 'inches-to-cm', fromUnit: 'in', toUnit: 'cm', fromLabel: 'Inches', toLabel: 'Centimeters', category: 'length', formula: 'in × 2.54 = cm', description: 'Convert inches to centimeters for metric system conversions. Common in international trade and scientific work.' },
  { slug: 'cm-to-mm', fromUnit: 'cm', toUnit: 'mm', fromLabel: 'Centimeters', toLabel: 'Millimeters', category: 'length', formula: 'cm × 10 = mm', description: 'Convert centimeters to millimeters within the metric system. Used in precision engineering and manufacturing.' },
  { slug: 'mm-to-cm', fromUnit: 'mm', toUnit: 'cm', fromLabel: 'Millimeters', toLabel: 'Centimeters', category: 'length', formula: 'mm ÷ 10 = cm', description: 'Convert millimeters to centimeters for scaling measurements up. Common in design and architecture.' },
  { slug: 'inches-to-mm', fromUnit: 'in', toUnit: 'mm', fromLabel: 'Inches', toLabel: 'Millimeters', category: 'length', formula: 'in × 25.4 = mm', description: 'Convert inches to millimeters for precision engineering. Essential for machining and 3D printing.' },
  { slug: 'mm-to-inches', fromUnit: 'mm', toUnit: 'in', fromLabel: 'Millimeters', toLabel: 'Inches', category: 'length', formula: 'mm ÷ 25.4 = in', description: 'Convert millimeters to inches for imperial system conversion. Used in hardware specifications and tool sizing.' },
  { slug: 'meters-to-feet', fromUnit: 'm', toUnit: 'ft', fromLabel: 'Meters', toLabel: 'Feet', category: 'length', formula: 'm × 3.281 = ft', description: 'Convert meters to feet for height and distance measurements. Common in real estate and construction.' },
  { slug: 'feet-to-meters', fromUnit: 'ft', toUnit: 'm', fromLabel: 'Feet', toLabel: 'Meters', category: 'length', formula: 'ft ÷ 3.281 = m', description: 'Convert feet to meters for international distance standards. Used in athletics and aviation.' },
  { slug: 'meters-to-cm', fromUnit: 'm', toUnit: 'cm', fromLabel: 'Meters', toLabel: 'Centimeters', category: 'length', formula: 'm × 100 = cm', description: 'Convert meters to centimeters for finer length resolution. Common in interior design and furniture measurements.' },
  { slug: 'cm-to-meters', fromUnit: 'cm', toUnit: 'm', fromLabel: 'Centimeters', toLabel: 'Meters', category: 'length', formula: 'cm ÷ 100 = m', description: 'Convert centimeters to meters for larger scale measurements. Used in surveying and room planning.' },
  { slug: 'km-to-miles', fromUnit: 'km', toUnit: 'mi', fromLabel: 'Kilometers', toLabel: 'Miles', category: 'length', formula: 'km ÷ 1.609 = mi', description: 'Convert kilometers to miles for distance conversion. Essential for travel and road trip planning.' },
  { slug: 'miles-to-km', fromUnit: 'mi', toUnit: 'km', fromLabel: 'Miles', toLabel: 'Kilometers', category: 'length', formula: 'mi × 1.609 = km', description: 'Convert miles to kilometers for international distance understanding. Common in running and cycling.' },
  { slug: 'feet-to-inches', fromUnit: 'ft', toUnit: 'in', fromLabel: 'Feet', toLabel: 'Inches', category: 'length', formula: 'ft × 12 = in', description: 'Convert feet to inches for finer imperial measurements. Used in carpentry and interior design.' },
  { slug: 'inches-to-feet', fromUnit: 'in', toUnit: 'ft', fromLabel: 'Inches', toLabel: 'Feet', category: 'length', formula: 'in ÷ 12 = ft', description: 'Convert inches to feet for larger scale measurements. Common in construction and material estimation.' },
  { slug: 'mm-to-meters', fromUnit: 'mm', toUnit: 'm', fromLabel: 'Millimeters', toLabel: 'Meters', category: 'length', formula: 'mm ÷ 1000 = m', description: 'Convert millimeters to meters for large-scale metric measurements. Used in civil engineering and architecture.' },
  { slug: 'meters-to-mm', fromUnit: 'm', toUnit: 'mm', fromLabel: 'Meters', toLabel: 'Millimeters', category: 'length', formula: 'm × 1000 = mm', description: 'Convert meters to millimeters for precision specifications. Essential in manufacturing tolerances.' },
  { slug: 'pixels-to-inches', fromUnit: 'px', toUnit: 'in', fromLabel: 'Pixels', toLabel: 'Inches', category: 'digital', formula: 'px ÷ PPI = in', description: 'Convert pixels to inches for screen and print design. Depends on screen PPI or print DPI settings.' },
  { slug: 'inches-to-pixels', fromUnit: 'in', toUnit: 'px', fromLabel: 'Inches', toLabel: 'Pixels', category: 'digital', formula: 'in × PPI = px', description: 'Convert inches to pixels for digital design and development. Essential for responsive web design and UI mockups.' },
  { slug: 'pixels-to-cm', fromUnit: 'px', toUnit: 'cm', fromLabel: 'Pixels', toLabel: 'Centimeters', category: 'digital', formula: 'px ÷ PPI × 2.54 = cm', description: 'Convert pixels to centimeters for mixed print-digital workflows. Useful when designing for both screen and print output.' },
  { slug: 'cm-to-pixels', fromUnit: 'cm', toUnit: 'px', fromLabel: 'Centimeters', toLabel: 'Pixels', category: 'digital', formula: 'cm ÷ 2.54 × PPI = px', description: 'Convert centimeters to pixels for translating physical measurements to digital design. Common in UI design.' },
  { slug: 'meters-to-yards', fromUnit: 'm', toUnit: 'yd', fromLabel: 'Meters', toLabel: 'Yards', category: 'length', formula: 'm × 1.094 = yd', description: 'Convert meters to yards for sports field and fabric measurements. Used in athletics and textiles.' },
  { slug: 'yards-to-meters', fromUnit: 'yd', toUnit: 'm', fromLabel: 'Yards', toLabel: 'Meters', category: 'length', formula: 'yd ÷ 1.094 = m', description: 'Convert yards to meters for international sports standardization. Common in track and field events.' },
  { slug: 'feet-to-cm', fromUnit: 'ft', toUnit: 'cm', fromLabel: 'Feet', toLabel: 'Centimeters', category: 'length', formula: 'ft × 30.48 = cm', description: 'Convert feet to centimeters for height measurements. Frequently used in medical and fitness contexts.' },
  { slug: 'cm-to-feet', fromUnit: 'cm', toUnit: 'ft', fromLabel: 'Centimeters', toLabel: 'Feet', category: 'length', formula: 'cm ÷ 30.48 = ft', description: 'Convert centimeters to feet for human height conversion. Common in personal profiles and medical records.' },
  { slug: 'yards-to-feet', fromUnit: 'yd', toUnit: 'ft', fromLabel: 'Yards', toLabel: 'Feet', category: 'length', formula: 'yd × 3 = ft', description: 'Convert yards to feet for construction and landscaping measurements. Used in material estimation.' },
  { slug: 'feet-to-yards', fromUnit: 'ft', toUnit: 'yd', fromLabel: 'Feet', toLabel: 'Yards', category: 'length', formula: 'ft ÷ 3 = yd', description: 'Convert feet to yards for larger construction measurements. Common in concrete and flooring calculations.' },
  { slug: 'km-to-meters', fromUnit: 'km', toUnit: 'm', fromLabel: 'Kilometers', toLabel: 'Meters', category: 'length', formula: 'km × 1000 = m', description: 'Convert kilometers to meters for precise distance breakdown. Used in running routes and geographical measurements.' },
  { slug: 'meters-to-km', fromUnit: 'm', toUnit: 'km', fromLabel: 'Meters', toLabel: 'Kilometers', category: 'length', formula: 'm ÷ 1000 = km', description: 'Convert meters to kilometers for expressing longer distances efficiently. Common in mapping and navigation.' },
]

export function getConversionPair(slug: string): ConversionPair | undefined {
  return CONVERSION_PAIRS.find(p => p.slug === slug)
}

export function conversionPairsByCategory(category: ConversionPair['category']): ConversionPair[] {
  return category === 'all' ? CONVERSION_PAIRS : CONVERSION_PAIRS.filter(p => p.category === category)
}
