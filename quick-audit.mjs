import { chromium } from 'playwright';

const BASE = 'http://localhost:4321';

async function main() {
  console.log('=== RulerKit Production Audit ===\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const results = [];
  
  async function test(url, label) {
    try {
      const start = Date.now();
      const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      const ms = Date.now() - start;
      const status = resp?.status() || 0;
      
      const title = await page.title();
      const h1 = await page.textContent('h1').catch(() => 'MISSING');
      const metaDesc = await page.$eval('meta[name="description"]', el => el.getAttribute('content')).catch(() => null);
      const canonical = await page.$eval('link[rel="canonical"]', el => el.getAttribute('href')).catch(() => null);
      const bodyLen = (await page.textContent('body') || '').length;
      const h2count = (await page.$$('h2')).length;
      const schemaCount = (await page.$$('script[type="application/ld+json"]')).length;
      const hasError = await page.$('text=ReferenceError, text=TypeError, text=An error occurred');

      const issues = [];
      if (status >= 400) issues.push(`HTTP ${status}`);
      if (hasError) issues.push('JS_ERROR');
      if (!title || title.length < 5 || title.includes('undefined')) issues.push('BAD_TITLE');
      if (!h1 || h1 === 'MISSING') issues.push('NO_H1');
      if (!metaDesc || metaDesc.length < 10) issues.push('NO_META');
      if (!canonical) issues.push('NO_CANONICAL');
      if (bodyLen < 200) issues.push(`SHORT(${bodyLen})`);
      if (h2count < 2) issues.push('FEW_H2');
      if (schemaCount === 0) issues.push('NO_SCHEMA');

      const ok = issues.length === 0;
      results.push({ label, ok, ms, status, issues });

      console.log(`  ${ok ? '✓' : '✗'} ${label.padEnd(35)} ${ms}ms  ${ok ? '' : '[' + issues.join(', ') + ']'}`);
    } catch (e) {
      results.push({ label, ok: false, ms: 0, status: 0, issues: [e.message.substring(0, 50)] });
      console.log(`  ✗ ${label.padEnd(35)} CRASHED: ${e.message.substring(0, 40)}`);
    }
  }

  const pages = [
    // Tool pages
    ...['ruler', 'pixel-ruler', 'protractor', 'printable-ruler', 'ring-sizer', 'l-square', 'measure-image', 'unit-converter'].map(t => [`${BASE}/en/${t}/`, t]),
    // Guide pages
    ...['screen-ruler', 'actual-size-ruler-guide', 'cm-ruler-online', 'inch-ruler-online', 'how-to-calibrate', 'how-to-measure-screen-size'].map(g => [`${BASE}/en/${g}/`, g]),
    // Static pages
    ...['faq', 'about', 'contact', 'privacy-policy', 'terms-and-conditions'].map(s => [`${BASE}/en/${s}/`, s]),
    // Conversion pages
    ...['cm-to-inches', 'inches-to-cm', 'cm-to-mm', 'pixels-to-inches', 'meters-to-feet'].map(c => [`${BASE}/en/convert/${c}/`, `conv:${c}`]),
    // Programmatic pages
    [`${BASE}/en/ruler-for/15-6-inch-laptop/`, 'ruler-for:15-6'],
    [`${BASE}/en/ring-size/ring-finger/`, 'ring-size:finger'],
    [`${BASE}/en/print/ruler-12-inches/`, 'print:ruler-12'],
    [`${BASE}/en/screen-specs/apple/iphone-15-pro-max/`, 'device:iphone15pm'],
    [`${BASE}/en/screen-specs/samsung/galaxy-s24-ultra/`, 'device:s24ultra'],
  ];

  for (const [url, label] of pages) {
    await test(url, label);
  }

  // Performance
  console.log('\n=== Performance ===');
  await page.goto(`${BASE}/en/ruler/`, { waitUntil: 'networkidle' });
  const perf = await page.evaluate(() => ({
    domReady: Math.round(performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd),
    load: Math.round(performance.getEntriesByType('navigation')[0].loadEventEnd),
    ttfb: Math.round(performance.getEntriesByType('navigation')[0].responseStart - performance.getEntriesByType('navigation')[0].requestStart),
  }));
  console.log(`  Ruler page: TTFB=${perf.ttfb}ms, DOMReady=${perf.domReady}ms, Load=${perf.load}ms`);

  // Summary
  const pass = results.filter(r => r.ok).length;
  const failCount = results.filter(r => !r.ok).length;
  const avg = Math.round(results.reduce((s, r) => s + r.ms, 0) / results.length);
  
  console.log(`\n=== RESULTS: ${pass} passed, ${failCount} failed, ${results.length} total ===`);
  console.log(`Average: ${avg}ms`);
  
  await browser.close();
  process.exit(failCount > 0 ? 1 : 0);
}

main();
