"use client";

import { GradientHeading } from "@/components/ui/gradient-heading";
import { AsciiSphere } from "@/components/ui/ascii-sphere";
import { useContactModal } from "@/lib/contact-modal-context";

export function Cta() {
  const { openModal } = useContactModal();

  return (
    <section className="relative py-[80px] lg:py-[140px] overflow-hidden text-center">
      <div
        className="absolute bottom-[-30%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none blur-[50px]"
        style={{ background: "radial-gradient(ellipse at center, rgba(255, 184, 0, 0.3) 0%, rgba(255, 184, 0, 0.05) 50%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="absolute bottom-[-340px] left-1/2 -translate-x-1/2 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
        <AsciiSphere className="w-[700px] h-[700px]" radius={280} nPoints={1200} fontSize={13} rotationSpeed={0} />
      </div>
      <div className="max-w-[1200px] mx-auto px-6 relative z-[1]">
        <GradientHeading size="xl" weight="bold">
          Let&apos;s talk migration.
        </GradientHeading>
        <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-medium text-neutral-500 leading-[1.5] tracking-[-0.01em] max-w-[440px] mx-auto mt-5">
          No commitment. No environment changes. See what you&apos;re working with.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center sm:justify-center">
          <a
            href="https://try.getantares.io"
            className="flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-base px-8 py-3 rounded transition-all hover:-translate-y-px w-full sm:w-auto"
          >
            Run the Analyzer — Free
          </a>
          <button
            onClick={openModal}
            className="flex items-center justify-center gap-2 bg-transparent text-neutral-900 font-semibold text-base px-8 py-3 rounded border-[1.5px] border-neutral-900 transition-all hover:bg-neutral-900 hover:text-white w-full sm:w-auto cursor-pointer"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}
