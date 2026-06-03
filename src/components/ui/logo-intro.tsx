"use client";

import { useEffect, useRef } from "react";

// Dense → sparse
// "@#S%?*+=~-:,. "
//  0 1 2 3 4 5 6 7 8 9 10 11 12 13
const RAMP = "@#S%?*+=~-:,. ";
const L = RAMP.length;

// ── Six scatter bursts ──────────────────────────────────────────────
const BURSTS = [
  { start: 0.05, dur: 0.4, cycleDur: 0.12, lo: 11, hi: 13, alpha: 0.12 },
  { start: 0.42, dur: 0.38, cycleDur: 0.12, lo: 8, hi: 11, alpha: 0.26 },
  { start: 0.77, dur: 0.36, cycleDur: 0.11, lo: 5, hi: 8, alpha: 0.44 },
  { start: 1.1, dur: 0.34, cycleDur: 0.11, lo: 2, hi: 5, alpha: 0.62 },
  { start: 1.4, dur: 0.32, cycleDur: 0.11, lo: 1, hi: 3, alpha: 0.82 },
  { start: 1.68, dur: 0.3, cycleDur: 0.11, lo: 0, hi: 2, alpha: 1.0 },
] as const;

// ── Timing (seconds) ───────────────────────────────────────────────
const ALL_SETTLED = 1.68 + 0.3 + 0.11; // ≈ 2.09s  last burst settles
const ASCII_HOLD = 0.28; // brief pause after full ASCII
const XFADE_START = ALL_SETTLED + ASCII_HOLD; // ≈ 2.27s
const FADE_START = XFADE_START; // fade out immediately after white snap
const FADE_DUR = 0.55; // overlay fades to white, page reveals

const CELL_W = 7;
const CELL_H = 13;

function hash(i: number, seed: number): number {
  const s = Math.sin(i * seed + seed * 2.73) * 43758.5453;
  return s - Math.floor(s);
}

export function LogoIntro({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const calledRef = useRef(false);
  const snappedRef = useRef(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const canvas = canvasRef.current;
    if (!overlay || !canvas) return;

    const ctx = canvas.getContext("2d")!;

    let brightness: Float32Array | null = null;
    let rnd: Float32Array[] = [];
    let cols = 0,
      rows = 0,
      startMs = 0;

    function frame(now: number) {
      if (!brightness || rnd.length === 0) return;

      const t = (now - startMs) / 1000;

      // ── Overlay fade-out (page reveal) ─────────────────────────
      const fadeT = Math.max(0, t - FADE_START) / FADE_DUR;
      const overlayAlpha = Math.max(0, 1 - Math.pow(fadeT, 0.85));
      overlay.style.opacity = String(overlayAlpha);

      if (fadeT >= 1) {
        if (!calledRef.current) {
          calledRef.current = true;
          onComplete();
        }
        return;
      }

      // After ASCII fills: overlay is already fading (FADE_START = XFADE_START)
      // Nothing extra needed here — the overlay fade handles the exit

      // ── ASCII render ────────────────────────────────────────────
      ctx.clearRect(0, 0, cols * CELL_W, rows * CELL_H);
      ctx.font = `${CELL_H}px "Courier New", monospace`;
      ctx.textBaseline = "top";
      ctx.fillStyle = "#0a0a0a";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          if (brightness[idx] > 0.87) continue;

          let ci = -1,
            ca = 0;

          for (let b = BURSTS.length - 1; b >= 0; b--) {
            const bv = BURSTS[b];
            const cellPhase = rnd[b][idx];
            const revealAt = bv.start + cellPhase * bv.dur;
            if (t < revealAt) continue;

            const settleAt = revealAt + bv.cycleDur;
            const localProg = Math.min(1, (t - revealAt) / bv.cycleDur);

            if (t < settleAt) {
              const f = Math.floor(t * 24 + c * 2.3 + r * 3.7);
              ci = bv.lo + (f % (bv.hi - bv.lo + 1));
            } else {
              ci =
                b === 5
                  ? bv.lo + Math.floor(rnd[6][idx] * (bv.hi - bv.lo + 1))
                  : bv.lo;
            }

            ca = bv.alpha * Math.pow(localProg, 0.38);
            break;
          }

          if (ci < 0) continue;
          ctx.globalAlpha = ca;
          ctx.fillText(RAMP[ci], c * CELL_W, r * CELL_H);
        }
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(frame);
    }

    function init(img: HTMLImageElement) {
      const dpr = window.devicePixelRatio || 1;
      const vw = window.innerWidth;
      const logoW = Math.min(Math.round(vw * 0.82), 1100);
      const logoH = Math.round(logoW * (img.naturalHeight / img.naturalWidth));

      cols = Math.floor(logoW / CELL_W);
      rows = Math.floor(logoH / CELL_H);

      // Physical pixels = CSS pixels × dpr — prevents blur on retina screens
      canvas.width = cols * CELL_W * dpr;
      canvas.height = rows * CELL_H * dpr;
      canvas.style.width = cols * CELL_W + "px";
      canvas.style.height = rows * CELL_H + "px";
      ctx.scale(dpr, dpr); // all further draws use CSS pixel coordinates

      const N = cols * rows;
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const offCtx = off.getContext("2d")!;
      offCtx.fillStyle = "#ffffff";
      offCtx.fillRect(0, 0, cols, rows);
      offCtx.drawImage(img, 0, 0, cols, rows);

      const px = offCtx.getImageData(0, 0, cols, rows).data;
      brightness = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        brightness[i] =
          (0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2]) /
          255;
      }

      const seeds = [127.1, 311.7, 93.7, 419.3, 57.3, 739.1, 213.9];
      rnd = seeds.map((seed) => {
        const arr = new Float32Array(N);
        for (let i = 0; i < N; i++) arr[i] = hash(i, seed);
        return arr;
      });

      startMs = performance.now();
      rafRef.current = requestAnimationFrame(frame);
    }

    const img = new Image();
    img.onload = () => init(img);
    img.src = "/logo.svg";

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#ffffff",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
