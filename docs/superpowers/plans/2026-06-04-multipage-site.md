# Multi-Page Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand v2 single-page site into a multi-page product site: upgraded Home + /analyzer + /converter + /migration-library with MDX articles.

**Architecture:** Static export (`output: "export"`) — all pages pre-rendered at build time. ContactModal mounted in layout.tsx, triggered via React context. MDX articles read from `src/content/migration-library/` using `fs` + `gray-matter` + `remark` at build time via `generateStaticParams`.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, TypeScript, gray-matter, remark, remark-html

---

## Phase 1 — Infrastructure + Home

### Task 1: Install MDX dependencies

**Files:**
- Modify: `package.json`

- [ ] Install gray-matter and remark packages:

```bash
cd "/Users/ekaterinablagireva/Documents/work/BI migrator/website redesign/v2"
npm install gray-matter remark remark-html
npm install --save-dev @types/mdx
```

- [ ] Verify install completed without errors:

```bash
node -e "require('gray-matter'); require('remark'); console.log('ok')"
```

- [ ] Commit:

```bash
git add package.json package-lock.json
git commit -m "chore: add gray-matter and remark for MDX articles"
```

---

### Task 2: ContactModal component + context

**Files:**
- Create: `src/components/ui/contact-modal.tsx`
- Create: `src/lib/contact-modal-context.tsx`

- [ ] Create the context:

`src/lib/contact-modal-context.tsx`
```tsx
"use client";

import { createContext, useContext, useState } from "react";

interface ContactModalContextValue {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextValue>({
  open: false,
  openModal: () => {},
  closeModal: () => {},
});

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ContactModalContext.Provider
      value={{ open, openModal: () => setOpen(true), closeModal: () => setOpen(false) }}
    >
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  return useContext(ContactModalContext);
}
```

- [ ] Create the modal component:

`src/components/ui/contact-modal.tsx`
```tsx
"use client";

import { useEffect } from "react";
import { useContactModal } from "@/lib/contact-modal-context";

export function ContactModal() {
  const { open, closeModal } = useContactModal();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [closeModal]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-white flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Get in touch"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-neutral-200">
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500">
          Get in Touch
        </p>
        <button
          onClick={closeModal}
          aria-label="Close"
          className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 3L17 17M17 3L3 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-6 md:px-12 py-10">
        <div className="max-w-[560px]">
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold text-neutral-900 leading-[1.05] tracking-[-0.03em] mb-10">
            Let&apos;s talk about<br />your migration.
          </h2>
          <form
            action="mailto:hello@getantares.io"
            method="post"
            encType="text/plain"
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium tracking-[0.06em] uppercase text-neutral-500" htmlFor="modal-name">Name</label>
              <input
                id="modal-name"
                name="name"
                type="text"
                required
                placeholder="Jane Smith"
                className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium tracking-[0.06em] uppercase text-neutral-500" htmlFor="modal-email">Work email</label>
              <input
                id="modal-email"
                name="email"
                type="email"
                required
                placeholder="jane@company.com"
                className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium tracking-[0.06em] uppercase text-neutral-500" htmlFor="modal-company">Company</label>
              <input
                id="modal-company"
                name="company"
                type="text"
                placeholder="Acme Corp"
                className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium tracking-[0.06em] uppercase text-neutral-500" htmlFor="modal-migration">What are you migrating?</label>
              <input
                id="modal-migration"
                name="migration"
                type="text"
                placeholder="e.g. Tableau → Power BI, 200 workbooks"
                className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium tracking-[0.06em] uppercase text-neutral-500" htmlFor="modal-message">Message <span className="normal-case font-normal text-neutral-400">(optional)</span></label>
              <textarea
                id="modal-message"
                name="message"
                rows={4}
                placeholder="Tell us about your project, timeline, or questions..."
                className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-[#3B82F6] transition-colors bg-white resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-3.5 rounded-lg transition-colors"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
```

- [ ] Commit:

```bash
git add src/lib/contact-modal-context.tsx src/components/ui/contact-modal.tsx
git commit -m "feat: add ContactModal with context"
```

---

### Task 3: Mount ContactModal in layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] Update layout to mount provider + modal:

`src/app/layout.tsx`
```tsx
import type { Metadata } from "next";
import "./globals.css";
import { LogoIntroWrapper } from "@/components/ui/logo-intro-wrapper";
import { ContactModalProvider } from "@/lib/contact-modal-context";
import { ContactModal } from "@/components/ui/contact-modal";

export const metadata: Metadata = {
  title: "Antares — BI Migration Platform",
  description:
    "Analyze risk. Automate conversion. Migrate with confidence. Tableau to Power BI, Databricks AI/BI, and SAS VA — 70% faster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        <ContactModalProvider>
          <LogoIntroWrapper />
          {children}
          <ContactModal />
        </ContactModalProvider>
      </body>
    </html>
  );
}
```

- [ ] Commit:

```bash
git add src/app/layout.tsx
git commit -m "feat: mount ContactModalProvider and ContactModal in root layout"
```

---

### Task 4: Update Nav

**Files:**
- Modify: `src/components/nav.tsx`

- [ ] Replace NAV_LINKS and add Get in Touch button. Full file replacement:

`src/components/nav.tsx`
```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AntaresLogo } from "@/components/ui/logo";
import { useContactModal } from "@/lib/contact-modal-context";

const NAV_LINKS = [
  { href: "/analyzer", label: "Analyzer" },
  { href: "/converter", label: "Converter" },
  { href: "/migration-library", label: "Migration Library" },
  { href: "/#pricing", label: "Pricing" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const { openModal } = useContactModal();

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className="fixed top-4 left-4 right-4 z-50 bg-[rgba(250,250,250,0.85)] backdrop-blur-[20px] border border-neutral-200 rounded-xl px-6 py-3">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link href="/" aria-label="Antares home">
            <AntaresLogo />
          </Link>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={openModal}
              className="hidden md:inline-flex text-sm font-semibold text-neutral-900 border-[1.5px] border-neutral-300 hover:border-neutral-900 px-4 py-2 rounded-md transition-colors cursor-pointer"
            >
              Get in Touch
            </button>
            <a
              href="https://try.getantares.io"
              className="hidden md:inline-flex text-sm font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] px-5 py-2.5 rounded-md transition-colors"
            >
              Run the Analyzer
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] cursor-pointer"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className={`block w-5 h-[1.5px] bg-neutral-800 transition-transform duration-200 origin-center ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-neutral-800 transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-neutral-800 transition-transform duration-200 origin-center ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-white flex flex-col transition-transform duration-300 ease-out ${open ? "translate-y-0" : "-translate-y-full"}`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <Link href="/" aria-label="Antares home" onClick={() => setOpen(false)}>
            <AntaresLogo />
          </Link>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="w-10 h-10 flex items-center justify-center text-neutral-800 cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 3L17 17M17 3L3 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-6 pt-6 flex-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[3rem] font-bold text-neutral-900 leading-none tracking-[-0.03em] border-b border-neutral-100 py-5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 pb-10 pt-6 flex flex-col gap-3">
          <button
            onClick={() => { setOpen(false); openModal(); }}
            className="flex items-center justify-center w-full text-base font-semibold text-neutral-900 border-[1.5px] border-neutral-300 px-5 py-4 rounded-md transition-colors cursor-pointer"
          >
            Get in Touch
          </button>
          <a
            href="https://try.getantares.io"
            className="flex items-center justify-center w-full text-base font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] px-5 py-4 rounded-md transition-colors"
          >
            Run the Analyzer — Free
          </a>
        </div>
      </div>
    </>
  );
}
```

