# Analyzer & Converter — platform-specific depth

**Date:** 2026-06-09
**Status:** Validated (brainstorming complete) → implementing

## Understanding summary

Deepen the Analyzer and Converter pages so each "opens up its own stage" with
**platform-specific depth**, and give each page a way to **switch between
platforms**. Both pages are currently single-track (Tableau-only) and the
Converter page duplicates the home page's 3-step `<Converter />` carousel.

- **Audience:** BI leads / migration owners evaluating Antares. They need to
  trust it understands *their* platform's hard parts, not generic marketing.
- **Converter page:** stop reusing the home carousel (it stays on home as a
  teaser). Replace it with a **conversion-pair expertise showcase**.
- **Analyzer page:** add a **source-platform switcher**; remove the
  `<ReadinessWidget />` from the hero.
- **Honesty:** every platform appears, roadmap ones carry honest
  `Available now / Coming 2026 / Notify me` badges (matches existing `PATHS`).
- No backend/data changes — content + UI only; same Next.js / Tailwind / motion
  stack.

## Decisions (log)

| Decision | Chosen | Alternatives | Why |
|---|---|---|---|
| Interaction pattern | Interactive expertise panels | Matrix-first; scrollytelling | Delivers "switch + particularities"; reusable; uses existing content |
| Converter switcher unit | Conversion **pairs** (source segmented control → target pills) | By target only; 8 flat pills | Matches `PATHS`; avoids pill overload |
| Roadmap platforms | Shown with honest badges + preview + notify CTA | Hide; fake support | Credibility |
| Converter page structure | Showcase **absorbs** the carousel + auto/review list + paths grid | Stack showcase on top | Deeper without bloat; kills home duplication |
| Analyzer "what we analyze" | **Becomes** the platform switcher (Tableau content reorganized by difficulty) | Add a separate section | Avoids redundancy |
| Analyzer hero visual | `ascii-sphere` | Keep a widget; empty column | Fills space without re-introducing a widget |
| Component design | 2 dedicated switchers + shared `StatusBadge` + `DifficultyPill` | One generic abstraction | YAGNI; panels differ |

## Design

### Shared primitives
- `StatusBadge` — `now | year | soon` → `Available now / Coming 2026 / Notify me`
  with the existing dot colors (green / amber / neutral).
- `DifficultyPill` — `easy | medium | hard` → colored pill.

### Converter: `ConversionShowcase` (client)
- **Switcher:** source segmented control (`Tableau · Power BI · Qlik · SAS VA`);
  below, target pills for that source, each with a status dot. Default
  `Tableau → Power BI`.
- **Live-pair panel:** construct-mapping rows
  (`source construct → target equivalent` + Auto/Review tag + `DifficultyPill`
  + one-line note); one flagship side-by-side code card (Tableau LOD ↔ DAX);
  "Full guide →" link to `/migration-library/tableau-lod-expressions-to-dax`.
- **Roadmap-pair panel:** muted construct-category preview + `Notify me` CTA
  (`openModal`).
- Pairs sourced from existing `PATHS` (8 total; Tableau→Power BI and
  Tableau→Databricks AI/BI are live/rich).

### Analyzer: `AnalysisCoverage` (client)
- **Switcher:** source-platform tabs (`Tableau` live; `Power BI / Qlik / SAS VA`
  roadmap-badged).
- **Panel:** that platform's constructs grouped by migration difficulty, each
  with "what makes this hard / what the Analyzer detects & scores" — ties to the
  readiness score. Tableau reuses current `FEATURES`, reorganized by difficulty.
- Replaces the static "What Antares analyzes" section.
- **Hero:** drop `<ReadinessWidget />`; keep headline + CTA + reassurance line;
  `ascii-sphere` in the right column.

### Page flows after
- **Converter:** Hero → ConversionShowcase → FAQ → CTA.
- **Analyzer:** Hero (sphere) → AnalysisCoverage (switcher) → How it connects →
  FAQ → CTA.

## Assumptions
- Roadmap pairs/platforms get real per-platform copy (what we *will* cover),
  behind a badge — not empty placeholders.
- Home page untouched.
