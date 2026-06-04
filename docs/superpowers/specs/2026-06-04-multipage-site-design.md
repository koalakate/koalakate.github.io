# Antares v2 — Multi-Page Site Redesign

**Date:** 2026-06-04  
**Scope:** Home page overhaul + three new pages: /analyzer, /converter, /migration-library

**Style:** All new pages and components follow the **v2 design language** — not v3. This means:
- Full light theme throughout (white/neutral backgrounds)
- No ASCII art, no canvas animations, no diagonal texture strips
- Typography: Helvetica Neue, neutral-900 headings, neutral-500 body
- Primary colour: `#3B82F6` (blue) for CTAs and active states
- Borders: `border-neutral-200`, rounded corners (`rounded-xl` / `rounded-2xl`)
- Shadows: `shadow-[0_8px_40px_rgba(0,0,0,0.08)]` style (subtle, not dramatic)
- Existing components (`AsciiSphere`, `TextureStrip`, `SectionCross`) are **not** used on new pages

---

## 1. Decisions Log

| # | Decision |
|---|----------|
| H1 | "BI Migration — from analysis to delivery, automated." |
| Hero widget | Light/white card: ring chart (Readiness Score 68), complexity tags (LOD, Custom SQL, Parameters), progress bar (Auto-convertible 61%). Replaces ASCII sphere. |
| Hero CTAs | "Run the Analyzer — Free" (primary, blue) → `https://try.getantares.io` / "How it works" (secondary) → `#how-it-works` anchor |
| Get in Touch | Full-screen modal form. Triggered from: nav, CTA section, migration paths custom cell. NOT in hero. |
| Manifesto | Pull-quote section between hero and How It Works: *"You cannot migrate what you haven't analyzed."* |
| How It Works | New section (id="how-it-works") with 4 steps: Scan → Analyze → Plan → Convert |
| Migration paths | Three tiers: Now (green) / This year (amber) / Lead gen (muted) |
| Guides → | Renamed to "Migration Library", nav link + section heading updated. Links to /migration-library |
| Blog slug | /migration-library/[slug] |

---

## 2. Home Page

### 2.1 Nav

Current nav links: keep existing structure.  
Add **"Get in Touch"** button (secondary, far right) that opens the modal.  
Nav links updated: "Guides" → "Migration Library" → `/migration-library`.

### 2.2 Hero

Layout: left text column + right widget (desktop), stacked (mobile).

**Left column:**
```
BI Migration Platform                    ← eyebrow, uppercase, neutral-500

BI Migration —
from analysis to
delivery, automated.                     ← H1, clamp(3rem,14vw,5.5rem), bold

Complete visibility into your BI workloads.
Automated conversion. Expert delivery.
70% faster than manual rebuild.          ← subtitle, neutral-500

[Run the Analyzer — Free]  [How it works]
                                         ← primary blue / secondary outline
Read-only analysis. No environment changes. No commitment.
```

**Right column — Readiness Widget (light card):**
- White background, border border-neutral-200, rounded-2xl, shadow
- Ring chart: readiness score 68, neutral ring fill, blue/green arc
- Complexity tags row: `LOD` `Custom SQL` `Parameters` (pill style, neutral bg)
- Progress bar: "Auto-convertible" label left, "61%" right, blue fill bar
- Optional second metric: "Active Users 44%" as small ring (bottom right)
- Static mock data — no interactivity needed

### 2.3 Manifesto strip

Full-width section, minimal padding, centered or left-aligned large text:

> *"You cannot migrate what you haven't analyzed."*

Typography: ~2.5rem, bold, neutral-900. No background colour. Simple border-top/bottom or just whitespace.

### 2.4 How Antares Works  (id="how-it-works")

New section. 4 steps in a horizontal row (desktop) / vertical (mobile).

| Step | Title | Description |
|------|-------|-------------|
| 01 Scan | Connect & inventory | Connect Tableau or upload workbooks. Fast inventory of your full BI environment. |
| 02 Analyze | Surface blockers | Complexity scoring, usage patterns, feature-level risk. Migration Readiness Score. |
| 03 Plan | Roadmap & scope | Readiness score, timeline estimate, execution roadmap. Data-backed stakeholder alignment. |
| 04 Convert | Automate & validate | Automate repeatable conversion. Validate outputs. Reduce rework cycles by 70%. |

