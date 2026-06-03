export function Analyzer() {
  const screenshot = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/analyzer-screenshot.png"
      alt="Antares Analyzer — readiness scores, migration difficulty, usage trends"
      className="w-full rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
      draggable={false}
    />
  );

  return (
    <section id="analyzer" className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left: text ────────────────────────────────────── */}
          <div>
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
              Analyzer
            </p>
            <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-bold text-neutral-950 leading-[1.08] tracking-[-0.03em]">
              See what you&apos;re migrating
            </h2>
            <p className="text-neutral-500 mt-5 max-w-[440px] leading-relaxed">
              Before you commit to anything, understand exactly what you&apos;re
              working with. Free analysis, complete visibility.
            </p>

            {/* Mobile screenshot — between description and list */}
            <div className="lg:hidden mt-8 mb-8">
              {screenshot}
              <p className="text-[0.7rem] text-neutral-400 mt-2.5">
                Example data. Not a claim.
              </p>
            </div>

            <ul className="flex flex-col gap-3 mt-6 lg:mt-10">
              {[
                "Complexity scoring for every dashboard",
                "Analytics to prioritize high-value content",
                "AI priorities based on impact vs. effort",
                "Dependency mapping to avoid surprises",
                "Accurate effort estimation for planning",
              ].map((item) => (
                <li key={item} className="flex items-baseline gap-3 text-neutral-700 leading-[1.5]">
                  <span className="text-neutral-400 text-[0.9em] shrink-0">⟶</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <a
                href="https://try.getantares.io"
                className="flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-base px-8 py-3 rounded transition-all hover:-translate-y-px w-full sm:w-auto sm:inline-flex"
              >
                Run the Analyzer — Free
              </a>
            </div>
          </div>

          {/* ── Right: screenshot — desktop only ───────────────── */}
          <div className="hidden lg:block lg:pt-16">
            {screenshot}
            <p className="text-[0.7rem] text-neutral-400 mt-2.5">
              Example data. Not a claim.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
