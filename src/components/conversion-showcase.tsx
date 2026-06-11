"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useContactModal } from "@/lib/contact-modal-context";
import { withBase } from "@/lib/base-path";
import {
  StatusBadge,
  DifficultyPill,
  ModeTag,
  StatusIcon,
  type Tier,
  type Difficulty,
  type Mode,
} from "@/components/ui/platform-bits";

/* ----------------------------------------------------------------------------
 * Conversion pairs. The two Tableau-source pairs are live and carry full
 * construct-mapping detail; the rest are roadmap and render a preview + CTA.
 * Sources/targets/tiers mirror the site's canonical PATHS list.
 * -------------------------------------------------------------------------- */

interface Mapping {
  from: string;
  to: string;
  mode: Mode;
  difficulty: Difficulty;
  note: string;
}

interface CodeSample {
  fromLabel: string;
  fromCode: string;
  toLabel: string;
  toCode: string;
  guideHref?: string;
  guideLabel?: string;
}

interface Pair {
  source: string;
  target: string;
  tier: Tier;
  mappings?: Mapping[];
  code?: CodeSample;
}

const PAIRS: Pair[] = [
  {
    source: "Tableau",
    target: "Power BI",
    tier: "now",
    mappings: [
      { from: "Calculated fields", to: "DAX measures & columns", mode: "auto", difficulty: "easy", note: "Row-level vs. aggregate logic is detected and routed to the right DAX form." },
      { from: "LOD expressions (FIXED / INCLUDE / EXCLUDE)", to: "CALCULATE + ALLEXCEPT", mode: "review", difficulty: "hard", note: "Granularity is implicit in DAX filter context — each LOD is re-expressed and validated." },
      { from: "Table calculations", to: "DAX window functions", mode: "auto", difficulty: "medium", note: "Partition / address semantics mapped to running and percent-of-total patterns." },
      { from: "Parameters", to: "What-if parameters & fields", mode: "auto", difficulty: "easy", note: "Parameter controls and every downstream reference are rebuilt." },
      { from: "Data blending", to: "Model relationships", mode: "review", difficulty: "medium", note: "Blends become an explicit data model, not a runtime join." },
      { from: "Custom SQL", to: "Power Query / native query", mode: "review", difficulty: "medium", note: "Dialect-specific SQL is flagged with suggested rewrites." },
      { from: "Dashboard actions", to: "Bookmarks & drillthrough", mode: "auto", difficulty: "medium", note: "Filter and highlight actions mapped to Power BI's interaction model." },
      { from: "Row-level security", to: "RLS roles", mode: "review", difficulty: "medium", note: "User-filter logic translated to roles and DAX rules." },
    ],
    code: {
      fromLabel: "Tableau LOD",
      fromCode: "{ FIXED [Customer] : SUM([Sales]) }",
      toLabel: "DAX (Power BI)",
      toCode: "Customer Sales =\nCALCULATE(\n    SUM(Orders[Sales]),\n    ALLEXCEPT(Customers, Customers[Customer])\n)",
      guideHref: "/migration-library/tableau-lod-expressions-to-dax",
      guideLabel: "Full guide: Tableau LOD Expressions to DAX",
    },
  },
  {
    source: "Tableau",
    target: "Databricks AI/BI",
    tier: "now",
    mappings: [
      { from: "Calculated fields", to: "SQL expressions / metric-view measures", mode: "auto", difficulty: "easy", note: "Field logic is compiled to SQL or a metric-view measure." },
      { from: "LOD expressions (FIXED / INCLUDE / EXCLUDE)", to: "Windowed aggregates / GROUP BY", mode: "review", difficulty: "hard", note: "Fixed granularity is expressed with window functions over the correct grain." },
      { from: "Table calculations", to: "SQL window functions", mode: "auto", difficulty: "medium", note: "Running totals and percent-of-total mapped to OVER (…) windows." },
      { from: "Parameters", to: "Dashboard parameters & filters", mode: "auto", difficulty: "easy", note: "Parameter controls rebuilt as AI/BI dashboard inputs." },
      { from: "Data blending", to: "Modeled joins / views", mode: "review", difficulty: "medium", note: "Blends are resolved into explicit joins on the lakehouse." },
      { from: "Custom SQL", to: "Native Databricks SQL", mode: "auto", difficulty: "medium", note: "Most SQL ports directly; dialect edges are flagged." },
      { from: "Dashboard actions", to: "Cross-filtering & drill", mode: "auto", difficulty: "medium", note: "Interactions mapped to AI/BI dashboard cross-filters." },
      { from: "Row-level security", to: "Unity Catalog row filters", mode: "review", difficulty: "medium", note: "Access rules mapped to row filters and column masks." },
    ],
    code: {
      fromLabel: "Tableau LOD",
      fromCode: "{ FIXED [Customer] : SUM([Sales]) }",
      toLabel: "Databricks SQL",
      toCode: "SELECT\n  customer,\n  SUM(sales) OVER (\n    PARTITION BY customer\n  ) AS customer_sales\nFROM orders",
      guideHref: "/migration-library",
      guideLabel: "Browse the migration library",
    },
  },
  { source: "Power BI", target: "Tableau", tier: "beta" },
  { source: "Qlik", target: "Tableau", tier: "year" },
  { source: "Qlik", target: "Power BI", tier: "year" },
  { source: "Qlik", target: "Databricks AI/BI", tier: "year" },
  { source: "SAS VA", target: "Power BI", tier: "soon" },
  { source: "SAS VA", target: "Databricks AI/BI", tier: "soon" },
];

