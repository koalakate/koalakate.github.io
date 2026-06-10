"use client";

import { useEffect, useRef } from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { CtaButton } from "@/components/ui/cta-button";
import { useContactModal } from "@/lib/contact-modal-context";

// hard-thresholded fractal noise → distinct specks (not soft mottle).
// Low frequency + high threshold keeps specks sparse so the amber shows through.
const NOISE_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'>" +
  "<filter id='n'>" +
  "<feTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='2' stitchTiles='stitch'/>" +
  "<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/>" +
  "<feComponentTransfer><feFuncA type='linear' slope='2.2' intercept='-1.05'/></feComponentTransfer>" +
  "</filter>" +
  "<rect width='100%' height='100%' filter='url(#n)'/></svg>";
const NOISE_URL = `data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}`;
// glow falloff, reused as the grain's second mask so specks fade with the glow
const GRAIN_FALLOFF =
  "radial-gradient(ellipse at center, #000 0%, #000 35%, rgba(0,0,0,0.5) 55%, transparent 72%)";

export function Cta({
  title = "Let's talk migration.",
  description = "Get your free Migration Readiness Score, or talk to our team about end-to-end delivery.",
}: {
  title?: string;
  description?: string;
} = {}) {
  const { openModal } = useContactModal();
  const sectionRef = useRef<HTMLElement>(null);
  // two filters share the same animated params: grain (displace) + orb (displace→blur)
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbBlurRef = useRef<SVGFETurbulenceElement>(null);
  const dispBlurRef = useRef<SVGFEDisplacementMapElement>(null);

  // Mouse-driven liquid distortion: cursor distance from the glow center drives
  // the displacement magnitude + turbulence frequency; everything eases via rAF.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let scale = 0;
    let targetScale = 0;
    let freq = 0.009;
    let targetFreq = 0.009;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.bottom; // glow is anchored to the bottom edge
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const dist = Math.min(1, Math.hypot(dx, dy));
      targetScale = 35 + dist * 90;
      targetFreq = 0.006 + Math.abs(dx) * 0.016;
    };
    const onLeave = () => {
      targetScale = 0;
      targetFreq = 0.009;
    };

    const tick = () => {
      scale += (targetScale - scale) * 0.07;
      freq += (targetFreq - freq) * 0.07;
      const s = scale.toFixed(2);
      const f = freq.toFixed(4);
      dispRef.current?.setAttribute("scale", s);
      dispBlurRef.current?.setAttribute("scale", s);
      turbRef.current?.setAttribute("baseFrequency", f);
      turbBlurRef.current?.setAttribute("baseFrequency", f);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-[80px] lg:py-[120px] overflow-hidden text-center">
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        {/* grain: displace the already-speckled layer */}
        <filter id="cta-distort" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency="0.009" numOctaves="2" seed="4" result="t" />
          <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="t" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* orb: warp the sharp gradient first, THEN blur it back into a soft glow */}
        <filter id="cta-distort-blur" x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB">
          <feTurbulence ref={turbBlurRef} type="fractalNoise" baseFrequency="0.009" numOctaves="2" seed="4" result="t" />
          <feDisplacementMap ref={dispBlurRef} in="SourceGraphic" in2="t" scale="0" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="18" />
        </filter>
      </svg>

      {/* warm amber glow — sharp gradient so the displacement reads, softened by the filter's blur */}
      <div
        className="absolute bottom-[-30%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(ellipse at center, rgba(255, 184, 0, 0.42) 0%, rgba(255, 184, 0, 0.16) 42%, rgba(255, 184, 0, 0.04) 60%, transparent 70%)",
          filter: "url(#cta-distort-blur)",
        }}
        aria-hidden="true"
      />
      {/* grain wrapper carries the displacement filter; child carries the mask so the
          speckles exist BEFORE the filter runs and therefore actually warp */}
      <div
        className="absolute bottom-[-30%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{ zIndex: 0, filter: "url(#cta-distort)" }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: "rgb(204,51,0)",
            opacity: 0.18,
            maskImage: `url("${NOISE_URL}"), ${GRAIN_FALLOFF}`,
            maskComposite: "intersect",
            maskSize: "260px 260px, cover",
            maskRepeat: "repeat, no-repeat",
            WebkitMaskImage: `url("${NOISE_URL}"), ${GRAIN_FALLOFF}`,
            WebkitMaskComposite: "source-in",
            WebkitMaskSize: "260px 260px, cover",
            WebkitMaskRepeat: "repeat, no-repeat",
          }}
        />
      </div>
      <div className="max-w-[1200px] mx-auto px-6 relative z-[1]">
        <GradientHeading size="xl" weight="bold">
          {title}
        </GradientHeading>
        <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-medium text-neutral-500 leading-[1.5] tracking-[-0.01em] max-w-[440px] mx-auto mt-5">
          {description}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center sm:justify-center">
          <CtaButton href="https://try.getantares.io" className="w-full sm:w-auto">
            Run the Analyzer — Free
          </CtaButton>
          <CtaButton variant="secondary" onClick={openModal} className="w-full sm:w-auto">
            Get in Touch
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
