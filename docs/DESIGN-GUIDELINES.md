# Antares — Design & Content Guidelines

A practical style reference for creating on-brand content (web pages, marketing-library
articles, decks, social, microcopy). Every value below is drawn from the live codebase
(`src/app/globals.css`, shared components). Follow it so new content looks and reads like
the rest of the site **and** stays WCAG 2.1 AA compliant.

> Stack note: Next.js + Tailwind v4 + shadcn. Colors/radii live as CSS variables in
> `globals.css`; spacing/typography are Tailwind utilities. When in doubt, reuse a
> component (`CtaButton`, tier cards, eyebrow labels) rather than re-styling by hand.

---

## 1. Brand personality

Antares is a **BI migration platform** (Tableau → Power BI, Databricks AI/BI, SAS VA).
The voice is that of a **calm, senior engineer**: precise, confident, zero hype.

| We are | We are not |
|---|---|
| Clear, technical, specific | Salesy, buzzword-y, breathless |
| Reassuring ("read-only", "no commitment") | Vague or hand-wavy |
| Confident in numbers ("70% faster") | Over-promising or absolute ("100%", "instant") |
| Structured, sequential (analyze → convert → deliver) | Chaotic or feature-dumping |

The core narrative is always **analysis first**: *"You cannot migrate what you haven't analyzed."*

---

## 2. Voice & tone

**Headline formula** — short declarative statements, often two beats split by a period or em-dash. Sentence case, not title case.

Real examples (reuse the cadence, not the exact words):
- `BI Migration — from analysis to delivery, automated.`
- `A structured process. No surprises.`
- `See exactly what you're migrating — before you commit.`
- `Automated conversion. 70% less manual work.`
- `Where are you headed?`

**Sub-headline / body** — one or two sentences, plain language, lead with the benefit. Em-dashes (`—`) for asides are part of the house style.
- `Antares analyzes your estate, auto-converts dashboards, and backs it with expert delivery — 70% faster than a manual rebuild.`

**Reassurance microcopy** — recurring trust signals; use near every CTA:
- `Read-only analysis. No environment changes. No commitment.`
- `Analyze for free today. Convert when you're ready.`

**CTA copy** — verb-first, low-friction:
- Primary: `Run the Analyzer — Free`, `Run the free analyzer`
- Section closers: `Ready to see your environment?`, `Ready to convert?`, `Let's talk migration.`
- Secondary: `How it works`, `Get in Touch`, `View all articles →` (trailing `→` for inline text links)

**Claims** — the redesign deliberately uses the bolder **70%** figure (vs. the more
conservative 61% on the legacy getantares.io). Keep "70% faster / 70% less manual work"
as the standard headline claim. Never round up past it or invent new percentages.

**Do / Don't**
- ✅ "Most environments complete in minutes." → ❌ "Lightning-fast results!"
- ✅ "Read-only access. No write permissions are ever requested." → ❌ "Totally safe and secure."
- ✅ Sentence case headlines. → ❌ Title Case Everywhere.

---

## 3. Typography

**Family:** `'Helvetica Neue', Helvetica, Arial, sans-serif` (set on `<body>`). Monospace
(`--font-mono`, Geist Mono) is reserved for code, data tables, and file names (`tabular-nums`
for numeric columns).

**Type scale** (responsive via `clamp(min, vw, max)` — these exact values are the system):

| Role | Class | Notes |
|---|---|---|
| Hero H1 | `text-[clamp(2.6rem,6vw,4.5rem)]` | `leading-[1.0] tracking-[-0.04em] font-bold` |
| Big statement | `text-[clamp(2rem,6vw,4.5rem)]` | Manifesto-style editorial lines |
| Section H2 | `text-[clamp(2rem,4vw,3rem)]` | **most common** — `tracking-[-0.03em] font-bold` |
| Display H2 | `text-[clamp(2.4rem,5vw,4rem)]` | larger section heads |
| Sub-head | `text-[clamp(1.1rem,2.5vw,1.5rem)]` | |
| Lead paragraph | `text-[clamp(1rem,2vw,1.25rem)]` | `font-medium text-neutral-500` |
| Body | `text-base` / `text-sm` | |
| Eyebrow / overline | `text-xs` (or `text-[0.6rem]`) | see §6 |

**Rules**
- Headings: **bold**, tight negative tracking (`-0.03em` to `-0.04em`), tight leading (~1.0–1.15).
- One `<h1>` per page. Don't skip heading levels (h1 → h2 → h3).
- Eyebrows/overlines: **uppercase**, positive tracking (`0.08em` standard), small, muted.

---

## 4. Color

Brand and neutrals are the system. Color is used **sparingly** — the palette is
near-monochrome with a single blue accent.

### Brand (single source of truth — `--brand`)
| Token | Hex | Use |
|---|---|---|
| `--brand` / `bg-brand` / `text-brand` | `#2563eb` | Primary CTAs, active states, inline text links, focus ring |
| `--brand-hover` | `#1d4ed8` | Hover state, and any brand text **on a tinted background** |
| `bg-brand/10` | — | Subtle brand-tinted badge backgrounds (pair with `text-brand-hover`) |

> ⚠️ Do **not** use the old `#3b82f6` — it fails contrast on white (3.67:1). `#2563eb` is
> the minimum acceptable brand blue (5.2:1).

