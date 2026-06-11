"use client";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ConversionShowcase } from "@/components/conversion-showcase";
import { Cta } from "@/components/cta";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { CtaButton } from "@/components/ui/cta-button";
import { useContactModal } from "@/lib/contact-modal-context";

const FAQ = [
  {
    q: "What happens to things that can't auto-convert?",
    a: "Antares flags them with a clear explanation of what needs manual work and why. You know exactly what the effort is before you start.",
  },
  {
    q: "How does Antares handle custom SQL?",
    a: "Custom SQL is parsed and analyzed for compatibility. Simple queries convert automatically; complex or platform-specific SQL is flagged for review with suggested rewrites.",
  },
  {
    q: "Can we run conversion incrementally?",
    a: "Yes. You can convert workbook by workbook or run a full batch. Antares maintains a conversion log so you always know what's done and what remains.",
  },
  {
    q: "What does the validation report show?",
    a: "A side-by-side comparison of source and output: measure values, chart types, filter behaviour, and data row counts. Discrepancies are highlighted for review.",
  },
] as const;

export default function ConverterPage() {
  const { openModal } = useContactModal();

  return (
    <>
      <TextureOverlay texture="noise" opacity={0.035} className="z-50" />
      <Nav />
      <main>
        {/* Hero */}
        <section className="pt-[120px] md:pt-[180px] pb-[60px] md:pb-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">Converter</p>
            <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-bold text-neutral-900 leading-[1.05] tracking-[-0.04em] max-w-[700px]">
              Automated conversion.<br />Days, not weeks.
            </h1>
            <p className="text-[1.1rem] text-neutral-500 leading-[1.6] mt-5 max-w-[520px]">
              Antares handles the repeatable parts so your team focuses on what actually needs a human.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <CtaButton onClick={openModal} className="w-full sm:w-auto">
                Get in Touch
              </CtaButton>
              <CtaButton variant="secondary" href="#conversion-steps" className="w-full sm:w-auto">
                See it in action
              </CtaButton>
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* Conversion expertise — pair switcher + per-construct mapping */}
        <ConversionShowcase />

        <hr className="border-t border-neutral-200" />

        {/* FAQ */}
        <section className="py-14 lg:py-[120px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">FAQ</p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-10">
              Common questions.
            </h2>
            <div className="flex flex-col divide-y divide-neutral-200 max-w-[720px]">
              {FAQ.map((item) => (
                <div key={item.q} className="py-6">
                  <p className="font-semibold text-neutral-900 mb-2">{item.q}</p>
                  <p className="text-sm text-neutral-500 leading-[1.7]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        <Cta
          title="Ready to convert?"
          description="Start with a free analysis — then convert when you're ready."
        />
      </main>
      <Footer />
    </>
  );
}
