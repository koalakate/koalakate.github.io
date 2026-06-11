import type { Tier, Difficulty, Mode } from "@/components/ui/platform-bits";

/* ----------------------------------------------------------------------------
 * Vendor landing-page config. One entry per platform vendor; the
 * <VendorLanding> component renders any of them. Keep copy honest — roadmap
 * paths carry their real tier.
 * -------------------------------------------------------------------------- */

export interface VendorPath {
  from: string;
  to: string;
  tier: Tier;
}

export interface VendorConstruct {
  from: string;
  to?: string; // omitted for source-platform analysis rows
  mode: Mode;
  difficulty: Difficulty;
  note: string;
}

export interface VendorGuide {
  title: string;
  href: string;
}

export interface VendorFaq {
  q: string;
  a: string;
}

export interface Vendor {
  slug: string;
  name: string; // "Microsoft"
  product: string; // "Power BI"
  role: "source" | "target";
  accent: string; // brand-ish accent hex
  accentText: string; // readable text on accent
  monogram: string;
  eyebrow: string;
  h1: string;
  subcopy: string;
  reassurance: string;
  intro: string;
  cards: { title: string; body: string }[];
  expertiseTitle: string;
  expertiseLink: string; // deep link into /converter or /analyzer
  constructs: VendorConstruct[];
  paths: VendorPath[];
  guides: VendorGuide[];
  faqs: VendorFaq[];
  metaTitle: string;
  metaDescription: string;
}

