export interface RingSizeEntry {
  slug: string
  finger: string
  category: 'finger' | 'gender' | 'general'
  gender?: 'male' | 'female'
  averageSizeUs?: string
  averageSizeMm?: number
  diameterMm?: number
  description: string
  sizingTip: string
}

export const RING_SIZE_ENTRIES: RingSizeEntry[] = [
  { slug: 'ring-finger', finger: 'Ring Finger', category: 'finger', averageSizeUs: '7', averageSizeMm: 54.5, diameterMm: 17.3, description: 'The ring finger is the fourth finger on both hands. For most people, the ring finger on the dominant hand is slightly larger.', sizingTip: 'Measure the ring finger on your dominant hand if wearing on that hand, or the non-dominant hand for engagement rings.' },
  { slug: 'index-finger', finger: 'Index Finger', category: 'finger', averageSizeUs: '8', averageSizeMm: 56.5, diameterMm: 18.1, description: 'The index finger (pointer finger) is typically larger than the ring finger by 1-2 US sizes.', sizingTip: 'Your index finger is usually wider at the base than your ring finger. Always measure the specific finger you intend to wear the ring on.' },
  { slug: 'middle-finger', finger: 'Middle Finger', category: 'finger', averageSizeUs: '8.5', averageSizeMm: 57.9, diameterMm: 18.5, description: 'The middle finger is the longest and typically the largest finger, often 1-2 sizes larger than the ring finger.', sizingTip: 'The middle finger has a larger knuckle, so ensure the ring can pass over the knuckle while fitting snugly on the base.' },
  { slug: 'pinky', finger: 'Pinky Finger', category: 'finger', averageSizeUs: '4', averageSizeMm: 46.8, diameterMm: 14.9, description: 'The pinky finger is the smallest finger and typically requires much smaller ring sizes, often US 3-5.', sizingTip: 'Pinky rings should fit snugly but not tightly. The pinky tapers significantly, so a ring that fits the base may be loose near the tip.' },
  { slug: 'thumb', finger: 'Thumb', category: 'finger', averageSizeUs: '10', averageSizeMm: 64.4, diameterMm: 20.5, description: 'Thumb rings require much larger sizes as the thumb is significantly thicker than fingers, typically US 9-12.', sizingTip: 'The thumb has a very different shape from fingers—wider at the base and tapering differently. Use a thumb-specific sizer for accuracy.' },
  { slug: 'womens-average', finger: "Women's Average Ring Size", category: 'gender', gender: 'female', averageSizeUs: '6', averageSizeMm: 51.2, diameterMm: 16.3, description: "The average women's ring size in the US is US 6, with most women falling between US 5 and US 7.", sizingTip: "Women's ring sizes can vary significantly by finger and individual anatomy. Always measure the specific finger rather than relying on averages." },
  { slug: 'mens-average', finger: "Men's Average Ring Size", category: 'gender', gender: 'male', averageSizeUs: '9', averageSizeMm: 59.9, diameterMm: 19.1, description: "The average men's ring size in the US is US 9, with most men falling between US 8 and US 10.", sizingTip: "Men's ring sizes are typically larger, but individual variation is significant. Height and weight correlate with ring size but are not reliable predictors." },
  { slug: 'childrens-average', finger: "Children's Average Ring Size", category: 'gender', averageSizeUs: '4', averageSizeMm: 46.8, diameterMm: 14.9, description: "Children's ring sizes typically range from US 1 to US 5 depending on age and finger. Children's fingers grow quickly.", sizingTip: "Children's rings should be slightly looser to accommodate growth. Measure every 6-12 months for growing children." },
  { slug: 'how-to-measure', finger: 'How to Measure Ring Size', category: 'general', description: 'Measure ring size at home using a string, paper strip, or our online ring sizer tool. For best results, measure at the end of the day when fingers are warmest.', sizingTip: 'Measure your finger multiple times throughout the day. Fingers swell in heat and shrink in cold. Take the average of 3 measurements for the most accurate size.' },
  { slug: 'uk-us-conversion', finger: 'UK to US Ring Size Conversion', category: 'general', averageSizeUs: '7', averageSizeMm: 54.5, description: 'UK ring sizes differ from US sizes by approximately 1.5 sizes. A UK N is roughly a US 7. Always check conversion charts when buying internationally.', sizingTip: 'UK sizes use letters (A-Z), US sizes use numbers (1-13). UK sizing is more granular with half-letter increments available.' },
  { slug: 'eu-us-conversion', finger: 'EU to US Ring Size Conversion', category: 'general', averageSizeUs: '7', averageSizeMm: 54.5, description: 'EU ring sizes are based on inner circumference in millimeters. A EU 54 corresponds to US 7. EU sizes are the most precise as they use direct mm measurement.', sizingTip: 'EU sizes directly measure the inner circumference in mm. To convert: EU size ÷ π ≈ US size in diameter. Most accurate conversion method available.' },
]

export function getRingSizeEntry(slug: string): RingSizeEntry | undefined {
  return RING_SIZE_ENTRIES.find(e => e.slug === slug)
}

export function ringSizeEntriesByCategory(category: RingSizeEntry['category']): RingSizeEntry[] {
  return RING_SIZE_ENTRIES.filter(e => e.category === category)
}
