const STEPS = [
  {
    num: "01",
    title: "Scan",
    description: "Connect Tableau or upload workbooks. Fast inventory of your full BI environment — every dashboard, calculation, and data source.",
  },
  {
    num: "02",
    title: "Analyze",
    description: "Surface blockers, usage patterns, and feature-level risk. Get a Migration Readiness Score with complexity scoring per workbook.",
  },
  {
    num: "03",
    title: "Plan",
    description: "Readiness score, timeline estimate, and execution roadmap. Data-backed plans that align stakeholders before a single line of code moves.",
  },
  {
    num: "04",
    title: "Convert",
    description: "Automate repeatable conversion and validate outputs. 70% less manual work — Antares handles what's mechanical so your team handles what isn't.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
          How Antares Works
        </p>
        <h2 className="text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-12">
          A structured process.<br />No surprises.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[0.6rem] font-bold tracking-[0.14em] uppercase text-neutral-400">
                  {step.num}
                </span>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block flex-1 h-px bg-neutral-200" />
                )}
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-500 leading-[1.6]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
