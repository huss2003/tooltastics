export function getCanvasContext(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
): CanvasRenderingContext2D | null {
  const dpr = window.devicePixelRatio || 1
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.scale(dpr, dpr)
  }
  return ctx
}

export function toggleFullscreen(element?: Element): Promise<boolean> {
  if (document.fullscreenElement) {
    return document.exitFullscreen().then(() => false)
  }
  return (element ?? document.documentElement).requestFullscreen().then(() => true)
}

export function isFullscreen(): boolean {
  return !!document.fullscreenElement
}

export function onFullscreenChange(handler: (isFullscreen: boolean) => void): () => void {
  const listener = () => handler(isFullscreen())
  document.addEventListener('fullscreenchange', listener)
  return () => document.removeEventListener('fullscreenchange', listener)
}

export function getElementRect(el: Element): DOMRect | null {
  try {
    return el.getBoundingClientRect()
  } catch {
    return null
  }
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function prefersColorSchemeDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function prefersContrastMore(): boolean {
  return window.matchMedia('(prefers-contrast: more)').matches
}
