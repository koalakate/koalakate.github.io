"use client";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Converter } from "@/components/converter";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { useContactModal } from "@/lib/contact-modal-context";

const AUTO_CONVERTS = [
  "Standard calculated fields → DAX measures",
  "Basic chart types (bar, line, scatter, pie)",
  "Data source connections",
  "Filters, slicers, and parameters",
  "Layout & visual formatting",
  "Aggregations (SUM, AVG, COUNT, etc.)",
];

const NEEDS_REVIEW = [
  "Complex LOD expressions (FIXED, INCLUDE, EXCLUDE)",
  "Custom SQL with platform-specific syntax",
  "Multi-source data blending",
  "Dashboard actions with conditional logic",
  "Custom visual extensions or add-ons",
  "Row-level security configurations",
];

const PATHS = [
  { from: "Tableau", to: "Power BI", status: "Available now", dot: "bg-green-500", muted: false },
  { from: "Tableau", to: "Databricks AI/BI", status: "Available now", dot: "bg-green-500", muted: false },
  { from: "Power BI", to: "Tableau", status: "Coming 2026", dot: "bg-amber-400", muted: true },
  { from: "Qlik", to: "Tableau", status: "Coming 2026", dot: "bg-amber-400", muted: true },
  { from: "Qlik", to: "Power BI", status: "Coming 2026", dot: "bg-amber-400", muted: true },
  { from: "Qlik", to: "Databricks AI/BI", status: "Coming 2026", dot: "bg-amber-400", muted: true },
  { from: "SAS VA", to: "Power BI", status: "Notify me", dot: "bg-neutral-300", muted: true },
  { from: "SAS VA", to: "Databricks AI/BI", status: "Notify me", dot: "bg-neutral-300", muted: true },
] as const;

const FAQ = [
  {
    q: "What happens to things that can't auto-convert?",
    a: "Antares flags them with a clear explanation of what needs manual work and why. You know exactly what the effort is before you start.",
  },
  {
    q: "How does Antares handle custom SQL?",
    a: "Custom SQL is parsed and analyzed for compatibility. Simple queries convert automatically; complex or platform-specific SQL is flagged for review with suggested rewrites.",
  },
  {
    q: "Can we run conversion incrementally?",
    a: "Yes. You can convert workbook by workbook or run a full batch. Antares maintains a conversion log so you always know what's done and what remains.",
  },
  {
    q: "What does the validation report show?",
    a: "A side-by-side comparison of source and output: measure values, chart types, filter behaviour, and data row counts. Discrepancies are highlighted for review.",
  },
] as const;

export default function ConverterPage() {
  const { openModal } = useContactModal();

  return (
    <>
      <TextureOverlay texture="noise" opacity={0.035} className="z-50" />
      <Nav />
      <main>
        {/* Hero */}
        <section className="pt-[120px] md:pt-[180px] pb-[60px] md:pb-[80px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">Converter</p>
            <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-bold text-neutral-900 leading-[1.05] tracking-[-0.04em] max-w-[700px]">
              Automated conversion.<br />70% less manual work.
            </h1>
            <p className="text-[1.1rem] text-neutral-500 leading-[1.6] mt-5 max-w-[520px]">
              Antares handles the repeatable parts so your team focuses on what actually needs a human.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={openModal}
                className="flex items-center justify-center bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-base px-8 py-3 rounded transition-all hover:-translate-y-px w-full sm:w-auto cursor-pointer"
              >
                Get in Touch
              </button>
              <a
                href="#conversion-steps"
                className="flex items-center justify-center bg-transparent text-neutral-900 font-semibold text-base px-8 py-3 rounded border-[1.5px] border-neutral-900 transition-all hover:bg-neutral-900 hover:text-white w-full sm:w-auto"
              >
                See it in action
              </a>
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* Reuse existing Converter carousel */}
        <div id="conversion-steps">
          <Converter />
        </div>

        <hr className="border-t border-neutral-200" />

        {/* Auto vs manual */}
        <section className="py-14 lg:py-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">What converts</p>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-10">
              Automatic vs. review needed.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-[0.06em]">Converts automatically</h3>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {AUTO_CONVERTS.map((item) => (
                    <li key={item} className="flex items-baseline gap-2 text-sm text-neutral-700 leading-[1.5]">
                      <span className="text-green-500 shrink-0 font-semibold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-[0.06em]">Needs review</h3>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {NEEDS_REVIEW.map((item) => (
                    <li key={item} className="flex items-baseline gap-2 text-sm text-neutral-700 leading-[1.5]">
                      <span className="text-amber-500 shrink-0 font-semibold">⚑</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* Migration paths */}
        <section className="py-14 lg:py-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">Supported paths</p>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-10">
              Where we convert to.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PATHS.map((path) => (
                <div
                  key={`${path.from}-${path.to}`}
                  className={`p-5 rounded-xl border ${path.muted ? "border-neutral-200 bg-neutral-50" : "border-neutral-900 bg-neutral-950"}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${path.dot}`} />
                    <span className="text-[0.6rem] font-bold tracking-[0.1em] uppercase text-neutral-400">
                      {path.status}
                    </span>
                  </div>
                  <p className={`text-xs mb-1 ${path.muted ? "text-neutral-400" : "text-neutral-400"}`}>from {path.from}</p>
                  <p className={`text-xl font-bold leading-tight ${path.muted ? "text-neutral-600" : "text-white"}`}>{path.to}</p>
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

        {/* CTA */}
        <section className="py-[80px] lg:py-[120px] text-center">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-900 leading-[1.1] tracking-[-0.03em]">
              Ready to convert?
            </h2>
            <p className="text-neutral-500 mt-4 max-w-[400px] mx-auto leading-relaxed">
              Start with a free analysis — then convert when you&apos;re ready.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={openModal}
                className="flex items-center justify-center bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-8 py-3 rounded transition-all hover:-translate-y-px w-full sm:w-auto cursor-pointer"
              >
                Get in Touch
              </button>
              <a
                href="/analyzer"
                className="flex items-center justify-center bg-transparent text-neutral-900 font-semibold px-8 py-3 rounded border-[1.5px] border-neutral-900 transition-all hover:bg-neutral-900 hover:text-white w-full sm:w-auto"
              >
                Run the Analyzer first →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
