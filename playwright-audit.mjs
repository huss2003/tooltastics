import { chromium } from 'playwright';
import { performance } from 'perf_hooks';

const BASE = 'http://localhost:4321';
const LOCALES = ['en', 'es', 'de', 'fr', 'pt', 'it', 'ja', 'ko', 'ru', 'zh-CN'];

const PAGE_TYPES = {
  tools: ['ruler', 'pixel-ruler', 'protractor', 'printable-ruler', 'ring-sizer', 'l-square', 'measure-image', 'unit-converter'],
  guides: ['screen-ruler', 'actual-size-ruler-guide', 'cm-ruler-online', 'inch-ruler-online', 'how-to-calibrate', 'how-to-measure-screen-size'],
  static: ['faq', 'about', 'contact', 'privacy-policy', 'terms-and-conditions'],
  programmatic: {
    conversions: ['cm-to-inches', 'inches-to-cm', 'cm-to-mm', 'pixels-to-inches', 'meters-to-feet'],
    screenSizes: ['6-1-inch-phone', '15-6-inch-laptop', '27-inch-monitor'],
    ringSizes: ['ring-finger', 'womens-average', 'how-to-measure'],
    printables: ['ruler-12-inches', 'ruler-30-cm', 'protractor-180', 'ring-sizer'],
  }
};

const results = { passed: 0, failed: 0, errors: [], timings: {} };

async function testPage(page, url, label) {
  try {
    const start = performance.now();
    const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    const duration = Math.round(performance.now() - start);
    const status = resp?.status() || 0;

    if (status >= 400) {
      results.failed++;
      results.errors.push({ url, label, status, error: `HTTP ${status}` });
      console.log(`  ✗ ${label} — ${status} (${duration}ms)`);
      return;
    }

    // Check for common errors in page content
    const bodyText = await page.textContent('body') || '';
    if (bodyText.includes('ReferenceError') || bodyText.includes('TypeError') || bodyText.includes('SyntaxError')) {
      results.failed++;
      results.errors.push({ url, label, status, error: 'JS error in page' });
      console.log(`  ✗ ${label} — JS Error (${duration}ms)`);
      return;
    }

    // Check for heading
    const h1 = await page.$('h1');
    if (!h1) {
      results.failed++;
      results.errors.push({ url, label, status, error: 'No H1 tag' });
      console.log(`  ✗ ${label} — No H1 (${duration}ms)`);
      return;
    }

    // Check for meta description
    const metaDesc = await page.$('meta[name="description"]');
    if (metaDesc) {
      const content = await metaDesc.getAttribute('content');
      if (!content || content.length < 10 || content.includes('nameKey') || content.includes('descriptionKey')) {
        results.failed++;
        results.errors.push({ url, label, status, error: `Bad meta description: ${content?.substring(0, 50)}` });
        console.log(`  ✗ ${label} — Bad meta desc (${duration}ms)`);
        return;
      }
    }

    // Check for canonical
    const canonical = await page.$('link[rel="canonical"]');
    if (!canonical) {
      results.errors.push({ url, label, status, error: 'No canonical tag (warning)' });
      console.log(`  ⚠ ${label} — No canonical (${duration}ms)`);
    } else {
      console.log(`  ✓ ${label} — ${status} (${duration}ms)`);
    }

    results.passed++;
    results.timings[label] = duration;
  } catch (e) {
    results.failed++;
    results.errors.push({ url, label, status: 0, error: e.message?.substring(0, 100) });
    console.log(`  ✗ ${label} — CRASHED: ${e.message?.substring(0, 60)}`);
  }
}

