# RulerKit Design System

## Design Principles

**Precision First.** Every spacing value, type size, and color is mathematically derived from a base unit. Nothing is arbitrary.

**Clarity Over Ornament.** The UI exists to make measurement accurate and obvious. Decoration never competes with the tool.

**Calm Confidence.** Generous whitespace, muted colors, deliberate motion. The interface feels quiet so the measurement feels authoritative.

**Universal by Default.** Accessibility is not a mode. High contrast, readable type, and generous touch targets are the baseline.

---

## 1. Typography

### 1.1 Typeface

| Role | Family | Fallback | Weight Used |
|---|---|---|---|
| UI (primary) | Inter | `ui-sans-serif, system-ui, sans-serif` | 400, 500, 600, 700 |
| Monospace (measurements) | `SF Mono` / `Cascadia Code` | `ui-monospace, SFMono-Regular, monospace` | 400, 500 |

Inter is selected for its high x-height, open apertures, and exceptional legibility at small sizes — critical for ruler tick labels.

### 1.2 Type Scale

The scale follows a 1.25 modular ratio (Major Third), rounded to the nearest 2px for harmony with the 8px spacing grid.

| Token | Size | Line Height | Letter Spacing | Weight | Used For |
|---|---|---|---|---|---|
| `text-xs` | 11px / 0.6875rem | 16px (1.454) | +0.02em | 500 | Tick labels, measurement readouts, badges |
| `text-sm` | 13px / 0.8125rem | 20px (1.538) | +0.01em | 400 | Captions, secondary info, tool descriptions |
| `text-base` | 15px / 0.9375rem | 24px (1.6) | 0 | 400 | Body text, tool instructions |
| `text-md` | 17px / 1.0625rem | 24px (1.411) | 0 | 500 | Card titles, nav links |
| `text-lg` | 20px / 1.25rem | 28px (1.4) | -0.01em | 600 | Section headings, prominent CTAs |
| `text-xl` | 25px / 1.5625rem | 32px (1.28) | -0.014em | 600 | Page headings (H2) |
| `text-2xl` | 31px / 1.9375rem | 36px (1.161) | -0.017em | 600 | Major section headers (H1 secondary) |
| `text-3xl` | 39px / 2.4375rem | 44px (1.128) | -0.021em | 650 | Hero headings |
| `text-4xl` | 49px / 3.0625rem | 52px (1.061) | -0.025em | 650 | Primary hero (desktop only) |
| `text-5xl` | 61px / 3.8125rem | 64px (1.049) | -0.03em | 700 | Hero display (rare, homepage only) |

### 1.3 Measurement Numerals

