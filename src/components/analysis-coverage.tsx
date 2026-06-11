"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  StatusBadge,
  DifficultyPill,
  StatusIcon,
  type Tier,
  type Difficulty,
} from "@/components/ui/platform-bits";

/* ----------------------------------------------------------------------------
 * What the Analyzer accounts for, per source platform. Tableau is live; the
 * rest are roadmap but get real per-platform copy so the depth is visible
 * before they ship. Constructs are grouped by migration difficulty.
 * -------------------------------------------------------------------------- */

interface Construct {
  name: string;
  difficulty: Difficulty;
  note: string;
}

interface Coverage {
  platform: string;
  tier: Tier;
  constructs: Construct[];
}

const COVERAGE: Coverage[] = [
  {
    platform: "Tableau",
    tier: "now",
    constructs: [
      { name: "LOD expressions (FIXED / INCLUDE / EXCLUDE)", difficulty: "hard", note: "Implicit granularity must be re-expressed downstream — every occurrence is counted and scored." },
      { name: "Data blending", difficulty: "hard", note: "Blends aren't joins; flagged wherever the target needs an explicit data model." },
      { name: "Table calculations", difficulty: "medium", note: "Partition and addressing semantics differ from window functions." },
      { name: "Custom SQL", difficulty: "medium", note: "Dialect-specific SQL is detected and rated for portability." },
      { name: "Dashboard actions & filters", difficulty: "medium", note: "Conditional and interaction logic is inventoried per dashboard." },
      { name: "Row-level security", difficulty: "medium", note: "User-filter logic is surfaced for role mapping on the target." },
      { name: "Calculated fields & measures", difficulty: "easy", note: "Standard aggregations map cleanly." },
      { name: "Parameters", difficulty: "easy", note: "Catalogued with every downstream reference." },
      { name: "Sets, groups, bins & hierarchies", difficulty: "easy", note: "Structural objects enumerated and carried over." },
    ],
  },
  {
    platform: "Power BI",
    tier: "year",
    constructs: [
      { name: "DAX with complex filter context", difficulty: "hard", note: "CALCULATE and context-transition logic is parsed and rated." },
      { name: "Composite & aggregation models", difficulty: "hard", note: "Mixed storage modes flagged for redesign on the target." },
      { name: "Power Query (M) transformations", difficulty: "medium", note: "Query steps inventoried for re-implementation." },
      { name: "RLS roles & OLS", difficulty: "medium", note: "Security roles surfaced for mapping." },
      { name: "Bookmarks & drillthrough", difficulty: "medium", note: "Navigation and interaction state catalogued." },
      { name: "Visuals & layout", difficulty: "easy", note: "Standard visuals map directly." },
      { name: "Slicers & filters", difficulty: "easy", note: "Filter scope captured per page." },
    ],
  },
  {
    platform: "Qlik",
    tier: "year",
    constructs: [
      { name: "Set analysis expressions", difficulty: "hard", note: "Set modifiers parsed and scored for equivalent filter logic." },
      { name: "Load script & data transformation", difficulty: "hard", note: "ETL in the load script flagged for pipeline redesign." },
      { name: "Master items & dimensions", difficulty: "medium", note: "Reusable definitions inventoried." },
      { name: "Section access", difficulty: "medium", note: "Access rules surfaced for role mapping." },
      { name: "Variables & $-expansion", difficulty: "medium", note: "Variable references traced through expressions." },
      { name: "Charts & objects", difficulty: "easy", note: "Native objects map to target visuals." },
      { name: "Selections & filters", difficulty: "easy", note: "Selection state captured." },
    ],
  },
  {
    platform: "SAS VA",
    tier: "soon",
    constructs: [
      { name: "Derived data items & advanced expressions", difficulty: "hard", note: "Computed items and expressions parsed and rated." },
      { name: "Stored process / external code", difficulty: "hard", note: "External SAS code flagged for re-platforming." },
      { name: "Report objects & interactions", difficulty: "medium", note: "Object-level interactions inventoried." },
      { name: "Data source mappings", difficulty: "medium", note: "Source bindings surfaced for remapping." },
      { name: "Prompts & filters", difficulty: "easy", note: "Prompt logic captured." },
      { name: "Layout & sections", difficulty: "easy", note: "Report layout carried over." },
    ],
  },
];

const GROUPS: { level: Difficulty; label: string }[] = [
  { level: "hard", label: "Hardest to migrate" },
  { level: "medium", label: "Needs attention" },
  { level: "easy", label: "Straightforward" },
];

const ALWAYS = ["Usage analytics", "Dependency graph", "Effort & cost estimate"];

export function AnalysisCoverage() {
  const prefersReducedMotion = useReducedMotion();
  const [platform, setPlatform] = useState("Tableau");
  const active = COVERAGE.find((c) => c.platform === platform) ?? COVERAGE[0];

  return (
    <section className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
          What Antares analyzes
        </p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-3">
          Every platform&apos;s hard parts —{" "}
          <span className="text-neutral-600">accounted for.</span>
        </h2>
        <p className="text-[0.95rem] text-neutral-500 leading-[1.6] mb-8 max-w-[560px]">
          Each BI platform has its own quirks. The Analyzer knows them — and
          scores every workbook on exactly how hard each one is to move.
        </p>

        {/* Platform tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {COVERAGE.map((c) => {
            const on = c.platform === platform;
            return (
              <button
                key={c.platform}
                onClick={() => setPlatform(c.platform)}
                aria-pressed={on}
                className={`inline-flex items-center gap-2 text-[0.82rem] font-semibold px-4 py-2 rounded-full border transition-colors cursor-pointer ${
                  on
                    ? "border-neutral-900 bg-neutral-950 text-white"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400"
                }`}
              >
                <StatusIcon tier={c.tier} />
                {c.platform}
              </button>
            );
          })}
        </div>

        {/* Keyed swap (no AnimatePresence mode="wait"): the old panel is replaced
            synchronously by the new one — no collapse-to-zero gap that made the
            page jump when platforms have different numbers of features. */}
        <motion.div
          key={platform}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
            {/* Roadmap notice for non-live platforms */}
            {active.tier !== "now" && (
              <div className="flex items-center gap-3 mb-6 text-[0.82rem] text-neutral-500">
                <StatusBadge tier={active.tier} />
                <span>{active.platform} as a source is on the roadmap — here&apos;s what the Analyzer will account for.</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {GROUPS.map((g) => {
                const items = active.constructs.filter((c) => c.difficulty === g.level);
                if (items.length === 0) return null;
                return (
                  <div key={g.level} className="bg-neutral-50 border border-neutral-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[0.62rem] font-bold tracking-[0.08em] uppercase text-neutral-500">
                        {g.label}
                      </span>
                      <DifficultyPill level={g.level} />
                    </div>
                    <ul className="flex flex-col gap-4">
                      {items.map((c) => (
                        <li key={c.name}>
                          <p className="text-[0.84rem] font-semibold text-neutral-900 leading-snug mb-1">{c.name}</p>
                          <p className="text-[0.78rem] text-neutral-500 leading-[1.5]">{c.note}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
        </motion.div>

        {/* Platform-agnostic baseline */}
        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.8rem] text-neutral-500">
          <span className="font-semibold text-neutral-700">Every analysis also maps:</span>
          {ALWAYS.map((a, i) => (
            <span key={a} className="inline-flex items-center gap-3">
              {i > 0 && <span className="text-neutral-300" aria-hidden="true">·</span>}
              {a}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
