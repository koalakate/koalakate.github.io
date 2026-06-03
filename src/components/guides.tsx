import { GradientHeading } from "@/components/ui/gradient-heading";

const guides = [
  {
    title: "Tableau to Power BI Migration — complete guide",
    href: "/tableau-to-power-bi-migration/",
  },
  {
    title: "LOD expressions to DAX",
    href: "/tableau-lod-expressions-to-dax/",
  },
  {
    title: "Calculated fields to DAX",
    href: "/tableau-calculated-fields-to-dax/",
  },
  {
    title: "Migration planning guide",
    href: "/tableau-migration-planning-guide/",
  },
  {
    title: "Migration best practices",
    href: "/tableau-to-power-bi-migration-best-practices/",
  },
  {
    title: "Migration checklist",
    href: "/tableau-migration-checklist/",
  },
];

export function Guides() {
  return (
    <section id="guides" className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
          Migration Guides
        </p>
        <GradientHeading size="lg" weight="bold">
          In-depth resources for BI migration
        </GradientHeading>
        <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-medium text-neutral-500 leading-[1.5] tracking-[-0.01em] max-w-[520px] mt-4">
          Planning a Tableau to Power BI migration? Start with our technical
          guides.
        </p>

        <div className="flex flex-col mt-12">
          {guides.map((guide, i) => (
            <a
              key={guide.href}
              href={guide.href}
              className={`group flex items-center justify-between py-5 border-b border-neutral-200 text-neutral-900 font-medium text-[1.05rem] no-underline transition-colors hover:text-[#3B82F6] ${
                i === 0 ? "border-t" : ""
              }`}
            >
              <span>{guide.title}</span>
              <span className="text-neutral-400 text-xl transition-all group-hover:text-[#3B82F6] group-hover:translate-x-1">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