All measurement values use **tabular lining figures** (Inter's `tnum` feature) so digits align vertically in readout displays. This is critical when measurements update dynamically.

```css
.measurement-value {
  font-variant-numeric: tabular-nums;
}
```

### 1.4 Ruler Tick Labels

Tick labels have special constraints:

| Attribute | Value |
|---|---|
| Font size | 10px (at 1:1 scale) |
| Font weight | 500 (Medium) |
| Letter spacing | +0.02em |
| Color | `var(--ruler-tick-label)` |
| Minimum gap | 4px between label and tick end |

---

## 2. Spacing

### 2.1 Base Unit: 4px

All spacing is derived from a 4px base unit (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128).

| Token | px | rem (16px base) | Usage |
|---|---|---|---|
| `space-1` | 4 | 0.25 | Tick mark gaps, icon internal padding |
| `space-2` | 8 | 0.5 | Inner padding (tight), marker handle spacing |
| `space-3` | 12 | 0.75 | Button padding (horizontal), card element gap |
| `space-4` | 16 | 1 | Content padding (cards, sections), button padding (vertical) |
| `space-5` | 20 | 1.25 | Paragraph margin, list spacing |
| `space-6` | 24 | 1.5 | Section gap, card grid gap, form element gap |
| `space-8` | 32 | 2 | Panel padding, sidebar content padding |
| `space-10` | 40 | 2.5 | Major section separation |
| `space-12` | 48 | 3 | Page section margin top |
| `space-16` | 64 | 4 | Hero area padding |
| `space-20` | 80 | 5 | Page top padding |
| `space-24` | 96 | 6 | Wide layout gutters |
| `space-32` | 128 | 8 | Maximum content separation |

### 2.2 Focus Ring

```css
focus-ring: 2px offset 2px;
```
The focus ring uses the primary-500 color. On dark backgrounds, it inverts to white with a dark inner shadow.

---

## 3. Grid

### 3.1 Breakpoints

| Name | Min Width | Container | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| `mobile` | 0 | 100% | 4 | 16px | 16px |
| `tablet` | 640px | 640px | 8 | 24px | 24px |
| `desktop` | 1024px | 1024px | 12 | 32px | 32px |
| `wide` | 1440px | 1280px | 12 | 32px | auto |

### 3.2 Tool Canvas Layout

The tool page uses an asymmetric two-column grid:

| Breakpoint | Sidebar | Canvas |
|---|---|---|
| mobile | Full width (collapsible) | Full width |
| tablet | 240px sticky | 1fr |
| desktop | 280px sticky | 1fr |
| wide | 280px sticky | 1fr (max 960px canvas area) |

### 3.3 Content Max-Width

| Content Type | Max Width |
|---|---|
| Tool canvas (desktop) | 960px |
| Article / guide body | 720px |
| Landing page hero | 800px |
| Code blocks | 100% of container |

---

## 4. Color System

### 4.1 Surface Palette (OKLCH)

All colors are defined in OKLCH for perceptual uniformity across light and dark modes.

```css
:root {
  /* Light mode */
  --surface-50:  oklch(0.985 0 0);
  --surface-100: oklch(0.970 0 0);
  --surface-200: oklch(0.920 0.002 285);
  --surface-300: oklch(0.870 0.004 285);
  --surface-400: oklch(0.750 0.006 285);
  --surface-500: oklch(0.620 0.008 285);
  --surface-600: oklch(0.480 0.010 285);
  --surface-700: oklch(0.380 0.012 285);
  --surface-800: oklch(0.280 0.014 285);
  --surface-900: oklch(0.200 0.016 285);
  --surface-950: oklch(0.140 0.018 285);
}

.dark {
  --surface-50:  oklch(0.140 0.018 285);
  --surface-100: oklch(0.180 0.016 285);
  --surface-200: oklch(0.220 0.014 285);
  --surface-300: oklch(0.280 0.012 285);
  --surface-400: oklch(0.380 0.010 285);
  --surface-500: oklch(0.480 0.008 285);
  --surface-600: oklch(0.580 0.006 285);
  --surface-700: oklch(0.700 0.004 285);
  --surface-800: oklch(0.820 0.002 285);
  --surface-900: oklch(0.920 0.001 285);
  --surface-950: oklch(0.970 0 0);
}
```

### 4.2 Brand / Accent Palette

| Token | Light Value | Dark Value | Usage |
|---|---|---|---|
| `--primary-50` | oklch(0.95 0.025 255) | oklch(0.12 0.04 255) | Background tint |
| `--primary-100` | oklch(0.90 0.05 255) | oklch(0.18 0.09 255) | Hover background |
| `--primary-200` | oklch(0.80 0.10 255) | oklch(0.26 0.14 255) | Selection highlight |
| `--primary-300` | oklch(0.70 0.15 255) | oklch(0.34 0.18 255) | Active state |
| `--primary-400` | oklch(0.60 0.20 255) | oklch(0.42 0.20 255) | Hover text / border |
| `--primary-500` | oklch(0.50 0.24 255) | oklch(0.50 0.24 255) | **Default brand** (same in both modes) |
| `--primary-600` | oklch(0.42 0.22 255) | oklch(0.60 0.20 255) | Button hover |
| `--primary-700` | oklch(0.34 0.18 255) | oklch(0.70 0.15 255) | Active button |
| `--primary-800` | oklch(0.26 0.14 255) | oklch(0.80 0.10 255) | Pressed state |
| `--primary-900` | oklch(0.18 0.09 255) | oklch(0.90 0.05 255) | Text on light |
| `--primary-950` | oklch(0.12 0.04 255) | oklch(0.95 0.025 255) | Strong text |

### 4.3 Functional Colors

| Token | Value | Usage |
|---|---|---|
| `--accent` | oklch(0.65 0.2 25) | Call-to-action, premium feature highlight |
| `--accent-hover` | oklch(0.55 0.22 25) | CTA hover |
| `--error` | oklch(0.55 0.22 20) | Validation errors, calibration failure |
| `--success` | oklch(0.55 0.2 145) | Calibration complete, measurement confirmed |
| `--warning` | oklch(0.7 0.18 85) | Low accuracy warning, recalibration needed |
| `--info` | oklch(0.6 0.12 255) | Tips, informational messages |

### 4.4 Ruler Canvas Colors

These are defined as CSS custom properties in `variables.css` and switch per theme:

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--ruler-bg` | oklch(0.98 0.005 285) | oklch(0.18 0.015 285) | Canvas background |
| `--ruler-bg-stripe` | oklch(0.95 0.01 285) | oklch(0.22 0.015 285) | Alternating cm stripe |
| `--ruler-tick-major` | oklch(0.30 0.02 285) | oklch(0.80 0.01 285) | cm / inch ticks |
| `--ruler-tick-minor` | oklch(0.60 0.01 285) | oklch(0.55 0.01 285) | mm / half-inch ticks |
| `--ruler-tick-label` | oklch(0.20 0.02 285) | oklch(0.85 0.01 285) | Tick number labels |
| `--ruler-marker` | oklch(0.50 0.24 255) | oklch(0.60 0.20 255) | Active measurement marker |
| `--ruler-marker-active` | oklch(0.42 0.22 255) | oklch(0.70 0.18 255) | Marker being dragged |
| `--ruler-guide` | oklch(0.65 0.2 25) | oklch(0.70 0.18 25) | Guide line (red accent) |
| `--ruler-readout-bg` | oklch(0.20 0.02 285 / 0.9) | oklch(0.90 0.01 285 / 0.9) | Measurement tooltip bg |
| `--ruler-readout-text` | oklch(0.98 0 0) | oklch(0.12 0 0) | Measurement tooltip text |

### 4.5 Text & Border Colors

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--text-primary` | `--surface-900` | `--surface-50` | Body text |
| `--text-secondary` | `--surface-600` | `--surface-400` | Secondary / caption text |
| `--text-tertiary` | `--surface-400` | `--surface-500` | Placeholder / disabled |
| `--border-default` | `--surface-200` | `--surface-700` | Standard borders |
| `--border-strong` | `--surface-300` | `--surface-600` | Strong borders, focus rings |

### 4.6 Contrast Verification

| Pair | Min Contrast | Passes AA | Passes AAA |
|---|---|---|---|
| `--text-primary` on `--surface-50` | 15.4:1 | ✅ | ✅ |
| `--text-primary` on `--surface-100` | 13.2:1 | ✅ | ✅ |
| `--text-secondary` on `--surface-50` | 7.1:1 | ✅ | ✅ |
| `--text-secondary` on `--surface-100` | 6.0:1 | ✅ | ✅ |
| `--text-tertiary` on `--surface-50` | 4.1:1 | ✅ (large) | ❌ |
| `--ruler-tick-label` on `--ruler-bg` | 9.8:1 (light) / 10.2:1 (dark) | ✅ | ✅ |
| `--primary-500` on `--surface-50` | 5.6:1 | ✅ | ❌ |
| `--primary-500` on `--surface-100` | 4.8:1 | ✅ | ❌ |

---

## 5. Shadows & Elevation

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--shadow-none` | none | none | |
| `--shadow-tool` | `0 1px 3px rgb(0 0 0 / 0.08), 0 1px 2px rgb(0 0 0 / 0.06)` | `0 1px 3px rgb(0 0 0 / 0.3), 0 1px 2px rgb(0 0 0 / 0.2)` | Card default |
| `--shadow-tool-lg` | `0 4px 12px rgb(0 0 0 / 0.1), 0 2px 4px rgb(0 0 0 / 0.06)` | `0 4px 12px rgb(0 0 0 / 0.4), 0 2px 4px rgb(0 0 0 / 0.3)` | Hovered card, dropdown |
| `--shadow-calibration` | `0 0 0 2px var(--primary-500), 0 0 0 4px rgb(0 0 0 / 0.1)` | `0 0 0 2px var(--primary-500), 0 0 0 4px rgb(255 255 255 / 0.15)` | Active calibration guide |
| `--shadow-readout` | `0 2px 8px rgb(0 0 0 / 0.2)` | `0 2px 8px rgb(0 0 0 / 0.5)` | Measurement popover |

---

## 6. Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-xs` | 4px (0.25rem) | Tick marks on canvas, small indicators |
| `--radius-sm` | 6px (0.375rem) | Input fields, small buttons |
| `--radius-md` | 8px (0.5rem) | Cards, buttons, modal panels |
| `--radius-lg` | 12px (0.75rem) | Large cards, tool sidebar panel |
| `--radius-xl` | 16px (1rem) | Hero cards, prominent containers |
| `--radius-full` | 9999px | Pills, badges, sliders |

---

## 7. Motion

### 7.1 Duration Tokens

All durations are intentionally restrained — Apple's philosophy of "fast enough to feel instant, slow enough to understand what happened."

| Token | ms | Used For |
|---|---|---|
| `--duration-instant` | 50 | Tick mark draw, color flash |
| `--duration-fast` | 100 | Micro-interactions, button press, toggle |
| `--duration-normal` | 200 | Standard transitions, hover, focus ring |
| `--duration-slow` | 300 | Panel slide, modal open, page transition |
| `--duration-slide` | 400 | Sidebar expand/collapse, drawer |

### 7.2 Easing Curves

| Token | Curve | Character |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Expressive, natural deceleration. Used for all entering elements. |
| `--ease-in` | `cubic-bezier(0.4, 0, 0.68, 0.06)` | Subtle acceleration. Used for exiting elements. |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Neutral. Used for property changes that both enter and exit. |
| `--ease-spring` | `linear(0, 0.006, 0.025 2.8%, 0.101 6.1%, 0.539 18.9%, 0.721 25.3%, 0.849 31.5%, 0.937 38.1%, 0.992 45.6%, 1.008 49.1%, 1.016 53.3%, 1.014 60.3%, 0.996 71.6%, 0.992 80.2%, 1 100%)` | Spring-like snap for marker snap, calibration complete indicator |

### 7.3 Animation Patterns

| Pattern | Duration | Easing | Element |
|---|---|---|---|
| Button hover → lift | 200ms | ease-out | Transform `translateY(-1px)` + shadow deepen |
| Button active → press | 100ms | ease-in-out | Transform `scale(0.97)` |
| Card hover → surface change | 200ms | ease-out | Background shift + shadow |
| Modal enter | 300ms | ease-out | Opacity 0→1, translateY(8px)→0 |
| Modal exit | 200ms | ease-in | Opacity 1→0, translateY(0)→4px |
| Calibration complete | 400ms | ease-spring | Checkmark draw + indicator pulse |
| Measurement marker drag | 0ms | — | No animation, direct 1:1 tracking |
| Ruler value update | 50ms | ease-out | Opacity flash on readout |
| Sidebar collapse | 350ms | ease-out | Width transition, children fade at 200ms |
| Page navigation | 250ms | ease-out | View transition `crossfade` |

### 7.4 Reduced Motion

When `prefers-reduced-motion: reduce` is detected:

- All `--duration-*` tokens collapse to 0ms
- Spring easings become `ease-out`
- No scale transforms on interaction
- No parallax or scroll-driven animations
- Calibration checkmark appears instantly (no draw animation)
- Page transitions revert to instant swap (no crossfade)

---

## 8. Component Specifications

### 8.1 Buttons

| Attribute | Primary | Secondary | Ghost | Icon-Only |
|---|---|---|---|---|
| Height | 44px | 44px | 44px | 44px |
| Horizontal padding | 24px | 20px | 16px | — |
| Font | Inter 600 | Inter 500 | Inter 500 | — |
| Font size | 15px | 14px | 14px | — |
| Border radius | 10px | 10px | 8px | 10px |
| Background | primary-500 | transparent | transparent | transparent |
| Background hover | primary-600 | surface-100 | surface-100 | surface-100 |
| Text color | white | primary-600 | surface-700 | — |
| Border | none | 1px solid surface-300 | none | none |
| Shadow tool | none | Yes | none | none |
| Min width | — | — | — | 44px |
| States | hover, active, disabled, loading | same | same | same |

### 8.2 Cards

| Attribute | Default Card | Tool Card | Interactive Card |
|---|---|---|---|
| Padding | 16px | 20px | 16px |
| Border radius | 12px | 12px | 12px |
| Background | white / surface-900 | white / surface-900 | white / surface-900 |
| Border | 1px solid surface-200 | 1px solid surface-200 | 1px solid surface-200 |
| Shadow | tool | tool | tool |
| Hover state | none | shadow-tool-lg | shadow-tool-lg, translateY(-1px) |
| Transition | none | 200ms ease-out | 200ms ease-out |

### 8.3 Input Fields

| Attribute | Value |
|---|---|
| Height | 44px |
| Horizontal padding | 12px |
| Font | Inter 400 |
| Font size | 15px |
| Border radius | 8px |
| Border | 1.5px solid surface-300 |
| Border focus | 1.5px solid primary-500 |
| Background | white / surface-900 |
| Placeholder | text-tertiary |
| Label | text-secondary, 13px, 500 weight, 8px gap to input |

### 8.4 Sliders (Calibration)

| Attribute | Value |
|---|---|
| Track height | 4px |
| Track radius | 2px |
| Track background | surface-200 (light) / surface-600 (dark) |
| Track fill | primary-400 |
| Thumb size | 24px × 24px |
| Thumb radius | 50% |
| Thumb background | white |
| Thumb border | 2px solid primary-500 |
| Thumb shadow | tool |

### 8.5 Measurement Readout

| Attribute | Value |
|---|---|
| Layout | Inline with icon + value + unit |
| Value font | Inter 600, tabular-nums |
| Value size | 28px (desktop), 22px (mobile) |
| Unit font | Inter 400 |
| Unit size | 14px |
| Unit color | text-secondary |
| Background | readout-bg |
| Text color | readout-text |
| Padding | 6px 12px |
| Border radius | 8px |
| Shadow | readout |

### 8.6 Toggle / Switch

| Attribute | Off | On |
|---|---|---|
| Track width | 44px | 44px |
| Track height | 24px | 24px |
| Track radius | 12px | 12px |
| Track background | surface-300 | primary-500 |
| Thumb size | 20px | 20px |
| Thumb offset | 2px from left | 22px from left |
| Thumb background | white | white |
| Thumb shadow | tool | tool |
| Transition | 200ms ease-out | 200ms ease-out |

### 8.7 Modal / Dialog

| Attribute | Value |
|---|---|
| Overlay background | `oklch(0 0 0 / 0.4)` (light), `oklch(0 0 0 / 0.6)` (dark) |
| Overlay backdrop filter | `blur(2px)` (skip for reduced motion) |
| Panel max width | 480px |
| Panel padding | 24px |
| Panel radius | 16px |
| Panel background | white / surface-950 |
| Close button | Top-right, ghost icon-only |
| Enter animation | opacity 0→1, translateY(8)→0, 300ms ease-out |
| Exit animation | opacity 1→0, translateY(0)→4, 200ms ease-in |

---

## 9. Accessibility Specifications

### 9.1 Touch Targets

All interactive elements must have a minimum touch target of **44×44 CSS pixels** (WCAG 2.2 AA). This includes:

- All buttons (including icon-only)
- All sliders / draggable handles
- All links in navigation
- Toggle switches
- Close / dismiss buttons

If visual size is smaller than 44px, extend via `::before` pseudo-element or padding.

### 9.2 Focus Indicators

- **Style**: 2px solid primary-500, 2px offset from element
- **Visibility**: Always visible on focus (never `outline: none` without providing `:focus-visible` alternative)
- **Dark mode**: 2px solid white with 1px dark inset shadow for contrast
- **Interactive cards**: Show focus ring on card container, not inner content

### 9.3 Color Contrast Minimums

| Context | AA Normal | AA Large (18px+ / 14px bold+) | AAA |
|---|---|---|---|
| Body text | 4.5:1 ✅ | 3:1 ✅ | 7:1 |
| Measurement values | 4.5:1 ✅ | 3:1 ✅ | 7:1 |
| Placeholder text | 3:1 ✅ | 3:1 ✅ | 4.5:1 |
| Ruler tick labels | 4.5:1 ✅ | 4.5:1 ✅ | 7:1 ✅ |
| Disabled buttons | 3:1 (per WCAG) | 3:1 | 4.5:1 |

### 9.4 Focus Order

1. Skip to content link
2. Main navigation
3. Calibration panel (tool pages only)
4. Tool canvas
5. Tool settings (unit, orientation)
6. Measurement readout
7. Footer links

### 9.5 Screen Reader Specifications

| Element | Role | ARIA |
|---|---|---|
| Canvas (ruler) | `application` | `aria-label`, `aria-roledescription="ruler"`, `aria-describedby` (calibration status) |
| Measurement display | `status` | `aria-live="polite"`, `aria-atomic="true"` |
| Calibration slider | `slider` | `aria-valuemin/max/now/text` |
| Unit selector | `radiogroup` | `aria-orientation` |
| Tool navigation | `navigation` | `aria-label="Tools"` |
| Fullscreen button | `button` | `aria-label`, `aria-pressed` |
| Theme toggle | `button` | `aria-label`, `aria-pressed` |
| Drag handle | `slider` | `aria-label`, `aria-orientation` |

### 9.6 Motion Sensitivity

When `prefers-reduced-motion: reduce` is detected:

- All CSS transitions/animations set to `0ms`
- Canvas draw operations skip animation (ticks appear instantly)
- Marker snap animation disabled
- Page view transitions use instant swap
- No parallax, scroll-triggered, or hover-driven motion

---

## 10. Ruler Canvas Specifications

### 10.1 Tick Mark Geometry

| Mark Type | Height (px) | Width (px) | Weight |
|---|---|---|---|
| Major (cm / inch) | 24 | 1 | Bold |
| Mid (5mm / ½ inch) | 16 | 1 | Medium |
| Minor (mm / ⅛ inch) | 10 | 0.5 | Light |
| Sub-minor (0.5mm) | 6 | 0.5 | Hairline |

### 10.2 Stripe Pattern

Alternating centimeter stripes provide visual reference:

| Stripe | Width | Color |
|---|---|---|
| Odd cm | Full tick height | `--ruler-bg` |
| Even cm | Full tick height | `--ruler-bg-stripe` |

### 10.3 Measurement Marker

| Attribute | Value |
|---|---|
| Shape | Circular with crosshair center |
| Diameter | 20px (interaction), 8px (center dot) |
| Border | 2px solid `--ruler-marker` |
| Active border | 2.5px solid `--ruler-marker-active` |
| Glow (active) | 0 0 6px `--ruler-marker-active` |

### 10.4 Guide Line

| Attribute | Value |
|---|---|
| Style | Dashed (6px dash, 4px gap) |
| Width | 1.5px |
| Color | `--ruler-guide` (red accent) |
| Crosshair | Full canvas height/width |

---

## 11. Design Tokens (Complete Dictionary)

```
RulerKit Design Tokens
├── colors
│   ├── surface         (50 → 950, light + dark)
│   ├── primary          (50 → 950, light + dark)
│   ├── accent           (default + hover)
│   ├── functional       (error, success, warning, info)
│   ├── ruler-canvas     (bg, stripe, ticks, labels, markers, guides, readout)
│   ├── text             (primary, secondary, tertiary)
│   └── border           (default, strong)
├── typography
│   ├── font-family      (Inter, monospace)
│   ├── scale            (xs → 5xl, 10 steps)
│   ├── leading          (16 → 64)
│   ├── letter-spacing   (-0.03 → +0.02em)
│   └── weight           (400, 500, 600, 650, 700)
├── spacing              (1 → 32, 12 steps, 4px base)
├── grid
│   ├── breakpoints      (0, 640, 1024, 1440)
│   ├── columns          (4, 8, 12)
│   ├── gutters          (16, 24, 32)
│   └── margins          (16, 24, 32)
├── radius               (xs → full, 6 steps)
├── shadow               (none → tool → tool-lg → calibration → readout)
├── motion
│   ├── duration         (50 → 400ms, 6 steps)
│   └── easing           (ease-out → ease-in → ease-in-out → spring)
└── component
    ├── button           (primary, secondary, ghost, icon-only)
    ├── card             (default, tool, interactive)
    ├── input            (default, focused, error)
    ├── slider           (track, fill, thumb)
    ├── toggle           (off, on)
    ├── modal            (overlay, panel, close)
    └── readout          (value, unit, background)
```

---

## 12. Tailwind Theme Configuration

The following maps every design token to the Tailwind v4 CSS-first `@theme` directive:

```css
@theme {
  /* Typography */
  --font-sans: Inter, ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, monospace;

  /* Surface palette */
  --color-surface-50: oklch(0.985 0 0);
  --color-surface-100: oklch(0.970 0 0);
  --color-surface-200: oklch(0.920 0.002 285);
  --color-surface-300: oklch(0.870 0.004 285);
  --color-surface-400: oklch(0.750 0.006 285);
  --color-surface-500: oklch(0.620 0.008 285);
  --color-surface-600: oklch(0.480 0.010 285);
  --color-surface-700: oklch(0.380 0.012 285);
  --color-surface-800: oklch(0.280 0.014 285);
  --color-surface-900: oklch(0.200 0.016 285);
  --color-surface-950: oklch(0.140 0.018 285);

  /* Primary brand */
  --color-primary-50: oklch(0.950 0.025 255);
  --color-primary-100: oklch(0.900 0.050 255);
  --color-primary-200: oklch(0.800 0.100 255);
  --color-primary-300: oklch(0.700 0.150 255);
  --color-primary-400: oklch(0.600 0.200 255);
  --color-primary-500: oklch(0.500 0.240 255);
  --color-primary-600: oklch(0.420 0.220 255);
  --color-primary-700: oklch(0.340 0.180 255);
  --color-primary-800: oklch(0.260 0.140 255);
  --color-primary-900: oklch(0.180 0.090 255);
  --color-primary-950: oklch(0.120 0.040 255);

  /* Functional */
  --color-accent: oklch(0.650 0.200 25);
  --color-accent-hover: oklch(0.550 0.220 25);
  --color-error: oklch(0.550 0.220 20);
  --color-success: oklch(0.550 0.200 145);
  --color-warning: oklch(0.700 0.180 85);

  /* Spacing (4px base → 12 steps) */
  --spacing-1: 0.25rem;
  --spacing-2: 0.50rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.50rem;
  --spacing-8: 2rem;
  --spacing-10: 2.50rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;

  /* Radius */
  --radius-xs: 0.25rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.50rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  /* Shadows */
  --shadow-tool: 0 1px 3px oklch(0 0 0 / 0.08), 0 1px 2px oklch(0 0 0 / 0.06);
  --shadow-tool-lg: 0 4px 12px oklch(0 0 0 / 0.10), 0 2px 4px oklch(0 0 0 / 0.06);
  --shadow-readout: 0 2px 8px oklch(0 0 0 / 0.20);

  /* Font sizes with line heights */
  --text-xs: 0.6875rem;
  --text-xs--line-height: 1rem;
  --text-sm: 0.8125rem;
  --text-sm--line-height: 1.25rem;
  --text-base: 0.9375rem;
  --text-base--line-height: 1.50rem;
  --text-md: 1.0625rem;
  --text-md--line-height: 1.50rem;
  --text-lg: 1.25rem;
  --text-lg--line-height: 1.75rem;
  --text-xl: 1.5625rem;
  --text-xl--line-height: 2rem;
  --text-2xl: 1.9375rem;
  --text-2xl--line-height: 2.25rem;
  --text-3xl: 2.4375rem;
  --text-3xl--line-height: 2.75rem;
  --text-4xl: 3.0625rem;
  --text-4xl--line-height: 3.25rem;
  --text-5xl: 3.8125rem;
  --text-5xl--line-height: 4rem;
}
```

---

## 13. Usage Guidelines

### 13.1 Tool Page Layout Ratios

```
┌─────────────────────────────────────────────┐
│  ┌──────────┐ ┌──────────────────────────┐  │
│  │          │ │                          │  │
│  │ Sidebar  │ │       Canvas             │  │
│  │  280px   │ │      1fr (max 960px)     │  │
│  │          │ │                          │  │
│  │ scrolls  │ │     60fps render         │  │
│  │ vertical │ │                          │  │
│  │          │ │  ┌────────────────────┐  │  │
│  │ ┌──────┐ │ │  │   Readout bar      │  │  │
│  │ │Calib │ │ │  └────────────────────┘  │  │
│  │ └──────┘ │ │                          │  │
│  │ ┌──────┐ │ │  ┌────────────────────┐  │  │
│  │ │Units │ │ │  │   Calibration hint  │  │  │
│  │ └──────┘ │ │  └────────────────────┘  │  │
│  │          │ │                          │  │
│  └──────────┘ └──────────────────────────┘  │
│                      Footer                 │
└─────────────────────────────────────────────┘
```

### 13.2 Content Page Layout Ratios

```
┌─────────────────────────────────────────────┐
│  Navigation                                 │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │      Breadcrumbs                    │    │
│  ├─────────────────────────────────────┤    │
│  │                                     │    │
│  │           Article                   │    │
│  │     max-width: 720px                │    │
│  │     centered                        │    │
│  │                                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │      Related Tools (cards)          │    │
│  └─────────────────────────────────────┘    │
│                                             │
├─────────────────────────────────────────────┤
│  Footer                                     │
└─────────────────────────────────────────────┘
```

### 13.3 Touch Areas Around Canvas

Interactive areas on the canvas require the following minimum zones:

| Element | Min Touch Target | Notes |
|---|---|---|
| Marker handle | 44×44px | Visual dot is 20px, extended via pointer capture |
| Calibration slider thumb | 44×44px | Visual is 24px |
| Fullscreen toggle | 44×44px | Icon button |
| Reset button | 44×44px | Icon button |

### 13.4 Z-Index Stack

| Layer | Value | Elements |
|---|---|---|
| Base | 0 | Canvas background, page content |
| Elevated | 10 | Cards, tool panels |
| Sticky | 20 | Header, sidebar |
| Overlay | 30 | Modal backdrop |
| Modal | 40 | Modal dialog |
| Tooltip | 50 | Measurement readout, calibration helper |
| Toaster | 60 | Notification toasts |

### 13.5 Loading & Empty States

| State | Behavior |
|---|---|
| Initial page load | SSG HTML is fully rendered; JS hydrates islands progressively |
| Calibration pending | Canvas shows default 96 PPI ruler with prominent "Calibrate for Accuracy" callout |
| Calibrating | Slider interaction; real-time PPI calculation displayed |
| Calibration complete | Checkmark animation (300ms spring), accuracy badge, canvas redraws at correct scale |
| Measurement in progress | Guide line follows pointer, marker shows exact position, readout updates every frame |
| Measurement locked | Marker snaps to final position, readout expands to show all units (cm, mm, in), "Copy" action available |

### 13.6 Error States

| Error | Visual | Message |
|---|---|---|
| Calibration failed | Red border on slider, error icon | "Could not calibrate. Try adjusting the slider or selecting your device manually." |
| Canvas not supported | Fallback message replaces canvas | "Your browser does not support the HTML5 Canvas element required for this tool." |
| Storage unavailable | Subtle badge | "Calibration cannot be saved. Your measurements will still work." |
| Fullscreen denied | No visual change | Console warn only; button remains functional |
| Touch not supported | Slight UI shift (hover → tap states) | Automatic detection, no user-facing message |

---

## 14. Design System Validation

### Spacing Audit

Every gap between related elements must be exactly one token value — never an arbitrary number. Common violations to check:

| Context | Correct | Incorrect |
|---|---|---|
| Gap between label and input | 8px (space-2) | 7px, 9px |
| Gap between card and card | 24px (space-6) | 20px, 30px |
| Padding inside button | 16px horizontal, 12px vertical | 15px, 10px |
| Margin after heading | 24px (space-6) | 18px, 25px |
| Gap between tick and label | 4px (space-1) | 3px, 5px |

### Color Assignment Rules

- **Primary-500** is the single brand color for CTAs, active links, and the calibration guide outline. Never use primary-500 for body text, borders, or backgrounds (except in disabled state).
- **Surface colors** are mode-swapped (light → dark inverts the scale). Never use a surface token for text.
- **Functional colors** (error, success, warning) are only used for their semantic purpose. Never use success green for decorative elements.
- **Ruler canvas colors** live in CSS variables, not Tailwind theme. Canvas rendering uses raw canvas API, not Tailwind classes.

### Type Assignment Rules

- **Measurement values** always use `font-variant-numeric: tabular-nums` and weight 600.
- **Body text** never falls below 15px (`text-base`). 13px (`text-sm`) is allowed for captions and secondary info only.
- **Tick labels** are the only element that renders at 10px. This is a functional constraint of the ruler canvas, not a design choice available elsewhere.

---

*RulerKit Design System v1.0 — June 2026*
