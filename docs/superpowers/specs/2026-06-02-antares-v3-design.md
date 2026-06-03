# Antares v3 — Design Spec

## Overview

A full redesign of the Antares BI migration platform website. v3 shifts from v2's clean editorial aesthetic toward a more technical, structured visual language — inspired by the Guardbase reference — while staying fully light-themed and enterprise-appropriate.

**Project location:** New `v3/` directory alongside v2, bootstrapped as a fresh Next.js project. Reuses select components from v2.

---

## Tech Stack

- **Framework:** Next.js (same version as v2: 16.x), React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Component library:** shadcn/ui + cult-ui
- **Animation:** motion (Framer Motion)
- **Key cult-ui components:**
  - `ShaderLensBlur` — hero circle background effect (not used; replaced by canvas ASCII)
  - `FeatureCarousel` — Converter section step carousel
  - `TextureOverlay` — diagonal hatching accent zones (reused from v2)
- **Reused from v2:** `TextureOverlay`, `TextAnimate`, `AnimatedNumber`, `GradientHeading`, `Nav`, `Footer`, `MigrationPaths` (as starting points)

---

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#3B82F6` | Primary brand color — CTAs, links, pricing, carousel progress, bento arrows, active states |
| `amber` | `#FFB800` | Secondary accent — section tag squares, hero headline em, ASCII glow, "~4 hrs saved" badge |
| `ascii-1` | `#F7B431` | Hero ASCII — sparse outer chars |
| `ascii-2` | `#FFB800` | Hero ASCII — mid-density chars |
| `ascii-3` | `#FC6D02` | Hero ASCII — dense chars |
| `ascii-4` | `#FA2101` | Hero ASCII — center chars |
| `black` | `#000` | Headlines, primary CTA button |
| `neutral-800` | `#111` | Dark bento cells, footer |
| `neutral-50` | `#fafafa` | Alternating section backgrounds |
| `blue-light` | `#EEF5FF` | Screenshot zone backgrounds, light bento cells |

---

## Typography

Inherit from v2 (Geist / system sans). No changes.

- **Headlines:** 900 weight, tight tracking (`-0.03em` to `-0.04em`)
- **Section tags:** 0.5rem, 700, `0.14em` letter-spacing, uppercase
- **Body:** 0.72rem, `#888`, `1.65` line-height
- **Monospace accents:** Courier New — section numbers, formula mapping, ASCII art

---

## Visual Design Language

### Grid system
The page uses a visible editorial grid system borrowed from Guardbase:

- **Section corner marks:** Dark `+` crosshairs (`#555`, 16px) positioned centered on section boundary intersections — `top:-8px; left:-8px` etc. so the cross center sits exactly on the corner.
- **Page outer marks:** Larger `+` (20px, `#555`) at the outer page container corners, visible against the grey page background.
- **Diagonal texture strips:** Narrow columns (100px wide, full section height) of repeating diagonal lines (`repeating-linear-gradient(-45deg, rgba(0,0,0,0.10) 1px, transparent 9px)`). Positioned on the right or left edge of sections, alternating per section. `+` marks sit at the bottom intersection of strip edge and section border.

### ASCII art
Two contexts:

1. **Hero circle** — Canvas-rendered ASCII using density ramp characters `[' ', '-', '=', '*', '+', '#', '@', '%', 'x']`. Characters placed on a 9px grid. Character choice mapped to distance from center (norm 0→1). Colors interpolate `#F7B431 → #FFB800 → #FC6D02 → #FA2101`. Circle radius 300px, positioned top-right of hero, partially off-canvas. Blur glow underneath via `radial-gradient`.

2. **Migration Paths bento cells** — Canvas-rendered shapes per cell. Technique: draw shape on offscreen canvas, sample pixel alpha at 8px grid, place ASCII char by intensity. Characters and colors vary per cell (see Migration Paths section). Canvas occupies right 45% of each cell, `opacity: 0.6`.

---

## Page Structure

### 0. Nav
- Logo: Antares SVG mark + "ANTARES" wordmark
- Links: Platform · Migration Paths · Guides · Pricing
- CTA: "Run Analyzer — Free →" (black pill)
- Sticky, white background, `border-bottom: 1px solid #ebebeb`

### 1. Hero
- **Background:** White. Top-right: diagonal texture strip (100px, full height). Amber radial glow blur behind ASCII circle.
- **ASCII circle:** 300×300px canvas, top-right, partially off-canvas. Density ramp in amber/orange palette.
- **Content:** Badge label · H1 "Analyze. / *Convert.* / Deploy." (italic = amber) · subline · two CTAs · disclaimer note
- **CTAs:** "Run the Analyzer — Free →" (black) + "How it works" (outline)

### 2. Migration Paths
- **Layout:** Section header + 3×2 bento grid (no gaps, cell borders)
- **ASCII shapes per cell (canvas, right 45%, opacity 0.6):**
  | Cell | Color | Shape | Chars |
  |------|-------|-------|-------|
  | 01 Tableau → Power BI | `#FFB800` amber | Chevron arrow | `- : = + #` dark |
  | 02 Tableau → Databricks | `#111` dark | 3 overlapping circles | `· . o O @` amber |
  | 03 SAS VA → Power BI | `#EEF5FF` light blue | S-curve flow | `. : - = #` blue |
  | 04 Power BI → Tableau | `#3B82F6` blue | 3 horizontal layers | `· . : = #` white |
  | 05 Looker → Power BI | `#fff` white | Ring/target | `. : o O #` dark |
  | 06 Custom Path | `#F6F6F6` muted | Question mark | `. : o O` dark |
