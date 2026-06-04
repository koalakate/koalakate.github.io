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
              <label className="text-xs font-medium tracking-[0.06em] uppercase text-neutral-500" htmlFor="modal-message">
                Message <span className="normal-case font-normal text-neutral-400">(optional)</span>
              </label>
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
              className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-3.5 rounded-lg transition-colors cursor-pointer"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
