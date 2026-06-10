"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { CtaButton } from "@/components/ui/cta-button";

const STEPS = [
  {
    num: "01",
    label: "Source",
    title: "Your Initial Dashboard",
    description:
      "Existing workbooks — layouts, calculations, data sources — exactly as they are.",
    img: "/screenshots/initial tableau.svg",
    imgAlt: "Initial Tableau dashboard",
    chromeLabel: "initial tableau.twb · Tableau",
  },
  {
    num: "02",
    label: "Auto-Conversion",
    title: "Automated first pass",
    description:
      "Antares rebuilds the dashboard in the target platform — measure mapping, layout preservation, data validation. Already looks good.",
    img: "/screenshots/Antares Raw Result.svg",
    imgAlt: "Antares automated conversion",
    chromeLabel: "report.pbix · Power BI",
  },
  {
    num: "03",
    label: "Fine-Tuning",
    title: "Manual corrections — minimized",
    description:
      "Only edge cases need a human touch. The converter handled the rest.",
    img: "/screenshots/Manual Fine-tuned Result.svg",
    imgAlt: "Fine-tuned final dashboard",
    chromeLabel: "report_final.pbix · Power BI",
  },
] as const;

export function Converter() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  function select(i: number) {
    setActive(i);
  }

  const step = STEPS[active];

  return (
    <section id="converter" className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* ── Section header — full width, outside the two-column grid ── */}
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
          Converter
        </p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-3">
          Automated BI conversion.{" "}
          <span className="text-neutral-400">In three steps.</span>
        </h2>
        <p className="text-[0.95rem] text-neutral-500 leading-[1.6] mb-8">
          Antares automates 70–90% of the conversion work. Weeks of manual
          rebuilding done in hours.
        </p>

        <div className="mb-10 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
          <span aria-hidden="true">✓</span>
          Every output validated against source data
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 xl:gap-16 items-start">

          {/* ── Left: step list ─────────────────────────────────── */}
          <div>
            <div className="flex flex-col">
              {STEPS.map((s, i) => {
                const isActive = active === i;
                const isDone = active > i;
                return (
                  <button
                    key={i}
                    onClick={() => select(i)}
                    className="text-left group w-full"
                  >
                    <div
                      className={`flex gap-4 py-5 transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-40 hover:opacity-65"
                      }`}
                    >
                      {/* Circle */}
                      <div
                        className={`flex-shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center text-[0.65rem] font-bold transition-colors duration-200 ${
                          isActive
                            ? "bg-brand text-white"
                            : isDone
                            ? "bg-neutral-200 text-neutral-500"
                            : "bg-neutral-100 text-neutral-400"
                        }`}
                      >
                        {isDone ? "✓" : s.num}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0 border-b border-neutral-100 pb-5">
                        <p className="text-[0.58rem] font-bold tracking-[0.14em] uppercase text-neutral-500 mb-1">
                          {s.label}
                        </p>
                        <p
                          className={`font-bold leading-snug mb-1.5 transition-all duration-200 ${
                            isActive
                              ? "text-neutral-950 text-[1rem]"
                              : "text-neutral-700 text-[0.95rem]"
                          }`}
                        >
                          {s.title}
                        </p>
                        <p className="text-[0.82rem] text-neutral-500 leading-[1.55]">
                          {s.description}
                        </p>

                        {/* Progress bar */}
                        {isActive && (
                          <motion.div
                            layoutId="activeBar"
                            className="mt-3 h-[2px] bg-brand rounded-full"
                            initial={false}
                            transition={{ type: "spring", stiffness: 400, damping: 35 }}
                          />
                        )}
                      </div>
                    </div>

                  </button>
                );
              })}
            </div>

            {/* Mobile screenshot — stable container outside the steps loop */}
            <div className="lg:hidden mt-6">
              <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-[0_4px_24px_rgba(0,0,0,0.08)] bg-white">
                <div className="bg-neutral-100 border-b border-neutral-200 px-4 py-2 flex items-center gap-3">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 bg-white rounded h-4 px-2 flex items-center border border-neutral-200">
                    <span className="text-[0.55rem] text-neutral-400 font-medium">{step.chromeLabel}</span>
                  </div>
                </div>
                {/* Fixed-ratio frame — fills (cover); height constant across steps so nothing jumps */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-white">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={active}
                      src={step.img}
                      alt={step.imgAlt}
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      initial={prefersReducedMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={prefersReducedMotion ? {} : { opacity: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: screenshot — desktop only ─── */}
          <div className="hidden lg:block lg:sticky lg:top-8">
            <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-[0_8px_48px_rgba(0,0,0,0.1)] bg-white">
              {/* Browser chrome */}
              <div className="bg-neutral-100 border-b border-neutral-200 px-4 py-2.5 flex items-center gap-3">
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 bg-white rounded-md h-5 px-3 flex items-center border border-neutral-200">
                  <span className="text-[0.6rem] text-neutral-400 font-medium">
                    {step.chromeLabel}
                  </span>
                </div>
              </div>
              {/* Fixed-ratio frame — fills (cover); height constant across steps so nothing jumps */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-white">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active}
                    src={step.img}
                    alt={step.imgAlt}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? {} : { opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.23, 1, 0.32, 1] }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-10 lg:mt-12">
          <CtaButton variant="secondary" href="/converter">
            Explore the Converter →
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
