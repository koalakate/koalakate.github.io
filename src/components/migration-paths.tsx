"use client";

import { useContactModal } from "@/lib/contact-modal-context";

type Tier = "now" | "year" | "soon";

const PATHS: { from: string; to: string; tier: Tier }[] = [
  { from: "Tableau", to: "Power BI", tier: "now" },
  { from: "Tableau", to: "Databricks AI/BI", tier: "now" },
  { from: "Power BI", to: "Tableau", tier: "year" },
  { from: "Qlik", to: "Tableau", tier: "year" },
  { from: "Qlik", to: "Power BI", tier: "year" },
  { from: "Qlik", to: "Databricks AI/BI", tier: "year" },
  { from: "SAS VA", to: "Power BI", tier: "soon" },
  { from: "SAS VA", to: "Databricks AI/BI", tier: "soon" },
];

const TIER_LABELS: Record<Tier, string> = {
  now: "Available now",
  year: "Coming 2026",
  soon: "Notify me",
};

const TIER_DOT: Record<Tier, string> = {
  now: "bg-green-500",
  year: "bg-amber-400",
  soon: "bg-neutral-300",
};

const TIER_CARD: Record<Tier, string> = {
  now: "bg-neutral-950 text-white",
  year: "bg-neutral-800 text-white",
  soon: "bg-neutral-100 text-neutral-700 border border-neutral-200",
};

export function MigrationPaths() {
  const { openModal } = useContactModal();

  return (
    <section id="capabilities" className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
          Migration Paths
        </p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-3">
          Where are you headed?
        </h2>
        <p className="text-[0.95rem] text-neutral-500 leading-[1.55] mb-10 max-w-[500px]">
          Analyze for free today. Convert when you&apos;re ready.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PATHS.map((path) => (
            <div
              key={`${path.from}-${path.to}`}
              className={`relative flex flex-col justify-between p-6 rounded-2xl min-h-[180px] ${TIER_CARD[path.tier]}`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${TIER_DOT[path.tier]}`} />
                <span className="text-[0.6rem] font-bold tracking-[0.12em] uppercase opacity-60">
                  {TIER_LABELS[path.tier]}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-xs opacity-50 mb-1">from {path.from}</p>
                <p className="text-2xl font-bold leading-tight tracking-[-0.02em]">{path.to}</p>
              </div>
            </div>
          ))}

          {/* Custom path CTA */}
          <div className="flex flex-col justify-between p-6 bg-neutral-50 border border-neutral-200 rounded-2xl min-h-[180px]">
            <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-neutral-500">
              Custom path?
            </p>
            <div>
              <p className="text-base font-bold text-neutral-900 leading-snug mb-2">
                Need a different source or target?
              </p>
              <p className="text-sm text-neutral-500 leading-[1.5] mb-4">
                Let&apos;s scope your migration together.
              </p>
              <button
                onClick={openModal}
                className="inline-flex items-center gap-1.5 text-[0.82rem] font-bold tracking-[0.06em] uppercase text-neutral-900 border-b border-neutral-900 pb-px hover:text-brand hover:border-brand transition-colors cursor-pointer"
              >
                Get in Touch →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
