"use client";

import { useContactModal } from "@/lib/contact-modal-context";

export function AnalyzerCta() {
  const { openModal } = useContactModal();
  return (
    <section className="py-[80px] lg:py-[120px] text-center">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-900 leading-[1.1] tracking-[-0.03em]">
          Ready to see your environment?
        </h2>
        <p className="text-neutral-500 mt-4 max-w-[400px] mx-auto leading-relaxed">
          Run the free analyzer. No environment changes. No commitment.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://try.getantares.io"
            className="flex items-center justify-center bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-8 py-3 rounded transition-all hover:-translate-y-px w-full sm:w-auto"
          >
            Run the Analyzer — Free
          </a>
          <button
            onClick={openModal}
            className="flex items-center justify-center bg-transparent text-neutral-900 font-semibold px-8 py-3 rounded border-[1.5px] border-neutral-900 transition-all hover:bg-neutral-900 hover:text-white w-full sm:w-auto cursor-pointer"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}