- [ ] Commit:

```bash
git add src/components/nav.tsx
git commit -m "feat: update nav with new page links and Get in Touch modal trigger"
```

---

### Task 5: ReadinessWidget component

**Files:**
- Create: `src/components/ui/readiness-widget.tsx`

- [ ] Create the light readiness widget:

`src/components/ui/readiness-widget.tsx`
```tsx
const CIRCUMFERENCE = 2 * Math.PI * 50; // r=50

export function ReadinessWidget() {
  const score = 68;
  const autoConvertible = 61;
  const arc = (score / 100) * CIRCUMFERENCE;

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-[340px]">
      {/* Ring */}
      <div className="flex justify-center mb-5">
        <div className="relative w-28 h-28">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90" aria-hidden="true">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#f5f5f5" strokeWidth="12" />
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="12"
              strokeDasharray={`${arc} ${CIRCUMFERENCE}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[2rem] font-bold text-neutral-900 leading-none">{score}</span>
            <span className="text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-neutral-500 mt-1">Readiness</span>
          </div>
        </div>
      </div>

      {/* Complexity tags */}
      <div className="flex flex-wrap gap-2 justify-center mb-5">
        {["LOD", "Custom SQL", "Parameters"].map((tag) => (
          <span
            key={tag}
            className="text-xs font-semibold bg-neutral-100 text-neutral-700 border border-neutral-200 px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Auto-convertible bar */}
      <div>
        <div className="flex justify-between text-xs font-medium text-neutral-600 mb-1.5">
          <span>Auto-convertible</span>
          <span className="text-[#3B82F6] font-bold">{autoConvertible}%</span>
        </div>
        <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#3B82F6] rounded-full"
            style={{ width: `${autoConvertible}%` }}
          />
        </div>
      </div>
    </div>
  );
}
```

- [ ] Commit:

```bash
git add src/components/ui/readiness-widget.tsx
git commit -m "feat: add ReadinessWidget component (light card, ring + tags + progress)"
```

---

### Task 6: Update Hero

**Files:**
- Modify: `src/components/hero.tsx`

- [ ] Replace hero content — new H1, widget, updated CTAs:

`src/components/hero.tsx`
```tsx
"use client";

import { ReadinessWidget } from "@/components/ui/readiness-widget";

export function Hero() {
  return (
    <section className="relative pt-[96px] md:pt-[160px] lg:pt-[180px] pb-[56px] md:pb-[120px] overflow-hidden min-h-[540px]">
      <div className="max-w-[1200px] mx-auto px-6 relative z-[1]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">

          {/* Left: text */}
          <div className="lg:max-w-[560px]">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
              BI Migration Platform
            </p>
            <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.0] tracking-[-0.04em] font-bold text-neutral-900">
              BI Migration —<br />
              from analysis<br />
              to delivery,<br />
              automated.
            </h1>
            <p className="text-[clamp(1rem,2vw,1.25rem)] font-medium text-neutral-500 leading-[1.5] tracking-[-0.01em] max-w-[480px] mt-5">
              Complete visibility into your BI workloads. Automated conversion.
              Expert delivery. 70% faster than manual rebuild.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="https://try.getantares.io"
                className="flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-base px-8 py-3 rounded transition-all hover:-translate-y-px w-full sm:w-auto"
              >
                Run the Analyzer — Free
              </a>
              <a
                href="#how-it-works"
                className="flex items-center justify-center gap-2 bg-transparent text-neutral-900 font-semibold text-base px-8 py-3 rounded border-[1.5px] border-neutral-900 transition-all hover:bg-neutral-900 hover:text-white w-full sm:w-auto"
              >
                How it works
              </a>
            </div>
            <p className="text-sm text-neutral-500 mt-4">
              Read-only analysis. No environment changes. No commitment.
            </p>
          </div>

          {/* Right: widget */}
          <div className="flex justify-center lg:justify-end lg:flex-shrink-0">
            <ReadinessWidget />
          </div>

        </div>
      </div>
    </section>
  );
}
```

- [ ] Commit:

```bash
git add src/components/hero.tsx
git commit -m "feat: update hero — new H1, ReadinessWidget, anchor CTA"
```

---

### Task 7: Manifesto section + HowItWorks section

**Files:**
- Create: `src/components/manifesto.tsx`
- Create: `src/components/how-it-works.tsx`

- [ ] Create manifesto strip:

`src/components/manifesto.tsx`
```tsx
export function Manifesto() {
  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold text-neutral-900 leading-[1.15] tracking-[-0.03em] max-w-[700px]">
          &ldquo;You cannot migrate what you haven&apos;t analyzed.&rdquo;
        </p>
      </div>
    </section>
  );
}
```

- [ ] Create How it Works section:

`src/components/how-it-works.tsx`
```tsx
const STEPS = [
  {
    num: "01",
    title: "Scan",
    description: "Connect Tableau or upload workbooks. Fast inventory of your full BI environment — every dashboard, calculation, and data source.",
  },
  {
    num: "02",
    title: "Analyze",
    description: "Surface blockers, usage patterns, and feature-level risk. Get a Migration Readiness Score with complexity scoring per workbook.",
  },
  {
    num: "03",
    title: "Plan",
    description: "Readiness score, timeline estimate, and execution roadmap. Data-backed plans that align stakeholders before a single line of code moves.",
  },
  {
    num: "04",
    title: "Convert",
    description: "Automate repeatable conversion and validate outputs. 70% less manual work — Antares handles what's mechanical so your team handles what isn't.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
          How Antares Works
        </p>
        <h2 className="text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-12">
          A structured process.<br />No surprises.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[0.6rem] font-bold tracking-[0.14em] uppercase text-neutral-400">
                  {step.num}
                </span>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block flex-1 h-px bg-neutral-200" />
                )}
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-500 leading-[1.6]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] Commit:

```bash
git add src/components/manifesto.tsx src/components/how-it-works.tsx
git commit -m "feat: add Manifesto and HowItWorks sections"
```

---

### Task 8: Update MigrationPaths with three tiers

**Files:**
- Modify: `src/components/migration-paths.tsx`

- [ ] Replace with tiered version:

