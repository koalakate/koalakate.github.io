"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const PATHS = [
  { from: "Tableau", to: "Power BI", available: true },
  { from: "Tableau", to: "Databricks AI/BI", available: true },
  { from: "Power BI", to: "Tableau", available: true },
  { from: "SAS VA", to: "Databricks AI/BI", available: true },
] as const;

function PathChips() {
  return (
    <div className="flex gap-2 flex-wrap">
      {PATHS.map((p) => (
        <span
          key={`${p.from}-${p.to}`}
          className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-neutral-700 bg-neutral-100 border border-neutral-200 px-3 py-1.5 rounded-full"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
          {p.from} → {p.to}
        </span>
      ))}
    </div>
  );
}

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
    title: "Manual corrections — 80% less",
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
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const bump = useCallback(() => {
    setActive((a) => (a + 1) % STEPS.length);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(bump, 8000);
  }, [bump]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, resetTimer]);

  function select(i: number) {
    setActive(i);
  }

  const step = STEPS[active];

  return (
    <section id="converter" className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* ── Section header — full width, outside the two-column grid ── */}
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-400 mb-5">
          Converter
        </p>
        <h2 className="text-[1.85rem] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-3">
          Automated BI conversion.{" "}
          <span className="text-neutral-400">In three steps.</span>
        </h2>
        <p className="text-[0.95rem] text-neutral-500 leading-[1.6] mb-10">
          Antares automates 70–90% of the conversion work. Weeks of manual
          rebuilding done in hours.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 xl:gap-16 items-start">

          {/* ── Left: step list ─────────────────────────────────── */}
          <div>
            {/* Conversion path chips — mobile only */}
            <div className="lg:hidden mb-8">
              <PathChips />
            </div>

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
                            ? "bg-[#3B82F6] text-white"
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
                            className="mt-3 h-[2px] bg-[#3B82F6] rounded-full"
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

            <div className="mt-6 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
              <span>⏱</span>
              ~70% time saved vs. manual rebuild
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
                {/* Fixed-ratio image area — all SVGs share the same intrinsic size so no jump */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
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
            {/* Conversion path chips — desktop */}
            <div className="mb-5">
              <PathChips />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, y: -6, scale: 0.99 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.38, ease: [0.23, 1, 0.32, 1] }}
              >
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
                  {/* Dashboard */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.img}
                    alt={step.imgAlt}
                    className="w-full block"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
