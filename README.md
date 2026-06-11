# ToolTastics — Free Online Tools

A collection of high-quality online measurement tools built with Astro 5, Tailwind CSS v4, and deployed on Cloudflare Pages.

**Domain:** https://tooltastics.com

## Tools

- **Online Ruler** — Measure in cm, mm, and inches with screen calibration
- **Pixel Ruler** — Measure pixel-perfect screen distances
- **Protractor** — Measure angles on your screen
- **Printable Ruler** — Download actual-size printable rulers
- **Ring Sizer** — Find your ring size online
- **L-Square** — XY coordinate measurement tool
- **Measure Image** — Upload and measure objects in photos
- **Unit Converter** — Convert between cm, mm, inches, and pixels

## Tech Stack

- **Framework:** Astro 5 (static output)
- **Styling:** Tailwind CSS v4
- **Deployment:** Cloudflare Pages
- **Analytics:** Google Analytics 4 (optional)
- **PWA:** @vite-pwa/astro

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Deployment

This project is configured for Cloudflare Pages:

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Production Branch:** `main`

## License

MIT
