import { chromium } from 'playwright';
import { exec } from 'child_process';
import { performance } from 'perf_hooks';

const PORT = 4321;
const BASE = `http://localhost:${PORT}`;

function startServer() {
  return new Promise((resolve, reject) => {
    const proc = exec(
      `npx astro dev --host 0.0.0.0 --port ${PORT}`,
      { cwd: 'C:\\Users\\Admin\\Desktop\\100 Sites\\Ruler', maxBuffer: 1024 * 1024 },
      (err) => { if (err && err.killed !== true) console.error('Server exited:', err.message); }
    );

    let started = false;
    const timeout = setTimeout(() => {
      if (!started) { proc.kill(); reject(new Error('Server start timeout')); }
    }, 30000);

    proc.stdout.on('data', (data) => {
      const text = data.toString();
      if (!started && text.includes('ready')) {
        started = true;
        clearTimeout(timeout);
        setTimeout(() => resolve(proc), 1500);
      }
    });

    proc.stderr.on('data', (data) => {
      const text = data.toString();
      if (text.includes('Error') || text.includes('error')) console.error('  [server]', text.trim());
    });

    proc.on('error', reject);
  });
}

async function audit() {
  console.log('Starting dev server...');
  const server = await startServer();
  console.log('Dev server ready!\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const allResults = [];

  async function test(url, label) {
    const start = performance.now();
    try {
      const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      const duration = Math.round(performance.now() - start);
      const status = resp?.status() || 0;

      const title = await page.title();
      const h1 = await page.textContent('h1').catch(() => null);
      const metaDesc = await page.$eval('meta[name="description"]', el => el.getAttribute('content')).catch(() => null);
      const canonical = await page.$eval('link[rel="canonical"]', el => el.getAttribute('href')).catch(() => null);
      const bodyText = await page.textContent('body').catch(() => '');

      const issues = [];
      if (!title || title.includes('Error')) issues.push('title');
      if (!h1 || h1.includes('Error')) issues.push('h1');
      if (!metaDesc || metaDesc.length < 10) issues.push('meta');
      if (!canonical) issues.push('canonical');
      if (bodyText.length < 100) issues.push('short');

      const ok = issues.length === 0;
      allResults.push({ label, ok, duration, issues, status, title });
      
      if (ok) {
        console.log(`  ✓ ${label.padEnd(35)} ${duration}ms`);
      } else {
        console.log(`  ✗ ${label.padEnd(35)} ${duration}ms [${issues.join(',')}]`);
      }
    } catch (e) {
      allResults.push({ label, ok: false, duration: 0, issues: ['crashed'], status: 0, title: e.message.substring(0, 50) });
      console.log(`  ✗ ${label.padEnd(35)} CRASHED: ${e.message.substring(0, 40)}`);
    }
  }

  // Collect all pages to test
  const tools = ['ruler', 'pixel-ruler', 'protractor', 'printable-ruler', 'ring-sizer', 'l-square', 'measure-image', 'unit-converter'];
  const guides = ['screen-ruler', 'actual-size-ruler-guide', 'cm-ruler-online', 'inch-ruler-online', 'how-to-calibrate', 'how-to-measure-screen-size'];
  const statics = ['faq', 'about', 'contact', 'privacy-policy', 'terms-and-conditions'];
  const conversions = ['cm-to-inches', 'inches-to-cm', 'cm-to-mm', 'pixels-to-inches', 'meters-to-feet', 'mm-to-inches'];
  const screenSizes = ['6-1-inch-phone', '15-6-inch-laptop', '27-inch-monitor', '12-9-inch-tablet'];
  const ringSizes = ['ring-finger', 'womens-average', 'mens-average', 'how-to-measure'];
  const printables = ['ruler-12-inches', 'ruler-30-cm', 'protractor-180', 'ring-sizer', 'measuring-tape-60-inches'];
  const devices = [['apple', 'iphone-15-pro-max'], ['samsung', 'galaxy-s24-ultra'], ['google', 'pixel-8-pro']];

  console.log('1. Homepage');
  await test(`${BASE}/en/`, 'homepage');

  console.log('\n2. Tool Pages');
  for (const t of tools) await test(`${BASE}/en/${t}/`, t);

  console.log('\n3. Guide Pages');
  for (const g of guides) await test(`${BASE}/en/${g}/`, g);

  console.log('\n4. Static Pages');
  for (const s of statics) await test(`${BASE}/en/${s}/`, s);

  console.log('\n5. Conversion Pages');
  for (const c of conversions) await test(`${BASE}/en/convert/${c}/`, `convert/${c}`);

  console.log('\n6. Screen-Size Pages');
  for (const s of screenSizes) await test(`${BASE}/en/ruler-for/${s}/`, `ruler-for/${s}`);

  console.log('\n7. Ring Size Pages');
  for (const r of ringSizes) await test(`${BASE}/en/ring-size/${r}/`, `ring-size/${r}`);

  console.log('\n8. Printable Pages');
  for (const p of printables) await test(`${BASE}/en/print/${p}/`, `print/${p}`);

  console.log('\n9. Device PPI Pages');
  for (const [b, m] of devices) await test(`${BASE}/en/screen-specs/${b}/${m}/`, `screen-specs/${b}/${m}`);

  // Performance
  console.log('\n10. Performance (ruler page)');
  await page.goto(`${BASE}/en/ruler/`, { waitUntil: 'networkidle' });
  const navTiming = await page.evaluate(() => {
    const n = performance.getEntriesByType('navigation')[0];
    return {
      ttfb: Math.round(n.responseStart - n.requestStart),
      domReady: Math.round(n.domContentLoadedEventEnd),
      load: Math.round(n.loadEventEnd),
      bytes: n.transferSize || 0,
    };
  }).catch(() => ({}));

  // Summary
  const pass = allResults.filter(r => r.ok);
  const fail = allResults.filter(r => !r.ok);
  const avg = Math.round(allResults.filter(r => r.duration > 0).reduce((s, r) => s + r.duration, 0) / allResults.filter(r => r.duration > 0).length);

  console.log(`\n${'='.repeat(50)}`);
  console.log(`RESULTS: ${pass.length} passed, ${fail.length} failed, ${allResults.length} total`);
  console.log(`Average response: ${avg}ms`);
  if (navTiming.load) console.log(`Ruler page: TTFB=${navTiming.ttfb}ms, DOM=${navTiming.domReady}ms, Load=${navTiming.load}ms, ${(navTiming.bytes / 1024).toFixed(1)}KB`);
  
  if (fail.length > 0) {
    console.log('\nFailed:');
    fail.forEach(f => console.log(`  ${f.label} — ${f.issues?.join(',') || f.title}`));
  }

  await browser.close();
  server.kill();
  console.log('\nDone.');
}

audit().catch(e => { console.error('FATAL:', e); process.exit(1); });