export const VENDORS: Vendor[] = [
  {
    slug: "microsoft",
    name: "Microsoft",
    product: "Power BI",
    role: "target",
    accent: "#F2C811",
    accentText: "#1A1A1A",
    monogram: "M",
    eyebrow: "Platform · Microsoft Power BI",
    h1: "Migrate to Microsoft Power BI — automated.",
    subcopy:
      "Antares analyzes your existing BI estate and rebuilds it in Power BI — measures, models, and dashboards — weeks of manual rebuilding, done in days.",
    reassurance: "Free analysis first. No environment changes.",
    intro:
      "Power BI is the most common migration target we see. Antares maps each Tableau construct to its DAX and Power BI equivalent, flags what needs a human, and validates every output against the source.",
    cards: [
      { title: "Analyze", body: "Score your Tableau estate for Power BI readiness — complexity, DAX-mapping difficulty, and effort, per workbook." },
      { title: "Convert", body: "Auto-convert calculated fields and LODs to DAX, blends to model relationships, and layouts to Power BI reports." },
      { title: "Deliver", body: "Expert delivery finishes the edge cases, validates measures, and hands over a production-ready Power BI workspace." },
    ],
    expertiseTitle: "Tableau → Power BI, construct by construct",
    expertiseLink: "/converter",
    constructs: [
      { from: "Calculated fields", to: "DAX measures & columns", mode: "auto", difficulty: "easy", note: "Row-level vs. aggregate logic routed to the right DAX form." },
      { from: "LOD expressions (FIXED / INCLUDE / EXCLUDE)", to: "CALCULATE + ALLEXCEPT", mode: "review", difficulty: "hard", note: "Granularity is implicit in DAX filter context — each LOD is re-expressed and validated." },
      { from: "Table calculations", to: "DAX window functions", mode: "auto", difficulty: "medium", note: "Running and percent-of-total patterns mapped over the right partition." },
      { from: "Data blending", to: "Model relationships", mode: "review", difficulty: "medium", note: "Blends become an explicit data model, not a runtime join." },
      { from: "Row-level security", to: "RLS roles", mode: "review", difficulty: "medium", note: "User-filter logic translated to roles and DAX rules." },
    ],
    paths: [
      { from: "Tableau", to: "Power BI", tier: "now" },
      { from: "Qlik", to: "Power BI", tier: "year" },
      { from: "SAS VA", to: "Power BI", tier: "soon" },
      { from: "Power BI", to: "Tableau", tier: "year" },
    ],
    guides: [
      { title: "Tableau to Power BI — complete guide", href: "/migration-library/tableau-to-power-bi-migration" },
      { title: "LOD expressions to DAX", href: "/migration-library/tableau-lod-expressions-to-dax" },
      { title: "Calculated fields to DAX", href: "/migration-library/tableau-calculated-fields-to-dax" },
      { title: "Migration best practices", href: "/migration-library/tableau-to-power-bi-migration-best-practices" },
    ],
    faqs: [
      { q: "Do you support Power BI Service and Report Server?", a: "Yes. Antares targets Power BI in the Service (Pro/PPU/Premium) and can produce artifacts for Report Server deployments." },
      { q: "How are DAX measures validated?", a: "Each converted measure is compared value-for-value against the Tableau source; discrepancies are highlighted in the validation report." },
      { q: "Can we convert incrementally?", a: "Yes — workbook by workbook or in batches, with a conversion log tracking what's done." },
    ],
    metaTitle: "Migrate to Microsoft Power BI — Antares",
    metaDescription: "Automated Tableau → Power BI migration. Antares maps calculations to DAX, validates every output, and delivers a production-ready Power BI workspace.",
  },
  {
    slug: "salesforce",
    name: "Salesforce",
    product: "Tableau",
    role: "source",
    accent: "#00A1E0",
    accentText: "#FFFFFF",
    monogram: "S",
    eyebrow: "Platform · Salesforce Tableau",
    h1: "Moving off Salesforce Tableau? See your estate first.",
    subcopy:
      "Antares gives you a free, read-only analysis of your Tableau environment — complexity, usage, and dependencies — so you can plan a migration with confidence.",
    reassurance: "Read-only. No environment changes. No commitment.",
    intro:
      "Tableau, a Salesforce company, is where most migrations start. Antares understands Tableau's hardest constructs — LOD expressions, table calcs, blends — and scores exactly how hard each workbook is to move, to any target.",
    cards: [
      { title: "Analyze", body: "Free, read-only scan of your Tableau Server or Cloud — readiness score, complexity, and usage per workbook." },
      { title: "Convert", body: "Convert Tableau to Power BI or Databricks AI/BI, with the hard constructs mapped and flagged for review." },
      { title: "Deliver", body: "Expert-led delivery handles the edge cases, so the migration lands without surprises." },
    ],
    expertiseTitle: "What Antares accounts for in Tableau",
    expertiseLink: "/analyzer",
    constructs: [
      { from: "LOD expressions (FIXED / INCLUDE / EXCLUDE)", mode: "review", difficulty: "hard", note: "Implicit granularity is detected and scored — the hardest construct to move." },
      { from: "Data blending", mode: "review", difficulty: "medium", note: "Blends aren't joins; flagged wherever the target needs an explicit model." },
      { from: "Table calculations", mode: "auto", difficulty: "medium", note: "Partition and addressing semantics inventoried per view." },
      { from: "Custom SQL", mode: "review", difficulty: "medium", note: "Dialect-specific SQL detected and rated for portability." },
      { from: "Calculated fields & parameters", mode: "auto", difficulty: "easy", note: "Standard logic catalogued with every downstream reference." },
    ],
    paths: [
      { from: "Tableau", to: "Power BI", tier: "now" },
      { from: "Tableau", to: "Databricks AI/BI", tier: "now" },
    ],
    guides: [
      { title: "Tableau migration planning guide", href: "/migration-library/tableau-migration-planning-guide" },
      { title: "Tableau migration checklist", href: "/migration-library/tableau-migration-checklist" },
      { title: "Tableau to Power BI — complete guide", href: "/migration-library/tableau-to-power-bi-migration" },
      { title: "LOD expressions to DAX", href: "/migration-library/tableau-lod-expressions-to-dax" },
    ],
    faqs: [
      { q: "Is the analysis really free?", a: "Yes. The Analyzer is free and read-only — you get a full readiness report before committing to anything." },
      { q: "What access does Antares need?", a: "Read-only access to Tableau Server or Tableau Cloud via the REST API. No write permissions, ever." },
      { q: "Which targets can we migrate Tableau to?", a: "Power BI and Databricks AI/BI are available now; more targets are on the roadmap." },
    ],
    metaTitle: "Migrate from Salesforce Tableau — Antares",
    metaDescription: "Free, read-only analysis of your Salesforce Tableau estate, then automated conversion to Power BI or Databricks AI/BI.",
  },
  {
    slug: "databricks",
    name: "Databricks",
    product: "Databricks AI/BI",
    role: "target",
    accent: "#FF3621",
    accentText: "#FFFFFF",
    monogram: "D",
    eyebrow: "Platform · Databricks AI/BI",
    h1: "Migrate to Databricks AI/BI — on your lakehouse.",
    subcopy:
      "Antares converts your Tableau dashboards into Databricks AI/BI — SQL, metric views, and dashboards — right next to your data, in a fraction of the manual effort.",
    reassurance: "Free analysis first. No environment changes.",
    intro:
      "Databricks AI/BI brings analytics to the lakehouse. Antares compiles Tableau logic to Databricks SQL and metric views, resolves blends into modeled joins, and maps security to Unity Catalog.",
    cards: [
      { title: "Analyze", body: "Score your Tableau estate for a Databricks AI/BI move — what ports cleanly to SQL and what needs rework." },
      { title: "Convert", body: "Auto-convert calculations to SQL and metric views, table calcs to window functions, and blends to modeled joins." },
      { title: "Deliver", body: "Expert delivery wires up Unity Catalog security, validates outputs, and ships AI/BI dashboards." },
    ],
    expertiseTitle: "Tableau → Databricks AI/BI, construct by construct",
    expertiseLink: "/converter",
    constructs: [
      { from: "Calculated fields", to: "SQL / metric-view measures", mode: "auto", difficulty: "easy", note: "Field logic compiled to SQL or a metric-view measure." },
      { from: "LOD expressions (FIXED / INCLUDE / EXCLUDE)", to: "Windowed aggregates / GROUP BY", mode: "review", difficulty: "hard", note: "Fixed granularity expressed with window functions over the correct grain." },
      { from: "Table calculations", to: "SQL window functions", mode: "auto", difficulty: "medium", note: "Running totals and percent-of-total mapped to OVER (…) windows." },
      { from: "Data blending", to: "Modeled joins / views", mode: "review", difficulty: "medium", note: "Blends resolved into explicit joins on the lakehouse." },
      { from: "Row-level security", to: "Unity Catalog row filters", mode: "review", difficulty: "medium", note: "Access rules mapped to row filters and column masks." },
    ],
    paths: [
      { from: "Tableau", to: "Databricks AI/BI", tier: "now" },
      { from: "Qlik", to: "Databricks AI/BI", tier: "year" },
      { from: "SAS VA", to: "Databricks AI/BI", tier: "soon" },
    ],
    guides: [
      { title: "Tableau migration planning guide", href: "/migration-library/tableau-migration-planning-guide" },
      { title: "Tableau migration checklist", href: "/migration-library/tableau-migration-checklist" },
      { title: "Migration best practices", href: "/migration-library/tableau-to-power-bi-migration-best-practices" },
    ],
    faqs: [
      { q: "Does Antares use metric views?", a: "Yes — where a calculation fits a reusable metric, Antares targets a Databricks metric view; otherwise it compiles to dashboard SQL." },
      { q: "How is security handled?", a: "Tableau user filters and row-level security are mapped to Unity Catalog row filters and column masks." },
      { q: "Can it run on our own workspace?", a: "Yes. Output targets your Databricks workspace and existing Unity Catalog schemas." },
    ],
    metaTitle: "Migrate to Databricks AI/BI — Antares",
    metaDescription: "Automated Tableau → Databricks AI/BI migration. Antares compiles logic to SQL and metric views, maps security to Unity Catalog, and validates every output.",
  },
];

export function getVendor(slug: string): Vendor | undefined {
  return VENDORS.find((v) => v.slug === slug);
}

/** For nav/footer menus. */
export const VENDOR_NAV = VENDORS.map((v) => ({
  href: `/${v.slug}`,
  label: v.name,
  product: v.product,
}));
