# Design Bugfix Plan — 2026-06-08

Outcome of a full-site design review (4 parallel reviewers across homepage, subpages, and the shared UI layer). Scope: objective design bugs and design-system inconsistencies. Subjective redesigns excluded.

## A. Accessibility (P0)
- [x] A1 — Global `focus-visible` ring for links/buttons (none existed). `globals.css` `@layer base`.
- [x] A2 — Contact modal: focus trap + autofocus + focus restore on close. `ui/contact-modal.tsx`.
- [x] A3 — Low-contrast `text-neutral-400` on light backgrounds → `text-neutral-500` (eyebrows, converter status cards, migration-paths custom card).
- [x] A4 — `aria-hidden` on decorative list glyphs (analyzer `⟶`, converter page `✓`/`⚑`).

## B. Eyebrow consistency (P1) → `text-xs font-medium tracking-[0.08em] uppercase text-neutral-500`
- [x] `converter.tsx` (was `text-neutral-400 mb-5`)
- [x] `migration-paths.tsx` (was `text-[0.65rem] font-bold tracking-[0.14em] text-neutral-400 mb-4`)
- [x] `pricing.tsx` tier label (was `text-[0.75rem] font-semibold text-neutral-400`)

## C. Heading consistency (P1)
- [x] H2 color → `text-neutral-950`: `services.tsx`, `analyzer-cta.tsx`, `contact-modal.tsx`.
- [x] `analyzer.tsx` H2 `leading-[1.08]` → `leading-[1.1]`.

## D. Section vertical rhythm (P1)
- [x] Content sections → `py-14 lg:py-[120px]`: `manifesto.tsx`, subpage sections (analyzer/converter pages, `lg:py-[100px]` → `120px`).
- [x] CTA sections → `py-[80px] lg:py-[120px]`: `cta.tsx` (`140px` → `120px`).

## E. Buttons (P1)
- [x] Radius → `rounded` everywhere: `nav.tsx`, `contact-modal.tsx` submit, `migration-library/[slug]` sidebar.
- [x] `pricing.tsx` primary button missing `hover:-translate-y-px`.
- [x] `nav.tsx` mobile secondary: dead `transition-colors` with no hover state → add `hover:border-neutral-900`.

## F. Concrete bugs (P0/P1)
- [x] `converter/page.tsx`: dead ternary `path.muted ? "text-neutral-400" : "text-neutral-400"` + low-contrast status eyebrow → `muted ? neutral-500 : neutral-400`.
- [x] `converter/page.tsx` hero bottom padding `md:pb-[80px]` → `md:pb-[100px]` (match analyzer).
- [x] `migration-paths.tsx` "soon" tier card unreadable muted text → base `text-neutral-700`.
- [x] `analyzer/page.tsx` H2 margin `mb-12` → `mb-10` (match sibling sections).

## Follow-up — done 2026-06-09
- [x] **Brand tokens** — `--brand`/`--brand-hover` in `globals.css`; replaced all 30 hardcoded `#3B82F6`/`#2563EB` utility usages with `brand`/`brand-hover` utilities. Verified in built CSS. (Chart-palette hex in `readiness-widget` intentionally left — it's data-viz, not the brand token.)
- [x] **Shared button** — new `ui/cta-button.tsx` (`<a>`/`<button>` polymorphic, primary/secondary). Adopted across hero, cta, analyzer, analyzer-cta, pricing, converter page (×4), analyzer page hero. Added a `brand` variant to the Base-UI `Button` for design-system completeness. (Nav compact buttons + modal submit + article sidebar mini-CTA left hand-rolled but tokenized — distinct sizes.)
- [x] **Redesign** — removed dead `minimal-card.tsx`; partner cards now use a brand monogram + name + role tag (kills the duplicated abbreviation); `pricing` `featured` tier gets a "Most popular" badge + brand ring.

## Still deferred (need product decision)
- `mailto:` form POST is unreliable — wire to a real endpoint/form service. **(Not yet approved; the highest-value remaining item.)**
