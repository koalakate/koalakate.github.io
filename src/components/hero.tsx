"use client";

import { ReadinessWidget } from "@/components/ui/readiness-widget";

export function Hero() {
  return (
    <section className="relative pt-[96px] md:pt-[160px] lg:pt-[180px] pb-[56px] md:pb-[120px] overflow-hidden min-h-[540px]">
      <div className="max-w-[1200px] mx-auto px-6 relative z-[1]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">

          {/* Left: text */}
          <div className="lg:max-w-[560px]">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
              BI Migration Platform
            </p>
            <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.0] tracking-[-0.04em] font-bold text-neutral-900">
              BI Migration —<br />
              from analysis<br />
              to delivery,<br />
              automated.
            </h1>
            <p className="text-[clamp(1rem,2vw,1.25rem)] font-medium text-neutral-500 leading-[1.5] tracking-[-0.01em] max-w-[480px] mt-5">
              Complete visibility into your BI workloads. Automated conversion.
              Expert delivery. 70% faster than manual rebuild.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="https://try.getantares.io"
                className="flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-base px-8 py-3 rounded transition-all hover:-translate-y-px w-full sm:w-auto"
              >
                Run the Analyzer — Free
              </a>
              <a
                href="#how-it-works"
                className="flex items-center justify-center gap-2 bg-transparent text-neutral-900 font-semibold text-base px-8 py-3 rounded border-[1.5px] border-neutral-900 transition-all hover:bg-neutral-900 hover:text-white w-full sm:w-auto"
              >
                How it works
              </a>
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
