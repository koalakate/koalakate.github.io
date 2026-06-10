/**
 * Small shared marketing primitives for the Analyzer/Converter platform panels.
 * Kept deliberately tiny — the two switcher components own their own layout;
 * these just standardize the status / difficulty / conversion-mode vocabulary
 * so both pages read the same.
 */

/* ── Roadmap status ─────────────────────────────────────────────── */

export type Tier = "now" | "year" | "soon";

const TIER_LABEL: Record<Tier, string> = {
  now: "Available now",
  year: "Coming 2026",
  soon: "Notify me",
};

const TIER_DOT: Record<Tier, string> = {
  now: "bg-green-500",
  year: "bg-amber-400",
  soon: "bg-neutral-300",
};

export function StatusBadge({ tier }: { tier: Tier }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${TIER_DOT[tier]}`} />
      <span className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-neutral-500">
        {TIER_LABEL[tier]}
      </span>
    </span>
  );
}

export function statusDot(tier: Tier) {
  return TIER_DOT[tier];
}

/* ── Migration / conversion difficulty ──────────────────────────── */

export type Difficulty = "easy" | "medium" | "hard";

const DIFF: Record<Difficulty, { label: string; cls: string }> = {
  easy: { label: "Easy", cls: "bg-green-50 text-green-700 border-green-200" },
  medium: { label: "Moderate", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  hard: { label: "Hard", cls: "bg-red-50 text-red-700 border-red-200" },
};

export function DifficultyPill({ level }: { level: Difficulty }) {
  const d = DIFF[level];
  return (
    <span className={`inline-flex items-center text-[0.62rem] font-bold tracking-[0.04em] uppercase px-2 py-0.5 rounded-full border ${d.cls}`}>
      {d.label}
    </span>
  );
}

/* ── Conversion mode (auto vs. review) ──────────────────────────── */

export type Mode = "auto" | "review";

export function ModeTag({ mode }: { mode: Mode }) {
  if (mode === "auto") {
    return (
      <span className="inline-flex items-center gap-1 text-[0.62rem] font-bold tracking-[0.04em] uppercase text-green-700">
        <span aria-hidden="true">✓</span> Auto
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[0.62rem] font-bold tracking-[0.04em] uppercase text-amber-700">
      <span aria-hidden="true">⚑</span> Review
    </span>
  );
}
