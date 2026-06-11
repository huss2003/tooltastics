export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function deviceBrandSlug(brand: string): string {
  return slugify(brand)
}

export function deviceModelSlug(name: string): string {
  return slugify(name)
}

export function hyphenJoin(...parts: (string | number)[]): string {
  return parts.map(p => String(p).toLowerCase().replace(/\s+/g, '-')).join('-')
}
