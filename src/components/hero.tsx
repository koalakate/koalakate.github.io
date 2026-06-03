"use client";

import { AsciiSphere } from "@/components/ui/ascii-sphere";

export function Hero() {
  return (
    <section className="relative pt-[96px] md:pt-[160px] lg:pt-[180px] pb-[56px] md:pb-[120px] overflow-hidden min-h-[540px]">
      {/* Sphere — bigger, pushed further right so it doesn't crowd text */}
      <div
        className="absolute top-0 bottom-0 hidden lg:flex items-center pointer-events-none"
        style={{ zIndex: -1, right: "-220px" }}
      >
        <AsciiSphere
          className="w-[820px] h-[820px]"
          radius={330}
          nPoints={3500}
          fontSize={14}
          rotationSpeed={0}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-[1] text-center lg:text-left">
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
          BI Migration Platform
        </p>
        <h1 className="text-[clamp(3rem,14vw,5.5rem)] leading-[0.96] tracking-[-0.04em] font-bold text-neutral-900">
          <span className="block">Analyze.</span>
          <span className="block">Convert.</span>
          <span className="block">Deploy.</span>
        </h1>
        <p className="text-[clamp(1rem,2.5vw,1.5rem)] font-medium text-neutral-500 leading-[1.5] tracking-[-0.01em] max-w-[560px] mt-5 mx-auto lg:mx-0">
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
            href="#platform"
            className="flex items-center justify-center gap-2 bg-transparent text-neutral-900 font-semibold text-base px-8 py-3 rounded border-[1.5px] border-neutral-900 transition-all hover:bg-neutral-900 hover:text-white w-full sm:w-auto"
          >
            How it works
          </a>
        </div>
        <p className="text-sm text-neutral-500 mt-4">
          Read-only analysis. No environment changes. No commitment.
        </p>
      </div>
    </section>
  );
}
