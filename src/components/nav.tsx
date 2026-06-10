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
              className="hidden md:inline-flex text-sm font-semibold text-neutral-900 border-[1.5px] border-neutral-300 hover:border-neutral-900 px-4 py-2 rounded transition-colors cursor-pointer"
            >
              Get in Touch
            </button>
            <a
              href="https://try.getantares.io"
              className="hidden md:inline-flex text-sm font-semibold text-white bg-brand hover:bg-brand-hover px-5 py-2.5 rounded transition-colors"
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
            className="flex items-center justify-center w-full text-base font-semibold text-neutral-900 border-[1.5px] border-neutral-300 hover:border-neutral-900 px-5 py-4 rounded transition-colors cursor-pointer"
          >
            Get in Touch
          </button>
          <a
            href="https://try.getantares.io"
            className="flex items-center justify-center w-full text-base font-semibold text-white bg-brand hover:bg-brand-hover px-5 py-4 rounded transition-colors"
          >
            Run the Analyzer — Free
          </a>
        </div>
      </div>
    </>
  );
}
