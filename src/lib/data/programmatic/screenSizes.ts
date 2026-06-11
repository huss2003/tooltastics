export interface ScreenSizeEntry {
  diagonalInches: number
  category: 'phone' | 'tablet' | 'laptop' | 'monitor' | 'tv'
  label: string
  description: string
  typicalResolution: string
}

export const SCREEN_SIZES: ScreenSizeEntry[] = [
  { diagonalInches: 4.7, category: 'phone', label: '4.7-inch Phone', description: 'Compact phone screens found on iPhone SE and similar small devices. Easy one-handed use with 326-460 PPI density.', typicalResolution: '750×1334' },
  { diagonalInches: 5.4, category: 'phone', label: '5.4-inch Phone', description: 'Mini flagship phone screens like iPhone 12/13 Mini. Compact form factor with high resolution in a small package.', typicalResolution: '1080×2340' },
  { diagonalInches: 6.1, category: 'phone', label: '6.1-inch Phone', description: 'Standard phone screens found on iPhone Pro, Pixel 7a, Galaxy S24. The most common modern phone screen size with excellent PPI.', typicalResolution: '1170×2532' },
  { diagonalInches: 6.2, category: 'phone', label: '6.2-inch Phone', description: 'Compact flagship phone screens like Galaxy S24 and Pixel 8. Offers high resolution in a manageable form factor.', typicalResolution: '1080×2340' },
  { diagonalInches: 6.7, category: 'phone', label: '6.7-inch Phone', description: 'Large phone screens found on iPhone Pro Max, Galaxy S24+, Pixel 8 Pro. Premium large-screen experience with 460-513 PPI.', typicalResolution: '1290×2796' },
  { diagonalInches: 6.8, category: 'phone', label: '6.8-inch Phone', description: 'Ultra-large phone screens like Galaxy S24 Ultra and S23 Ultra. The largest mainstream phone screens with QHD+ resolution.', typicalResolution: '1440×3120' },
  { diagonalInches: 7.6, category: 'phone', label: '7.6-inch Foldable Phone', description: 'Foldable phone inner screens like Galaxy Z Fold 5 and Pixel Fold. Tablet-sized display that folds to phone size.', typicalResolution: '1812×2176' },
  { diagonalInches: 8.3, category: 'tablet', label: '8.3-inch Tablet', description: 'Compact tablet screens like iPad Mini. Portable size great for reading and note-taking with 326 PPI.', typicalResolution: '1488×2266' },
  { diagonalInches: 10.5, category: 'tablet', label: '10.5-inch Tablet', description: 'Mid-size tablet screens for productivity and media consumption. Balances portability with screen real estate.', typicalResolution: '1668×2224' },
  { diagonalInches: 10.9, category: 'tablet', label: '10.9-inch Tablet', description: 'Standard tablet screens like iPad Air and iPad 10th gen. The most popular tablet size for general use and education.', typicalResolution: '1640×2360' },
  { diagonalInches: 11, category: 'tablet', label: '11-inch Tablet', description: 'Professional tablet screens like iPad Pro 11. High refresh rate with excellent color accuracy for creative work.', typicalResolution: '1668×2388' },
  { diagonalInches: 12.9, category: 'tablet', label: '12.9-inch Tablet', description: 'Large tablet screens like iPad Pro 12.9. Desktop-class screen real estate for professional creative workflows.', typicalResolution: '2048×2732' },
  { diagonalInches: 13.3, category: 'laptop', label: '13.3-inch Laptop', description: 'Compact laptop screens for ultraportables. Common in thin-and-light laptops with 1080p or higher resolution.', typicalResolution: '1920×1080' },
  { diagonalInches: 13.5, category: 'laptop', label: '13.5-inch Laptop', description: 'Microsoft Surface-format laptop screens with 3:2 aspect ratio. Extra vertical space for productivity applications.', typicalResolution: '2256×1504' },
  { diagonalInches: 13.6, category: 'laptop', label: '13.6-inch Laptop', description: 'MacBook Air 13-inch screens with Liquid Retina display. Excellent color accuracy with 224-227 PPI density.', typicalResolution: '1680×1050' },
  { diagonalInches: 14, category: 'laptop', label: '14-inch Laptop', description: 'Popular laptop screen size balancing portability and usability. Common in business and productivity laptops.', typicalResolution: '1920×1080' },
  { diagonalInches: 14.2, category: 'laptop', label: '14.2-inch Laptop', description: 'MacBook Pro 14-inch screen with Liquid Retina XDR. Pro-grade display with mini-LED backlighting and 254 PPI.', typicalResolution: '1512×1964' },
  { diagonalInches: 15, category: 'laptop', label: '15-inch Laptop', description: 'Surface Laptop 15-inch format with 3:2 aspect ratio. Extra screen height for documents and coding.', typicalResolution: '2496×1664' },
  { diagonalInches: 15.3, category: 'laptop', label: '15.3-inch Laptop', description: 'MacBook Air 15-inch screen offering larger display in a thin design. Ideal for users wanting more screen without Pro pricing.', typicalResolution: '1680×1050' },
  { diagonalInches: 15.6, category: 'laptop', label: '15.6-inch Laptop', description: 'Standard full-size laptop screens. The most common laptop size for gaming, productivity, and general use.', typicalResolution: '1920×1080' },
  { diagonalInches: 16, category: 'laptop', label: '16-inch Laptop', description: 'Large laptop screens for desktop replacement machines. Popular for gaming laptops and mobile workstations.', typicalResolution: '1920×1080' },
  { diagonalInches: 16.2, category: 'laptop', label: '16.2-inch Laptop', description: 'MacBook Pro 16-inch screen with Liquid Retina XDR. The largest MacBook display with pro reference quality.', typicalResolution: '1728×2232' },
  { diagonalInches: 17.3, category: 'laptop', label: '17.3-inch Laptop', description: 'Desktop replacement laptop screens. Maximum portable screen size for gaming laptops and mobile workstations.', typicalResolution: '1920×1080' },
  { diagonalInches: 21, category: 'monitor', label: '21-inch Monitor', description: 'Compact desktop monitor for small workspaces or secondary displays. Entry-level size for productivity and office work.', typicalResolution: '1920×1080' },
  { diagonalInches: 24, category: 'monitor', label: '24-inch Monitor', description: 'Standard desktop monitor size. The most common office monitor size with excellent PPI at 1080p or higher resolutions.', typicalResolution: '1920×1080' },
  { diagonalInches: 27, category: 'monitor', label: '27-inch Monitor', description: 'Popular large desktop monitor. Ideal for design work at 1440p or 4K resolution with 109-163 PPI density.', typicalResolution: '2560×1440' },
  { diagonalInches: 32, category: 'monitor', label: '32-inch Monitor', description: 'Large desktop monitor for immersive productivity and entertainment. Excellent at 4K with comfortable text scaling.', typicalResolution: '2560×1440' },
  { diagonalInches: 34, category: 'monitor', label: '34-inch Ultrawide Monitor', description: 'Ultrawide monitor for multitasking and immersive gaming. 21:9 aspect ratio provides extra horizontal screen space.', typicalResolution: '3440×1440' },
  { diagonalInches: 49, category: 'monitor', label: '49-inch Super Ultrawide', description: 'Super ultrawide monitors replacing dual-monitor setups. 32:9 aspect ratio with massive horizontal workspace.', typicalResolution: '5120×1440' },
  { diagonalInches: 42, category: 'tv', label: '42-inch TV', description: 'Compact TV size for bedrooms and small living rooms. Popular as a large desktop monitor for media consumption.', typicalResolution: '3840×2160' },
  { diagonalInches: 55, category: 'tv', label: '55-inch TV', description: 'Standard living room TV size. The most popular TV size for home entertainment with 4K resolution.', typicalResolution: '3840×2160' },
  { diagonalInches: 65, category: 'tv', label: '65-inch TV', description: 'Large living room TV for home theater setups. Immersive viewing experience with 4K or 8K resolution options.', typicalResolution: '3840×2160' },
  { diagonalInches: 75, category: 'tv', label: '75-inch TV', description: 'Extra-large TV for dedicated home theaters. Cinema-like experience requiring adequate viewing distance.', typicalResolution: '3840×2160' },
]

export function getScreenSize(diagonalInches: number): ScreenSizeEntry | undefined {
  return SCREEN_SIZES.find(s => s.diagonalInches === diagonalInches)
}

export function screenSizesByCategory(category: ScreenSizeEntry['category']): ScreenSizeEntry[] {
  return SCREEN_SIZES.filter(s => s.category === category)
}
