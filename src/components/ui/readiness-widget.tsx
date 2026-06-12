"use client";

import { useState } from "react";

/* ----------------------------------------------------------------------------
 * Data — authored at the "All projects" scope (247 workbooks). Numbers are
 * stored numerically so a per-filter scale stays internally consistent: the
 * filter pills rescope the whole report (header KPIs + every table) the way
 * a real Tableau scan would. See FILTERS below.
 * -------------------------------------------------------------------------- */

interface Row {
  label: string;
  color: string;
  pct: number;            // share of the stacked bar (distribution is scope-invariant)
  values: [number, number]; // two metric columns, at base scope
  total: number;          // bold trailing column, at base scope
}

type TotalMode = "sum" | "independent"; // is `total` the sum of the two columns, or its own metric?

interface TabData {
  title: string;
  dimension: string;      // header for the first table column
  valueHeaders: [string, string];
  totalHeader: string;
  totalMode: TotalMode;
  totalFmt: "plain" | "k"; // how the trailing column is formatted
  rows: Row[];
}

const COMPLEXITY: TabData = {
  title: "Workbooks by Migration Complexity",
  dimension: "Complexity",
  valueHeaders: ["Auto-convert", "Manual"],
  totalHeader: "Workbooks",
  totalMode: "sum",
  totalFmt: "plain",
  rows: [
    { label: "Low",       color: "#22c55e", pct: 42, values: [100, 4],  total: 104 },
    { label: "Medium",    color: "#f59e0b", pct: 28, values: [58, 11],  total: 69 },
    { label: "High",      color: "#f97316", pct: 18, values: [30, 14],  total: 44 },
    { label: "Very High", color: "#ef4444", pct: 8,  values: [9, 11],   total: 20 },
    { label: "Extreme",   color: "#9333ea", pct: 4,  values: [3, 7],    total: 10 },
  ],
};

const FEATURES: TabData = {
  title: "Migration Effort by Feature",
  dimension: "Feature",
  valueHeaders: ["Auto-convert", "Manual review"],
  totalHeader: "Uses",
  totalMode: "sum",
  totalFmt: "plain",
  rows: [
    { label: "LOD expressions",   color: "#3B82F6", pct: 51, values: [420, 63], total: 483 },
    { label: "Table calcs",       color: "#6366f1", pct: 21, values: [180, 22], total: 202 },
    { label: "Dashboard actions", color: "#06b6d4", pct: 17, values: [140, 25], total: 165 },
    { label: "Custom SQL",        color: "#f97316", pct: 6,  values: [12, 44],  total: 56 },
    { label: "Data blends",       color: "#8b5cf6", pct: 5,  values: [30, 18],  total: 48 },
  ],
};

const USAGE: TabData = {
  title: "Usage by Department",
  dimension: "Department",
  valueHeaders: ["Active users", "Workbooks"],
  totalHeader: "Views · 30d",
  totalMode: "independent",
  totalFmt: "k",
  rows: [
    { label: "Sales",      color: "#3B82F6", pct: 38, values: [120, 64], total: 18400 },
    { label: "Finance",    color: "#0ea5e9", pct: 25, values: [64, 48],  total: 12100 },
    { label: "Operations", color: "#14b8a6", pct: 20, values: [88, 71],  total: 9700 },
    { label: "Marketing",  color: "#f59e0b", pct: 13, values: [42, 38],  total: 6300 },
    { label: "Other",      color: "#94a3b8", pct: 4,  values: [19, 26],  total: 2200 },
  ],
};

type TabKey = "complexity" | "features" | "usage";
const TABS: { key: TabKey; label: string }[] = [
  { key: "complexity", label: "Complexity" },
  { key: "features",   label: "Features" },
  { key: "usage",      label: "Usage" },
];

/* Filter pills rescope the report. `factor` scales every row; the header KPIs
 * are authored per scope so the story stays coherent (the whole server is
 * larger and messier; the active subset is smaller and cleaner). */
interface Filter {
  key: string;
  label: string;
  factor: number;
  scanned: number; // ≈ round(247 * factor)
  ready: number;   // readiness ring
  autoPct: number;
  effort: string;
}

