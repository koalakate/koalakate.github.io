"use client";

import { useState } from "react";
import { withBase } from "@/lib/base-path";
import { useContactModal } from "@/lib/contact-modal-context";
import { NotifyModal, type NotifyPath } from "@/components/ui/notify-modal";

/* ----------------------------------------------------------------------------
 * Data
 * -------------------------------------------------------------------------- */

type Tier = "now" | "beta" | "year" | "soon";

interface Tool {
  id: string;
  label: string;
  logo: string;
}

// Source ids and target ids share a namespace per column, so each path keys
// `from` into SOURCES and `to` into TARGETS independently.
const SOURCES: Tool[] = [
  { id: "tableau", label: "Tableau",  logo: "/logos/tableau.svg" },
  { id: "powerbi", label: "Power BI", logo: "/logos/powerbi.svg" },
  { id: "qlik",    label: "Qlik",     logo: "/logos/qlik.svg" },
  { id: "sasva",   label: "SAS VA",   logo: "/logos/sas.svg" },
];

const TARGETS: Tool[] = [
  { id: "powerbi",    label: "Power BI",         logo: "/logos/powerbi.svg" },
  { id: "tableau",    label: "Tableau",          logo: "/logos/tableau.svg" },
  { id: "databricks", label: "Databricks AI/BI", logo: "/logos/databricks.svg" },
];

const PATHS: { from: string; to: string; tier: Tier }[] = [
  { from: "tableau", to: "powerbi",    tier: "now" },
  { from: "tableau", to: "databricks", tier: "now" },
  { from: "powerbi", to: "tableau",    tier: "beta" },
  { from: "qlik",    to: "tableau",    tier: "year" },
  { from: "qlik",    to: "powerbi",    tier: "year" },
  { from: "qlik",    to: "databricks", tier: "year" },
  { from: "sasva",   to: "powerbi",    tier: "soon" },
  { from: "sasva",   to: "databricks", tier: "soon" },
];

// Ribbon fill color + default opacity per tier. Available routes read bold;
// future ones (Coming soon / Notify me) sit back at lower opacity.
const TIER_RIBBON: Record<Tier, { color: string; opacity: number }> = {
  now:  { color: "#22c55e", opacity: 0.7 },
  beta: { color: "#3B82F6", opacity: 0.7 },
  year: { color: "#F59E0B", opacity: 0.48 },
  soon: { color: "#9CA3AF", opacity: 0.4 },
};

const LEGEND: { tier: Tier; label: string }[] = [
  { tier: "now",  label: "Available now" },
  { tier: "beta", label: "Private beta" },
  { tier: "year", label: "Coming soon" },
  { tier: "soon", label: "Notify me" },
];

/* ----------------------------------------------------------------------------
 * Geometry — normalized 0..100 viewBox so the whole thing scales with the
 * container width with no DOM measurement. The SVG uses preserveAspectRatio
 * "none"; ribbon thickness is in y-units so it tracks the fixed height.
 * -------------------------------------------------------------------------- */

const SRC_W = 25;          // card width, % of container (sources & targets even)
const TGT_W = 25;
const SX = SRC_W;          // x of source right edge / ribbon start
const TX = 100 - TGT_W;    // x of target left edge / ribbon end
const DX = (TX - SX) / 2;  // bezier control horizontal offset
const PAD = 9;             // vertical padding, %

const RIB = 2.4;           // ribbon thickness, % of height
const RGAP = 1.1;          // gap between ribbons stacked at one node

// evenly spaced vertical centers (in %) for n nodes
function centers(n: number): number[] {
  if (n === 1) return [50];
  return Array.from({ length: n }, (_, i) => PAD + ((100 - 2 * PAD) * i) / (n - 1));
}

const SRC_Y = centers(SOURCES.length);
const TGT_Y = centers(TARGETS.length);
const srcY = (id: string) => SRC_Y[SOURCES.findIndex((s) => s.id === id)];
const tgtY = (id: string) => TGT_Y[TARGETS.findIndex((t) => t.id === id)];

// Stack each node's links into vertical "ports" centered on the node, so
// ribbons leave/arrive flush and side-by-side instead of overlapping.
function buildPorts() {
  const src: Record<string, number> = {};
  const tgt: Record<string, number> = {};
  const place = (
    group: Tool[],
    keyOf: (t: Tool) => typeof PATHS,
    anchorY: (id: string) => number,
    sortY: (p: (typeof PATHS)[number]) => number,
    out: Record<string, number>
  ) => {
    group.forEach((node) => {
      const links = keyOf(node).slice().sort((a, b) => sortY(a) - sortY(b));
      const band = links.length * RIB + (links.length - 1) * RGAP;
      const start = anchorY(node.id) - band / 2 + RIB / 2;
      links.forEach((l, i) => { out[`${l.from}-${l.to}`] = start + i * (RIB + RGAP); });
    });
  };
  place(SOURCES, (s) => PATHS.filter((p) => p.from === s.id), srcY, (p) => tgtY(p.to), src);
  place(TARGETS, (t) => PATHS.filter((p) => p.to === t.id), tgtY, (p) => srcY(p.from), tgt);
  return { src, tgt };
}
const PORTS = buildPorts();

