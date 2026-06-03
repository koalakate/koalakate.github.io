"use client";

import { useState, useEffect, useCallback } from "react";
import { LogoIntro } from "@/components/ui/logo-intro";

export function PageIntroWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Start false on server — flip to true only after client mount to avoid
  // hydration mismatch ("children should not have changed").
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    setShowIntro(true);
  }, []);

  const handleComplete = useCallback(() => setShowIntro(false), []);

  return (
    <>
      {showIntro && <LogoIntro onComplete={handleComplete} />}
      {children}
    </>
  );
}
