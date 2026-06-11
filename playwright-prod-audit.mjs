import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:4322';

async function verifyPage(page, url, label) {
  const start = performance.now();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
  const duration = Math.round(performance.now() - start);

  const title = await page.title();
  const h1 = await page.textContent('h1');
  const metaDesc = await page.$eval('meta[name="description"]', el => el.getAttribute('content')).catch(() => null);
  const canonical = await page.$eval('link[rel="canonical"]', el => el.getAttribute('href')).catch(() => null);
  const hreflangLinks = await page.$$eval('link[hreflang]', els => els.map(e => e.getAttribute('hreflang')));
  const bodyText = (await page.textContent('body')) || '';
  const errorText = bodyText.includes('Error') || bodyText.includes('ReferenceError');
  const headingTags = await page.$$eval('h1, h2, h3, h4', els => els.length);
  const schemaScripts = await page.$$eval('script[type="application/ld+json"]', els => els.length);
  
  const status = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    return {
      transferSize: Math.round((nav.transferSize || 0) / 1024 * 10) / 10,
      decodedBodySize: Math.round((nav.decodedBodySize || 0) / 1024 * 10) / 10,
      loadTime: Math.round(nav.loadEventEnd),
    };
  }).catch(() => ({ transferSize: 0, decodedBodySize: 0, loadTime: 0 }));

  const issues = [];
  if (!title || title.includes('Error') || title.length < 5) issues.push('BAD TITLE');
  if (!h1 || h1.includes('Error')) issues.push('NO H1');
  if (!metaDesc || metaDesc.length < 10) issues.push('BAD META DESC');
  if (!canonical) issues.push('NO CANONICAL');
  if (errorText) issues.push('PAGE ERROR');
  if (headingTags < 2) issues.push('FEW HEADINGS');
  if (bodyText.length < 200) issues.push('TOO SHORT');
  if (schemaScripts === 0) issues.push('NO SCHEMA');

  console.log(`  ${issues.length === 0 ? '✓' : '✗'} ${label.padEnd(35)} ${duration}ms  ${(title || '').substring(0, 50)}`);
  if (issues.length > 0) {
    console.log(`    Issues: ${issues.join(', ')}`);
  }

  return { label, issues, ok: issues.length === 0, duration, loadTime: status.loadTime, transferSize: status.transferSize };
}

async function run() {
  console.log('=== RulerKit Production Build Audit ===\n');
  console.log(`Server: ${BASE}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const results = [];
  let allOk = true;

  // 1. Homepage
  results.push(await verifyPage(page, `${BASE}/en/`, 'Homepage'));
  
  // 2. Tool pages
  for (const t of ['ruler', 'pixel-ruler', 'protractor', 'printable-ruler', 'ring-sizer', 'l-square', 'measure-image', 'unit-converter']) {
    results.push(await verifyPage(page, `${BASE}/en/${t}/`, t));
  }

  // 3. Guide pages
  for (const g of ['screen-ruler', 'actual-size-ruler-guide', 'cm-ruler-online', 'inch-ruler-online', 'how-to-calibrate', 'how-to-measure-screen-size']) {
    results.push(await verifyPage(page, `${BASE}/en/${g}/`, g));
  }

  // 4. Static pages
  for (const s of ['faq', 'about', 'contact', 'privacy-policy', 'terms-and-conditions']) {
    results.push(await verifyPage(page, `${BASE}/en/${s}/`, s));
  }

  // 5. Conversion pages
  for (const c of ['cm-to-inches', 'inches-to-cm', 'cm-to-mm', 'pixels-to-inches', 'meters-to-feet', 'mm-to-inches']) {
    results.push(await verifyPage(page, `${BASE}/en/convert/${c}/`, `convert/${c}`));
  }

  // 6. Screen-size ruler pages
  for (const s of ['6-1-inch-phone', '15-6-inch-laptop', '27-inch-monitor', '12-9-inch-tablet', '6-7-inch-phone']) {
    results.push(await verifyPage(page, `${BASE}/en/ruler-for/${s}/`, `ruler-for/${s}`));
  }

  // 7. Ring size pages
  for (const r of ['ring-finger', 'womens-average', 'mens-average', 'how-to-measure']) {
    results.push(await verifyPage(page, `${BASE}/en/ring-size/${r}/`, `ring-size/${r}`));
  }

  // 8. Printable template pages
  for (const p of ['ruler-12-inches', 'ruler-30-cm', 'protractor-180', 'ring-sizer', 'measuring-tape-60-inches']) {
    results.push(await verifyPage(page, `${BASE}/en/print/${p}/`, `print/${p}`));
  }

  // 9. Device PPI pages
  for (const [brand, model] of [['apple', 'iphone-15-pro-max'], ['samsung', 'galaxy-s24-ultra'], ['google', 'pixel-8-pro'], ['dell', 'dell-xps-15']]) {
    results.push(await verifyPage(page, `${BASE}/en/screen-specs/${brand}/${model}/`, `screen-specs/${brand}/${model}`));
  }

  // Summary
  const ok = results.filter(r => r.ok);
  const fail = results.filter(r => !r.ok);
  const avgDuration = Math.round(results.reduce((s, r) => s + r.duration, 0) / results.length);
  
  console.log(`\n=== Audit Summary ===`);
  console.log(`Total pages: ${results.length}`);
  console.log(`Pass: ${ok.length}, Fail: ${fail.length}`);
  console.log(`Average load time: ${avgDuration}ms`);

  const bySpeed = [...results].sort((a, b) => a.duration - b.duration);
  console.log(`\nFastest: ${bySpeed[0].label} (${bySpeed[0].duration}ms)`);
  console.log(`Slowest: ${bySpeed[bySpeed.length-1].label} (${bySpeed[bySpeed.length-1].duration}ms)`);

  if (fail.length > 0) {
    console.log(`\nFailed pages:`);
    fail.forEach(f => console.log(`  ${f.label}: ${f.issues?.join(', ')}`));
  }

  await browser.close();
}

run();
