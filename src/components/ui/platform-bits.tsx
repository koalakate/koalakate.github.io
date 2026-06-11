/**
 * Small shared marketing primitives for the Analyzer/Converter platform panels.
 * Kept deliberately tiny — the two switcher components own their own layout;
 * these just standardize the status / difficulty / conversion-mode vocabulary
 * so both pages read the same.
 */

/* ── Roadmap status ─────────────────────────────────────────────── */

export type Tier = "now" | "beta" | "year" | "soon";

const TIER_LABEL: Record<Tier, string> = {
  now: "Available now",
  beta: "Private Beta",
  year: "Coming soon",
  soon: "Notify me",
};

/**
 * Status is shown with a distinct icon shape per tier (not a color-only dot),
 * so the meaning survives without color — better for colour-blind users and
 * readable on both light and dark cards.
 */
export type IconTier = "now" | "beta" | "year" | "soon";

const ICON_COLOR: Record<IconTier, string> = {
  now: "text-green-500",
  // Lighter blue so the sparkle stays visible on the dark "Private Beta" card
  // (brand #2563eb was nearly invisible on near-black).
  beta: "text-blue-400",
  year: "text-amber-500",
  soon: "text-neutral-400",
};

export function StatusIcon({ tier, className = "" }: { tier: IconTier; className?: string }) {
  const common = {
    width: 13,
    height: 13,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: `shrink-0 ${ICON_COLOR[tier]} ${className}`,
  };
  switch (tier) {
    case "now": // check — available
      return (<svg {...common}><path d="M20 6 9 17l-5-5" /></svg>);
    case "beta": // sparkle — private beta
      return (<svg {...common} fill="currentColor" stroke="none"><path d="M12 2l1.9 6.6L20 10.5l-6.1 1.9L12 19l-1.9-6.6L4 10.5l6.1-1.9z" /></svg>);
    case "year": // clock — coming soon
      return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 2" /></svg>);
    case "soon": // bell — notify me
      return (<svg {...common}><path d="M6 8a6 6 0 0 1 12 0c0 6 2.5 8 2.5 8h-17S6 14 6 8" /><path d="M10.5 21a1.8 1.8 0 0 0 3 0" /></svg>);
  }
}

export function StatusBadge({ tier }: { tier: Tier }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <StatusIcon tier={tier} />
      <span className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-neutral-500">
        {TIER_LABEL[tier]}
      </span>
    </span>
  );
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
