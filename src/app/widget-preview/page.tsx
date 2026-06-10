"use client";

import { useState } from "react";
import { ReadinessWidget, WIDGET_DEFAULTS, type WidgetConfig } from "@/components/ui/readiness-widget";

function Slider({
  label, value, min, max, step = 1, unit = "px",
  onChange,
}: {
  label: string; value: number; min: number; max: number;
  step?: number; unit?: string; onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs text-neutral-600">
        <span className="font-medium">{label}</span>
        <span className="font-mono font-bold text-neutral-900">{value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-500"
      />
      <div className="flex justify-between text-[10px] text-neutral-400">
        <span>{min}{unit}</span><span>{max}{unit}</span>
      </div>
    </div>
  );
}

export default function WidgetPreview() {
  const [cfg, setCfg] = useState<WidgetConfig>(WIDGET_DEFAULTS);
  const set = (key: keyof WidgetConfig) => (v: number) =>
    setCfg((prev) => ({ ...prev, [key]: v }));

  const snippet = `widgetWidth: ${cfg.widgetWidth},`;

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <h1 className="text-lg font-bold text-neutral-900 mb-1">Widget Preview</h1>
      <p className="text-sm text-neutral-500 mb-8">Настрой значения, скопируй конфиг и передай мне.</p>

      <div className="flex gap-8 flex-wrap items-start">

        {/* Controls */}
        <div className="bg-white border border-neutral-200 rounded-xl p-6 w-72 flex-shrink-0 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-5">Параметры</p>
          <div className="flex flex-col gap-5">
            <Slider label="Ширина виджета"   value={cfg.widgetWidth}   min={400} max={900}  onChange={set("widgetWidth")} />
          </div>

          {/* Copy config */}
          <div className="mt-6 pt-5 border-t border-neutral-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">Конфиг</p>
            <pre className="text-[0.65rem] bg-neutral-50 border border-neutral-200 rounded p-3 leading-relaxed text-neutral-700 select-all whitespace-pre-wrap">
              {snippet}
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(snippet)}
              className="mt-2 w-full text-xs font-semibold text-white bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded transition-colors"
            >
              Копировать
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">Превью</p>
          <div className="bg-white border border-neutral-200 rounded-xl p-8 overflow-auto">
            <ReadinessWidget cfg={cfg} />
          </div>
          <p className="text-xs text-neutral-400 mt-3">
            Ширина контейнера превью: <span className="font-mono font-bold">{cfg.widgetWidth}px max-width</span>
          </p>
        </div>

      </div>
    </div>
  );
}
