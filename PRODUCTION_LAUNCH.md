# Production Launch Document — ToolTastics

> **Domain:** https://tooltastics.com
> **Framework:** Astro 5 (static output) + Tailwind v4 + TypeScript
> **Hosting:** Cloudflare Pages
> **Repository:** GitHub — huss2003/tooltastics
> **Current Tool Slug:** `ruler`
> **Locales:** 10 (en, es, de, fr, pt, it, ja, ko, ru, zh-CN)

---

## Phase 1 — GitHub Production Audit

### Audit Findings

| Config | Status | Notes |
|--------|--------|-------|
| `package.json` | ✅ | All deps correct, scripts defined |
| `astro.config.mjs` | ✅ | Site URL = `tooltastics.com`, static output, Cloudflare adapter |
| `tsconfig.json` | ✅ | Strict mode, path aliases (`@/*`, `@components/*`, etc.) |
| Tailwind v4 | ✅ | `@tailwindcss/vite` plugin configured |
| Sitemap | ✅ | `@astrojs/sitemap` with i18n config (10 locales + x-default) |
| Robots.txt | ✅ | Dynamic route at `src/pages/robots.txt.ts`, references sitemap |
| Schema | ✅ | 7 schema types: WebApplication, BreadcrumbList, Organization, WebSite, FAQPage, HowTo, Article |
| Open Graph | ✅ | Full OG tags + Twitter Card `summary_large_image` |
| Canonical | ✅ | Set per locale per page |
| `.gitignore` | ✅ | Node, dist, env, wrangler excluded |
| `README.md` | ✅ | Exists — needs domain update (currently mentions RulerKit) |
| `LICENSE` | ✅ | MIT |
| `CONTRIBUTING.md` | ✅ | Exists — 52 lines, covers setup, PRs, code style, locales |
| `CHANGELOG.md` | ✅ | Exists — v1.0.0 entry |
| `.env.example` | ✅ | Exists — documents `PUBLIC_GA_MEASUREMENT_ID`, Cloudflare, GitHub tokens |
| Build | ✅ | Passes clean (~12.65s) |
| TypeScript | ✅ | Strict mode, passes `tsc --noEmit` |

### Pre-Launch Git Hygiene

```bash
# Ensure main is up to date
git checkout main
git pull origin main

# Verify clean working tree
git status

# Run full checks
npm run build
npm run typecheck
npm run lint
```

---

## Phase 2 — Cloudflare Pages Deployment

### Project Configuration

| Setting | Value |
|---------|-------|
| Project Name | `tooltastics` |
| Production Branch | `main` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js Version | 18+ (use latest LTS) |

### Deployment Steps

1. **Go to** Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. **Authorize** GitHub and select `huss2003/tooltastics`
3. **Set build configuration:**
   - Build command: `npm run build`
   - Build output: `dist`
   - Root directory: `/` (leave default)
4. **Set environment variables:**

   | Variable | Value | Notes |
   |----------|-------|-------|
   | `PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Set after GA4 property created (Phase 7) |
   | `NODE_VERSION` | `22` | Pin Node.js version |

5. **Deploy** — first deploy creates the `*.pages.dev` URL
6. **Add Custom Domain:**
   - Pages → tooltastics → Custom domains → Set up custom domain
   - Enter `tooltastics.com`
   - Cloudflare will automatically add DNS records
7. **Enable preview deployments** (optional but recommended for staging)

### Wrangler Configuration

`wrangler.toml` is already configured:

```toml
name = "tooltastics"
compatibility_date = "2026-06-01"
pages_build_output_dir = "dist"