### Neutrals (text & surfaces)
| Class | Role |
|---|---|
| `text-neutral-950 / 900` | Primary headings & body text |
| `text-neutral-700` | Secondary/de-emphasized text **on light** (still strong) |
| `text-neutral-600` | **Minimum for muted text on light/tinted backgrounds** (eyebrows, dates, labels, captions) |
| `text-neutral-500` | Muted text **only on pure white** (`#fff`); avoid on `neutral-50/100` tints |
| `text-white` + `text-white/70` | Body + muted text **on dark cards** |
| `bg-white` `bg-neutral-50` `bg-neutral-100` | Page / card / chip surfaces |
| `bg-neutral-950` `bg-neutral-800` | Dark feature cards (white text) |
| `border-neutral-200` | Hairline borders, dividers (`<hr>`) |

### Semantic accents (status only — never decorative)
| Meaning | Color | Example |
|---|---|---|
| Available / success | `bg-green-500` dot, `text-green-700` | "Available now" tier |
| Upcoming / caution | `bg-amber-400` dot, `text-amber-700` on `bg-amber-50` | "Coming 2026", info pills |
| Unavailable / neutral | `bg-neutral-300` dot | "Notify me" tier |
| Error / removed | `text-red-700` on `bg-red-50` | destructive states |

---

## 5. Layout & spacing

- **Container:** `max-w-[1200px] mx-auto px-6` (standard). `1320px` for the hero only.
- **Section rhythm:** `py-14 lg:py-[120px]` — the canonical vertical padding for every major section.
- **Section dividers:** thin `<hr className="border-t border-neutral-200" />` between sections.
- **Grids:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (or `-4`) with `gap-3`–`gap-8`.
- **Mobile-first:** design at 375px up. No horizontal overflow — ever.

### Radii (`--radius: 0.625rem`)
`rounded-full` (pills, dots, badges — most common) · `rounded-2xl` (cards) · `rounded-lg`
(buttons, tabs, inputs) · `rounded` (small buttons). Match the radius to the existing
element type; don't introduce new corner sizes.

---

## 6. Components & patterns

**Primary button** (`CtaButton`, variant `primary`)
`bg-brand text-white font-semibold px-8 py-3 rounded` + `hover:bg-brand-hover hover:-translate-y-px`.

**Secondary button** (variant `secondary`)
`bg-transparent border-[1.5px] border-neutral-900 text-neutral-900` + `hover:bg-neutral-900 hover:text-white`.

**Inline text link** — `text-brand hover:text-brand-hover`, often with a trailing `→`.

**Eyebrow / overline** (section labels)
`text-xs font-medium tracking-[0.08em] uppercase text-neutral-600 mb-6`.
Examples: `How Antares Works`, `Migration Paths`. Always muted, never `neutral-400/500`.

**Badge / chip** — `rounded-full`, tiny uppercase, e.g. tags:
`text-[0.65rem] font-semibold uppercase tracking-[0.08em] bg-neutral-100 text-neutral-600 px-2.5 py-1`.
Brand variant: `bg-brand/10 text-brand-hover`.

**Status pill** (info/warning) — `text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full`.

**Feature cards** — dark (`bg-neutral-950/800 text-white`) for emphasis, light
(`bg-neutral-100 ... border border-neutral-200`) for secondary. Signal state with a
**colored dot**, not with low opacity.

**Dates** — format `Month D, YYYY` (`en-US`, **always `timeZone: "UTC"`**) in
`text-xs text-neutral-600`.

---

## 7. Imagery & texture

- **ASCII / dithered texture** — the signature visual motif (logo intro, hero backdrops).
  Keep it monochrome and subtle; it's atmosphere, not foreground.
- **Grain / noise overlay** — `TextureOverlay` at very low opacity (~0.035). Use for depth, never loud.
- **Product screenshots** — show real readiness scores, conversion mappings, dashboards.
  Always label mock data ("Example data. Not a claim.").
- **Motion** — purposeful and quick (framer-motion). Respect `prefers-reduced-motion`:
  content must stay fully visible with animation disabled.

---

## 8. Accessibility (non-negotiable)

The whole site passes **WCAG 2.1 AA**. Keep it that way:

- **Contrast ≥ 4.5:1** for normal text, **≥ 3:1** for large/bold (≥24px or ≥18.66px bold).
  - Muted text on light/tinted backgrounds → **`neutral-600` minimum** (never 400/500 on a tint).
  - Brand text on white → `#2563eb`; on a tint (`bg-brand/10`) → `#1d4ed8`.
- **Never use `opacity` to de-emphasize text** below the contrast floor. Show hierarchy via
  color, size, and accent marks (dots, bars) instead.
- One `<h1>` per page; logical heading order; descriptive `alt` on every image.
- Every interactive element keeps a visible focus ring (`2px solid var(--brand)`, 2px offset).
- Buttons/links need an accessible name (visible text or `aria-label`).

---

## 9. Quick checklist before publishing

- [ ] Headline is sentence case, short, declarative.
- [ ] Claims match the house figure (**70%**), nothing invented.
- [ ] A reassurance line sits near the CTA ("read-only / no commitment").
- [ ] Eyebrow uppercase + `tracking-[0.08em]` + `text-neutral-600`.
- [ ] Brand blue is `#2563eb` (links/buttons), `#1d4ed8` on tinted bg.
- [ ] Muted text is `neutral-600`+ on light, `white/70` on dark.
- [ ] Section uses `max-w-[1200px]` + `py-14 lg:py-[120px]`.
- [ ] Dates formatted `Month D, YYYY` with `timeZone: "UTC"`.
- [ ] No contrast or heading-order regressions (run axe if unsure).
