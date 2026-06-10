import { GradientHeading } from "@/components/ui/gradient-heading";
import Link from "next/link";

const guides = [
  { title: "Tableau to Power BI Migration — complete guide", href: "/migration-library/tableau-to-power-bi-migration" },
  { title: "LOD expressions to DAX", href: "/migration-library/tableau-lod-expressions-to-dax" },
  { title: "Calculated fields to DAX", href: "/migration-library/tableau-calculated-fields-to-dax" },
  { title: "Migration planning guide", href: "/migration-library/tableau-migration-planning-guide" },
  { title: "Migration best practices", href: "/migration-library/tableau-to-power-bi-migration-best-practices" },
  { title: "Migration checklist", href: "/migration-library/tableau-migration-checklist" },
];

export function Guides() {
  return (
    <section id="guides" className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
          Migration Library
        </p>
        <GradientHeading size="lg" weight="bold">
          In-depth resources for BI migration
        </GradientHeading>
        <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-medium text-neutral-500 leading-[1.5] tracking-[-0.01em] max-w-[520px] mt-4">
          Technical guides, checklists, and deep dives for migration teams.
        </p>

        <div className="flex flex-col mt-12">
          {guides.map((guide, i) => (
            <Link
              key={guide.href}
              href={guide.href}
              className={`group flex items-center justify-between py-5 border-b border-neutral-200 text-neutral-900 font-medium text-[1.05rem] no-underline transition-colors hover:text-brand ${i === 0 ? "border-t" : ""}`}
            >
              <span>{guide.title}</span>
              <span className="text-neutral-400 text-xl transition-all group-hover:text-brand group-hover:translate-x-1">→</span>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/migration-library"
            className="text-sm font-semibold text-brand hover:text-brand-hover transition-colors"
          >
            View all articles →
          </Link>
        </div>
      </div>
    </section>
  );
}
