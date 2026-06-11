"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { StatusIcon } from "@/components/ui/platform-bits";

export interface NotifyPath {
  from: string;
  to: string;
}

const inputClass =
  "w-full border border-neutral-200 rounded-lg px-3.5 py-2.5 text-neutral-900 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-colors bg-white";

/**
 * Lightweight, email-only waitlist capture for "Notify me" roadmap paths.
 * Deliberately one field — the whole point of "Notify me" is a low-commitment
 * signal, so we don't reuse the heavier Get-in-Touch contact form here.
 */
export function NotifyModal({
  path,
  onClose,
}: {
  path: NotifyPath | null;
  onClose: () => void;
}) {
  const open = path !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape to close.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Move focus into the dialog on open; restore to trigger on close.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const node = dialogRef.current;
    node?.querySelector<HTMLElement>("input, button")?.focus();
    return () => previouslyFocused?.focus();
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST { email, path } to a waitlist endpoint once the backend exists.
    setSubmitted(true);
  };

  return (
    <AnimatePresence onExitComplete={() => { setEmail(""); setSubmitted(false); }}>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-neutral-950/50 backdrop-blur-sm"
          onClick={onClose}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? {} : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Get notified about ${path?.from} to ${path?.to}`}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.98, y: 4 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3.5 right-3.5 w-9 h-9 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M3 3L17 17M17 3L3 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="p-6 sm:p-7">
              {submitted ? (
                <div className="py-2">
                  <div className="flex items-center justify-center w-11 h-11 rounded-full bg-green-50 mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <h2 className="text-[1.25rem] font-bold text-neutral-950 leading-[1.2] tracking-[-0.02em] mb-2">
                    You&apos;re on the list.
                  </h2>
                  <p className="text-sm text-neutral-500 leading-[1.6]">
                    We&apos;ll email <span className="font-medium text-neutral-700">{email}</span> the moment{" "}
                    <span className="font-medium text-neutral-700">{path?.from} → {path?.to}</span> goes live.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center w-11 h-11 rounded-full bg-neutral-100 mb-4">
                    <StatusIcon tier="soon" className="!text-neutral-700 w-[18px] h-[18px]" />
                  </div>
                  <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-2">
                    Notify me
                  </p>
                  <h2 className="text-[1.25rem] font-bold text-neutral-950 leading-[1.2] tracking-[-0.02em] mb-2">
                    {path?.from} → {path?.to}
                  </h2>
                  <p className="text-sm text-neutral-500 leading-[1.6] mb-5">
                    This path isn&apos;t live yet. Drop your email and we&apos;ll let you
                    know the moment it ships — no spam, just the one heads-up.
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className={inputClass}
                    />
                    <button
                      type="submit"
                      className="w-full bg-brand hover:bg-brand-hover text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
                    >
                      Notify me when it&apos;s ready
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
