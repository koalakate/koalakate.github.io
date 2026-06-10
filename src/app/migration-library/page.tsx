import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cta } from "@/components/cta";
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
                <h2 className="text-lg font-bold text-neutral-900 leading-snug mb-3 group-hover:text-brand transition-colors">
                  {article.title}
                </h2>
                <p className="text-sm text-neutral-500 leading-[1.6] mb-4">
                  {article.excerpt}
                </p>
                <p className="text-xs text-neutral-400">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <Cta />
      </main>
      <Footer />
    </>
  );
}