Visual treatment: numbered steps with connecting line/arrow, each step a column card.

### 2.5 Migration Paths

Three tiers, replacing the current flat bento. Keep bento grid layout but signal availability clearly.

**Tier 1 — Available now** (green dot / badge):
- Tableau → Power BI
- Tableau → Databricks AI/BI

**Tier 2 — Coming this year** (amber dot / badge):
- Power BI → Tableau
- Qlik → Tableau
- Qlik → Power BI
- Qlik → Databricks AI/BI

**Tier 3 — Coming soon / lead gen** (muted, outlined):
- SAS VA → Power BI
- SAS VA → Databricks AI/BI

**Custom path cell:** already exists in code — update `mailto:` link to trigger Get in Touch modal.

### 2.6 Analyzer section (home teaser)

Keep existing section. Add link "Learn more about Analyzer →" pointing to `/analyzer`.

### 2.7 Converter section (home teaser)

Keep existing section. Add link "Learn more about Converter →" pointing to `/converter`.

### 2.8 Services

No changes.

### 2.9 Pricing

No changes.

### 2.10 Migration Library (was Guides)

Rename section heading + eyebrow to "Migration Library".  
Links remain the same 6 articles for now but point to `/migration-library/[slug]`.  
Bottom link: "View all articles →" → `/migration-library`.

### 2.11 CTA section

Replace "Contact Us" mailto button → "Get in Touch" button opening modal.  
Keep "Run the Analyzer — Free" as primary.

---

## 3. Get in Touch — Modal

Full-screen overlay (inspired by cult-ui.com full-screen form pattern).  

**Trigger points:** Nav button, CTA section secondary button, Migration Paths custom cell link.

**Fields:**
- Name
- Work email
- Company
- What are you migrating? (source → target, free text or dropdown)
- Message (optional)
- Submit: "Send message"

**Behaviour:** ESC or X closes. No page navigation.  
**Implementation note:** single shared `<ContactModal>` component, controlled by global state or context. One instance mounted in layout.tsx.

---

## 4. /analyzer Page

### Structure

**4.1 Hero**
- Eyebrow: "Analyzer"
- H1: "See exactly what you're migrating — before you commit"
- Subtitle: "Free, read-only analysis. Complete visibility into your Tableau environment in minutes."
- CTA: "Run the Analyzer — Free" (primary)

**4.2 Output preview**
Show the readiness widget (same light card component from hero) plus the fuller breakdown:
- Readiness Score ring
- Migration Difficulty breakdown (Extreme / Very High / High / Medium / Low bar chart)
- Auto-convertible % progress bar
- Active Users ring
Static mock data. Caption: "Example output. Not a claim."

**4.3 What Antares analyzes**
Feature-level breakdown in a grid/list:

| Category | What's covered |
|----------|---------------|
| Calculations | LOD expressions (FIXED, INCLUDE, EXCLUDE), calculated fields, table calculations |
| Data | Custom SQL, data blending, data sources, extracts |
| Parameters | Parameters, sets, groups, bins, hierarchies |
| Dashboards | Dashboard actions, layout, filters, tooltips |
| Usage | View counts, active users, last accessed, usage trends by department |
| Dependencies | Cross-workbook dependencies, shared data sources |

**4.4 How it connects**
Short technical section (3 items):
- Read-only — no write access, no environment changes
- Supports Tableau Server and Tableau Cloud
- Output: exportable readiness report (PDF / shareable link)

**4.5 FAQ**
- How long does analysis take?
- What does Antares need access to?
- Is my data secure?
- Can I analyze a subset of workbooks?
- What's in the readiness report?

**4.6 CTA**
"Run the Analyzer — Free" primary + "Get in Touch" secondary.

---

## 5. /converter Page

### Structure

**5.1 Hero**
- Eyebrow: "Converter"
- H1: "Automated conversion. 70% less manual work."
- Subtitle: "Antares handles the repeatable parts so your team focuses on what actually needs a human."
- CTA: "Get in Touch" (primary — converter requires engagement) + "See it in action" → anchors to carousel

**5.2 Conversion carousel**
Existing 3-step carousel component, expanded with more descriptive copy per step:
- Step 01 Source: your existing workbooks, untouched
- Step 02 Auto-Conversion: measure mapping, layout preservation, data validation
- Step 03 Fine-tuning: only edge cases remain — 80% less manual work