async function run() {
  console.log('=== RulerKit Full App Audit ===\n');
  console.log(`Base URL: ${BASE}`);
  console.log(`Locales: ${LOCALES.length} (testing en only for speed)\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  // 1. Locale redirect
  const localeStart = performance.now();
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  const localeDuration = Math.round(performance.now() - localeStart);
  const localeUrl = page.url();
  console.log(`1. Locale Redirect: / → ${localeUrl.replace(BASE, '')} (${localeDuration}ms)`);

  // 2. Test all tool pages (en)
  console.log('\n2. Tool Pages:');
  for (const tool of PAGE_TYPES.tools) {
    await testPage(page, `${BASE}/en/${tool}/`, tool);
  }

  // 3. Test all guide pages (en)
  console.log('\n3. Guide Pages:');
  for (const guide of PAGE_TYPES.guides) {
    await testPage(page, `${BASE}/en/${guide}/`, guide);
  }

  // 4. Test static pages (en)
  console.log('\n4. Static Pages:');
  for (const s of PAGE_TYPES.static) {
    await testPage(page, `${BASE}/en/${s}/`, s);
  }

  // 5. Test programmatic pages (en)
  console.log('\n5. Conversion Pages:');
  for (const c of PAGE_TYPES.programmatic.conversions) {
    await testPage(page, `${BASE}/en/convert/${c}/`, `convert/${c}`);
  }

  console.log('\n6. Screen-Size Ruler Pages:');
  for (const s of PAGE_TYPES.programmatic.screenSizes) {
    await testPage(page, `${BASE}/en/ruler-for/${s}/`, `ruler-for/${s}`);
  }

  console.log('\n7. Ring Size Pages:');
  for (const r of PAGE_TYPES.programmatic.ringSizes) {
    await testPage(page, `${BASE}/en/ring-size/${r}/`, `ring-size/${r}`);
  }

  console.log('\n8. Printable Template Pages:');
  for (const p of PAGE_TYPES.programmatic.printables) {
    await testPage(page, `${BASE}/en/print/${p}/`, `print/${p}`);
  }

  // 9. Test screen-specs (first 3 devices)
  console.log('\n9. Device PPI Pages (sample):');
  const devices = [
    ['apple', 'iphone-15-pro-max'],
    ['samsung', 'galaxy-s24-ultra'],
    ['google', 'pixel-8-pro'],
    ['dell', 'xps-15'],
    ['generic', '27-inch-monitor-1440p'],
  ];
  for (const [brand, model] of devices) {
    await testPage(page, `${BASE}/en/screen-specs/${brand}/${model}/`, `screen-specs/${brand}/${model}`);
  }

  // 10. Test 404
  console.log('\n10. 404 Page:');
  await testPage(page, `${BASE}/en/nonexistent-page/`, '404');

  // 11. Test locale variations (homepage for each locale)
  console.log('\n11. Locale Variations (homepage):');
  for (const locale of LOCALES.slice(0, 3)) { // Test first 3
    await testPage(page, `${BASE}/${locale}/`, `home-${locale}`);
  }

  // 12. Performance metrics
  console.log('\n12. Performance Metrics:');
  await page.goto(`${BASE}/en/ruler/`, { waitUntil: 'networkidle' });
  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    return {
      domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart),
      domComplete: Math.round(nav.domComplete),
      loadEventEnd: Math.round(nav.loadEventEnd),
      responseEnd: Math.round(nav.responseEnd),
      transferSize: nav.transferSize,
      encodedBodySize: nav.encodedBodySize,
      decodedBodySize: nav.decodedBodySize,
    };
  });
  console.log(`  Ruler page metrics:`);
  console.log(`  DOM Content Loaded: ${metrics.domContentLoaded}ms`);
  console.log(`  DOM Complete: ${metrics.domComplete}ms`);
  console.log(`  Load Event End: ${metrics.loadEventEnd}ms`);
  console.log(`  Response End: ${metrics.responseEnd}ms`);
  console.log(`  Transfer Size: ${(metrics.transferSize / 1024).toFixed(1)} KB`);
  console.log(`  Encoded Body: ${(metrics.encodedBodySize / 1024).toFixed(1)} KB`);
  console.log(`  Decoded Body: ${(metrics.decodedBodySize / 1024).toFixed(1)} KB`);

  // 13. Screenshots
  console.log('\n13. Screenshots:');
  const screenshots = [
    ['en/', 'homepage'],
    ['en/ruler/', 'ruler-tool'],
    ['en/ring-sizer/', 'ring-sizer'],
    ['en/convert/cm-to-inches/', 'conversion-cm-to-inches'],
    ['en/screen-specs/apple/iphone-15-pro-max/', 'device-iphone-15-pro-max'],
    ['en/ring-size/ring-finger/', 'ring-size-ring-finger'],
    ['en/print/ruler-12-inches/', 'print-ruler-12-inches'],
    ['en/ruler-for/15-6-inch-laptop/', 'ruler-for-15-6-laptop'],
  ];
  for (const [path, name] of screenshots) {
    await page.goto(`${BASE}/${path}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
    console.log(`  ✓ ${name}.png`);
  }

  // Summary
  console.log(`\n=== Audit Complete ===`);
  console.log(`✓ Passed: ${results.passed}`);
  console.log(`✗ Failed: ${results.failed}`);
  
  if (results.errors.length > 0) {
    console.log(`\nErrors:`);
    for (const e of results.errors) {
      console.log(`  ${e.label}: ${e.error}`);
    }
  }

  // Timing summary
  console.log(`\n--- Timing Summary (fastest to slowest) ---`);
  const sorted = Object.entries(results.timings).sort((a, b) => a[1] - b[1]);
  for (const [label, time] of sorted) {
    console.log(`  ${label}: ${time}ms`);
  }

  await browser.close();
  process.exit(results.failed > 0 ? 1 : 0);
}

run();
