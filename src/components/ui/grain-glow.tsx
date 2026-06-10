/* Grainy amber glow — a warm radial gradient anchored to the right edge with
 * film-grain noise that concentrates in the bright zone and fades with the
 * gradient. Pure CSS + an inline SVG feTurbulence; no image asset.
 *
 * Drop it into a `relative isolate` parent (use className="-z-10" to sit behind
 * the content). The grain is the noise mask INTERSECTED with the glow shape, so
 * speckles only appear inside the glow and fade out exactly with it. */

// noise → hard-thresholded alpha so specks read as distinct grain (not soft mottle)
const NOISE_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'>" +
  "<filter id='g'>" +
  "<feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/>" +
  "<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/>" +
  "<feComponentTransfer><feFuncA type='linear' slope='2.8' intercept='-0.7'/></feComponentTransfer>" +
  "</filter>" +
  "<rect width='100%' height='100%' filter='url(#g)'/></svg>";
const NOISE_URL = `data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}`;

// position / size of the glow ellipse — center pushed off the right edge so the
// glow sits hard to the right and only its left falloff shows on screen
const GLOW_AT = "108% 86% at 120% 50%";

export function GrainGlow({
  className = "",
  grainOpacity = 0.32,
}: {
  className?: string;
  grainOpacity?: number;
}) {
  // glow falloff, reused for the gradient fill and as the grain's second mask
  const falloff = `radial-gradient(${GLOW_AT}, #000 0%, #000 30%, rgba(0,0,0,0.55) 50%, transparent 72%)`;

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* smooth warm gradient glow (base color) */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(${GLOW_AT}, rgba(255,176,0,0.38) 0%, rgba(255,140,0,0.20) 28%, rgba(255,201,128,0.07) 52%, rgba(255,255,255,0) 72%)`,
        }}
      />
      {/* burnt-orange film grain = noise ∩ glow shape */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgb(204,51,0)", // reddish-orange specks
          opacity: grainOpacity,
          maskImage: `url("${NOISE_URL}"), ${falloff}`,
          maskComposite: "intersect",
          maskSize: "260px 260px, cover",
          maskRepeat: "repeat, no-repeat",
          WebkitMaskImage: `url("${NOISE_URL}"), ${falloff}`,
          WebkitMaskComposite: "source-in",
          WebkitMaskSize: "260px 260px, cover",
          WebkitMaskRepeat: "repeat, no-repeat",
        }}
      />
    </div>
  );
}
