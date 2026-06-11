"use client";

import { ReadinessWidget } from "@/components/ui/readiness-widget";
import { CtaButton } from "@/components/ui/cta-button";

export function Hero() {
  return (
    <section className="relative pt-[96px] md:pt-[160px] lg:pt-[180px] pb-[56px] md:pb-[120px] overflow-hidden min-h-[540px]">
      <div className="max-w-[1320px] mx-auto px-6 relative z-[1]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-10">
          {/* Left: text */}
          <div className="lg:max-w-[480px]">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
              Analyze · Convert · Deliver
            </p>
            <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.0] tracking-[-0.04em] font-bold text-neutral-900">
              BI Migration —<br />
              from analysis
              <br />
              to production,
              <br />
              automated.
            </h1>
            <p className="text-[clamp(1rem,2vw,1.25rem)] font-medium text-neutral-500 leading-[1.5] tracking-[-0.01em] max-w-[480px] mt-5">
              Antares analyzes your estate, auto-converts dashboards, and backs
              it with expert delivery — migrations in weeks, not years.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <CtaButton href="https://try.getantares.io" className="w-full sm:w-auto">
                Run the Analyzer — Free
              </CtaButton>
              <CtaButton variant="secondary" href="#how-it-works" className="w-full sm:w-auto">
                How it works
              </CtaButton>
            </div>
            <p className="text-sm text-neutral-500 mt-4">
              Read-only analysis. No environment changes. No commitment.
            </p>
          </div>

          {/* Right: widget */}
          <div className="flex justify-center lg:justify-end lg:flex-shrink-0">
            <ReadinessWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