**5.3 What converts automatically vs needs review**

Two-column honest breakdown:

| Auto-converts | Needs review |
|---------------|-------------|
| Standard calculated fields → DAX | Complex LOD expressions |
| Basic chart types | Custom SQL with platform-specific syntax |
| Data source connections | Multi-source data blending |
| Filters and slicers | Dashboard actions with conditional logic |
| Layout & formatting | Custom visual extensions |

**5.4 Migration paths**
Same three-tier table as home, but with details per path:
- Tableau → PBI: available now, full coverage
- Tableau → AI/BI: available now, full coverage
- Qlik → PBI / Tableau / AI/BI: coming 2026
- PBI → Tableau: coming 2026
- SAS VA paths: lead gen / notify me

**5.5 Technical details**
- Output QA: automated validation report comparing source vs output
- Supported output formats per target platform (PDF report + shareable link)

**5.6 Time savings**
Single metric callout: "70% time saved vs. manual rebuild" with brief explanation of how it's measured.

**5.7 FAQ**
- What happens to things that can't be auto-converted?
- How does Antares handle custom SQL?
- Can we run conversion incrementally?
- What does the validation report show?

**5.8 CTA**
"Get in Touch" primary + "Run the Analyzer first" secondary → `/analyzer`.

---

## 6. /migration-library (Blog)

### 6.1 Listing page

**Header:**
- Eyebrow: "Migration Library"
- H1: "In-depth resources for BI migration"
- Subtitle: "Technical guides, checklists, and deep dives for migration teams."

**Article grid:**
- 2 columns desktop / 1 column mobile
- Card: title, 2-line excerpt, tags (pills), date
- No author, no hero image per card (content-first)

**Initial articles (6):**
1. Tableau to Power BI Migration — complete guide → `/migration-library/tableau-to-power-bi-migration`
2. LOD expressions to DAX → `/migration-library/tableau-lod-expressions-to-dax`
3. Calculated fields to DAX → `/migration-library/tableau-calculated-fields-to-dax`
4. Migration planning guide → `/migration-library/tableau-migration-planning-guide`
5. Migration best practices → `/migration-library/tableau-to-power-bi-migration-best-practices`
6. Migration checklist → `/migration-library/tableau-migration-checklist`

### 6.2 Article page /migration-library/[slug]

**Layout:**
- Max-width ~760px, centered prose
- H1, date + tags row
- MDX content body
- "More from the Migration Library" section at bottom (3 related cards)
- Sticky CTA sidebar (desktop): "Run the Analyzer — Free"

**Data source:** MDX files in `src/content/migration-library/`. Each file has frontmatter: `title`, `date`, `excerpt`, `tags`, `slug`.

---

## 7. Navigation Updates

New nav structure:
```
Logo | Analyzer | Converter | Migration Library | Pricing | [Get in Touch]
```

- "Analyzer" → `/analyzer`
- "Converter" → `/converter`  
- "Migration Library" → `/migration-library`
- "Pricing" → `/#pricing` (anchor on home)
- "Get in Touch" → opens modal

---

## 8. Routing (Next.js App Router)

```
src/app/
  page.tsx                          ← Home (existing, updated)
  analyzer/
    page.tsx                        ← /analyzer
  converter/
    page.tsx                        ← /converter
  migration-library/
    page.tsx                        ← /migration-library listing
    [slug]/
      page.tsx                      ← /migration-library/[slug]
src/content/
  migration-library/
    *.mdx                           ← 6 initial articles
```

---

## 9. Shared Components (new/updated)

| Component | Notes |
|-----------|-------|
| `ReadinessWidget` | Light card, ring chart, tags, progress bar. Used in hero + /analyzer |
| `ContactModal` | Full-screen overlay form. Mounted once in layout.tsx |
| `HowItWorks` | 4-step section. Used on home page |
| `MigrationPathsTiered` | Updated bento with 3-tier availability |
| `ArticleCard` | Blog listing card |
| `ArticleLayout` | MDX article wrapper |
| Nav | Updated links + Get in Touch trigger |

---

## 10. Out of Scope

- CMS integration (MDX files only for now)
- Authentication / gated content
- Search within Migration Library
- Comment system
- Pricing page changes
- Services page changes
