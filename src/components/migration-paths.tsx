"use client";

// ── Bento layout (desktop, 6 cols) ────────────────────────────────
//
//  Row 1: [Databricks AI/BI  2col] [Power BI           4col]
//  Row 2: [Power BI→Tableau  3col] [SAS VA→AI/BI 1col] [Custom CTA 2col]

function PathCard({
  from,
  to,
  shade = "bg-neutral-950",
  dark = true,
  narrow = false,
}: {
  from: string;
  to: string;
  shade?: string;
  dark?: boolean;
  narrow?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col justify-between p-6 lg:p-8 rounded-2xl overflow-hidden h-full ${shade}`}
    >
      <span
        className="text-[0.58rem] font-bold tracking-[0.14em] uppercase select-none"
        style={{ color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)" }}
      >
        from {from}
      </span>
      <div className="mt-4">
        <p
          className={`font-bold leading-[1.1] tracking-[-0.02em] ${narrow ? "text-[1.8rem] lg:text-[1.3rem]" : "text-[1.8rem] lg:text-[2.4rem]"}`}
          style={{ color: dark ? "#fff" : "#111" }}
        >
          {to}
        </p>
      </div>
    </div>
  );
}

export function MigrationPaths() {
  return (
    <section id="capabilities" className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* ── Heading — outside the grid ── */}
        <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-neutral-400 mb-4">
          Migration Paths
        </p>
        <h2 className="text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-3">
          Where are you headed?
        </h2>
        <p className="text-[0.95rem] text-neutral-500 leading-[1.55] mb-10 max-w-[500px]">
          Antares supports migration from Tableau to all major BI platforms.
          Analyze for free, convert when ready.
        </p>

        {/* ── Bento 6-col grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">

          {/* Row 1 — 2:4 */}
          <div className="lg:col-span-2 min-h-[260px]">
            <PathCard from="Tableau" to="Databricks AI/BI" shade="bg-[#3B82F6]" dark />
          </div>
          <div className="lg:col-span-4 min-h-[260px]">
            <PathCard from="Tableau" to="Power BI" shade="bg-[#111]" dark />
          </div>

          {/* Row 2 — 3:1:2 */}
          <div className="lg:col-span-3 min-h-[260px]">
            <PathCard from="Power BI" to="Tableau" shade="bg-[#A1A1B5]" dark />
          </div>
          <div className="lg:col-span-1 min-h-[260px]">
            <PathCard from="SAS VA" to="Databricks AI/BI" shade="bg-[#F2F2F2]" dark={false} narrow />
          </div>

          {/* CTA cell — custom path */}
          <div className="lg:col-span-2 min-h-[260px] flex flex-col justify-between p-6 lg:p-8 bg-neutral-50 border border-neutral-200 rounded-2xl">
            <p className="text-[0.58rem] font-bold tracking-[0.14em] uppercase text-neutral-400">
              Custom path?
            </p>
            <div>
              <p className="text-[1.2rem] font-bold text-neutral-900 leading-snug mb-3">
                Need a custom migration path?
              </p>
              <p className="text-[0.9rem] text-neutral-500 leading-[1.5] mb-6">
                Different source or target platform? Let&apos;s scope your migration together.
              </p>
              <a
                href="mailto:hello@getantares.io?subject=Custom Migration Path"
                className="inline-flex items-center gap-1.5 text-[0.82rem] font-bold tracking-[0.06em] uppercase text-neutral-900 border-b border-neutral-900 pb-px hover:text-[#3B82F6] hover:border-[#3B82F6] transition-colors"
              >
                Get in touch →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
