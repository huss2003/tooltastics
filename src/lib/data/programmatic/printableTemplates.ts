export interface PrintableTemplate {
  slug: string
  name: string
  type: 'ruler' | 'protractor' | 'tape' | 'ring-sizer' | 'l-square'
  paperSize: string
  scale: string
  description: string
  items: string[]
}

export const PRINTABLE_TEMPLATES: PrintableTemplate[] = [
  { slug: 'ruler-12-inches', name: '12-Inch Printable Ruler', type: 'ruler', paperSize: 'US Letter', scale: '1:1 actual size', description: 'A full-length 12-inch ruler that prints at actual size on US Letter paper. Perfect for desk use and general measurements.', items: ['Inch markings with 1/16-inch graduations', '12-inch total length', 'US Letter paper size', 'Black on white for clear printing'] },
  { slug: 'ruler-30-cm', name: '30 cm Printable Ruler', type: 'ruler', paperSize: 'A4', scale: '1:1 actual size', description: 'A 30-centimeter ruler that prints at actual size on A4 paper. The standard metric ruler for classroom and office use.', items: ['Centimeter and millimeter markings', '30 cm total length', 'A4 paper size', 'Metric measurement system'] },
  { slug: 'ruler-6-inches', name: '6-Inch Printable Ruler', type: 'ruler', paperSize: 'US Letter or A4', scale: '1:1 actual size', description: 'A compact 6-inch pocket ruler that fits in any notebook. Prints on either US Letter or A4 paper.', items: ['Inch markings with 1/16-inch graduations', '6-inch total length', 'Compact pocket size', 'Fits in notebook or wallet'] },
  { slug: 'ruler-15-cm', name: '15 cm Printable Ruler', type: 'ruler', paperSize: 'US Letter or A4', scale: '1:1 actual size', description: 'A 15-centimeter ruler for quick metric measurements. Compact enough for pencil cases and desk organizers.', items: ['Centimeter and millimeter markings', '15 cm total length', 'Compact size for pencil cases', 'Basic metric measurement tool'] },
  { slug: 'ruler-cm-and-inches', name: 'Dual-Scale Printable Ruler (cm & inches)', type: 'ruler', paperSize: 'US Letter', scale: '1:1 actual size', description: 'A dual-scale ruler showing both centimeters and inches on the same edge. Essential for conversions and mixed-unit work.', items: ['cm scale on top edge', 'Inch scale on bottom edge', '30 cm / 12 inch total length', 'US Letter paper size'] },
  { slug: 'protractor-180', name: '180° Printable Protractor', type: 'protractor', paperSize: 'US Letter or A4', scale: '1:1 actual size', description: 'A standard 180-degree protractor for angle measurement. Prints at actual size for accurate geometry work.', items: ['0° to 180° in both directions', '1-degree increments', 'Center marker for vertex alignment', 'Clear semicircular design'] },
  { slug: 'protractor-360', name: '360° Printable Protractor', type: 'protractor', paperSize: 'US Letter or A4', scale: '1:1 actual size', description: 'A full-circle 360-degree protractor for advanced angle measurement. Ideal for navigation, surveying, and engineering.', items: ['0° to 360° full circle', '1-degree and 5-degree markings', 'Center point for alignment', 'Compass rose included'] },
  { slug: 'measuring-tape-60-inches', name: '60-Inch Printable Measuring Tape', type: 'tape', paperSize: 'Multiple sheets', scale: '1:1 actual size', description: 'A 60-inch (5-foot) flexible measuring tape that prints across multiple sheets. Perfect for body measurements and DIY projects.', items: ['60-inch total length (5 feet)', 'Inch and half-inch markings', 'Connectable strip design', 'Flexible paper tape format'] },
  { slug: 'measuring-tape-150-cm', name: '150 cm Printable Measuring Tape', type: 'tape', paperSize: 'Multiple sheets', scale: '1:1 actual size', description: 'A 150-centimeter (1.5 meter) flexible measuring tape in metric. Ideal for sewing, body measurements, and crafting.', items: ['150 cm total length (1.5 m)', 'Centimeter and half-cm markings', 'Connectable strip sections', 'Metric flexible tape format'] },
  { slug: 'ring-sizer', name: 'Printable Ring Sizer', type: 'ring-sizer', paperSize: 'US Letter or A4', scale: '1:1 actual size', description: 'A precision ring sizing strip that wraps around your finger. Includes US, UK, and EU size conversions on the same strip.', items: ['US sizes 3-13', 'UK sizes F-Z', 'EU sizes 44-72', 'Cut-and-wrap strip design'] },
  { slug: 'ring-sizer-mandrel', name: 'Printable Ring Mandrel', type: 'ring-sizer', paperSize: 'US Letter or A4', scale: '1:1 actual size', description: 'A printable ring mandrel showing diameter measurements for each size. Place existing rings over the circles to find their size.', items: ['Circles from US 3 to US 13', 'Diameter in mm for each size', 'US and EU conversion labels', 'Place ring over matching circle'] },
  { slug: 'l-square', name: 'Printable L-Square (Carpenter Square)', type: 'l-square', paperSize: 'US Letter', scale: '1:1 actual size', description: 'A 90-degree L-square for right angle verification and measurement. Essential for woodworking, drafting, and construction.', items: ['90-degree right angle', '6-inch along both arms', 'Inch markings on both arms', 'Perfect for squareness checking'] },
]

export function getPrintableTemplate(slug: string): PrintableTemplate | undefined {
  return PRINTABLE_TEMPLATES.find(t => t.slug === slug)
}

export function printableTemplatesByType(type: PrintableTemplate['type']): PrintableTemplate[] {
  return PRINTABLE_TEMPLATES.filter(t => t.type === type)
}
