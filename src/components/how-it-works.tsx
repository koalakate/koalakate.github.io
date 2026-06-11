"use client";

import { motion, useReducedMotion } from "motion/react";

const STEPS = [
  {
    num: "01",
    title: "Scan",
    description: "Connect Tableau or upload workbooks for a fast inventory of every dashboard, calculation, and data source.",
  },
  {
    num: "02",
    title: "Analyze",
    description: "Surface blockers, usage, and feature-level risk — with a Migration Readiness Score per workbook.",
  },
  {
    num: "03",
    title: "Plan",
    description: "A timeline and execution roadmap that align stakeholders before any code moves.",
  },
  {
    num: "04",
    title: "Convert",
    description: "Automate the repeatable conversion and validate outputs — Antares handles what's mechanical so your team handles what isn't.",
  },
] as const;

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
          How Antares Works
        </p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-12">
          A structured process.<br />No surprises.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="flex flex-col"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.45,
                delay: prefersReducedMotion ? 0 : i * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[0.6rem] font-bold tracking-[0.14em] uppercase text-neutral-600">
                  {step.num}
                </span>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block flex-1 h-px bg-neutral-200" />
                )}
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-500 leading-[1.6]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
