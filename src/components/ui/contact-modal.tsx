"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useContactModal } from "@/lib/contact-modal-context";

const MIGRATION_OPTIONS = [
  "Tableau → Power BI",
  "Tableau → Databricks AI/BI",
  "Power BI → Tableau",
  "Qlik → Power BI",
  "Qlik → Tableau",
  "Qlik → Databricks AI/BI",
  "SAS VA → Power BI",
  "SAS VA → Databricks AI/BI",
];

const inputClass =
  "w-full border border-neutral-200 rounded-lg px-3.5 py-2.5 text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-colors bg-white";
const labelClass =
  "block text-xs font-medium tracking-[0.04em] uppercase text-neutral-500 mb-1.5";

export function ContactModal() {
  const { open, closeModal } = useContactModal();
  const dialogRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [migration, setMigration] = useState("");

  // Lock body scroll while the modal is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape to close.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [closeModal]);

  // Focus management: move focus into the dialog on open, trap Tab within it,
  // and restore focus to the trigger on close.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const node = dialogRef.current;
    const focusable = Array.from(
      node?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      ) ?? []
    );
    focusable[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    node?.addEventListener("keydown", onKeyDown);
    return () => {
      node?.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-neutral-950/50 backdrop-blur-sm"
          onClick={closeModal}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? {} : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Get in touch"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[460px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.98, y: 4 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Close */}
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-3.5 right-3.5 w-9 h-9 flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M3 3L17 17M17 3L3 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="p-6 sm:p-8">
              <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-3">
                Get in Touch
              </p>
              <h2 className="text-[1.6rem] sm:text-[1.9rem] font-bold text-neutral-950 leading-[1.1] tracking-[-0.02em] mb-2">
                Let&apos;s talk about your migration.
              </h2>
              <p className="text-sm text-neutral-500 leading-[1.6] mb-6">
                Tell us what you&apos;re moving and we&apos;ll get back within one business day.
              </p>

              <form
                action="mailto:hello@getantares.io"
                method="post"
                encType="text/plain"
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} htmlFor="modal-name">Name</label>
                    <input id="modal-name" name="name" type="text" required placeholder="Jane Smith" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="modal-company">Company</label>
                    <input id="modal-company" name="company" type="text" placeholder="Acme Corp" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass} htmlFor="modal-email">Work email</label>
                  <input id="modal-email" name="email" type="email" required placeholder="jane@company.com" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="modal-migration">What are you migrating?</label>
                  <div className="relative">
                    <select
                      id="modal-migration"
                      name="migration"
                      required
                      value={migration}
                      onChange={(e) => setMigration(e.target.value)}
                      className={`${inputClass} appearance-none pr-10 ${migration === "" ? "text-neutral-400" : ""}`}
                    >
                      <option value="" disabled>Select a migration path</option>
                      {MIGRATION_OPTIONS.map((o) => (
                        <option key={o} value={o} className="text-neutral-900">{o}</option>
                      ))}
                      <option value="Other" className="text-neutral-900">My migration isn&apos;t listed</option>
                    </select>
                    <span aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  {migration === "Other" && (
                    <input
                      name="migrationOther"
                      type="text"
                      required
                      autoFocus
                      placeholder="Tell us what you're migrating"
                      className={`${inputClass} mt-2`}
                    />
                  )}
                </div>
                <div>
                  <label className={labelClass} htmlFor="modal-message">
                    Message <span className="normal-case font-normal text-neutral-400">(optional)</span>
                  </label>
                  <textarea id="modal-message" name="message" rows={3} placeholder="Tell us about your project, timeline, or questions..." className={`${inputClass} resize-none`} />
                </div>
                <button
                  type="submit"
                  className="mt-1 w-full bg-brand hover:bg-brand-hover text-white font-semibold py-3 rounded transition-colors cursor-pointer"
                >
                  Send message
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
