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