function ribbonPath(from: string, to: string): string {
  const scy = PORTS.src[`${from}-${to}`];
  const tcy = PORTS.tgt[`${from}-${to}`];
  const h = RIB / 2;
  return [
    `M ${SX} ${scy - h}`,
    `C ${SX + DX} ${scy - h}, ${TX - DX} ${tcy - h}, ${TX} ${tcy - h}`,
    `L ${TX} ${tcy + h}`,
    `C ${TX - DX} ${tcy + h}, ${SX + DX} ${scy + h}, ${SX} ${scy + h}`,
    "Z",
  ].join(" ");
}

/* ----------------------------------------------------------------------------
 * Small pieces
 * -------------------------------------------------------------------------- */

function ToolBadge({ tool, size = 38 }: { tool: Tool; size?: number }) {
  return (
    <span
      className="flex items-center justify-center rounded-lg bg-white border border-neutral-200 shrink-0"
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={withBase(tool.logo)} alt={`${tool.label} logo`} className="object-contain" style={{ width: size * 0.6, height: size * 0.6 }} />
    </span>
  );
}

function LegendIcon({ tier }: { tier: Tier }) {
  const c = TIER_RIBBON[tier].color;
  const common = {
    width: 14, height: 14, viewBox: "0 0 24 24", fill: "none",
    stroke: c, strokeWidth: 2.6, strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const, "aria-hidden": true,
  };
  switch (tier) {
    case "now":  return <svg {...common}><path d="M20 6 9 17l-5-5" /></svg>;
    case "beta": return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
    case "year": return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 2" /></svg>;
    case "soon": return <svg {...common}><path d="M6 8a6 6 0 0 1 12 0c0 6 2.5 8 2.5 8h-17S6 14 6 8" /><path d="M10.5 21a1.8 1.8 0 0 0 3 0" /></svg>;
  }
}

/* ----------------------------------------------------------------------------
 * Component
 * -------------------------------------------------------------------------- */

type Hover = { col: "source" | "target"; id: string } | null;