- **Cell content:** num · from · ↓ arrow · to · short desc · "Learn more →" link
- **Texture strip:** Right edge, 100px wide. `+` at bottom-right of strip.

### 3. Offering
- **Background:** `#fafafa`. Texture strip: left edge 100px. `+` at bottom-left of strip.
- **Header:** Tag + H2 "Everything you need to migrate." + subline
- **Three sub-sections stacked:**

#### 3a. Analyzer (screenshot LEFT / text RIGHT — `direction:rtl` on row)
- Screenshot zone: `#EEF5FF`, dot-grid background, `+` corner marks, floating white card
- Card shows: macOS chrome bar → tabs (Overview / Workbooks / Deps) → 3 stat KPIs (847 workbooks / 73% automatable / 24 high risk) → workbook list with readiness bars and badges
- Text: kicker "01 · Free · No commitment" · title "Analyzer" · 4 bullet features · CTA "Run the Analyzer — Free →" (blue underline)

#### 3b. Converter (full-width Feature Carousel)
- **Layout:** 280px step list | remaining screen zone
- **Step list header:** Section tag + "From Tableau to Power BI. In three steps." + subline
- **3 steps with animated progress bar (4.5s auto-advance, clickable):**
  1. **Source** — "Your Tableau dashboard" — original workbooks as-is
  2. **Auto-conversion** — "Automated first pass" — Power BI rebuild, DAX mapping, data validation
  3. **Fine-tuning** — "Manual corrections — 80% less" — pill badge "⏱ ~4 hrs saved vs. manual"
- **Screen zone:** `#F0F6FF`, dot-grid, `+` corner marks
- **Slides (inline base64 SVG from `/screenshots/`):**
  1. `initial tableau.svg` — chrome bar "Tableau Desktop"
  2. `Antares Raw Result.svg` — badge "✓ Antares Converter"
  3. `Manual Fine-tuned Result.svg` — badge "✓ Fine-tuned" + annotation pins + "~4 hrs saved" amber tag
- **Dot nav:** 3 dots below carousel, active dot wider (20px vs 8px)

#### 3c. Professional Services (text LEFT / bento RIGHT — standard)
- Text: kicker "03 · Custom · Full-delivery" · title "Professional Services" · 3 bullets · CTA "Contact us →"
- Bento: 2×2 grid of phase cards. Phase 03 "Testing & Validation" is blue (`#3B82F6`). Phase 04 faded.

### 4. Engagement Model
- **Background:** White. Texture strip: right edge. `+` at bottom-right of strip.
- **Header:** "Start free. Scale with confidence." + "Begin with free analysis. Expand when ready."
- **3-col pricing cards:**
  | Tier | Name | Price |
  |------|------|-------|
  | Start Here | Analyzer | Free |
  | Scale | Converter License | License |
  | Full Service | End-to-End Migration | Custom |
- Price displayed in `#3B82F6`. Features with green checkmarks. CTA buttons: first two blue fill, third grey outline.

### 5. Migration Guides
- **Background:** `#fafafa`. Texture strip: left edge.
- **3 guide cards** with diagonal-texture thumbnail placeholder + guide tag (blue) + title + read time
- **"View all guides →"** underline link below grid

### 6. CTA
- **Background:** White. Diagonal texture in top-left and bottom-right corners (decorative accent).
- **Content (centered):** Tag · "Your migration starts with *one free analysis.*" (italic = `#3B82F6`) · subline · two CTAs
- **CTAs:** "Run the Analyzer — Free →" (amber fill, black text) + "Talk to an expert" (outline)

### 7. Footer
- **Background:** `#0a0a0a`
- **4-col layout:** Antares logo + tagline · Platform links · Resources · Company
- **Bottom bar:** copyright + Privacy/Terms

---

## Component Reuse from v2

| Component | Action |
|-----------|--------|
| `TextureOverlay` | Reuse as-is — used for diagonal strip zones |
| `TextAnimate` | Reuse for hero H1 animation |
| `AnimatedNumber` | Reuse for stats if needed |
| `GradientHeading` | Optional, replace with custom if needed |
| `Nav` | Reuse structure, update links |
| `Footer` | Reuse structure |
| `MigrationPaths` | Full replace with bento grid approach |

---

## New Components to Build

| Component | Description |
|-----------|-------------|
| `HeroAsciiCircle` | `<canvas>` component — density-ramp ASCII art circle |
| `BentoAsciiCell` | Bento cell with canvas ASCII shape in right 45% |
| `ConverterCarousel` | Feature carousel with 3 steps, slide transitions, auto-play |
| `SectionCrossmark` | Reusable `+` mark component |
| `TextureStrip` | Reusable 100px diagonal strip with optional bottom crossmark |

---

## Decisions & Constraints

- **No dark sections** in the body. Dark only: footer (`#0a0a0a`) and Tableau→Databricks bento cell (`#111`).
- **ASCII shapes are canvas-rendered**, not CSS — shapes are meaningful (arrow, circles, flow curve) not random scatter.
- **SVG screenshots** for the Converter carousel must be embedded as base64 data URIs in the built output (server can't serve them as static assets without configuration).
- **Primary color** is `#3B82F6`. Used for all interactive/primary UI elements: main CTAs, links, active states, pricing, progress bars. Amber `#FFB800` is the secondary accent — decorative only (section tag squares, hero headline em, ASCII glow, time-saved badge).
- **Texture strips** are always 100px wide, full section height, positioned on alternating edges (right → left → right...).
- **Crossmarks** are centered on the intersection point (offset `-8px` from boundary), color `#555`.
