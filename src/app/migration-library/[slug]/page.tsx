import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cta } from "@/components/cta";
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
              <Link
                href="/migration-library"
                className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors mb-10 no-underline"
              >
                ← Migration Library
              </Link>

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
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <div
                className="prose prose-neutral max-w-none
                  [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-neutral-900 [&_h2]:tracking-tight [&_h2]:mt-12 [&_h2]:mb-4
                  [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-neutral-900 [&_h3]:mt-8 [&_h3]:mb-3
                  [&_p]:text-neutral-700 [&_p]:leading-[1.75] [&_p]:mb-5
                  [&_a]:text-brand [&_a]:no-underline [&_a:hover]:underline
                  [&_strong]:text-neutral-900 [&_strong]:font-semibold
                  [&_code]:bg-neutral-100 [&_code]:text-neutral-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
                  [&_pre]:bg-neutral-950 [&_pre]:text-neutral-100 [&_pre]:rounded-xl [&_pre]:p-6 [&_pre]:overflow-x-auto [&_pre]:my-6
                  [&_pre_code]:bg-transparent [&_pre_code]:p-0
                  [&_ul]:my-4 [&_ul]:pl-5 [&_li]:mb-1.5 [&_li]:text-neutral-700 [&_li]:leading-[1.6]
                  [&_ol]:my-4 [&_ol]:pl-5
                  [&_table]:w-full [&_table]:text-sm [&_table]:my-6 [&_table]:border-collapse
                  [&_th]:text-left [&_th]:font-semibold [&_th]:text-neutral-900 [&_th]:pb-2 [&_th]:border-b [&_th]:border-neutral-200
                  [&_td]:py-2.5 [&_td]:border-b [&_td]:border-neutral-100 [&_td]:text-neutral-600
                  [&_hr]:border-neutral-200 [&_hr]:my-10
                  [&_blockquote]:border-l-2 [&_blockquote]:border-brand [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-neutral-600"
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
                    className="flex items-center justify-center w-full bg-brand hover:bg-brand-hover text-white font-semibold text-sm py-2.5 rounded transition-colors"
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
                        className="text-sm font-medium text-neutral-700 hover:text-brand transition-colors leading-snug no-underline"
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
        <Cta />
      </main>
      <Footer />
    </>
  );
}
