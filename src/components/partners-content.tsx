"use client";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cta } from "@/components/cta";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { CtaButton } from "@/components/ui/cta-button";
import { useContactModal } from "@/lib/contact-modal-context";
import { withBase } from "@/lib/base-path";

const PARTNERS = [
  {
    id: "t1a",
    name: "T1A",
    tag: "Delivery & engineering",
    logo: "/t1a-logo.svg",
    description: "End-to-end BI migration delivery — strategy, project management, and custom engineering.",
  },
  {
    id: "obv",
    name: "OBV",
    tag: "Change management",
    logo: "/obv.png",
    description: "Change management, training, and post-migration adoption for enterprise BI teams.",
  },
];

const TYPES = [
  {
    title: "Delivery partners",
    body: "Lead end-to-end migrations — project management, change management, and custom engineering — with Antares doing the technical heavy lifting.",
  },
  {
    title: "Technology partners",
    body: "Platform and tooling vendors who integrate with Antares across the analyze → convert → deliver workflow.",
  },
  {
    title: "Referral partners",
    body: "Refer migration work and earn. You keep the client relationship; we power the platform underneath.",
  },
];

const BENEFITS = [
  { title: "Automation that scales you", body: "Antares automates the bulk of the conversion, so your team takes on more migrations without more headcount." },
  { title: "Joint pipeline & co-sell", body: "We bring deals that need delivery muscle; you bring clients that need automation. Shared pipeline, shared wins." },
  { title: "Enablement & certification", body: "Hands-on onboarding, playbooks, and certification so your consultants are productive on Antares fast." },
  { title: "A seat on the roadmap", body: "Partners shape what we build next — new source platforms, targets, and delivery tooling." },
];

const STEPS = [
  { num: "01", title: "Get in touch", body: "Tell us about your practice and the migrations you take on." },
  { num: "02", title: "Get enabled", body: "We onboard and certify your team on the Antares platform." },
  { num: "03", title: "Deliver together", body: "Run joint migrations on shared pipeline — automation plus your delivery." },
];

export function PartnersContent() {
  const { openModal } = useContactModal();

  return (
    <>
      <TextureOverlay texture="noise" opacity={0.035} className="z-50" />
      <Nav />
      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="pt-[120px] md:pt-[180px] pb-[60px] md:pb-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">Partners</p>
            <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-bold text-neutral-900 leading-[1.05] tracking-[-0.04em] max-w-[760px]">
              Partner with Antares.
            </h1>
            <p className="text-[1.1rem] text-neutral-500 leading-[1.6] mt-5 max-w-[560px]">
              Antares automates the technical conversion. Our partners bring the delivery, the change management, and the client relationships — together we move more BI estates, faster.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <CtaButton onClick={openModal} className="w-full sm:w-auto">
                Become a partner
              </CtaButton>
              <CtaButton variant="secondary" href="#our-partners" className="w-full sm:w-auto">
                See our partners
              </CtaButton>
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* ── Why partner ──────────────────────────────────────── */}
        <section className="py-14 lg:py-[120px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">The program</p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-10 max-w-[760px]">
              Why build your BI migration practice on Antares.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BENEFITS.map((b) => (
                <div key={b.title} className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
                  <h3 className="font-bold text-neutral-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-neutral-500 leading-[1.6]">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* ── Partner types ────────────────────────────────────── */}
        <section className="py-14 lg:py-[120px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">Ways to partner</p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-10">
              Three ways in.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TYPES.map((t) => (
                <div key={t.title} className="border border-neutral-200 rounded-xl p-6">
                  <h3 className="font-bold text-neutral-900 mb-2">{t.title}</h3>
                  <p className="text-sm text-neutral-500 leading-[1.6]">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* ── Our partners ─────────────────────────────────────── */}
        <section id="our-partners" className="py-14 lg:py-[120px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">Our partners</p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-10">
              Who we work with.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PARTNERS.map((p) => (
                <div key={p.id} className="bg-white border border-neutral-200 rounded-xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex items-center justify-center h-12 px-4 rounded-lg bg-neutral-900 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={withBase(p.logo)} alt={`${p.name} logo`} className="h-5 w-auto" />
                    </div>
                    <p className="text-xs font-medium uppercase tracking-[0.06em] text-neutral-600">{p.tag}</p>
                  </div>
                  <p className="text-[0.9rem] leading-[1.55] text-neutral-500">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* ── How to become a partner ──────────────────────────── */}
        <section className="py-14 lg:py-[120px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">Become a partner</p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-10">
              How it works.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {STEPS.map((s) => (
                <div key={s.num} className="border border-neutral-200 rounded-xl p-6">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand text-white text-[0.7rem] font-bold mb-4">
                    {s.num}
                  </span>
                  <h3 className="font-bold text-neutral-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-neutral-500 leading-[1.6]">{s.body}</p>
                </div>
              ))}
            </div>
            <CtaButton onClick={openModal}>Become a partner</CtaButton>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        <Cta
          title="Let's grow together."
          description="Tell us about your practice — we'll show you what partnering on Antares looks like."
        />
      </main>
      <Footer />
    </>
  );
}
