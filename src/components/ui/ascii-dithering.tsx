"use client";

import { useEffect, useRef } from "react";

// Brightness ramp: dense (maps to dark pixels) → sparse (maps to light pixels)
const RAMP = "@#S%?*+=~-:,. ";

// Pre-built grayscale lookup to avoid per-char string allocation
const GRAY = Array.from({ length: 256 }, (_, i) => `rgb(${i},${i},${i})`);

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

interface AsciiDitheringProps {
  /** Path to the image or SVG (must be same-origin) */
  src: string;
  className?: string;
  /** Char cell width in px — smaller = more detail */
  cellW?: number;
  /** Char cell height in px */
  cellH?: number;
  /** Animation speed multiplier */
  speed?: number;
  /**
   * Wave noise amplitude (0–1).
   * 0 = perfectly static, 0.5 = heavy chaos
   */
  chaos?: number;
  /** Background fill colour — use "transparent" for no box */
  bg?: string;
  /**
   * Character foreground colour (hex).
   * Light bg → pass a dark colour e.g. "#111111".
   * Dark bg → leave undefined for auto white chars.
   */
  fg?: string;
}

export function AsciiDithering({
  src,
  className,
  cellW = 7,
  cellH = 13,
  speed = 1,
  chaos = 0.22,
  bg = "transparent",
  fg,
}: AsciiDitheringProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d")!;

    // Mutable state captured by closure — no re-renders needed
    let brightness: Float32Array | null = null;
    let cols = 0;
    let rows = 0;
    let startMs = 0;

    // Build per-alpha colour table once from the fg hex (if supplied)
    const fgRgb = fg ? parseHex(fg) : null;
    // Pre-built alpha table: 256 entries for rgba(r,g,b, 0/255 … 255/255)
    const FG_ALPHA = fgRgb
      ? Array.from(
          { length: 256 },
          (_, a) =>
            `rgba(${fgRgb[0]},${fgRgb[1]},${fgRgb[2]},${(a / 255).toFixed(3)})`,
        )
      : null;

    function frame(now: number) {
      if (!brightness || !canvas) return;

      const t = ((now - startMs) / 1000) * speed;
      const W = canvas.width;
      const H = canvas.height;

      if (bg === "transparent") {
        ctx.clearRect(0, 0, W, H);
      } else {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);
      }
      ctx.font = `${cellH}px "Courier New", monospace`;
      ctx.textBaseline = "top";

      // Phase-in: chars cycle randomly for first ~1.6s then settle
      const settle = Math.min(1, t / 1.6);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const b = brightness[r * cols + c];
          // Skip near-white background cells
          if (b > 0.87) continue;

          const nx = c / cols;
          const ny = r / rows;

          // Two-layer organic wave
          const wave =
            Math.sin(nx * 8.3 + t * 2.1) * Math.cos(ny * 6.7 + t * 1.9) +
            Math.sin((nx + ny) * 5.1 + t * 1.4) * 0.5;

          // Random phase-in noise that fades as settle → 1
          const phaseNoise =
            (1 - settle) * (Math.sin(c * 73.1 + r * 47.3 + t * 38) * 0.5 + 0.5);

          const baseIdx = (1 - b) * (RAMP.length - 1);
          const noisedIdx =
            baseIdx +
            wave * chaos * (RAMP.length - 1) * 0.35 +
            phaseNoise * (RAMP.length - 1) * 0.55;

          const ci = Math.max(
            0,
            Math.min(RAMP.length - 1, Math.round(noisedIdx)),
          );

          if (FG_ALPHA) {
            // fg mode: dark chars — alpha driven by pixel darkness + shimmer
            const alpha = Math.max(
              0.05,
              Math.min(1, (1 - b) * 0.92 + wave * 0.06),
            );
            ctx.fillStyle = FG_ALPHA[Math.round(alpha * 255)];
          } else {
            // auto mode: bright chars on dark bg
            const lum = Math.max(
              22,
              Math.min(255, Math.round((1 - b) * 210 + 30 + wave * 14)),
            );
            ctx.fillStyle = GRAY[lum];
          }

          ctx.fillText(RAMP[ci], c * cellW, r * cellH);
        }
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    function init(img: HTMLImageElement) {
      if (!wrap || !canvas) return;
      const cw = wrap.clientWidth || 960;
      const nw = img.naturalWidth || 1335;
      const nh = img.naturalHeight || 265;
      const ch = Math.round(cw * (nh / nw));

      canvas.width = cw;
      canvas.height = ch;

      cols = Math.floor(cw / cellW);
      rows = Math.floor(ch / cellH);

      // Sample brightness at ASCII grid resolution
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const offCtx = off.getContext("2d")!;
      offCtx.fillStyle = "#ffffff";
      offCtx.fillRect(0, 0, cols, rows);
      offCtx.drawImage(img, 0, 0, cols, rows);

      const px = offCtx.getImageData(0, 0, cols, rows).data;
      brightness = new Float32Array(cols * rows);
      for (let i = 0; i < cols * rows; i++) {
        brightness[i] =
          (0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2]) /
          255;
      }

      startMs = performance.now();
      rafRef.current = requestAnimationFrame(frame);
    }

    const img = new Image();
    img.onload = () => init(img);
    img.onerror = () => console.error("[AsciiDithering] failed to load:", src);
    img.src = src;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, cellW, cellH, speed, chaos, bg, fg]);

  return (
    <div ref={wrapRef} className={className} style={{ background: bg }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%" }} />
    </div>
  );
}
