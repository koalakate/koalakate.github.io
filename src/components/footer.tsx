import Link from "next/link";
import { AntaresLogo } from "@/components/ui/logo";
import { withBase } from "@/lib/base-path";

export function Footer() {
  return (
    <footer className="py-12 border-t border-neutral-200">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-center gap-10 flex-wrap">
            <Link href="/" aria-label="Antares home" className="inline-flex">
              <AntaresLogo color="#A3A3A3" width={90} height={18} />
            </Link>
            <ul className="flex gap-6">
              <li>
                <a
                  href="https://try.getantares.io"
                  className="text-sm text-neutral-500 no-underline hover:text-neutral-900 transition-colors"
                >
                  Analyzer
                </a>
              </li>
              <li>
                <a
                  href={withBase("/migration-library")}
                  className="text-sm text-neutral-500 no-underline hover:text-neutral-900 transition-colors"
                >
                  Migration Library
                </a>
              </li>
              <li>
                <a
                  href={withBase("/partners")}
                  className="text-sm text-neutral-500 no-underline hover:text-neutral-900 transition-colors"
                >
                  Partners
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@getantares.io"
                  className="text-sm text-neutral-500 no-underline hover:text-neutral-900 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href={withBase("/terms/")}
                  className="text-sm text-neutral-500 no-underline hover:text-neutral-900 transition-colors"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href={withBase("/privacy/")}
                  className="text-sm text-neutral-500 no-underline hover:text-neutral-900 transition-colors"
                >
                  Privacy
                </a>
              </li>
            </ul>
          </div>
          <span className="text-xs text-neutral-600">
            Antares &copy; 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