const SOURCES = ["Tableau", "Power BI", "Qlik", "SAS VA"];

const ROADMAP_PREVIEW = [
  "Calculations & measures",
  "Level-of-detail logic",
  "Data model & joins",
  "Visual & layout fidelity",
  "Security & access",
];

export function ConversionShowcase() {
  const { openModal } = useContactModal();
  const prefersReducedMotion = useReducedMotion();

  const [source, setSource] = useState("Tableau");
  const targets = useMemo(() => PAIRS.filter((p) => p.source === source), [source]);
  const [target, setTarget] = useState(targets[0].target);

  function selectSource(s: string) {
    setSource(s);
    const first = PAIRS.find((p) => p.source === s);
    if (first) setTarget(first.target);
  }

  const pair = PAIRS.find((p) => p.source === source && p.target === target) ?? targets[0];

  return (
    <section id="conversion-steps" className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
          Conversion expertise
        </p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-3">
          How every feature maps —{" "}
          <span className="text-neutral-600">platform by platform.</span>
        </h2>
        <p className="text-[0.95rem] text-neutral-500 leading-[1.6] mb-10 max-w-[560px]">
          Pick a conversion path and see exactly what Antares automates, what
          gets flagged for review, and how the hard parts translate.
        </p>

        {/* ── Switcher ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Source segmented control */}
          <div className="inline-flex flex-wrap gap-1 p-1 bg-neutral-100 rounded-xl w-fit">
            {SOURCES.map((s) => {
              const on = s === source;
              return (
                <button
                  key={s}
                  onClick={() => selectSource(s)}
                  aria-pressed={on}
                  className={`text-[0.82rem] font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                    on ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>

          {/* Target pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[0.72rem] text-neutral-600 font-medium mr-1">to</span>
            {targets.map((p) => {
              const on = p.target === target;
              return (
                <button
                  key={p.target}
                  onClick={() => setTarget(p.target)}
                  aria-pressed={on}
                  className={`inline-flex items-center gap-2 text-[0.82rem] font-semibold px-3.5 py-2 rounded-full border transition-colors cursor-pointer ${
                    on
                      ? "border-neutral-900 bg-neutral-950 text-white"
                      : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400"
                  }`}
                >
                  <StatusIcon tier={p.tier} />
                  {p.target}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Panel ────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${source}→${target}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-[0_8px_48px_rgba(0,0,0,0.06)]">
              {/* Panel header */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-neutral-100 bg-neutral-50">
                <p className="text-[0.95rem] font-bold text-neutral-900 tracking-[-0.01em]">
                  {pair.source} <span className="text-neutral-300 mx-1">→</span> {pair.target}
                </p>
                <StatusBadge tier={pair.tier} />
              </div>

              {pair.mappings ? (
                <LivePanel pair={pair} />
              ) : (
                <RoadmapPanel pair={pair} onNotify={openModal} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ── Live pair: full mapping list + flagship code card ──────────── */

function LivePanel({ pair }: { pair: Pair }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(300px,380px)]">
      {/* Mapping rows */}
      <div className="divide-y divide-neutral-100">
        {pair.mappings!.map((m) => (
          <div key={m.from} className="px-6 py-4">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1.5">
              <span className="text-[0.88rem] font-semibold text-neutral-900">{m.from}</span>
              <span className="text-neutral-300">→</span>
              <span className="text-[0.88rem] font-semibold text-neutral-600">{m.to}</span>
              <span className="ml-auto flex items-center gap-2.5">
                <ModeTag mode={m.mode} />
                <DifficultyPill level={m.difficulty} />
              </span>
            </div>
            <p className="text-[0.8rem] text-neutral-500 leading-[1.5]">{m.note}</p>
          </div>
        ))}
      </div>

      {/* Flagship code card */}
      {pair.code && (
        <div className="border-t lg:border-t-0 lg:border-l border-neutral-100 bg-neutral-50/60 p-6 flex flex-col">
          <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-neutral-600 mb-4">
            The hard part, handled
          </p>
          <CodeBlock label={pair.code.fromLabel} code={pair.code.fromCode} />
          <div className="flex justify-center my-2 text-neutral-300" aria-hidden="true">↓</div>
          <CodeBlock label={pair.code.toLabel} code={pair.code.toCode} accent />
          {pair.code.guideHref && (
            <a
              href={withBase(pair.code.guideHref)}
              className="mt-5 inline-flex items-center gap-1.5 text-[0.78rem] font-bold text-brand hover:text-brand-hover transition-colors"
            >
              {pair.code.guideLabel} →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function CodeBlock({ label, code, accent }: { label: string; code: string; accent?: boolean }) {
  return (
    <div className={`rounded-lg border overflow-hidden ${accent ? "border-brand/30" : "border-neutral-200"}`}>
      <div className={`px-3 py-1.5 text-[0.58rem] font-bold tracking-[0.1em] uppercase ${accent ? "bg-brand/10 text-brand-hover" : "bg-neutral-100 text-neutral-600"}`}>
        {label}
      </div>
      <pre className="px-3 py-2.5 text-[0.72rem] leading-[1.5] text-neutral-700 font-mono whitespace-pre-wrap break-words bg-white">
        {code}
      </pre>
    </div>
  );
}

/* ── Roadmap pair: muted preview + notify CTA ───────────────────── */

function RoadmapPanel({ pair, onNotify }: { pair: Pair; onNotify: () => void }) {
  return (
    <div className="px-6 py-8">
      <p className="text-[0.9rem] text-neutral-600 leading-[1.6] max-w-[520px] mb-6">
        {pair.source} → {pair.target}{" "}
        {pair.tier === "beta"
          ? "is in private beta — here's the depth it already covers:"
          : "isn't live yet — but the same depth is on the way. Here's what the converter will cover:"}
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 max-w-[600px] mb-8">
        {ROADMAP_PREVIEW.map((item) => (
          <li key={item} className="flex items-baseline gap-2 text-[0.84rem] text-neutral-600 leading-[1.5]">
            <span aria-hidden="true" className="text-neutral-300 shrink-0">→</span>
            {item}
          </li>
        ))}
      </ul>
      <button
        onClick={onNotify}
        className="inline-flex items-center gap-1.5 text-[0.82rem] font-bold tracking-[0.04em] uppercase text-neutral-900 border-b border-neutral-900 pb-px hover:text-brand hover:border-brand transition-colors cursor-pointer"
      >
        {pair.tier === "soon"
          ? "Notify me"
          : pair.tier === "beta"
          ? "Request beta access"
          : "Talk to us about this path"}{" "}
        →
      </button>
    </div>
  );
}
