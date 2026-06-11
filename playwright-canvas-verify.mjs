import { chromium } from 'playwright'

const BASE = 'http://localhost:4321'

async function verifyCanvasTool(page, url, label, canvasSelector, mode) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForSelector(canvasSelector, { timeout: 10000 })

  const result = await page.evaluate(async ({ selector, actionMode }) => {
    const canvas = document.querySelector(selector)
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      return { ok: false, error: 'Canvas not found' }
    }

    const rect = canvas.getBoundingClientRect()
    if (rect.width <= 0 || rect.height <= 0) {
      return { ok: false, error: `Canvas has invalid size: ${rect.width}x${rect.height}` }
    }

    if (canvas.width <= 0 || canvas.height <= 0) {
      return { ok: false, error: `Canvas bitmap has invalid size: ${canvas.width}x${canvas.height}` }
    }

    if (actionMode === 'pixel-ruler') {
      const event = new MouseEvent('click', { clientX: 100, clientY: 100, bubbles: true })
      canvas.dispatchEvent(event)
    } else if (actionMode === 'protractor') {
      const event = new MouseEvent('click', {
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
        bubbles: true,
      })
      canvas.dispatchEvent(event)
    } else if (actionMode === 'l-square') {
      const event = new MouseEvent('click', {
        clientX: rect.left + 100,
        clientY: rect.top + 100,
        bubbles: true,
      })
      canvas.dispatchEvent(event)
    }

    return { ok: true, size: `${rect.width}x${rect.height}`, bitmap: `${canvas.width}x${canvas.height}` }
  }, { selector: canvasSelector, actionMode: mode })

  console.log(`${label}: ${result.ok ? 'PASS' : 'FAIL'} - ${result.size || result.bitmap || result.error}`)
  return result.ok
}

async function run() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()

  const results = []

  results.push(await verifyCanvasTool(page, `${BASE}/en/pixel-ruler/`, 'pixel-ruler', '#ruler-canvas', 'pixel-ruler'))
  results.push(await verifyCanvasTool(page, `${BASE}/en/protractor/`, 'protractor', '#protractor-canvas', 'protractor'))
  results.push(await verifyCanvasTool(page, `${BASE}/en/l-square/`, 'l-square', '#l-square-canvas', 'l-square'))
  results.push(await verifyCanvasTool(page, `${BASE}/en/measure-image/`, 'measure-image', '#measure-canvas', 'none'))

  await browser.close()

  const passed = results.filter(Boolean).length
  const total = results.length

  console.log(`\nCanvas verification: ${passed}/${total} tools passed`)
  if (passed !== total) {
    process.exit(1)
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
