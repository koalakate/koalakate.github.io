"use client";

import { useEffect, useRef } from "react";

const RAMP = "@#S%?*+=~-:,. ";
const GOLDEN = (1 + Math.sqrt(5)) / 2;
const DEFAULT_N = 2000;

// Fire palette: red → orange
const FIRE_RGB: [number, number, number][] = [
  [250, 33, 1],   // #FA2101
  [252, 109, 2],  // #FC6D02
];

interface Particle {
  ox: number;
  oy: number;
  oz: number;
  offsetX: number;
  offsetY: number;
  vx: number;
  vy: number;
  charPhase: number;  // unique random phase → no wave sync
  colorPhase: number;
}

interface Proj {
  p: Particle;
  z2: number;
  nx: number;
  ny: number;
}

interface AsciiSphereProps {
  className?: string;
  /** Sphere radius in CSS pixels */
  radius?: number;
  /** Number of points — higher = denser surface */
  nPoints?: number;
  /** Y-axis rotation speed, radians/s */
  rotationSpeed?: number;
  /** Character font size in px — larger = more readable but less dense */
  fontSize?: number;
}

export function AsciiSphere({
  className,
  radius = 150,
  nPoints = DEFAULT_N,
  rotationSpeed = 0.28,
  fontSize = 8,
}: AsciiSphereProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, inside: false });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // Fibonacci sphere — uniform surface distribution
    const particles: Particle[] = Array.from({ length: nPoints }, (_, i) => {
      const theta = Math.acos(1 - 2 * (i + 0.5) / nPoints);
      const phi = 2 * Math.PI * i / GOLDEN;
      return {
        ox: Math.sin(theta) * Math.cos(phi),
        oy: Math.sin(theta) * Math.sin(phi),
        oz: Math.cos(theta),
        offsetX: 0, offsetY: 0, vx: 0, vy: 0,
        charPhase: Math.random() * Math.PI * 2,
        colorPhase: Math.random() * Math.PI * 2,
      };
    });

    // Per-color alpha LUTs — avoids rgba string allocation per frame
    const colorLuts = FIRE_RGB.map(([r, g, b]) =>
      Array.from({ length: 256 }, (_, i) =>
        `rgba(${r},${g},${b},${(i / 255).toFixed(2)})`
      )
    );

    const SPRING = 0.012;
    const DAMPING = 0.91;
    const REP_RADIUS = 110;
    const REP_FORCE = 50;

    let dpr = 1;
    let startMs = 0;

    // Остановить анимацию если пользователь предпочитает меньше движения
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      dpr = window.devicePixelRatio || 1;
      const w = wrap.clientWidth || radius * 2;
      const h = wrap.clientHeight || radius * 2;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function frame(now: number) {
      if (!startMs) startMs = now;
      const t = (now - startMs) / 1000;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Inner glow ball — drawn first, behind all chars
      ctx.save();
      ctx.filter = `blur(${Math.round(radius * 0.32)}px)`;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.95);
      grd.addColorStop(0,   "rgba(255,184,0,1)");
      grd.addColorStop(0.45,"rgba(255,184,0,0.7)");
      grd.addColorStop(0.8, "rgba(255,140,0,0.25)");
      grd.addColorStop(1,   "rgba(255,100,0,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.95, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Restore text settings after save/restore wipes them
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${fontSize}px "Courier New", monospace`;

      const rotY = rotationSpeed === 0 ? 0 : t * rotationSpeed;
      const rotX = rotationSpeed === 0 ? 0 : Math.sin(t * 0.13) * 0.18;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      const { x: mx, y: my, inside } = mouseRef.current;

      const projected: Proj[] = particles.map((p) => {
        const x1 = p.ox * cosY + p.oz * sinY;
        const z1 = -p.ox * sinY + p.oz * cosY;
        const y2 = p.oy * cosX - z1 * sinX;
        const z2 = p.oy * sinX + z1 * cosX;

        const fov = 340;
        const ps = fov / (fov + z2 * radius * 0.4);
        const nx = cx + x1 * radius * ps;
        const ny = cy + y2 * radius * ps;

        return { p, z2, nx, ny };
      });

      projected.sort((a, b) => a.z2 - b.z2);

      for (const { p, z2, nx, ny } of projected) {
        if (z2 < -0.15) continue;

        const depth = (z2 + 1) / 2;
        const drawX = nx + p.offsetX;
        const drawY = ny + p.offsetY;

        // Spring back
        p.vx -= p.offsetX * SPRING;
        p.vy -= p.offsetY * SPRING;

        // Mouse repulsion + tangential twist
        if (inside) {
          const dx = drawX - mx;
          const dy = drawY - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < REP_RADIUS * REP_RADIUS && d2 > 1) {
            const dist = Math.sqrt(d2);
            const falloff = (1 - dist / REP_RADIUS) ** 2;
            const f = falloff * REP_FORCE;
            p.vx += (dx / dist) * f;
            p.vy += (dy / dist) * f;
            const twist = falloff * REP_FORCE * 0.45;
            const sign = (p.ox + p.oy) > 0 ? 1 : -1;
            p.vx += (-dy / dist) * twist * sign;
            p.vy += (dx / dist) * twist * sign;
          }
        }

        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.offsetX += p.vx;
        p.offsetY += p.vy;

        // Per-particle random phase → each symbol flickers independently, no wave
        const charNoise = (Math.sin(t * 0.35 + p.charPhase) + 1) / 2;
        const ci = Math.floor(charNoise * (RAMP.length - 1));

        const colorNoise = (Math.sin(t * 0.22 + p.colorPhase) + 1) / 2;
        const colorIdx = Math.floor(colorNoise * 2) % 2;

        const alpha = Math.round((0.2 + depth * 0.8) * 255);
        ctx.fillStyle = colorLuts[colorIdx][alpha];
        ctx.fillText(RAMP[ci], drawX, drawY);
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    resize();
    if (!prefersReducedMotion) {
      rafRef.current = requestAnimationFrame(frame);
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, inside: true };
    };
    const onLeave = () => { mouseRef.current.inside = false; };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      ro.disconnect();
    };
  }, [radius, nPoints, rotationSpeed, fontSize]);

  return (
    <div ref={wrapRef} className={className}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