`src/components/migration-paths.tsx`
```tsx
"use client";

import { useContactModal } from "@/lib/contact-modal-context";

type Tier = "now" | "year" | "soon";

const PATHS: { from: string; to: string; tier: Tier }[] = [
  { from: "Tableau", to: "Power BI", tier: "now" },
  { from: "Tableau", to: "Databricks AI/BI", tier: "now" },
  { from: "Power BI", to: "Tableau", tier: "year" },
  { from: "Qlik", to: "Tableau", tier: "year" },
  { from: "Qlik", to: "Power BI", tier: "year" },
  { from: "Qlik", to: "Databricks AI/BI", tier: "year" },
  { from: "SAS VA", to: "Power BI", tier: "soon" },
  { from: "SAS VA", to: "Databricks AI/BI", tier: "soon" },
];

const TIER_LABELS: Record<Tier, string> = {
  now: "Available now",
  year: "Coming 2026",
  soon: "Notify me",
};

const TIER_DOT: Record<Tier, string> = {
  now: "bg-green-500",
  year: "bg-amber-400",
  soon: "bg-neutral-300",
};

const TIER_CARD: Record<Tier, string> = {
  now: "bg-neutral-950 text-white",
  year: "bg-neutral-800 text-white",
  soon: "bg-neutral-100 text-neutral-500 border border-neutral-200",
};

export function MigrationPaths() {
  const { openModal } = useContactModal();

  return (
    <section id="capabilities" className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-neutral-400 mb-4">
          Migration Paths
        </p>
        <h2 className="text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-3">
          Where are you headed?
        </h2>
        <p className="text-[0.95rem] text-neutral-500 leading-[1.55] mb-10 max-w-[500px]">
          Analyze for free today. Convert when you&apos;re ready.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PATHS.map((path) => (
            <div
              key={`${path.from}-${path.to}`}
              className={`relative flex flex-col justify-between p-6 rounded-2xl min-h-[180px] ${TIER_CARD[path.tier]}`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${TIER_DOT[path.tier]}`} />
                <span className="text-[0.6rem] font-bold tracking-[0.12em] uppercase opacity-60">
                  {TIER_LABELS[path.tier]}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-xs opacity-50 mb-1">from {path.from}</p>
                <p className="text-2xl font-bold leading-tight tracking-[-0.02em]">{path.to}</p>
              </div>
            </div>
          ))}

          {/* Custom path CTA */}
          <div className="flex flex-col justify-between p-6 bg-neutral-50 border border-neutral-200 rounded-2xl min-h-[180px]">
            <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-neutral-400">
              Custom path?
            </p>
            <div>
              <p className="text-base font-bold text-neutral-900 leading-snug mb-2">
                Need a different source or target?
              </p>
              <p className="text-sm text-neutral-500 leading-[1.5] mb-4">
                Let&apos;s scope your migration together.
              </p>
              <button
                onClick={openModal}
                className="inline-flex items-center gap-1.5 text-[0.82rem] font-bold tracking-[0.06em] uppercase text-neutral-900 border-b border-neutral-900 pb-px hover:text-[#3B82F6] hover:border-[#3B82F6] transition-colors cursor-pointer"
              >
                Get in touch →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] Commit:

```bash
git add src/components/migration-paths.tsx
git commit -m "feat: migration paths with three availability tiers"
```

---

### Task 9: Update CTA section + Guides rename

**Files:**
- Modify: `src/components/cta.tsx`
- Modify: `src/components/guides.tsx`

- [ ] Update CTA to use modal:

`src/components/cta.tsx`
```tsx
"use client";

import { GradientHeading } from "@/components/ui/gradient-heading";
import { AsciiSphere } from "@/components/ui/ascii-sphere";
import { useContactModal } from "@/lib/contact-modal-context";

export function Cta() {
  const { openModal } = useContactModal();

  return (
    <section className="relative py-[80px] lg:py-[140px] overflow-hidden text-center">
      <div
        className="absolute bottom-[-30%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none blur-[50px]"
        style={{ background: "radial-gradient(ellipse at center, rgba(255, 184, 0, 0.3) 0%, rgba(255, 184, 0, 0.05) 50%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="absolute bottom-[-340px] left-1/2 -translate-x-1/2 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
        <AsciiSphere className="w-[700px] h-[700px]" radius={280} nPoints={1200} fontSize={13} rotationSpeed={0} />
      </div>
      <div className="max-w-[1200px] mx-auto px-6 relative z-[1]">
        <GradientHeading size="xl" weight="bold">
          Let&apos;s talk migration.
        </GradientHeading>
        <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-medium text-neutral-500 leading-[1.5] tracking-[-0.01em] max-w-[440px] mx-auto mt-5">
          No commitment. No environment changes. See what you&apos;re working with.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center sm:justify-center">
          <a
            href="https://try.getantares.io"
            className="flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-base px-8 py-3 rounded transition-all hover:-translate-y-px w-full sm:w-auto"
          >
            Run the Analyzer — Free
          </a>
          <button
            onClick={openModal}
            className="flex items-center justify-center gap-2 bg-transparent text-neutral-900 font-semibold text-base px-8 py-3 rounded border-[1.5px] border-neutral-900 transition-all hover:bg-neutral-900 hover:text-white w-full sm:w-auto cursor-pointer"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] Update Guides section — rename to Migration Library with links to /migration-library/[slug]:

`src/components/guides.tsx`
```tsx
import { GradientHeading } from "@/components/ui/gradient-heading";
import Link from "next/link";

const guides = [
  { title: "Tableau to Power BI Migration — complete guide", href: "/migration-library/tableau-to-power-bi-migration" },
  { title: "LOD expressions to DAX", href: "/migration-library/tableau-lod-expressions-to-dax" },
  { title: "Calculated fields to DAX", href: "/migration-library/tableau-calculated-fields-to-dax" },
  { title: "Migration planning guide", href: "/migration-library/tableau-migration-planning-guide" },
  { title: "Migration best practices", href: "/migration-library/tableau-to-power-bi-migration-best-practices" },
  { title: "Migration checklist", href: "/migration-library/tableau-migration-checklist" },
];

