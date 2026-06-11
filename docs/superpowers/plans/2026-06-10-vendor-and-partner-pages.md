# Vendor pages + Partners page

**Date:** 2026-06-10
**Status:** In progress (build on `preview/gh-pages`, deploy to `…/antares-preview/next/`)

## Goal

1. **Vendor landing pages** — `/microsoft`, `/salesforce`, `/databricks`. One
   data-driven **typical template**; each vendor is a config entry. Add to nav.
2. **`/partners`** — list of partners, partner-program description, and a
   "Become a partner" CTA.

Production `getantares.io` is NOT touched. Work is previewed at
`https://koalakate.github.io/antares-preview/next/` (a `next/` subfolder of the
existing preview repo, base path `/antares-preview/next`), separate from the
current `/antares-preview/` snapshot under colleague review.

## Decisions / assumptions

- **URLs:** path-based at root (`/microsoft`, `/salesforce`, `/databricks`),
  not a `vendors.` subdomain — consistent and works on static Pages. (Subdomain
  remains a later option.)
- **Vendor ↔ platform mapping:**
  - Microsoft → **Power BI** (conversion *target*).
  - Salesforce → **Tableau** (Salesforce owns Tableau; the *source* we migrate from).
  - Databricks → **Databricks AI/BI** (conversion *target*).
- **Template = one component + config.** `src/lib/vendors.ts` (typed config),
  `src/components/vendor-landing.tsx` (renders any vendor), three thin route
  files. No dynamic catch-all route (keeps routing explicit/safe in export).
- **Nav:** desktop gets a **Platforms ▾** dropdown (Microsoft / Salesforce /
  Databricks); mobile gets an expandable Platforms group. **Partners** added to
  the footer (and the mobile menu).
- **Brand logos:** use a tasteful accent-colored monogram chip per vendor — NOT
  guessed brand SVGs (would risk wrong/again trademarked marks). TODO: drop in
  official logos later.
- **"Become a partner" / vendor CTAs:** reuse the existing ContactModal
  (`openModal`) and `https://try.getantares.io`.

## Typical vendor page (sections)

1. **Hero** — eyebrow "Platform · <Vendor>", vendor-specific H1 + subcopy,
   primary/secondary CTA, reassurance line, accent monogram chip.
2. **What Antares does for <vendor>** — 3 cards (Analyze / Convert / Deliver),
   copy tailored to whether the vendor is a source or target.
3. **Expertise highlight** — a few construct-mapping rows for the relevant pair
   (reusing the conversion-showcase data), linking to `/converter` for the full
   switcher.
4. **Migration paths** — the paths that involve this vendor (from canonical
   PATHS), with honest now/2026/notify status.
5. **Related guides** — filtered migration-library links.
6. **FAQ** — 3–4 vendor-specific Q&As.
7. **CTA**.

## Partners page (sections)

1. **Hero** — "Partner with Antares" + Become-a-partner CTA + intro.
2. **Program description** — why partner, what you get.
3. **Partner types** — Delivery / Technology / Referral (cards).
4. **Our partners** — current partners (T1A delivery; Microsoft & Databricks as
   technology/platform partners).
5. **How to become a partner** — short steps + CTA.

## Files

- `src/lib/vendors.ts` — config + types
- `src/components/vendor-landing.tsx` — template
- `src/app/{microsoft,salesforce,databricks}/page.tsx` — routes (+ metadata)
- `src/app/partners/page.tsx` — partners page
- `src/components/nav.tsx` — Platforms dropdown
- `src/components/footer.tsx` — Partners link

## Deploy

Build with `NEXT_PUBLIC_BASE_PATH=/antares-preview/next`, push the export into
`next/` of `koalakate/antares-preview`, served at
`koalakate.github.io/antares-preview/next/`.
