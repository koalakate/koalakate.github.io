import { GradientHeading } from "@/components/ui/gradient-heading";

const pillars = [
  {
    number: "01",
    title: "Analyzer",
    description:
      "Complexity scoring, usage analytics, AI-driven priorities, and effort estimation for every dashboard in your estate. Free.",
  },
  {
    number: "02",
    title: "Converter",
    description:
      "One-click conversion with full fidelity. Smart mapping to target BI equivalents. Preserved layouts, seamless adoption.",
  },
  {
    number: "03",
    title: "Professional Services",
    description:
      "End-to-end migration consulting. Strategy, execution, change management, and post-migration optimization.",
  },
];

export function Pillars() {
  return (
    <section id="platform" className="py-20 lg:py-[120px]" style={{ paddingTop: 0 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2px] bg-neutral-200 border border-neutral-200 rounded-xl overflow-hidden">
          {pillars.map((pillar) => (
            <div key={pillar.number} className="bg-white p-9 lg:p-12">
              <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-4">
                {pillar.number}
              </p>
              <GradientHeading size="xs" weight="bold">
                {pillar.title}
              </GradientHeading>
              <p className="text-[0.95rem] leading-[1.6] text-neutral-500 mt-2">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
