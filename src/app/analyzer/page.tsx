import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ReadinessWidget } from "@/components/ui/readiness-widget";
import { AnalyzerCta } from "@/components/analyzer-cta";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analyzer — Antares",
  description: "Free, read-only analysis of your Tableau environment. Get a Migration Readiness Score before you commit to anything.",
};

const FEATURES = [
  {
    category: "Calculations",
    items: [
      "LOD expressions (FIXED, INCLUDE, EXCLUDE)",
      "Calculated fields & measures",
      "Table calculations",
      "Parameters",
    ],
  },
  {
    category: "Data",
    items: [
      "Custom SQL",
      "Data blending",
      "Data sources & extracts",
      "Cross-datasource joins",
    ],
  },
  {
    category: "Dashboards",
    items: [
      "Dashboard actions & filters",
      "Layout & formatting",
      "Tooltips & annotations",
      "Sets, groups, bins, hierarchies",
    ],
  },
  {
    category: "Usage",
    items: [
      "View counts & active users",
      "Last accessed dates",
      "Usage trends by department",
      "High-value vs. stale content",
    ],
  },
  {
    category: "Dependencies",
    items: [
      "Cross-workbook dependencies",
      "Shared data sources",
      "Embedded vs. published",
      "Dependency impact map",
    ],
  },
] as const;

const FAQ = [
  {
    q: "How long does analysis take?",
    a: "Most environments complete in minutes. Large estates (1000+ workbooks) may take up to 30 minutes.",
  },
  {
    q: "What access does Antares need?",
    a: "Read-only access to Tableau Server or Tableau Cloud. No write permissions are ever requested.",
  },
  {
    q: "Is my data secure?",
    a: "Antares analyzes workbook metadata — structure, calculations, and usage stats. It never reads your underlying business data.",
  },
  {
    q: "Can I analyze a subset of workbooks?",
    a: "Yes. You can filter by project, site, or select individual workbooks for a targeted analysis.",
  },
  {
    q: "What's in the readiness report?",
    a: "A Migration Readiness Score per workbook, complexity breakdown by feature type, auto-convertible percentage, effort estimate, and prioritized conversion order.",
  },
] as const;

export default function AnalyzerPage() {
  return (
    <>
      <TextureOverlay texture="noise" opacity={0.035} className="z-50" />
      <Nav />
      <main>
        {/* Hero */}
        <section className="pt-[120px] md:pt-[180px] pb-[60px] md:pb-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
              <div className="lg:max-w-[560px]">
                <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">Analyzer</p>
                <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-bold text-neutral-900 leading-[1.05] tracking-[-0.04em]">
                  See exactly what you&apos;re migrating — before you commit.
                </h1>
                <p className="text-[1.1rem] text-neutral-500 leading-[1.6] mt-5 max-w-[480px]">
                  Free, read-only analysis. Complete visibility into your Tableau environment in minutes.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://try.getantares.io"
                    className="flex items-center justify-center bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-base px-8 py-3 rounded transition-all hover:-translate-y-px w-full sm:w-auto"
                  >
                    Run the Analyzer — Free
                  </a>
                </div>
                <p className="text-sm text-neutral-500 mt-3">No environment changes. No commitment.</p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <ReadinessWidget />
              </div>
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* Feature breakdown */}
        <section className="py-14 lg:py-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">What Antares analyzes</p>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-12">
              Every layer of your Tableau environment.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map((group) => (
                <div key={group.category}>
                  <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-[0.06em] mb-4">{group.category}</h3>
                  <ul className="flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-baseline gap-2 text-sm text-neutral-600 leading-[1.5]">
                        <span className="text-neutral-400 shrink-0">⟶</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* How it connects */}
        <section className="py-14 lg:py-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">How it connects</p>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-10">
              Read-only. Zero risk.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Read-only access",
                  body: "No write permissions ever requested. Antares reads workbook metadata — structure, calculations, usage stats. Never your underlying business data.",
                },
                {
                  title: "Tableau Server & Cloud",
                  body: "Connects via the Tableau REST API. Supports Tableau Server (2019.1+) and Tableau Cloud. No agent or on-prem installation required.",
                },
                {
                  title: "Exportable report",
                  body: "Your readiness report is available as a shareable link and PDF export — ready to present to stakeholders or your migration team.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
                  <h3 className="font-bold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500 leading-[1.6]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* FAQ */}
        <section className="py-14 lg:py-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">FAQ</p>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-10">
              Common questions.
            </h2>
            <div className="flex flex-col divide-y divide-neutral-200 max-w-[720px]">
              {FAQ.map((item) => (
                <div key={item.q} className="py-6">
                  <p className="font-semibold text-neutral-900 mb-2">{item.q}</p>
                  <p className="text-sm text-neutral-500 leading-[1.7]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />
        <AnalyzerCta />
      </main>
      <Footer />
    </>
  );
}