[env.production]
routes = [{ pattern = "tooltastics.com", zone_id = "" }]
```

> **Note:** `zone_id` is intentionally empty — it will be populated once the DNS zone is added to Cloudflare in Phase 3.

---

## Phase 3 — DNS Configuration

### Adding Domain to Cloudflare

1. Log into Cloudflare Dashboard → **Add a Site**
2. Enter `tooltastics.com`
3. Select plan (Free tier is sufficient)
4. Cloudflare will scan existing DNS records
5. **Copy the assigned nameservers** (e.g., `mike.ns.cloudflare.com`, `rosa.ns.cloudflare.com`)
6. Go to your domain registrar and replace existing nameservers with Cloudflare's
7. Wait for propagation (5–30 minutes, up to 48h)

### DNS Records Table

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| A | `@` | `192.0.2.1` | Proxied (orange cloud) |
| AAAA | `@` | `100::` | Proxied (orange cloud) |
| CNAME | `www` | `tooltastics.com` | Proxied (orange cloud) |
| TXT | `@` | `google-site-verification=...` | DNS only |
| TXT | `@` | `v=spf1 -all` | DNS only |

> **Note:** The A/AAAA records are placeholders. Once Cloudflare Pages custom domain is configured, Cloudflare will automatically set the correct proxy targets. The orange cloud (proxied) is essential for Cloudflare's CDN, SSL, and Workers/Pages integration.

### SSL/TLS Settings

| Setting | Value |
|---------|-------|
| SSL/TLS encryption mode | **Full (Strict)** |
| Always Use HTTPS | **ON** |
| Auto Minify | **ON** (HTML, CSS, JS) |
| Brotli | **ON** |
| HTTP/3 | **ON** |
| Minimum TLS Version | **1.2** |
| Opportunistic Encryption | **ON** |

### Redirect Rules

#### 1. WWW → Non-WWW Redirect

Create a **Page Rule** or **Dynamic Redirect**:

| Setting | Value |
|---------|-------|
| URL pattern | `www.tooltastics.com/*` |
| Redirect URL | `https://tooltastics.com/:splat` |
| Status code | **301** (permanent) |

#### 2. Pages.dev → Canonical Redirect

Create a **Bulk Redirect** in Cloudflare:

| Setting | Value |
|---------|-------|
| Source URL | `*.pages.dev/*` |
| Target URL | `https://tooltastics.com/:splat` |
| Status code | **301** (permanent) |
| Preserve query string | **ON** |

This prevents duplicate content from Cloudflare Pages preview URLs.

---

## Phase 4 — ToolTastics Platform Architecture

### URL Architecture

| Path | Description |
|------|-------------|
| `/` | → 302 → `/en/` (default locale redirect) |
| `/{lang}/` | Homepage / tool directory |
| `/{lang}/ruler/` | Online Ruler (ruler) |
| `/{lang}/pixel-ruler/` | Pixel Ruler |
| `/{lang}/protractor/` | Protractor |
| `/{lang}/printable-ruler/` | Printable Ruler |
| `/{lang}/ring-sizer/` | Ring Sizer |
| `/{lang}/l-square/` | L-Square |
| `/{lang}/measure-image/` | Measure Image |
| `/{lang}/unit-converter/` | Unit Converter |
| `/{lang}/screen-specs/{brand}/{model}/` | Device PPI pages (80+) |
| `/{lang}/convert/{from}-to-{to}/` | Unit conversions (28 pairs) |
| `/{lang}/ruler-for/{size}/` | Screen-size rulers (34 sizes) |
| `/{lang}/ring-size/{finger}/` | Ring size guides (11) |
| `/{lang}/print/{template}/` | Printable templates (12) |
| `/{lang}/blog/` | Blog index |
| `/{lang}/blog/{slug}/` | Blog posts |
| `/{lang}/how-to-calibrate/` | Calibration guide |
| `/{lang}/how-to-measure-screen-size/` | Screen size guide |
| `/{lang}/faq/` | FAQ page |
| `/{lang}/privacy-policy/` | Privacy policy |
| `/{lang}/terms-and-conditions/` | Terms of service |
| `/{lang}/contact/` | Contact page |

### Future Tool Slots (planned)

```
/{lang}/qr-generator/        /{lang}/age-calculator/
/{lang}/bmi-calculator/      /{lang}/image-resizer/
/{lang}/pdf-merger/          /{lang}/password-generator/
/{lang}/text-counter/        /{lang}/color-picker/
/{lang}/stopwatch/           /{lang}/timer/
/{lang}/random-number/       /{lang}/...
```

### Sitemap Architecture

| Sitemap | Content |
|---------|---------|
| `sitemap-index.xml` | Entry point (links to sub-sitemaps) |
| `sitemap-0.xml` | All pages (single sitemap, < 50k pages) |

When the site exceeds 50,000 URLs, split into multiple sitemaps:
- `sitemap-tools.xml` — tool pages
- `sitemap-programmatic.xml` — programmatic pages (specs, conversions, sizes)
- `sitemap-blog.xml` — blog posts
- `sitemap-static.xml` — static content pages

### Internal Linking Strategy

| Location | Links To |
|----------|----------|
| Homepage | All tools |
| Tool sidebar | Related tools (cross-linking) |
| Programmatic pages | Main tool page + related tools |
| Blog posts | Contextual links to relevant tool |
| Guides | Tool page + related guides |
| Footer | Legal, contact, privacy, terms |
| Breadcrumbs | Every page (home → category → page) |

---

## Phase 5 — Google Search Console Setup

### Steps

1. **Go to** [Google Search Console](https://search.google.com/search-console)
2. **Add property:** URL prefix → `https://tooltastics.com`
3. **Verification method:** DNS TXT record
   - Copy the TXT record value provided by GSC
   - Add to Cloudflare DNS: `TXT @ google-site-verification=<value>`
   - Wait for propagation, then click **Verify**
4. **Submit sitemap:**
   - Navigate to **Sitemaps** section
   - Enter: `https://tooltastics.com/sitemap-index.xml`
   - Click Submit
5. **Request indexing** for top pages:
   - URL Inspection → enter `https://tooltastics.com/`
   - Click **Request Indexing**
   - Repeat for: `/en/`, `/en/ruler/`, top programmatic pages
6. **Verify robots.txt** is accessible:
   - URL Inspection → enter `https://tooltastics.com/robots.txt`
   - Confirm it returns 200 and contains the sitemap reference
7. **Verify canonical URLs** (spot-check a few pages)
8. **Configure International Targeting:**
   - Under **International Targeting** → **Hreflang**
   - Verify the hreflang tags are correctly implemented (already in HTML)
   - No additional configuration needed in GSC
9. **Monitor coverage** over the first week for indexation issues

---

## Phase 6 — Bing Webmaster Tools

### Steps

1. **Go to** [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. **Add site:** `https://tooltastics.com`
3. **Import from Google Search Console** (recommended — saves time):
   - Click **Import** → authorize Google account
   - Select the tooltastics property
   - Bing will import verified status and sitemap data
4. **Alternative — Manual verification:**
   - **Option A:** DNS TXT record (same as GSC — already added)
   - **Option B:** Bing meta tag (add to homepage `<head>`)
5. **Submit sitemap:** `https://tooltastics.com/sitemap-index.xml`
6. **Configure URL normalization:**
   - Ensure Bing treats www/non-www as the same
   - Set preferred domain: `tooltastics.com`
7. **Monitor** for indexing issues over the first week

---

## Phase 7 — Google Analytics 4

### Implementation Status

The Analytics code is **already implemented** in `src/components/seo/Analytics.astro`:

```astro
---
const measurementId = import.meta.env.PUBLIC_GA_MEASUREMENT_ID ?? ''
---

{measurementId && (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
    <script set:html={`...`} />
  </>
)}
```

Only the environment variable needs to be set.

### Setup Steps

1. **Go to** [Google Analytics](https://analytics.google.com/)
2. **Create property:**
   - Property name: `ToolTastics`
   - Reporting time zone: your local timezone
   - Currency: USD (or your local currency)
3. **Create Web Data Stream:**
   - Stream name: `ToolTastics Web`
   - Website URL: `https://tooltastics.com`
4. **Get Measurement ID** (format: `G-XXXXXXXXXX`)
5. **Add to environment:**

   ```bash
   # In .env (local development)
   PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

6. **Add to Cloudflare Pages** (Environment Variables):
   - Pages → tooltastics → Settings → Environment variables
   - Add: `PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`
   - Apply to Production environment
7. **Rebuild and redeploy** (or Cloudflare will auto-deploy on push)
8. **Verify GA4 is firing:**
   - Visit https://tooltastics.com
   - Open browser DevTools → Network tab
   - Filter for `google-analytics.com` or `gtag`
   - Confirm requests are being sent
9. **Check GA4 Real-time report** to confirm data is flowing

---

## Phase 8 — Technical SEO Validation

### Audit Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Sitemap | ✅ | Generated by `@astrojs/sitemap`, submitted to GSC/Bing |
| `robots.txt` | ✅ | Dynamic route, accessible, references sitemap |
| Canonical URLs | ✅ | Per-page, per-locale via Astro i18n |
| Open Graph | ✅ | `og:title`, `og:description`, `og:image`, `og:url`, `og:type` |
| Twitter Cards | ✅ | `summary_large_image` — card type + image |
| Breadcrumb Schema | ⚠️ | Implemented, but `site_name` still says `"RulerKit"` — update to `"ToolTastics"` |
| FAQ Schema | ✅ | On FAQ page and ruler pages |
| SoftwareApplication Schema | ✅ | On all tool pages |
| Organization Schema | ✅ | On all pages |
| WebSite Schema | ✅ | On homepage |
| Article Schema | ✅ | On blog posts |
| hreflang | ✅ | 10 locales + x-default |
| PWA manifest | ✅ | `start_url: /en/`, theme_color, icons |
| Theme color | ✅ | Light/dark variants configured |
| OG image | ✅ | `/og/default.png` exists |
| Mobile responsiveness | ✅ | Tailwind responsive design |
| Dark mode | ✅ | Implemented |
| Language selector | ✅ | 10-locale picker |

### Breadcrumb Schema Site Name Fix

The breadcrumb schema still references `"RulerKit"` instead of `"ToolTastics"`. Update the brand site name in the Schema component:

**File:** `src/components/seo/Schema.astro` (search for `"RulerKit"` in breadcrumb schema and replace with `"ToolTastics"`)

---

## Phase 9 — Duplicate Content Prevention

### Current Implementation

**`public/_redirects`:**

```
# Root → English locale
/ /en/ 302
```

**`public/_headers`:**

```
/*
  X-Robots-Tag: index, follow
  X-Frame-Options: DENY
  Content-Security-Policy: ...
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  ...
```

> **Note:** Cloudflare Pages preview URLs (`*.pages.dev`) **cannot** be blocked with `_headers` because they are host-based. Cloudflare Bulk Redirects are required instead.

### Required Cloudflare Rules

| # | Rule Type | Source | Target | Status Code |
|---|-----------|--------|--------|-------------|
| 1 | Bulk Redirect | `*.pages.dev/*` | `https://tooltastics.com/:splat` | 301 |
| 2 | Page Rule / Redirect | `www.tooltastics.com/*` | `https://tooltastics.com/:splat` | 301 |
| 3 | Page Rule | — | — | Always Use HTTPS |
| 4 | Page Rule | — | — | SSL Full (Strict) |
| 5 | Auto Minify | — | — | HTML, CSS, JS |

### Verification

- [ ] `http://tooltastics.com` → `https://tooltastics.com/en/` (302)
- [ ] `https://www.tooltastics.com/ruler/` → `https://tooltastics.com/ruler/` (301)
- [ ] `https://tooltastics.pages.dev/en/ruler/` → `https://tooltastics.com/en/ruler/` (301)
- [ ] `https://tooltastics.com/robots.txt` returns 200
- [ ] Search Console shows only canonical domain

---

## Phase 10 — Indexing Optimization Checklist

- [ ] **Submit sitemap** to Google Search Console
- [ ] **Submit sitemap** to Bing Webmaster Tools
- [ ] **Verify `robots.txt`** allows crawling (no `Disallow: /`)
- [ ] **Verify no `noindex`** blocks on canonical domain
- [ ] **Verify `pages.dev` is blocked** via Cloudflare Bulk Redirect
- [ ] **Check internal links** — no broken paths (use a link checker)
- [ ] **All pages have unique meta titles/descriptions** — no duplicates
- [ ] **All pages have canonical URLs** — spot-check across locales
- [ ] **hreflang annotations correct** — validate with hreflang test tool
- [ ] **Structured data validates** — test with [Schema.org validator](https://validator.schema.org/) or Google Rich Results Test
- [ ] **Core Web Vitals pass** — test with PageSpeed Insights / Lighthouse
- [ ] **Mobile-friendly test passes** — test with [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

---

## Phase 11 — Monitoring System

### Google Analytics 4 — Dashboards to Create

#### 1. Traffic Acquisition Dashboard

| Card | Metrics |
|------|---------|
| Users by channel | Organic, Direct, Referral, Social, Paid |
| Session source | Google, Bing, DuckDuckGo, direct, etc. |
| New vs returning | New user % vs returning user % |

#### 2. Engagement Dashboard

| Card | Metrics |
|------|---------|
| Avg engagement time | Per page, per channel |
| Sessions per user | Stickiness metric |
| Engagement rate | Sessions with >10s engagement |
| Event count | page_view, scroll, click events |

#### 3. Pages & Screens Dashboard

| Card | Metrics |
|------|---------|
| Top landing pages | Page path + channel |
| Top exit pages | Page path |
| Page views | By locale, by tool type |

#### 4. Search Console Integration

| Card | Metrics |
|------|---------|
| Queries → Landing pages | Combined view |
| clicks, impressions, CTR, position | For top queries |
| Country breakdown | By query and page |

#### 5. Demographics Dashboard

| Card | Metrics |
|------|---------|
| Country | Top 10 countries |
| Language | Browser language breakdown |

### Google Search Console — Regular Checks

| Report | Frequency | Key Metrics |
|--------|-----------|-------------|
| Performance | Weekly | clicks, impressions, CTR, avg position |
| Coverage | Weekly | valid, valid with warnings, errors, excluded |
| Enhancement — Breadcrumbs | Monthly | valid items, errors |
| Enhancement — FAQ | Monthly | valid items, errors |
| Enhancement — Sitelinks | Monthly | search box, sitelinks status |

### Weekly SEO Report Template

```
# Weekly SEO Report — ToolTastics
# Week of YYYY-MM-DD

## Overview
- Total clicks: ____ (vs previous week: ±__%)
- Total impressions: ____ (vs previous week: ±__%)
- Average CTR: ____% (vs previous week: ±__pp)
- Average position: ____ (vs previous week: ±__)

## Top 10 Pages by Clicks
| Page | Clicks | Impressions | CTR | Position |
|------|--------|-------------|-----|----------|
| ...  |        |             |     |          |

## Top 10 Queries by Impressions
| Query | Clicks | Impressions | CTR | Position |
|-------|--------|-------------|-----|----------|
| ...   |        |             |     |          |

## Coverage Issues
- Errors: ___ (details: ...)
- Valid with warnings: ___ (details: ...)
- Excluded: ___ (reasons: ...)

## Newly Indexed Pages
- ...

## Action Items
1. ...
2. ...
```

### Monthly SEO Report Template

```
# Monthly SEO Report — ToolTastics
# Month of YYYY-MM

## Monthly Aggregates
- Total clicks: ____
- Total impressions: ____
- Average CTR: ____%
- Average position: ____

## Top 10 Pages by Impressions
| Page | Impressions | Clicks | CTR | Position |
|------|-------------|--------|-----|----------|
| ...  |             |        |     |          |

## Top 10 Queries
| Query | Impressions | Clicks | CTR | Position |
|-------|-------------|--------|-----|----------|
| ...   |             |        |     |          |

## Country Breakdown (Top 5)
| Country | Clicks | Impressions | CTR | Position |
|---------|--------|-------------|-----|----------|
| ...     |        |             |     |          |

## Device Split
- Mobile: ____% of clicks
- Desktop: ____% of clicks
- Tablet: ____% of clicks

## Month-over-Month Changes
- Clicks: ±__%
- Impressions: ±__%
- CTR: ±__pp
- Position: ±__

## Recommendations
1. ...
2. ...
```

---

## Phase 12 — Final Launch Checklist

### Pre-Launch

- [ ] **Build passes** — `npm run build` (no errors, ~12s)
- [ ] **TypeScript passes** — `npm run typecheck`
- [ ] **Lint passes** — `npm run lint`
- [ ] **All pages render** — spot-check a sample across locales
- [ ] **All links work** — check navigation, tool interactions
- [ ] **404 page exists** — visit `/nonexistent-page`
- [ ] **`robots.txt` accessible** — `https://tooltastics.com/robots.txt`
- [ ] **`sitemap-index.xml` accessible** — visit and verify
- [ ] **OG image exists** — `/og/default.png` loads
- [ ] **PWA manifest valid** — validate with Lighthouse
- [ ] **All images load** — no broken images
- [ ] **No console errors** — open DevTools, check Console tab
- [ ] **Mobile responsive** — test at 375px, 768px, 1024px widths
- [ ] **Dark mode works** — toggle system/theme switcher
- [ ] **Language selector works** — switch between all 10 locales
- [ ] **Calibration tool works** — test ruler calibration flow

### Domain & DNS

- [ ] **Domain added to Cloudflare** — tooltastics.com zone exists
- [ ] **Nameservers updated** at registrar → Cloudflare
- [ ] **SSL set to Full (Strict)**
- [ ] **Always Use HTTPS** — ON
- [ ] **WWW → non-WWW redirect** — 301 permanent
- [ ] **Pages.dev → canonical redirect** — Bulk Redirect active
- [ ] **DNS records propagated** — check with `dig` or online tool
- [ ] **Minimum TLS Version** set to 1.2

### Deployment

- [ ] **Repository pushed to GitHub** — `huss2003/tooltastics`
- [ ] **Cloudflare Pages project created** — named `tooltastics`
- [ ] **First deploy successful** — green build in Cloudflare
- [ ] **Custom domain configured** in Pages → tooltastics.com
- [ ] **Preview deployments working** (if enabled)

### Indexing

- [ ] **Google Search Console property verified** — `https://tooltastics.com`
- [ ] **Bing Webmaster Tools verified** — via import or TXT
- [ ] **Sitemap submitted to Google Search Console**
- [ ] **Sitemap submitted to Bing Webmaster Tools**
- [ ] **`robots.txt` validated** in GSC URL Inspection
- [ ] **Manual indexing requested** for homepage and top pages
- [ ] **Hreflang tags validated** — all 10 locales + x-default
- [ ] **Structured data validated** — Google Rich Results Test

### Analytics

- [ ] **GA4 property created** — name: ToolTastics
- [ ] **Web Data Stream configured** — URL: `https://tooltastics.com`
- [ ] **Measurement ID in `.env`** — `PUBLIC_GA_MEASUREMENT_ID`
- [ ] **Measurement ID in Cloudflare Pages** — Production env var
- [ ] **Rebuilt and redeployed** after GA4 setup
- [ ] **Real-time report shows traffic** — visit live site, confirm

### Monitoring

- [ ] **Google Search Console** set to weekly email notifications
- [ ] **Performance dashboard** created in GA4
- [ ] **Coverage dashboard** created in GSC
- [ ] **Alert configured** for spike in 404s / coverage drops
- [ ] **Weekly SEO report template** ready to use
- [ ] **Monthly SEO report template** ready to use

---

## Appendix A — Useful Commands

```bash
# Full local validation
npm run build
npm run typecheck
npm run lint

# Production build
npm run build

# Preview build locally
npm run preview

# Deploy to Cloudflare Pages
npm run deploy

# Clean build artifacts
npm run clean

# Format code
npm run format
```

## Appendix B — Key Files Reference

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config, i18n, sitemap, PWA, Tailwind |
| `wrangler.toml` | Cloudflare Pages config |
| `src/components/seo/Analytics.astro` | GA4 integration |
| `src/components/seo/MetaTags.astro` | OG, Twitter Card, canonical tags |
| `src/components/seo/Schema.astro` | Structured data (7 types) |
| `src/pages/robots.txt.ts` | Dynamic robots.txt generation |
| `public/_redirects` | Cloudflare Pages redirects |
| `public/_headers` | Security headers |
| `public/og/default.png` | Default OG image |
| `.env.example` | Environment variable template |

## Appendix C — Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PUBLIC_GA_MEASUREMENT_ID` | No | GA4 Measurement ID (G-XXXXXXXXXX) |
| `CLOUDFLARE_API_TOKEN` | For deploy | Cloudflare API token with Pages permissions |
| `CLOUDFLARE_ACCOUNT_ID` | For deploy | Cloudflare account ID |
| `GITHUB_TOKEN` | For automation | GitHub personal access token |
