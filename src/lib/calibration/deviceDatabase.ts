import type { DeviceEntry } from '@/types/measurement'

export const DEVICE_DATABASE: DeviceEntry[] = [
  // ── Apple iPhones ──
  { name: 'iPhone 15 Pro Max', brand: 'Apple', type: 'phone', widthPx: 1290, heightPx: 2796, diagonalInches: 6.7, ppi: 460 },
  { name: 'iPhone 15 Pro', brand: 'Apple', type: 'phone', widthPx: 1179, heightPx: 2556, diagonalInches: 6.1, ppi: 460 },
  { name: 'iPhone 15', brand: 'Apple', type: 'phone', widthPx: 1179, heightPx: 2556, diagonalInches: 6.1, ppi: 460 },
  { name: 'iPhone 14 Pro Max', brand: 'Apple', type: 'phone', widthPx: 1290, heightPx: 2796, diagonalInches: 6.7, ppi: 460 },
  { name: 'iPhone 14 Pro', brand: 'Apple', type: 'phone', widthPx: 1179, heightPx: 2556, diagonalInches: 6.1, ppi: 460 },
  { name: 'iPhone 14', brand: 'Apple', type: 'phone', widthPx: 1170, heightPx: 2532, diagonalInches: 6.1, ppi: 460 },
  { name: 'iPhone 13 Pro Max', brand: 'Apple', type: 'phone', widthPx: 1284, heightPx: 2778, diagonalInches: 6.7, ppi: 458 },
  { name: 'iPhone 13 Pro', brand: 'Apple', type: 'phone', widthPx: 1170, heightPx: 2532, diagonalInches: 6.1, ppi: 460 },
  { name: 'iPhone 13', brand: 'Apple', type: 'phone', widthPx: 1170, heightPx: 2532, diagonalInches: 6.1, ppi: 460 },
  { name: 'iPhone 13 Mini', brand: 'Apple', type: 'phone', widthPx: 1080, heightPx: 2340, diagonalInches: 5.4, ppi: 476 },
  { name: 'iPhone 12 Pro Max', brand: 'Apple', type: 'phone', widthPx: 1284, heightPx: 2778, diagonalInches: 6.7, ppi: 458 },
  { name: 'iPhone 12 Pro', brand: 'Apple', type: 'phone', widthPx: 1170, heightPx: 2532, diagonalInches: 6.1, ppi: 460 },
  { name: 'iPhone 12', brand: 'Apple', type: 'phone', widthPx: 1170, heightPx: 2532, diagonalInches: 6.1, ppi: 460 },
  { name: 'iPhone 12 Mini', brand: 'Apple', type: 'phone', widthPx: 1080, heightPx: 2340, diagonalInches: 5.4, ppi: 476 },
  { name: 'iPhone 11 Pro Max', brand: 'Apple', type: 'phone', widthPx: 1242, heightPx: 2688, diagonalInches: 6.5, ppi: 458 },
  { name: 'iPhone 11 Pro', brand: 'Apple', type: 'phone', widthPx: 1125, heightPx: 2436, diagonalInches: 5.8, ppi: 458 },
  { name: 'iPhone 11', brand: 'Apple', type: 'phone', widthPx: 828, heightPx: 1792, diagonalInches: 6.1, ppi: 326 },
  { name: 'iPhone SE (3rd gen)', brand: 'Apple', type: 'phone', widthPx: 750, heightPx: 1334, diagonalInches: 4.7, ppi: 326 },
  // ── Apple iPads ──
  { name: 'iPad Pro 12.9 (6th gen)', brand: 'Apple', type: 'tablet', widthPx: 2048, heightPx: 2732, diagonalInches: 12.9, ppi: 264 },
  { name: 'iPad Pro 11 (4th gen)', brand: 'Apple', type: 'tablet', widthPx: 1668, heightPx: 2388, diagonalInches: 11, ppi: 264 },
  { name: 'iPad Air (5th gen)', brand: 'Apple', type: 'tablet', widthPx: 1640, heightPx: 2360, diagonalInches: 10.9, ppi: 264 },
  { name: 'iPad (10th gen)', brand: 'Apple', type: 'tablet', widthPx: 1640, heightPx: 2360, diagonalInches: 10.9, ppi: 264 },
  { name: 'iPad (9th gen)', brand: 'Apple', type: 'tablet', widthPx: 1620, heightPx: 2160, diagonalInches: 10.2, ppi: 264 },
  { name: 'iPad Mini (6th gen)', brand: 'Apple', type: 'tablet', widthPx: 1488, heightPx: 2266, diagonalInches: 8.3, ppi: 326 },
  // ── Apple MacBooks ──
  { name: 'MacBook Pro 16 (M3)', brand: 'Apple', type: 'laptop', widthPx: 1728, heightPx: 2232, diagonalInches: 16.2, ppi: 254 },
  { name: 'MacBook Pro 14 (M3)', brand: 'Apple', type: 'laptop', widthPx: 1512, heightPx: 1964, diagonalInches: 14.2, ppi: 254 },
  { name: 'MacBook Air 15 (M3)', brand: 'Apple', type: 'laptop', widthPx: 1680, heightPx: 1050, diagonalInches: 15.3, ppi: 224 },
  { name: 'MacBook Air 13 (M3)', brand: 'Apple', type: 'laptop', widthPx: 1680, heightPx: 1050, diagonalInches: 13.6, ppi: 227 },
  // ── Samsung Phones ──
  { name: 'Galaxy S24 Ultra', brand: 'Samsung', type: 'phone', widthPx: 1440, heightPx: 3120, diagonalInches: 6.8, ppi: 501 },
  { name: 'Galaxy S24+', brand: 'Samsung', type: 'phone', widthPx: 1440, heightPx: 3120, diagonalInches: 6.7, ppi: 513 },
  { name: 'Galaxy S24', brand: 'Samsung', type: 'phone', widthPx: 1080, heightPx: 2340, diagonalInches: 6.2, ppi: 416 },
  { name: 'Galaxy S23 Ultra', brand: 'Samsung', type: 'phone', widthPx: 1440, heightPx: 3088, diagonalInches: 6.8, ppi: 500 },
  { name: 'Galaxy S23+', brand: 'Samsung', type: 'phone', widthPx: 1080, heightPx: 2340, diagonalInches: 6.6, ppi: 393 },
  { name: 'Galaxy S23', brand: 'Samsung', type: 'phone', widthPx: 1080, heightPx: 2340, diagonalInches: 6.1, ppi: 422 },
  { name: 'Galaxy S22 Ultra', brand: 'Samsung', type: 'phone', widthPx: 1440, heightPx: 3088, diagonalInches: 6.8, ppi: 500 },
  { name: 'Galaxy S22+', brand: 'Samsung', type: 'phone', widthPx: 1080, heightPx: 2340, diagonalInches: 6.6, ppi: 393 },
  { name: 'Galaxy S22', brand: 'Samsung', type: 'phone', widthPx: 1080, heightPx: 2340, diagonalInches: 6.1, ppi: 422 },
  { name: 'Galaxy Z Fold 5', brand: 'Samsung', type: 'phone', widthPx: 1812, heightPx: 2176, diagonalInches: 7.6, ppi: 374 },
  { name: 'Galaxy Z Flip 5', brand: 'Samsung', type: 'phone', widthPx: 1080, heightPx: 2640, diagonalInches: 6.7, ppi: 425 },
  // ── Samsung Tablets ──
  { name: 'Galaxy Tab S9 Ultra', brand: 'Samsung', type: 'tablet', widthPx: 1848, heightPx: 2960, diagonalInches: 14.6, ppi: 266 },
  { name: 'Galaxy Tab S9+', brand: 'Samsung', type: 'tablet', widthPx: 1752, heightPx: 2800, diagonalInches: 12.4, ppi: 266 },
  { name: 'Galaxy Tab S9', brand: 'Samsung', type: 'tablet', widthPx: 1600, heightPx: 2560, diagonalInches: 11, ppi: 274 },
  // ── Google Pixel ──
  { name: 'Pixel 8 Pro', brand: 'Google', type: 'phone', widthPx: 1344, heightPx: 2992, diagonalInches: 6.7, ppi: 489 },
  { name: 'Pixel 8', brand: 'Google', type: 'phone', widthPx: 1080, heightPx: 2400, diagonalInches: 6.2, ppi: 428 },
  { name: 'Pixel 7 Pro', brand: 'Google', type: 'phone', widthPx: 1440, heightPx: 3120, diagonalInches: 6.7, ppi: 512 },
  { name: 'Pixel 7', brand: 'Google', type: 'phone', widthPx: 1080, heightPx: 2400, diagonalInches: 6.3, ppi: 416 },
  { name: 'Pixel 7a', brand: 'Google', type: 'phone', widthPx: 1080, heightPx: 2400, diagonalInches: 6.1, ppi: 429 },
  { name: 'Pixel 6 Pro', brand: 'Google', type: 'phone', widthPx: 1440, heightPx: 3120, diagonalInches: 6.7, ppi: 512 },
  { name: 'Pixel 6', brand: 'Google', type: 'phone', widthPx: 1080, heightPx: 2400, diagonalInches: 6.4, ppi: 411 },
  { name: 'Pixel Fold', brand: 'Google', type: 'phone', widthPx: 1840, heightPx: 2208, diagonalInches: 7.6, ppi: 373 },
  // ── OnePlus ──
  { name: 'OnePlus 12', brand: 'OnePlus', type: 'phone', widthPx: 1440, heightPx: 3168, diagonalInches: 6.82, ppi: 510 },
  { name: 'OnePlus 11', brand: 'OnePlus', type: 'phone', widthPx: 1440, heightPx: 3216, diagonalInches: 6.7, ppi: 525 },
  { name: 'OnePlus Open', brand: 'OnePlus', type: 'phone', widthPx: 2268, heightPx: 2440, diagonalInches: 7.82, ppi: 426 },
  // ── Xiaomi ──
  { name: 'Xiaomi 14 Pro', brand: 'Xiaomi', type: 'phone', widthPx: 1440, heightPx: 3200, diagonalInches: 6.73, ppi: 522 },
  { name: 'Xiaomi 13 Pro', brand: 'Xiaomi', type: 'phone', widthPx: 1440, heightPx: 3200, diagonalInches: 6.73, ppi: 522 },
  { name: 'Xiaomi Pad 6', brand: 'Xiaomi', type: 'tablet', widthPx: 1800, heightPx: 2880, diagonalInches: 11, ppi: 309 },
  // ── Microsoft ──
  { name: 'Surface Laptop 5 15', brand: 'Microsoft', type: 'laptop', widthPx: 2496, heightPx: 1664, diagonalInches: 15, ppi: 201 },
  { name: 'Surface Laptop 5 13.5', brand: 'Microsoft', type: 'laptop', widthPx: 2256, heightPx: 1504, diagonalInches: 13.5, ppi: 201 },
  { name: 'Surface Laptop Studio', brand: 'Microsoft', type: 'laptop', widthPx: 2400, heightPx: 1600, diagonalInches: 14.4, ppi: 201 },
  { name: 'Surface Pro 9', brand: 'Microsoft', type: 'tablet', widthPx: 2880, heightPx: 1920, diagonalInches: 13, ppi: 267 },
  // ── Dell Laptops ──
  { name: 'Dell XPS 15', brand: 'Dell', type: 'laptop', widthPx: 3456, heightPx: 2160, diagonalInches: 15.6, ppi: 262 },
  { name: 'Dell XPS 13', brand: 'Dell', type: 'laptop', widthPx: 1920, heightPx: 1200, diagonalInches: 13.4, ppi: 169 },
  { name: 'Dell Inspiron 16', brand: 'Dell', type: 'laptop', widthPx: 1920, heightPx: 1200, diagonalInches: 16, ppi: 141 },
  // ── Lenovo Laptops ──
  { name: 'Lenovo ThinkPad X1 Carbon', brand: 'Lenovo', type: 'laptop', widthPx: 1920, heightPx: 1200, diagonalInches: 14, ppi: 162 },
  { name: 'Lenovo ThinkPad T14s', brand: 'Lenovo', type: 'laptop', widthPx: 1920, heightPx: 1080, diagonalInches: 14, ppi: 157 },
  { name: 'Lenovo Yoga 9i', brand: 'Lenovo', type: 'laptop', widthPx: 2880, heightPx: 1800, diagonalInches: 14, ppi: 243 },
  // ── HP Laptops ──
  { name: 'HP Spectre x360 14', brand: 'HP', type: 'laptop', widthPx: 2880, heightPx: 1800, diagonalInches: 14, ppi: 243 },
  { name: 'HP Envy 16', brand: 'HP', type: 'laptop', widthPx: 2560, heightPx: 1600, diagonalInches: 16, ppi: 189 },
  { name: 'HP Pavilion 15', brand: 'HP', type: 'laptop', widthPx: 1920, heightPx: 1080, diagonalInches: 15.6, ppi: 141 },
  // ── ASUS Laptops ──
  { name: 'ASUS ROG Zephyrus G16', brand: 'ASUS', type: 'laptop', widthPx: 2560, heightPx: 1600, diagonalInches: 16, ppi: 189 },
  { name: 'ASUS ZenBook 14', brand: 'ASUS', type: 'laptop', widthPx: 1920, heightPx: 1200, diagonalInches: 14, ppi: 162 },
  // ── Generic Laptops ──
  { name: '13.3-inch Laptop (1080p)', brand: 'Generic', type: 'laptop', widthPx: 1920, heightPx: 1080, diagonalInches: 13.3, ppi: 166 },
  { name: '14-inch Laptop (1080p)', brand: 'Generic', type: 'laptop', widthPx: 1920, heightPx: 1080, diagonalInches: 14, ppi: 157 },
  { name: '15.6-inch Laptop (1080p)', brand: 'Generic', type: 'laptop', widthPx: 1920, heightPx: 1080, diagonalInches: 15.6, ppi: 141 },
  { name: '15.6-inch Laptop (4K)', brand: 'Generic', type: 'laptop', widthPx: 3840, heightPx: 2160, diagonalInches: 15.6, ppi: 282 },
  { name: '16-inch Laptop (1080p)', brand: 'Generic', type: 'laptop', widthPx: 1920, heightPx: 1080, diagonalInches: 16, ppi: 138 },
  // ── Generic Monitors ──
  { name: '24-inch Monitor (1080p)', brand: 'Generic', type: 'monitor', widthPx: 1920, heightPx: 1080, diagonalInches: 24, ppi: 92 },
  { name: '27-inch Monitor (1080p)', brand: 'Generic', type: 'monitor', widthPx: 1920, heightPx: 1080, diagonalInches: 27, ppi: 82 },
  { name: '27-inch Monitor (1440p)', brand: 'Generic', type: 'monitor', widthPx: 2560, heightPx: 1440, diagonalInches: 27, ppi: 109 },
  { name: '27-inch Monitor (4K)', brand: 'Generic', type: 'monitor', widthPx: 3840, heightPx: 2160, diagonalInches: 27, ppi: 163 },
  { name: '32-inch Monitor (1440p)', brand: 'Generic', type: 'monitor', widthPx: 2560, heightPx: 1440, diagonalInches: 32, ppi: 92 },
  { name: '32-inch Monitor (4K)', brand: 'Generic', type: 'monitor', widthPx: 3840, heightPx: 2160, diagonalInches: 32, ppi: 140 },
  { name: '34-inch Ultrawide (1440p)', brand: 'Generic', type: 'monitor', widthPx: 3440, heightPx: 1440, diagonalInches: 34, ppi: 110 },
  // ── Branded Monitors ──
  { name: 'LG 27GP950 4K', brand: 'LG', type: 'monitor', widthPx: 3840, heightPx: 2160, diagonalInches: 27, ppi: 163 },
  { name: 'Dell U2723QE 4K', brand: 'Dell', type: 'monitor', widthPx: 3840, heightPx: 2160, diagonalInches: 27, ppi: 163 },
  { name: 'Samsung Odyssey G7', brand: 'Samsung', type: 'monitor', widthPx: 2560, heightPx: 1440, diagonalInches: 27, ppi: 109 },
]

export function findDevice(widthPx: number, heightPx: number): DeviceEntry | undefined {
  const ratio = widthPx / heightPx
  const tolerance = 0.05
  for (const device of DEVICE_DATABASE) {
    const deviceRatio = device.widthPx / device.heightPx
    if (Math.abs(deviceRatio - ratio) < tolerance) return device
  }
  return undefined
}

export function getDeviceByBrand(brand: string): DeviceEntry[] {
  return DEVICE_DATABASE.filter(d => d.brand.toLowerCase() === brand.toLowerCase())
}

export function getDeviceByBrandAndModel(brand: string, modelSlug: string): DeviceEntry | undefined {
  return DEVICE_DATABASE.find(d => {
    const dBrand = d.brand.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/--+/g, '-')
    const dModel = d.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/--+/g, '-')
    return dBrand === brand.toLowerCase() && dModel === modelSlug
  })
}

export function getUniqueBrands(): string[] {
  return [...new Set(DEVICE_DATABASE.map(d => d.brand))]
}
