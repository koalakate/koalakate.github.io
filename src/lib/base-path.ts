/**
 * Base path for the current build. Empty in production (served at root on
 * getantares.io); set to e.g. "/antares-preview" for GitHub Pages subpath
 * preview builds via NEXT_PUBLIC_BASE_PATH.
 *
 * Next prefixes <Link>, <Image>, the router and `_next` assets with basePath
 * automatically. Raw <a href="/…">, <img src="/…"> and `new Image()` srcs are
 * NOT prefixed — wrap those in withBase().
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a root-absolute internal path with the build's base path. */
export function withBase(path: string): string {
  if (!BASE_PATH) return path;
  return path.startsWith("/") ? `${BASE_PATH}${path}` : path;
}
