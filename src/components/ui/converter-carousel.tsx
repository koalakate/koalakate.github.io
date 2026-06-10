"use client";

/**
 * Feature-carousel style component (adapted from cult-ui/feature-carousel)
 * Three-step migration story: Source → Auto-converted → Fine-tuned
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

// ── Step definitions ───────────────────────────────────────────────
const STEPS = [
  {
    num: 1,
    label: "Source",
    title: "Original Tableau Dashboard",
    description:
      "Your starting point — full layout, calculations, and visual hierarchy preserved exactly as-is.",
    img: "/screenshots/initial tableau.svg",
    badge: "Tableau",
    badgeClass:
      "border-orange-400/25 bg-orange-400/10 text-orange-300",
  },
  {
    num: 2,
    label: "Auto Conversion",
    title: "Converted in Seconds",
    description:
      "Charts, KPIs, filters, and DAX mappings generated automatically. Already usable — without a single manual edit.",
    img: "/screenshots/Antares Raw Result.svg",
    badge: "Power BI · Auto",
    badgeClass:
      "border-blue-400/25 bg-blue-400/10 text-blue-300",
  },
  {
    num: 3,
    label: "Fine Tuning",
    title: "Minimal Polish — 70% Less Work",
    description:
      "Expert time spent on brand alignment and edge cases only. Not rebuilding from scratch.",
    img: "/screenshots/Manual Fine-tuned Result.svg",
    badge: "Power BI · Final",
    badgeClass:
      "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  },
] as const;

type StepIdx = 0 | 1 | 2;

// ── Animation presets (same spring config as cult-ui original) ─────
const FADE_SCALE = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit:    { opacity: 0, scale: 0.96 },
  transition: { type: "spring", stiffness: 280, damping: 24, mass: 0.5 },
} as const;

const SLIDE_UP = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -10 },
  transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
} as const;

// ── Wrapper style with CSS custom property types ───────────────────
type CardStyle = MotionStyle & {
  "--x": MotionValue<string>;
  "--y": MotionValue<string>;
};

// ── Step navigation ────────────────────────────────────────────────
function StepNav({
  current,
  onChange,
}: {
  current: StepIdx;
  onChange: (i: StepIdx) => void;
}) {
  return (
    <nav className="flex gap-2 flex-wrap">
      {STEPS.map((s, i) => {
        const done = current > i;
        const active = current === i;
        return (
          <motion.button
            key={i}
            onClick={() => onChange(i as StepIdx)}
            animate={{ opacity: active ? 1 : done ? 0.7 : 0.45 }}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200",
              active
                ? "bg-white/10 text-white"
                : "text-neutral-400 hover:text-neutral-200"
            )}
          >
            <motion.span
              animate={{ scale: active ? 1.15 : 1 }}
              className={cn(
                "flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold transition-colors",
                done    && "bg-neutral-500 text-white",
                active  && "bg-brand text-white",
                !done && !active && "bg-white/10 text-neutral-400"
              )}
            >
              {done ? "✓" : s.num}
            </motion.span>
            {s.label}
          </motion.button>
        );
      })}
    </nav>
  );
}

// ── Browser-chrome screenshot wrapper ─────────────────────────────
function ScreenFrame({
  src,
  alt,
  badge,
  badgeClass,
}: {
  src: string;
  alt: string;
  badge: string;
  badgeClass: string;
}) {
  return (
    <div className="w-full rounded-t-xl overflow-hidden border border-white/10 shadow-[0_-12px_48px_rgba(0,0,0,0.6)]">
      {/* Browser chrome bar */}
      <div className="bg-neutral-800/90 px-4 py-2.5 flex items-center gap-3 border-b border-white/5">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
        </div>
        <div className="flex-1 bg-neutral-700/40 rounded-md h-4 mx-1" />
        <span
          className={cn(
            "shrink-0 text-[0.55rem] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full border",
            badgeClass
          )}
        >
          {badge}
        </span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full block"
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────
export function ConverterCarousel() {
  const [step, setStep] = useState<StepIdx>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const resetTimer = useCallback((nextStep: StepIdx) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setStep((s) => {
        const next = ((s + 1) % STEPS.length) as StepIdx;
        resetTimer(next);
        return next;
      });
    }, 8000);
    void nextStep;
  }, []);

  useEffect(() => {
    resetTimer(0);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleStepChange(i: StepIdx) {
    setStep(i);
    resetTimer(i);
  }

  const current = STEPS[step];

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      style={
        {
          "--x": useMotionTemplate`${mouseX}px`,
          "--y": useMotionTemplate`${mouseY}px`,
        } as CardStyle
      }
      className="animated-cards relative w-full rounded-2xl"
    >
      {/* Dark gradient card */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-neutral-950 to-neutral-900">
        {/* Mouse spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
          style={{
            background:
              "radial-gradient(500px circle at var(--x) var(--y), rgba(59,130,246,0.07) 0%, transparent 65%)",
          }}
        />

        <div className="px-8 pt-8 pb-0">
          {/* Step nav */}
          <StepNav current={step} onChange={handleStepChange} />

          {/* Animated text header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              {...SLIDE_UP}
              className="mt-5 mb-6"
            >
              <div className="flex items-center gap-3 mb-2.5">
                <span className="text-[0.58rem] font-bold tracking-[0.14em] uppercase text-neutral-500">
                  Step 0{current.num}
                </span>
                <span
                  className={cn(
                    "text-[0.6rem] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full border",
                    current.badgeClass
                  )}
                >
                  {current.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                {current.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed mt-1.5 max-w-[460px]">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Animated screenshot */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`screen-${step}`}
              {...FADE_SCALE}
              className="cursor-pointer"
              onClick={() =>
                handleStepChange(((step + 1) % STEPS.length) as StepIdx)
              }
            >
              <ScreenFrame
                src={current.img}
                alt={current.title}
                badge={current.badge}
                badgeClass={current.badgeClass}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
