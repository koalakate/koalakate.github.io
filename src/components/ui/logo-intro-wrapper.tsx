"use client";

import { useState } from "react";
import { LogoIntro } from "@/components/ui/logo-intro";

export function LogoIntroWrapper() {
  const [done, setDone] = useState(false);
  if (done) return null;
  return <LogoIntro onComplete={() => setDone(true)} />;
}
