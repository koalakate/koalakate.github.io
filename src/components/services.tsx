"use client";

import { useContactModal } from "@/lib/contact-modal-context";

const partners = [
  {
    id: "t1a",
    name: "T1A",
    description:
      "End-to-end BI migration delivery — strategy, project management, and custom engineering.",
    url: null,
  },
  {
    id: "obv",
    name: "OBV",
    description:
      "Change management, training, and post-migration adoption for enterprise BI teams.",
    url: null,
  },
];

export function Partners() {
  const { openModal } = useContactModal();

  return (
    <section id="partners" className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
          Partners
        </p>
        <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold text-neutral-900 tracking-[-0.03em] leading-[1.1]">
          Need full-service delivery?
        </h2>
        <p className="text-[clamp(1rem,2.5vw,1.25rem)] font-medium text-neutral-500 leading-[1.55] tracking-[-0.01em] max-w-[560px] mt-4">
          Antares automates the technical conversion — our delivery partners handle
          end-to-end project management, change management, and custom work.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-12">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white border border-neutral-200 rounded-xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.05)]"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-100 mb-5">
                <span className="text-[0.8rem] font-bold text-neutral-700 tracking-wide">
                  {partner.name}
                </span>
              </div>
              <h3 className="text-[1.05rem] font-bold text-neutral-900 tracking-[-0.01em] leading-[1.3] mb-2">
                {partner.name}
              </h3>
              <p className="text-[0.9rem] leading-[1.55] text-neutral-500">
                {partner.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-4 flex-wrap">
          <p className="text-sm text-neutral-500">
            Want full-service migration?
          </p>
          <button
            onClick={openModal}
            className="text-sm font-semibold text-[#3B82F6] hover:text-[#2563EB] underline underline-offset-4 transition-colors cursor-pointer"
          >
            Contact our partner →
          </button>
        </div>
      </div>
    </section>
  );
}