export function Guides() {
  return (
    <section id="guides" className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
          Migration Library
        </p>
        <GradientHeading size="lg" weight="bold">
          In-depth resources for BI migration
        </GradientHeading>
        <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-medium text-neutral-500 leading-[1.5] tracking-[-0.01em] max-w-[520px] mt-4">
          Technical guides, checklists, and deep dives for migration teams.
        </p>

        <div className="flex flex-col mt-12">
          {guides.map((guide, i) => (
            <Link
              key={guide.href}
              href={guide.href}
              className={`group flex items-center justify-between py-5 border-b border-neutral-200 text-neutral-900 font-medium text-[1.05rem] no-underline transition-colors hover:text-[#3B82F6] ${i === 0 ? "border-t" : ""}`}
            >
              <span>{guide.title}</span>
              <span className="text-neutral-400 text-xl transition-all group-hover:text-[#3B82F6] group-hover:translate-x-1">→</span>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/migration-library"
            className="text-sm font-semibold text-[#3B82F6] hover:text-[#2563EB] transition-colors"
          >
            View all articles →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] Commit:

```bash
git add src/components/cta.tsx src/components/guides.tsx
git commit -m "feat: CTA uses modal, Guides renamed to Migration Library with updated links"
```

---

### Task 10: Update home page.tsx — add new sections

**Files:**
- Modify: `src/app/page.tsx`

- [ ] Add Manifesto and HowItWorks to page composition:

`src/app/page.tsx`
```tsx
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { HowItWorks } from "@/components/how-it-works";
import { MigrationPaths } from "@/components/migration-paths";
import { Analyzer } from "@/components/analyzer";
import { Converter } from "@/components/converter";
import { Services } from "@/components/services";
import { Pricing } from "@/components/pricing";
import { Guides } from "@/components/guides";
import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";
import { TextureOverlay } from "@/components/ui/texture-overlay";

export default function Home() {
  return (
    <>
      <TextureOverlay texture="noise" opacity={0.035} className="z-50" />
      <Nav />
      <main>
        <Hero />
        <Divider />
        <Manifesto />
        <Divider />
        <HowItWorks />
        <Divider />
        <MigrationPaths />
        <Divider />
        <Analyzer />
        <Divider />
        <Converter />
        <Divider />
        <Services />
        <Divider />
        <Pricing />
        <Divider />
        <Guides />
        <Divider />
        <Cta />
      </main>
      <Footer />
    </>
  );
}

function Divider() {
  return <hr className="border-t border-neutral-200" />;
}
```

- [ ] Start dev server and verify home page renders without errors:

```bash
cd "/Users/ekaterinablagireva/Documents/work/BI migrator/website redesign/v2"
npm run dev
```

Open http://localhost:3000 and check:
- Hero shows new H1 + widget
- Manifesto appears below hero
- HowItWorks section visible with 4 steps
- Migration paths show 3-tier grid
- Nav has new links + Get in Touch button
- Get in Touch opens modal overlay
- "How it works" button in hero scrolls to section

- [ ] Commit:

```bash
git add src/app/page.tsx
git commit -m "feat: home page updated with Manifesto, HowItWorks, new section order"
```

---

## Phase 2 — /analyzer + /converter pages

### Task 11: /analyzer page

**Files:**
- Create: `src/app/analyzer/page.tsx`

- [ ] Create analyzer page:

`src/app/analyzer/page.tsx`
```tsx
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ReadinessWidget } from "@/components/ui/readiness-widget";
import { AnalyzerCta } from "@/components/analyzer-cta";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analyzer — Antares",
  description: "Free, read-only analysis of your Tableau environment. Get a Migration Readiness Score before you commit to anything.",
};

const FEATURES = [
  { category: "Calculations", items: ["LOD expressions (FIXED, INCLUDE, EXCLUDE)", "Calculated fields & measures", "Table calculations", "Parameters"] },
  { category: "Data", items: ["Custom SQL", "Data blending", "Data sources & extracts", "Cross-datasource joins"] },
  { category: "Dashboards", items: ["Dashboard actions & filters", "Layout & formatting", "Tooltips & annotations", "Sets, groups, bins, hierarchies"] },
  { category: "Usage", items: ["View counts & active users", "Last accessed dates", "Usage trends by department", "High-value vs. stale content"] },
  { category: "Dependencies", items: ["Cross-workbook dependencies", "Shared data sources", "Embedded vs. published", "Dependency impact map"] },
] as const;

const FAQ = [
  {
    q: "How long does analysis take?",
    a: "Most environments complete in minutes. Large estates (1000+ workbooks) may take up to 30 minutes.",
  },
  {
    q: "What access does Antares need?",
    a: "Read-only access to Tableau Server or Tableau Cloud. No write permissions are ever requested.",
  },
  {
    q: "Is my data secure?",
    a: "Antares analyzes workbook metadata — structure, calculations, and usage stats. It never reads your underlying business data.",
  },
  {
    q: "Can I analyze a subset of workbooks?",
    a: "Yes. You can filter by project, site, or select individual workbooks for a targeted analysis.",
  },
  {
    q: "What's in the readiness report?",
    a: "A Migration Readiness Score per workbook, complexity breakdown by feature type, auto-convertible percentage, effort estimate, and prioritized conversion order.",
  },
] as const;

export default function AnalyzerPage() {
  return (
    <>
      <TextureOverlay texture="noise" opacity={0.035} className="z-50" />
      <Nav />
      <main>
        {/* Hero */}
        <section className="pt-[120px] md:pt-[180px] pb-[60px] md:pb-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
              <div className="lg:max-w-[560px]">
                <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">Analyzer</p>
                <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-bold text-neutral-900 leading-[1.05] tracking-[-0.04em]">
                  See exactly what you&apos;re migrating — before you commit.
                </h1>
                <p className="text-[1.1rem] text-neutral-500 leading-[1.6] mt-5 max-w-[480px]">
                  Free, read-only analysis. Complete visibility into your Tableau environment in minutes.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://try.getantares.io"
                    className="flex items-center justify-center bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-base px-8 py-3 rounded transition-all hover:-translate-y-px w-full sm:w-auto"
                  >
                    Run the Analyzer — Free
                  </a>
                </div>
                <p className="text-sm text-neutral-500 mt-3">No environment changes. No commitment.</p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <ReadinessWidget />
              </div>
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* Feature breakdown */}
        <section className="py-14 lg:py-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">What Antares analyzes</p>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-12">
              Every layer of your Tableau environment.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map((group) => (
                <div key={group.category}>
                  <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-[0.06em] mb-4">{group.category}</h3>
                  <ul className="flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-baseline gap-2 text-sm text-neutral-600 leading-[1.5]">
                        <span className="text-neutral-400 shrink-0">⟶</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* How it connects */}
        <section className="py-14 lg:py-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">How it connects</p>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-10">
              Read-only. Zero risk.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Read-only access", body: "No write permissions ever requested. Antares reads workbook metadata — structure, calculations, usage stats. Never your underlying business data." },
                { title: "Tableau Server & Cloud", body: "Connects via the Tableau REST API. Supports Tableau Server (2019.1+) and Tableau Cloud. No agent or on-prem installation required." },
                { title: "Exportable report", body: "Your readiness report is available as a shareable link and PDF export — ready to present to stakeholders or your migration team." },
              ].map((item) => (
                <div key={item.title} className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
                  <h3 className="font-bold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500 leading-[1.6]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* FAQ */}
        <section className="py-14 lg:py-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">FAQ</p>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-10">
              Common questions.
            </h2>
            <div className="flex flex-col divide-y divide-neutral-200 max-w-[720px]">
              {FAQ.map((item) => (
                <div key={item.q} className="py-6">
                  <p className="font-semibold text-neutral-900 mb-2">{item.q}</p>
                  <p className="text-sm text-neutral-500 leading-[1.7]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />
        <AnalyzerCta />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] Create shared CTA component for analyzer page:

`src/components/analyzer-cta.tsx`
```tsx
"use client";

import { useContactModal } from "@/lib/contact-modal-context";

export function AnalyzerCta() {
  const { openModal } = useContactModal();
  return (
    <section className="py-[80px] lg:py-[120px] text-center">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-900 leading-[1.1] tracking-[-0.03em]">
          Ready to see your environment?
        </h2>
        <p className="text-neutral-500 mt-4 max-w-[400px] mx-auto leading-relaxed">
          Run the free analyzer. No environment changes. No commitment.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://try.getantares.io" className="flex items-center justify-center bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-8 py-3 rounded transition-all hover:-translate-y-px w-full sm:w-auto">
            Run the Analyzer — Free
          </a>
          <button onClick={openModal} className="flex items-center justify-center bg-transparent text-neutral-900 font-semibold px-8 py-3 rounded border-[1.5px] border-neutral-900 transition-all hover:bg-neutral-900 hover:text-white w-full sm:w-auto cursor-pointer">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] Commit:

```bash
git add src/app/analyzer/page.tsx src/components/analyzer-cta.tsx
git commit -m "feat: /analyzer page — hero, feature breakdown, FAQ, CTA"
```

---

### Task 12: /converter page

**Files:**
- Create: `src/app/converter/page.tsx`

- [ ] Create converter page:

`src/app/converter/page.tsx`
```tsx
"use client";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Converter } from "@/components/converter";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { useContactModal } from "@/lib/contact-modal-context";
import type { Metadata } from "next";

// Note: Metadata export not supported in "use client" — move to a wrapper if needed
// For now metadata is set in a separate layout or left as default

const AUTO_CONVERTS = [
  "Standard calculated fields → DAX measures",
  "Basic chart types (bar, line, scatter, pie)",
  "Data source connections",
  "Filters, slicers, and parameters",
  "Layout & visual formatting",
  "Aggregations (SUM, AVG, COUNT, etc.)",
];

const NEEDS_REVIEW = [
  "Complex LOD expressions (FIXED, INCLUDE, EXCLUDE)",
  "Custom SQL with platform-specific syntax",
  "Multi-source data blending",
  "Dashboard actions with conditional logic",
  "Custom visual extensions or add-ons",
  "Row-level security configurations",
];

const PATHS = [
  { from: "Tableau", to: "Power BI", status: "Available now", dot: "bg-green-500", muted: false },
  { from: "Tableau", to: "Databricks AI/BI", status: "Available now", dot: "bg-green-500", muted: false },
  { from: "Power BI", to: "Tableau", status: "Coming 2026", dot: "bg-amber-400", muted: true },
  { from: "Qlik", to: "Tableau", status: "Coming 2026", dot: "bg-amber-400", muted: true },
  { from: "Qlik", to: "Power BI", status: "Coming 2026", dot: "bg-amber-400", muted: true },
  { from: "Qlik", to: "Databricks AI/BI", status: "Coming 2026", dot: "bg-amber-400", muted: true },
  { from: "SAS VA", to: "Power BI", status: "Notify me", dot: "bg-neutral-300", muted: true },
  { from: "SAS VA", to: "Databricks AI/BI", status: "Notify me", dot: "bg-neutral-300", muted: true },
] as const;

const FAQ = [
  { q: "What happens to things that can't auto-convert?", a: "Antares flags them with a clear explanation of what needs manual work and why. You know exactly what the effort is before you start." },
  { q: "How does Antares handle custom SQL?", a: "Custom SQL is parsed and analyzed for compatibility. Simple queries convert automatically; complex or platform-specific SQL is flagged for review with suggested rewrites." },
  { q: "Can we run conversion incrementally?", a: "Yes. You can convert workbook by workbook or run a full batch. Antares maintains a conversion log so you always know what's done and what remains." },
  { q: "What does the validation report show?", a: "A side-by-side comparison of source and output: measure values, chart types, filter behaviour, and data row counts. Discrepancies are highlighted for review." },
] as const;

export default function ConverterPage() {
  const { openModal } = useContactModal();

  return (
    <>
      <TextureOverlay texture="noise" opacity={0.035} className="z-50" />
      <Nav />
      <main>
        {/* Hero */}
        <section className="pt-[120px] md:pt-[180px] pb-[60px] md:pb-[80px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">Converter</p>
            <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-bold text-neutral-900 leading-[1.05] tracking-[-0.04em] max-w-[700px]">
              Automated conversion.<br />70% less manual work.
            </h1>
            <p className="text-[1.1rem] text-neutral-500 leading-[1.6] mt-5 max-w-[520px]">
              Antares handles the repeatable parts so your team focuses on what actually needs a human.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={openModal}
                className="flex items-center justify-center bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-base px-8 py-3 rounded transition-all hover:-translate-y-px w-full sm:w-auto cursor-pointer"
              >
                Get in Touch
              </button>
              <a
                href="#conversion-steps"
                className="flex items-center justify-center bg-transparent text-neutral-900 font-semibold text-base px-8 py-3 rounded border-[1.5px] border-neutral-900 transition-all hover:bg-neutral-900 hover:text-white w-full sm:w-auto"
              >
                See it in action
              </a>
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* Reuse existing Converter carousel section */}
        <div id="conversion-steps">
          <Converter />
        </div>

        <hr className="border-t border-neutral-200" />

        {/* Auto vs manual */}
        <section className="py-14 lg:py-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">What converts</p>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-10">
              Automatic vs. review needed.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-[0.06em]">Converts automatically</h3>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {AUTO_CONVERTS.map((item) => (
                    <li key={item} className="flex items-baseline gap-2 text-sm text-neutral-700 leading-[1.5]">
                      <span className="text-green-500 shrink-0 font-semibold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-[0.06em]">Needs review</h3>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {NEEDS_REVIEW.map((item) => (
                    <li key={item} className="flex items-baseline gap-2 text-sm text-neutral-700 leading-[1.5]">
                      <span className="text-amber-500 shrink-0 font-semibold">⚑</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* Migration paths */}
        <section className="py-14 lg:py-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">Supported paths</p>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-10">
              Where we convert to.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PATHS.map((path) => (
                <div
                  key={`${path.from}-${path.to}`}
                  className={`p-5 rounded-xl border ${path.muted ? "border-neutral-200 bg-neutral-50" : "border-neutral-900 bg-neutral-950"}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${path.dot}`} />
                    <span className={`text-[0.6rem] font-bold tracking-[0.1em] uppercase ${path.muted ? "text-neutral-400" : "text-neutral-400"}`}>
                      {path.status}
                    </span>
                  </div>
                  <p className={`text-xs mb-1 ${path.muted ? "text-neutral-400" : "text-neutral-400"}`}>from {path.from}</p>
                  <p className={`text-xl font-bold leading-tight ${path.muted ? "text-neutral-600" : "text-white"}`}>{path.to}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* FAQ */}
        <section className="py-14 lg:py-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">FAQ</p>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold text-neutral-950 leading-[1.1] tracking-[-0.03em] mb-10">Common questions.</h2>
            <div className="flex flex-col divide-y divide-neutral-200 max-w-[720px]">
              {FAQ.map((item) => (
                <div key={item.q} className="py-6">
                  <p className="font-semibold text-neutral-900 mb-2">{item.q}</p>
                  <p className="text-sm text-neutral-500 leading-[1.7]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-t border-neutral-200" />

        {/* CTA */}
        <section className="py-[80px] lg:py-[120px] text-center">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-900 leading-[1.1] tracking-[-0.03em]">
              Ready to convert?
            </h2>
            <p className="text-neutral-500 mt-4 max-w-[400px] mx-auto leading-relaxed">
              Start with a free analysis — then convert when you&apos;re ready.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={openModal} className="flex items-center justify-center bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-8 py-3 rounded transition-all hover:-translate-y-px w-full sm:w-auto cursor-pointer">
                Get in Touch
              </button>
              <a href="/analyzer" className="flex items-center justify-center bg-transparent text-neutral-900 font-semibold px-8 py-3 rounded border-[1.5px] border-neutral-900 transition-all hover:bg-neutral-900 hover:text-white w-full sm:w-auto">
                Run the Analyzer first →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] Commit:

```bash
git add src/app/converter/page.tsx
git commit -m "feat: /converter page — hero, carousel, auto vs manual, paths, FAQ, CTA"
```

---

## Phase 3 — Migration Library

### Task 13: MDX content utility + 6 seed articles

**Files:**
- Create: `src/lib/articles.ts`
- Create: `src/content/migration-library/*.mdx` (6 files)

- [ ] Create articles utility:

`src/lib/articles.ts`
```ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "src/content/migration-library");

export interface ArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
}

export interface Article extends ArticleMeta {
  contentHtml: string;
}

export function getAllArticles(): ArticleMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        excerpt: data.excerpt as string,
        tags: (data.tags as string[]) ?? [],
        date: data.date as string,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticle(slug: string): Promise<Article> {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return {
    slug,
    title: data.title as string,
    excerpt: data.excerpt as string,
    tags: (data.tags as string[]) ?? [],
    date: data.date as string,
    contentHtml: processed.toString(),
  };
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
```

- [ ] Create content directory and 6 seed MDX files:

```bash
mkdir -p "/Users/ekaterinablagireva/Documents/work/BI migrator/website redesign/v2/src/content/migration-library"
```

`src/content/migration-library/tableau-to-power-bi-migration.mdx`
```mdx
---
title: "Tableau to Power BI Migration — Complete Guide"
excerpt: "Everything you need to know before migrating from Tableau to Power BI: assessment, planning, conversion patterns, and validation."
tags: ["tableau migration", "power-bi", "guide"]
date: "2025-09-01"
---

# Tableau to Power BI Migration — Complete Guide

Migrating from Tableau to Power BI is one of the most common BI platform transitions. This guide walks through the full process: assessing your environment, planning the migration, converting workbooks, and validating outputs.

## Why organisations migrate from Tableau to Power BI

The most common drivers: Microsoft 365 consolidation, licensing costs, and deeper integration with Azure and the Power Platform ecosystem.

## Step 1: Assess your Tableau environment

Before writing a single line of DAX, you need to know what you're working with. A thorough assessment covers:

- Number of workbooks, views, and data sources
- Calculation complexity (LOD expressions, custom SQL, table calculations)
- Usage patterns (which dashboards are actually used, which are stale)
- Data connections (live vs. extract, cloud vs. on-prem)
- Dependencies (cross-workbook references, shared data sources)

Run Antares Analyzer to get this automatically — including a Migration Readiness Score and effort estimate per workbook.

## Step 2: Prioritise your migration backlog

Not everything needs to migrate at once. Prioritise based on:

1. Business value (high-usage dashboards first)
2. Conversion complexity (start with simpler workbooks to build momentum)
3. Dependencies (migrate dependencies before dependents)

## Step 3: Convert calculations

The hardest part of any Tableau-to-Power BI migration is translating calculations. Key mappings:

- **LOD expressions** → DAX CALCULATE + FILTER
- **FIXED LOD** → DAX ALL or ALLEXCEPT
- **Table calculations** → DAX window functions or iterators
- **Calculated fields** → DAX measures or calculated columns (choose carefully)

## Step 4: Rebuild or convert dashboards

For most standard workbooks, Antares Converter automates 60–80% of the conversion. Complex LOD expressions and custom SQL require manual review.

## Step 5: Validate outputs

Never skip validation. For each migrated report:

1. Run the source Tableau view and export data
2. Run the Power BI report and export equivalent data
3. Compare row counts, totals, and key metrics
4. Document any intentional differences

## Common pitfalls

- **Tableau parameters ≠ Power BI parameters**: Power BI parameters are for data source configuration, not dynamic filtering. Use slicers or field parameters instead.
- **Data blending**: Tableau's data blending doesn't have a direct equivalent. Use Power BI relationships or DAX LOOKUPVALUE.
- **Context transitions**: FIXED LOD context transitions differ from DAX filter context. Test edge cases carefully.

---

*Ready to assess your Tableau environment? [Run the Analyzer free →](https://try.getantares.io)*
```

`src/content/migration-library/tableau-lod-expressions-to-dax.mdx`
```mdx
---
title: "Tableau LOD Expressions to DAX"
excerpt: "A practical translation guide for converting Tableau LOD expressions (FIXED, INCLUDE, EXCLUDE) to their DAX equivalents in Power BI."
tags: ["tableau migration", "dax", "lod", "power-bi"]
date: "2025-08-15"
---

# Tableau LOD Expressions to DAX

LOD (Level of Detail) expressions are one of the most powerful features in Tableau — and one of the most complex to translate to Power BI. This guide covers the most common patterns.

## Understanding the conceptual difference

In Tableau, LOD expressions explicitly define the granularity of a calculation. In DAX, you achieve the same effect by manipulating filter context using CALCULATE, ALL, ALLEXCEPT, and related functions.

## FIXED LOD → DAX

Tableau:
```
{ FIXED [Customer] : SUM([Sales]) }
```

DAX equivalent:
```dax
Customer Sales = 
CALCULATE(
    SUM(Orders[Sales]),
    ALLEXCEPT(Customers, Customers[Customer])
)
```

## INCLUDE LOD → DAX

Tableau:
```
{ INCLUDE [Order ID] : AVG([Profit]) }
```

DAX equivalent (using a helper table or SUMMARIZE):
```dax
Avg Profit per Order = 
AVERAGEX(
    VALUES(Orders[Order ID]),
    CALCULATE(SUM(Orders[Profit]))
)
```

## EXCLUDE LOD → DAX

Tableau:
```
{ EXCLUDE [Region] : SUM([Sales]) }
```

DAX equivalent:
```dax
Sales Ex Region = 
CALCULATE(
    SUM(Orders[Sales]),
    ALL(Geography[Region])
)
```

## Common gotchas

- **FIXED vs. row context**: DAX ALLEXCEPT removes all filters except the specified columns. This is usually correct for FIXED LOD but verify with edge cases.
- **Nested LODs**: Nested LOD expressions in Tableau often require intermediate calculated tables in Power BI.
- **Filtering on LOD results**: Tableau allows filtering on LOD results via context filters. In DAX this requires measure-based filtering or table functions.

---

*Let Antares analyze your LOD expressions and flag the complex cases automatically. [Run the Analyzer →](https://try.getantares.io)*
```

`src/content/migration-library/tableau-calculated-fields-to-dax.mdx`
```mdx
---
title: "Tableau Calculated Fields to DAX"
excerpt: "How to translate Tableau calculated fields and measures to DAX for Power BI, including string functions, date logic, and conditional calculations."
tags: ["tableau migration", "dax", "calculated fields", "power-bi"]
date: "2025-08-01"
---

# Tableau Calculated Fields to DAX

Tableau calculated fields translate to either DAX measures or calculated columns in Power BI. Choosing correctly matters for performance and correctness.

## Measures vs. calculated columns

**Use a DAX measure when:** the calculation aggregates data (SUM, AVG, COUNT) or depends on filter context.

**Use a calculated column when:** the calculation is row-level and doesn't depend on aggregation (string manipulation, date extraction, static classification).

## Common calculation patterns

### String functions

| Tableau | DAX |
|---------|-----|
| `STR([Value])` | `FORMAT([Value], "General Number")` |
| `LEN([String])` | `LEN([String])` |
| `CONTAINS([String], "text")` | `CONTAINSSTRING([String], "text")` |
| `LEFT([String], 3)` | `LEFT([String], 3)` |
| `TRIM([String])` | `TRIM([String])` |

### Date functions

| Tableau | DAX |
|---------|-----|
| `DATEPART('year', [Date])` | `YEAR([Date])` |
| `DATEDIFF('day', [Start], [End])` | `DATEDIFF([Start], [End], DAY)` |
| `DATEADD('month', 1, [Date])` | `EDATE([Date], 1)` |
| `TODAY()` | `TODAY()` |

### Conditional logic

Tableau:
```
IF [Sales] > 10000 THEN "High"
ELSEIF [Sales] > 5000 THEN "Medium"
ELSE "Low"
END
```

DAX:
```dax
Sales Tier = 
SWITCH(
    TRUE(),
    [Sales] > 10000, "High",
    [Sales] > 5000, "Medium",
    "Low"
)
```

## Table calculations

Tableau table calculations (RUNNING_SUM, WINDOW_AVG, RANK, etc.) require special handling. Most translate to DAX window functions available in Power BI (introduced 2023):

- `RUNNING_SUM` → `RUNNINGSUM`
- `WINDOW_AVG` → `MOVINGAVERAGE`
- `RANK` → `RANKX`

---

*Antares automatically maps standard calculated fields during conversion. Complex ones are flagged with suggested DAX. [Try it free →](https://try.getantares.io)*
```

`src/content/migration-library/tableau-migration-planning-guide.mdx`
```mdx
---
title: "BI Migration Planning Guide"
excerpt: "How to plan a Tableau migration project: scoping, stakeholder alignment, timeline estimation, and risk management."
tags: ["tableau migration", "planning", "project management"]
date: "2025-07-15"
---

# BI Migration Planning Guide

A BI migration that starts without a proper plan almost always runs over time, over budget, or both. This guide covers the planning phase from initial scoping to execution roadmap.

## The planning problem

Most BI migrations underestimate scope. The typical mistake: counting workbooks but not accounting for calculation complexity, data source dependencies, or user training needs.

**You cannot estimate what you haven't analyzed.** Run your environment assessment before committing to a timeline.

## Scoping your migration

A complete scope covers:

1. **Inventory**: Total workbooks, views, calculations, data sources
2. **Complexity tiers**: Categorise workbooks by migration effort (auto, manual review, complex)
3. **Business criticality**: Which dashboards are mission-critical vs. nice-to-have
4. **Dependencies**: What depends on what — migrate dependencies first
5. **User base**: How many users, which departments, what training is needed

## Effort estimation

Use your complexity breakdown to estimate effort:

| Tier | Description | Estimated hours per workbook |
|------|-------------|------------------------------|
| Auto | Simple charts, basic calculations | 0.5–1h (validation only) |
| Manual review | LOD expressions, custom SQL | 2–4h |
| Complex | Heavy LOD, data blending, custom extensions | 6–16h |

## Timeline model

A typical phased approach:

- **Phase 1 (weeks 1–2)**: Environment assessment + planning
- **Phase 2 (weeks 3–6)**: Pilot migration (10–20 workbooks, mix of complexity)
- **Phase 3 (weeks 7–N)**: Full migration in priority batches
- **Phase 4**: UAT, validation, cutover

## Risk management

Top migration risks and mitigations:

- **Calculation errors**: Validate every migrated report against source data
- **Scope creep**: Freeze scope before conversion begins; handle additions in Phase 2
- **User adoption**: Involve end users in UAT; train before cutover
- **Data source changes**: Freeze data sources during migration unless intentional

---

*Get your environment assessment and effort estimate automatically. [Run the Analyzer →](https://try.getantares.io)*
```

`src/content/migration-library/tableau-to-power-bi-migration-best-practices.mdx`
```mdx
---
title: "Tableau to Power BI Migration Best Practices"
excerpt: "Hard-won lessons from real Tableau to Power BI migrations: what works, what breaks, and how to run a clean project."
tags: ["tableau migration", "power-bi", "best practices"]
date: "2025-07-01"
---

# Tableau to Power BI Migration Best Practices

These are lessons from real migration projects — patterns that consistently work and pitfalls that consistently bite teams.

## Before you start

**Run a proper assessment.** Teams that skip the assessment phase consistently underestimate scope by 2–3x. A readiness score per workbook, not just a workbook count, is the minimum you need before giving stakeholders a timeline.

**Freeze your Tableau environment.** Once migration starts, stop making changes to source workbooks. Changes mid-migration invalidate your conversion work.

**Establish a validation baseline.** Export key metric values from Tableau before you start. You'll need these to verify Power BI output.

## During migration

**Migrate dependencies first.** If Dashboard B uses a calculation from Shared Data Source A, migrate A before B. Map your dependencies before you start.

**Don't convert everything — archive the stale content.** Analysis typically shows 20–40% of workbooks haven't been accessed in 6+ months. Migrate what's used; archive the rest.

**Use a staging environment.** Never convert directly to production. Validate in staging first.

**Document decisions.** When you make a deliberate choice (e.g., "we're replacing this custom SQL with a simpler DAX approach"), document it. Your future self will thank you.

## Validation

**Compare at the data level, not the visual level.** Visual similarity doesn't mean the numbers are right. Export underlying data from both source and target and compare row counts, totals, and key metrics.

**Test edge cases**: null values, date boundaries, top-N filtering, cross-filtering interactions.

**UAT with real users.** No amount of technical validation replaces end users working with the reports they know.

## Cutover

**Plan a parallel run period.** Run Tableau and Power BI side-by-side for 2–4 weeks before cutting over. This catches calculation discrepancies before they become production issues.

**Have a rollback plan.** Know exactly how you'd roll back to Tableau if something goes wrong post-cutover.

---

*Antares Analyzer surfaces the risks before you start. [Run it free →](https://try.getantares.io)*
```

`src/content/migration-library/tableau-migration-checklist.mdx`
```mdx
---
title: "BI Migration Checklist"
excerpt: "A practical checklist for Tableau to Power BI migrations — covering assessment, conversion, validation, and cutover."
tags: ["tableau migration", "checklist", "power-bi"]
date: "2025-06-15"
---

# BI Migration Checklist

Use this checklist to track progress through your Tableau to Power BI migration.

## Assessment

- [ ] Run environment scan (workbook count, view count, data sources)
- [ ] Generate complexity breakdown (auto / manual review / complex)
- [ ] Identify high-usage vs. stale content
- [ ] Map workbook dependencies
- [ ] Get Migration Readiness Score per workbook
- [ ] Export effort estimate and present to stakeholders
- [ ] Agree on migration scope (what's in, what's deferred, what's archived)

## Planning

- [ ] Define phased migration plan with milestones
- [ ] Identify pilot workbooks (mix of complexity tiers)
- [ ] Freeze Tableau environment (no changes during migration)
- [ ] Establish validation baseline (export key metrics from Tableau)
- [ ] Set up Power BI staging environment
- [ ] Confirm data source access for target platform

## Conversion

- [ ] Convert pilot batch
- [ ] Validate pilot batch (compare to baseline)
- [ ] Resolve flagged items from pilot
- [ ] Sign off on pilot
- [ ] Convert remaining batches in priority order
- [ ] Validate each batch before proceeding to next

## Validation

- [ ] Row count matches between source and target
- [ ] Key metric totals match (within agreed tolerance)
- [ ] Filters behave correctly
- [ ] Cross-filter interactions work as expected
- [ ] Null/empty value handling is correct
- [ ] Date logic is correct (fiscal years, week numbering, etc.)
- [ ] Row-level security works for all user groups
- [ ] UAT completed with representative end users
- [ ] UAT sign-off obtained

## Cutover

- [ ] Communication sent to all report users
- [ ] Training sessions completed
- [ ] Parallel run period defined
- [ ] Go-live date confirmed
- [ ] Rollback plan documented
- [ ] Post-cutover monitoring plan in place

---

*Use Antares Analyzer to complete the assessment phase automatically. [Run it free →](https://try.getantares.io)*
```

- [ ] Commit:

```bash
git add src/lib/articles.ts src/content/
git commit -m "feat: MDX articles utility + 6 seed articles"
```

---

### Task 14: /migration-library listing page

**Files:**
- Create: `src/app/migration-library/page.tsx`

- [ ] Create listing page:

`src/app/migration-library/page.tsx`
```tsx
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { getAllArticles } from "@/lib/articles";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Migration Library — Antares",
  description: "Technical guides, checklists, and deep dives for BI migration teams.",
};

export default function MigrationLibraryPage() {
  const articles = getAllArticles();

  return (
    <>
      <TextureOverlay texture="noise" opacity={0.035} className="z-50" />
      <Nav />
      <main className="pt-[100px] md:pt-[140px]">
        <div className="max-w-[1200px] mx-auto px-6 pb-24">
          {/* Header */}
          <div className="mb-14">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-4">
              Migration Library
            </p>
            <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-bold text-neutral-900 leading-[1.05] tracking-[-0.04em]">
              In-depth resources<br />for BI migration.
            </h1>
            <p className="text-[1.1rem] text-neutral-500 leading-[1.6] mt-4 max-w-[480px]">
              Technical guides, checklists, and deep dives for migration teams.
            </p>
          </div>

          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/migration-library/${article.slug}`}
                className="group block bg-white border border-neutral-200 rounded-xl p-7 hover:border-neutral-400 transition-colors no-underline"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] bg-neutral-100 text-neutral-500 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-bold text-neutral-900 leading-snug mb-3 group-hover:text-[#3B82F6] transition-colors">
                  {article.title}
                </h2>
                <p className="text-sm text-neutral-500 leading-[1.6] mb-4">
                  {article.excerpt}
                </p>
                <p className="text-xs text-neutral-400">
                  {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] Commit:

```bash
git add src/app/migration-library/page.tsx
git commit -m "feat: /migration-library listing page"
```

---

### Task 15: /migration-library/[slug] article page

**Files:**
- Create: `src/app/migration-library/[slug]/page.tsx`

- [ ] Create article page with `generateStaticParams`:

`src/app/migration-library/[slug]/page.tsx`
```tsx
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { getArticle, getAllSlugs, getAllArticles } from "@/lib/articles";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  return {
    title: `${article.title} — Antares`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  const allArticles = getAllArticles();
  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <TextureOverlay texture="noise" opacity={0.035} className="z-50" />
      <Nav />
      <main className="pt-[100px] md:pt-[140px]">
        <div className="max-w-[1200px] mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">

            {/* Article */}
            <article className="max-w-[720px]">
              {/* Back */}
              <Link
                href="/migration-library"
                className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors mb-10 no-underline"
              >
                ← Migration Library
              </Link>

              {/* Meta */}
              <div className="flex flex-wrap gap-2 mb-5">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] bg-neutral-100 text-neutral-500 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-900 leading-[1.08] tracking-[-0.03em] mb-4">
                {article.title}
              </h1>
              <p className="text-xs text-neutral-400 mb-10">
                {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>

              {/* Content */}
              <div
                className="prose prose-neutral max-w-none text-neutral-700 leading-[1.75]
                  prose-headings:text-neutral-900 prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                  prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
                  prose-p:mb-5
                  prose-a:text-[#3B82F6] prose-a:no-underline hover:prose-a:underline
                  prose-code:bg-neutral-100 prose-code:text-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
                  prose-pre:bg-neutral-950 prose-pre:text-neutral-100 prose-pre:rounded-xl prose-pre:p-6 prose-pre:overflow-x-auto
                  prose-table:text-sm prose-th:text-left prose-th:font-semibold prose-th:pb-2 prose-td:py-2
                  prose-li:mb-1 prose-ul:my-4 prose-ol:my-4
                  prose-strong:text-neutral-900 prose-strong:font-semibold
                  prose-hr:border-neutral-200 prose-hr:my-10"
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
              />
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-[100px]">
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 mb-8">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-neutral-500 mb-3">
                    Ready to analyze?
                  </p>
                  <p className="text-sm text-neutral-600 leading-[1.6] mb-4">
                    Get your Migration Readiness Score — free, read-only, no commitment.
                  </p>
                  <a
                    href="https://try.getantares.io"
                    className="flex items-center justify-center w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
                  >
                    Run the Analyzer →
                  </a>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-neutral-500 mb-4">
                    More from the library
                  </p>
                  <div className="flex flex-col gap-3">
                    {related.map((a) => (
                      <Link
                        key={a.slug}
                        href={`/migration-library/${a.slug}`}
                        className="text-sm font-medium text-neutral-700 hover:text-[#3B82F6] transition-colors leading-snug no-underline"
                      >
                        {a.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] Install Tailwind Typography for prose styles:

```bash
cd "/Users/ekaterinablagireva/Documents/work/BI migrator/website redesign/v2"
npm install @tailwindcss/typography
```

- [ ] Add typography plugin to Tailwind config. Check if there's a `tailwind.config.ts`:

```bash
ls "/Users/ekaterinablagireva/Documents/work/BI migrator/website redesign/v2"/tailwind.config* 2>/dev/null || echo "no config file - using CSS"
```

If using Tailwind v4 CSS config (`globals.css`), add to globals.css:
```css
@plugin "@tailwindcss/typography";
```

If using `tailwind.config.ts`:
```ts
// add to plugins array:
require('@tailwindcss/typography')
```

- [ ] Commit:

```bash
git add src/app/migration-library/ src/content/
git commit -m "feat: /migration-library/[slug] article page with generateStaticParams"
```

---

### Task 16: Final build check

- [ ] Run build to verify static export works:

```bash
cd "/Users/ekaterinablagireva/Documents/work/BI migrator/website redesign/v2"
npm run build
```

Expected: build completes, `out/` directory generated, no TypeScript errors.

- [ ] If build errors appear for converter page (metadata in "use client"):

Move the converter page metadata to a separate `src/app/converter/layout.tsx`:
```tsx
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Converter — Antares",
  description: "Automated BI dashboard conversion. 70% less manual work.",
};
export default function ConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

And remove the metadata comment from `converter/page.tsx`.

- [ ] Commit:

```bash
git add -A
git commit -m "fix: build passes — all pages statically exported"
```
