"use client";

import { useState, useSyncExternalStore } from "react";
import { LogoIntro } from "@/components/ui/logo-intro";

const MOBILE_QUERY = "(max-width: 767px)";

// Read the media query as an external store: no setState-in-effect, and
// useSyncExternalStore handles hydration (server snapshot = false, so the
// markup matches SSR, then it re-renders to the real value on the client).
function useIsMobile() {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(MOBILE_QUERY);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );
}

export function LogoIntroWrapper() {
  const [done, setDone] = useState(false);
  const isMobile = useIsMobile();

  // The ASCII intro is desktop-only — it reads as visual noise on phones. CSS
  // hides the overlay below md before paint; this also avoids running the
  // canvas animation on mobile at all.
  if (done || isMobile) return null;
  return <LogoIntro onComplete={() => setDone(true)} />;
}