const FILTERS: Filter[] = [
  { key: "projects", label: "All projects", factor: 1,    scanned: 247, ready: 68, autoPct: 81, effort: "~140h" },
  { key: "sites",    label: "All sites",    factor: 2.6,  scanned: 642, ready: 61, autoPct: 74, effort: "~360h" },
  { key: "active",   label: "Active only",  factor: 0.55, scanned: 136, ready: 74, autoPct: 88, effort: "~70h" },
];

/* ----------------------------------------------------------------------------
 * Formatting + scaling
 * -------------------------------------------------------------------------- */

function fmtK(n: number) {
  if (n >= 1000) {
    const v = n / 1000;
    return `${v.toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(n);
}

const fmtNum = (n: number) => n.toLocaleString("en-US");

/** Apply a filter's scale to a tab's rows. Distribution (pct) is scope-invariant
 *  under a uniform scale, so the stacked bar is preserved and only counts move. */
function scaleTab(data: TabData, factor: number): TabData {
  if (factor === 1) return data;
  return {
    ...data,
    rows: data.rows.map((r) => {
      const v0 = Math.round(r.values[0] * factor);
      const v1 = Math.round(r.values[1] * factor);
      const total = data.totalMode === "sum" ? v0 + v1 : Math.round(r.total * factor);
      return { ...r, values: [v0, v1] as [number, number], total };
    }),
  };
}

/* ----------------------------------------------------------------------------
 * Small pieces
 * -------------------------------------------------------------------------- */

const CIRC = 2 * Math.PI * 46;

function ScoreRing({ value, size = 64 }: { value: number; size?: number }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r="46" fill="none" stroke="#e5e7eb" strokeWidth="9" />
        <circle cx="60" cy="60" r="46" fill="none" stroke="#22c55e" strokeWidth="9"
          strokeDasharray={`${(value / 100) * CIRC} ${CIRC}`} strokeLinecap="round"
          className="transition-[stroke-dasharray] duration-500 ease-out" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bold text-neutral-900 leading-none tabular-nums" style={{ fontSize: size * 0.34 }}>
          {value}
        </span>
      </div>
    </div>
  );
}

function StackedBar({ rows }: { rows: Row[] }) {
  return (
    <div className="flex w-full h-9 rounded-md overflow-hidden">
      {rows.map((r) => (
        <div
          key={r.label}
          className="h-full flex items-center px-2.5 overflow-hidden"
          style={{ width: `${r.pct}%`, backgroundColor: r.color }}
          title={`${r.label} — ${r.pct}%`}
        >
          {r.pct >= 12 && (
            <span className="text-[0.62rem] font-semibold text-white whitespace-nowrap leading-none truncate">
              {r.label} <span className="opacity-80">{r.pct}%</span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function BreakdownTable({ data }: { data: TabData }) {
  const fmtTotal = (n: number) => (data.totalFmt === "k" ? fmtK(n) : fmtNum(n));
  return (
    <table className="w-full mt-4 border-collapse">
      <thead>
        <tr className="text-[0.6rem] uppercase tracking-[0.05em] text-neutral-600">
          <th className="text-left font-semibold pb-2">{data.dimension}</th>
          <th className="text-right font-semibold pb-2">{data.valueHeaders[0]}</th>
          <th className="text-right font-semibold pb-2">{data.valueHeaders[1]}</th>
          <th className="text-right font-semibold pb-2">{data.totalHeader}</th>
        </tr>
      </thead>
      <tbody>
        {data.rows.map((r) => (
          <tr key={r.label} className="border-t border-neutral-100">
            <td className="py-2">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }} />
                <span className="text-[0.72rem] font-medium text-neutral-700">{r.label}</span>
                <span className="text-[0.6rem] text-neutral-600">{r.pct}%</span>
              </span>
            </td>
            <td className="py-2 text-right text-[0.72rem] text-neutral-500 tabular-nums">{fmtNum(r.values[0])}</td>
            <td className="py-2 text-right text-[0.72rem] text-neutral-500 tabular-nums">{fmtNum(r.values[1])}</td>
            <td className="py-2 text-right text-[0.72rem] font-bold text-neutral-900 tabular-nums">{fmtTotal(r.total)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function BreakdownView({ data }: { data: TabData }) {
  return (
    <div>
      <p className="text-[0.72rem] font-bold text-neutral-800 mb-3">{data.title}</p>
      <StackedBar rows={data.rows} />
      <BreakdownTable data={data} />
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Public API
 * -------------------------------------------------------------------------- */

export interface WidgetConfig {
  widgetWidth: number; // px, widget max-width
}

export const WIDGET_DEFAULTS: WidgetConfig = {
  widgetWidth: 560,
};

const TAB_DATA: Record<TabKey, TabData> = {
  complexity: COMPLEXITY,
  features: FEATURES,
  usage: USAGE,
};

export function ReadinessWidget({ cfg = WIDGET_DEFAULTS }: { cfg?: WidgetConfig }) {
  const [active, setActive] = useState<TabKey>("complexity");
  const [filterKey, setFilterKey] = useState<string>(FILTERS[0].key);

  const filter = FILTERS.find((f) => f.key === filterKey) ?? FILTERS[0];
  const data = scaleTab(TAB_DATA[active], filter.factor);

  return (
    <div style={{ width: "100%", maxWidth: cfg.widgetWidth }}>
      {/* Browser chrome */}
      <div className="bg-neutral-100 rounded-t-2xl border border-neutral-200 border-b-0 px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 bg-white border border-neutral-200 rounded px-3 py-1 text-[0.65rem] text-neutral-600 font-mono text-center">
          app.getantares.io / report
        </div>
        <div className="w-[54px]" />
      </div>

      {/* Panel */}
      <div className="bg-white border border-neutral-200 rounded-b-2xl shadow-[0_12px_48px_rgba(0,0,0,0.09)] overflow-hidden">

        {/* KPI header — high-level aggregate, rescoped by the active filter */}
        <div className="flex items-center gap-5 px-6 py-5 border-b border-neutral-100">
          <ScoreRing value={filter.ready} />
          <div className="min-w-0">
            <p className="text-[0.62rem] uppercase tracking-[0.06em] text-neutral-600 font-semibold">Migration Readiness</p>
            <p className="text-[0.72rem] text-neutral-500 mt-0.5 tabular-nums">Tableau Server · {filter.scanned} workbooks scanned</p>
          </div>
          <div className="ml-auto flex gap-6 flex-shrink-0">
            <div className="text-right">
              <p className="text-[1.05rem] font-bold text-neutral-900 leading-none tabular-nums">{filter.autoPct}%</p>
              <p className="text-[0.58rem] uppercase tracking-[0.04em] text-neutral-600 font-semibold mt-1">Auto-convert</p>
            </div>
            <div className="text-right">
              <p className="text-[1.05rem] font-bold text-neutral-900 leading-none tabular-nums">{filter.effort}</p>
              <p className="text-[0.58rem] uppercase tracking-[0.04em] text-neutral-600 font-semibold mt-1">Est. effort</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-5 px-6 pt-3 border-b border-neutral-100">
          {TABS.map((t) => {
            const on = t.key === active;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`relative pb-2.5 text-[0.74rem] font-semibold transition-colors ${
                  on ? "text-neutral-900" : "text-neutral-600 hover:text-neutral-600"
                }`}
              >
                {t.label}
                {on && <span className="absolute left-0 right-0 -bottom-px h-0.5 rounded-full bg-brand" />}
              </button>
            );
          })}
        </div>

        {/* Filter chips — clickable, rescope the whole report */}
        <div className="flex gap-1.5 flex-wrap px-6 pt-4">
          {FILTERS.map((f) => {
            const on = f.key === filterKey;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilterKey(f.key)}
                aria-pressed={on}
                className={`text-[0.62rem] font-medium px-2.5 py-0.5 rounded-full border transition-colors cursor-pointer ${
                  on
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300 hover:text-neutral-700"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Active tab content */}
        <div className="px-6 py-5">
          <BreakdownView data={data} />
        </div>
      </div>
    </div>
  );
}