export function MigrationPaths() {
  const { openModal } = useContactModal();
  const [hovered, setHovered] = useState<Hover>(null);
  const [notifyPath, setNotifyPath] = useState<NotifyPath | null>(null);

  const pathActive = (p: { from: string; to: string }) =>
    !hovered ||
    (hovered.col === "source" && hovered.id === p.from) ||
    (hovered.col === "target" && hovered.id === p.to);

  const nodeActive = (col: "source" | "target", id: string) => {
    if (!hovered) return true;
    if (hovered.col === col && hovered.id === id) return true;
    if (col === "target" && hovered.col === "source")
      return PATHS.some((p) => p.from === hovered.id && p.to === id);
    if (col === "source" && hovered.col === "target")
      return PATHS.some((p) => p.to === hovered.id && p.from === id);
    return false;
  };

  // pending "Notify me" targets per source (only SAS VA today)
  const notifiableTargets = (sourceId: string) =>
    PATHS.filter((p) => p.from === sourceId && p.tier === "soon").map(
      (p) => TARGETS.find((t) => t.id === p.to)?.label ?? p.to
    );

  return (
    <section id="capabilities" className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
          Migration Paths
        </p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-3">
          Where are you headed?
        </h2>
        <p className="text-[0.95rem] text-neutral-500 leading-[1.55] mb-7 max-w-[520px]">
          Every supported route, at a glance. Hover a tool to trace its paths.
        </p>

        {/* ── Legend (above) ─────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8">
          {LEGEND.map((l) => (
            <span key={l.tier} className="inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-neutral-600">
              <LegendIcon tier={l.tier} />
              {l.label}
            </span>
          ))}
        </div>

        {/* ── Flow diagram (md+) ─────────────────────────────────────── */}
        <div className="hidden md:block">
          <div className="flex justify-between text-[0.62rem] font-bold tracking-[0.14em] uppercase text-neutral-400 mb-3">
            <span>Sources</span>
            <span>Targets</span>
          </div>

          <div className="relative h-[440px] lg:h-[500px]">
            {/* Ribbons */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {PATHS.map((p) => {
                const r = TIER_RIBBON[p.tier];
                const active = pathActive(p);
                return (
                  <path
                    key={`${p.from}-${p.to}`}
                    d={ribbonPath(p.from, p.to)}
                    fill={r.color}
                    style={{
                      opacity: active ? r.opacity : 0.07,
                      transition: "opacity 0.2s ease",
                    }}
                  />
                );
              })}
            </svg>

            {/* Source cards */}
            {SOURCES.map((s) => {
              const active = nodeActive("source", s.id);
              const pending = notifiableTargets(s.id);
              const notifiable = pending.length > 0;
              const cardProps = {
                onMouseEnter: () => setHovered({ col: "source", id: s.id }),
                onMouseLeave: () => setHovered(null),
                onFocus: () => setHovered({ col: "source", id: s.id }),
                onBlur: () => setHovered(null),
                className:
                  "absolute left-0 flex items-center gap-3 bg-white border border-neutral-200 rounded-xl px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand/40 " +
                  (active ? "opacity-100" : "opacity-30") +
                  (notifiable ? " cursor-pointer hover:border-neutral-300" : ""),
                style: { top: `${srcY(s.id)}%`, width: `${SRC_W}%`, transform: "translateY(-50%)" },
              } as const;

              const inner = (
                <>
                  <ToolBadge tool={s} />
                  <span className="text-[0.95rem] font-bold text-neutral-900 truncate">{s.label}</span>
                  {notifiable && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="ml-auto shrink-0">
                      <path d="M6 8a6 6 0 0 1 12 0c0 6 2.5 8 2.5 8h-17S6 14 6 8" /><path d="M10.5 21a1.8 1.8 0 0 0 3 0" />
                    </svg>
                  )}
                </>
              );

              return notifiable ? (
                <button
                  key={s.id}
                  type="button"
                  {...cardProps}
                  onClick={() => setNotifyPath({ from: s.label, to: pending.join(" & ") })}
                >
                  {inner}
                </button>
              ) : (
                <div key={s.id} tabIndex={0} {...cardProps}>
                  {inner}
                </div>
              );
            })}

            {/* Target cards */}
            {TARGETS.map((t) => {
              const active = nodeActive("target", t.id);
              return (
                <div
                  key={t.id}
                  tabIndex={0}
                  onMouseEnter={() => setHovered({ col: "target", id: t.id })}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered({ col: "target", id: t.id })}
                  onBlur={() => setHovered(null)}
                  className={
                    "absolute right-0 flex items-center gap-3 bg-white border border-neutral-200 rounded-xl px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand/40 " +
                    (active ? "opacity-100" : "opacity-30")
                  }
                  style={{ top: `${tgtY(t.id)}%`, width: `${TGT_W}%`, transform: "translateY(-50%)" }}
                >
                  <ToolBadge tool={t} />
                  <span className="text-[0.95rem] font-bold text-neutral-900 truncate">{t.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Stacked list (mobile fallback) ─────────────────────────── */}
        <div className="md:hidden flex flex-col gap-3">
          {SOURCES.map((s) => {
            const rows = PATHS.filter((p) => p.from === s.id);
            return (
              <div key={s.id} className="bg-white border border-neutral-200 rounded-xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2.5 mb-3">
                  <ToolBadge tool={s} size={30} />
                  <span className="text-sm font-bold text-neutral-900">{s.label}</span>
                  <span className="text-[0.6rem] font-bold tracking-[0.1em] uppercase text-neutral-400 ml-auto">from</span>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {rows.map((p) => {
                    const t = TARGETS.find((x) => x.id === p.to)!;
                    const r = TIER_RIBBON[p.tier];
                    const label = LEGEND.find((l) => l.tier === p.tier)!.label;
                    const row = (
                      <span className="flex items-center gap-2.5 w-full">
                        <ToolBadge tool={t} size={26} />
                        <span className="text-[0.85rem] font-semibold text-neutral-800">{t.label}</span>
                        <span className="ml-auto inline-flex items-center gap-1.5 text-[0.65rem] font-semibold" style={{ color: r.color }}>
                          <LegendIcon tier={p.tier} />
                          {label}
                        </span>
                      </span>
                    );
                    return (
                      <li key={p.to}>
                        {p.tier === "soon" ? (
                          <button
                            type="button"
                            onClick={() => setNotifyPath({ from: s.label, to: t.label })}
                            className="w-full text-left rounded-lg px-1.5 py-1 -mx-1.5 hover:bg-neutral-50 transition-colors cursor-pointer"
                          >
                            {row}
                          </button>
                        ) : (
                          <div className="px-1.5 py-1">{row}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* ── Custom-path line ───────────────────────────────────────── */}
        <div className="flex justify-end mt-8 pt-6 border-t border-neutral-100">
          <button
            onClick={openModal}
            className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-neutral-900 hover:text-brand transition-colors cursor-pointer"
          >
            Don&apos;t see your route? Get in touch
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <NotifyModal path={notifyPath} onClose={() => setNotifyPath(null)} />
    </section>
  );
}
