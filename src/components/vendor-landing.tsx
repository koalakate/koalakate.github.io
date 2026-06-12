"use client";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cta } from "@/components/cta";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { CtaButton } from "@/components/ui/cta-button";
import { StatusBadge, DifficultyPill, ModeTag } from "@/components/ui/platform-bits";
import { useContactModal } from "@/lib/contact-modal-context";
import { withBase } from "@/lib/base-path";
import type { Vendor } from "@/lib/vendors";

export function VendorLanding({ vendor: v }: { vendor: Vendor }) {
  const { openModal } = useContactModal();

  return (
    <>
      <TextureOverlay texture="noise" opacity={0.035} className="z-50" />
      <Nav />
      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden pt-[120px] md:pt-[180px] pb-[60px] md:pb-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="inline-flex items-center justify-center h-14 min-w-14 px-4 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)] mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase(v.logo)} alt={v.logoAlt} className="h-7 w-auto" draggable={false} />
            </div>
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-4">{v.eyebrow}</p>
            <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-bold text-neutral-900 leading-[1.05] tracking-[-0.04em] max-w-[820px]">
              {v.h1}
            </h1>
            <p className="text-[1.1rem] text-neutral-500 leading-[1.6] mt-5 max-w-[560px]">{v.subcopy}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <CtaButton href="https://try.getantares.io" className="w-full sm:w-auto">
                Run the Analyzer — Free
              </CtaButton>
              <CtaButton variant="secondary" onClick={openModal} className="w-full sm:w-auto">
                Get in Touch
              </CtaButton>
            </div>
            <p className="text-sm text-neutral-500 mt-3">{v.reassurance}</p>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* ── What Antares does ────────────────────────────────── */}
        <section className="py-14 lg:py-[120px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
              Antares for {v.name}
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-5 max-w-[760px]">
              {v.role === "target" ? `Everything you need to land on ${v.product}.` : `Everything you need before you leave ${v.product}.`}
            </h2>
            <p className="text-[0.95rem] text-neutral-500 leading-[1.6] mb-10 max-w-[620px]">{v.intro}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {v.cards.map((c) => (
                <div key={c.title} className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
                  <h3 className="font-bold text-neutral-900 mb-2">{c.title}</h3>
                  <p className="text-sm text-neutral-500 leading-[1.6]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* ── Expertise: construct mapping ─────────────────────── */}
        <section className="py-14 lg:py-[120px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">Expertise</p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-10 max-w-[760px]">
              {v.expertiseTitle}
            </h2>
            <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden divide-y divide-neutral-100 max-w-[860px]">
              {v.constructs.map((c) => (
                <div key={c.from} className="px-6 py-4">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1.5">
                    <span className="text-[0.88rem] font-semibold text-neutral-900">{c.from}</span>
                    {c.to && (
                      <>
                        <span className="text-neutral-300">→</span>
                        <span className="text-[0.88rem] font-semibold text-neutral-600">{c.to}</span>
                      </>
                    )}
                    <span className="ml-auto flex items-center gap-2.5">
                      <ModeTag mode={c.mode} />
                      <DifficultyPill level={c.difficulty} />
                    </span>
                  </div>
                  <p className="text-[0.8rem] text-neutral-500 leading-[1.5]">{c.note}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <CtaButton variant="secondary" href={v.expertiseLink}>
                {v.role === "target" ? "See the full conversion breakdown →" : "Explore the Analyzer →"}
              </CtaButton>
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* ── Migration paths ──────────────────────────────────── */}
        <section className="py-14 lg:py-[120px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">Migration paths</p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-10">
              Paths involving {v.product}.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {v.paths.map((p) => (
                <div key={`${p.from}-${p.to}`} className="p-5 rounded-xl border border-neutral-200 bg-neutral-50">
                  <div className="mb-3">
                    <StatusBadge tier={p.tier} />
                  </div>
                  <p className="text-xs text-neutral-500 mb-1">from {p.from}</p>
                  <p className="text-xl font-bold text-neutral-900 leading-tight tracking-[-0.02em]">{p.to}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* ── Related guides ───────────────────────────────────── */}
        <section className="py-14 lg:py-[120px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">Migration library</p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-10">
              Guides for this move.
            </h2>
            <ul className="flex flex-col divide-y divide-neutral-200 max-w-[720px]">
              {v.guides.map((g) => (
                <li key={g.href}>
                  <a
                    href={withBase(g.href)}
                    className="flex items-center justify-between gap-4 py-5 group"
                  >
                    <span className="text-[1.05rem] font-semibold text-neutral-900 group-hover:text-brand transition-colors">{g.title}</span>
                    <span aria-hidden="true" className="text-neutral-400 group-hover:text-brand transition-colors">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className="py-14 lg:py-[120px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">FAQ</p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-10">
              Common questions.
            </h2>
            <div className="flex flex-col divide-y divide-neutral-200 max-w-[720px]">
              {v.faqs.map((item) => (
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
          title={v.role === "target" ? `Ready to move to ${v.product}?` : `Ready to see your ${v.product} estate?`}
          description="Start with a free analysis. No environment changes. No commitment."
        />
      </main>
      <Footer />
    </>
  );
}
