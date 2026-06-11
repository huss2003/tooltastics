import { chromium } from 'playwright';

const BASE = 'http://localhost:4321';

async function verifyPage(page, url, label) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
  
  const html = await page.content();
  const h1 = await page.textContent('h1');
  const metaDesc = await page.$eval('meta[name="description"]', el => el.getAttribute('content')).catch(() => null);
  const canonical = await page.$eval('link[rel="canonical"]', el => el.getAttribute('href')).catch(() => null);
  const title = await page.title();
  const bodyLen = (await page.textContent('body') || '').length;
  const headings = await page.$$eval('h2, h3', els => els.map(e => `${e.tagName}: ${(e.textContent || '').substring(0, 40)}`));
  
  console.log(`\n=== ${label} ===`);
  console.log(`  Title: ${title.substring(0, 60)}`);
  console.log(`  H1: ${(h1 || '').substring(0, 60)}`);
  console.log(`  Meta Desc: ${(metaDesc || '').substring(0, 60)}`);
  console.log(`  Canonical: ${canonical || 'MISSING'}`);
  console.log(`  Body text: ${bodyLen} chars`);
  console.log(`  Headings (${headings.length}):`);
  headings.slice(0, 5).forEach(h => console.log(`    ${h}`));
  if (headings.length > 5) console.log(`    ... and ${headings.length - 5} more`);
  
  const issues = [];
  if (!h1) issues.push('NO H1');
  if (!metaDesc || metaDesc.length < 10) issues.push('BAD META DESC');
  if (!canonical) issues.push('NO CANONICAL');
  if (bodyLen < 100) issues.push('TOO LITTLE CONTENT');
  if (title.includes('undefined') || title.includes('null') || title.includes('nameKey')) issues.push('BAD TITLE');
  
  return { label, issues, ok: issues.length === 0 };
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  
  const allIssues = [];
  
  // Tool pages
  for (const t of ['ruler', 'pixel-ruler', 'protractor', 'printable-ruler', 'ring-sizer', 'l-square', 'measure-image', 'unit-converter']) {
    const r = await verifyPage(page, `${BASE}/en/${t}/`, t);
    if (!r.ok) allIssues.push(r);
  }
  
  // Content pages
  for (const c of ['screen-ruler', 'faq', 'about', 'contact', 'privacy-policy', 'terms-and-conditions', 'how-to-calibrate']) {
    const r = await verifyPage(page, `${BASE}/en/${c}/`, c);
    if (!r.ok) allIssues.push(r);
  }
  
  // Programmatic pages
  const progPages = [
    ['convert/cm-to-inches', 'convert/cm-to-inches'],
    ['convert/inches-to-cm', 'convert/inches-to-cm'],
    ['ruler-for/15-6-inch-laptop', 'ruler-for/15-6-laptop'],
    ['ring-size/ring-finger', 'ring-size/ring-finger'],
    ['print/ruler-12-inches', 'print/ruler-12-inches'],
    ['screen-specs/apple/iphone-15-pro-max', 'screen-specs/iphone-15-pro-max'],
  ];
  for (const [path, label] of progPages) {
    const r = await verifyPage(page, `${BASE}/en/${path}/`, label);
    if (!r.ok) allIssues.push(r);
  }
  
  // Locale check
  console.log('\n\n=== Locale Check ===');
  for (const locale of ['es', 'de', 'fr']) {
    const r = await verifyPage(page, `${BASE}/${locale}/ruler/`, `ruler (${locale})`);
    if (!r.ok) allIssues.push(r);
  }
  
  console.log(`\n\n=== Summary ===`);
  console.log(`Pages checked: 18`);
  console.log(`Pages with issues: ${allIssues.length}`);
  
  if (allIssues.length > 0) {
    console.log('\nIssues:');
    for (const issue of allIssues) {
      console.log(`  ${issue.label}: ${issue.issues.join(', ')}`);
    }
  }
  
  await browser.close();
}

run();
