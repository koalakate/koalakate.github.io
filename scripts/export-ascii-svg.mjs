/**
 * Renders logo.svg as an ASCII art SVG and saves to public/logo-ascii.svg
 * Uses Playwright to access the browser's canvas API for accurate pixel sampling.
 */

import { chromium } from "@playwright/test";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(dir, "../public/logo-ascii.svg");

const browser = await chromium.launch();
const page = await browser.newPage();

// Blank page — just need canvas API access
await page.goto("about:blank");

const ascii = await page.evaluate(async () => {
  const RAMP = "@#S%?*+=~-:,. ";
  const L = RAMP.length;
  const CELL_W = 7;
  const CELL_H = 13;
  const LOGO_W = 1100;

  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = rej;
    img.src = "http://localhost:3031/logo.svg";
  });

  const logoH = Math.round(LOGO_W * (img.naturalHeight / img.naturalWidth));
  const cols = Math.floor(LOGO_W / CELL_W);
  const rows = Math.floor(logoH / CELL_H);

  const off = document.createElement("canvas");
  off.width = cols;
  off.height = rows;
  const ctx = off.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, cols, rows);
  ctx.drawImage(img, 0, 0, cols, rows);

  const px = ctx.getImageData(0, 0, cols, rows).data;
  const grid = [];

  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      const i = (r * cols + c) * 4;
      const b =
        (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]) / 255;
      if (b > 0.87) {
        row.push(null); // background — skip
      } else {
        row.push(RAMP[Math.round(b * (L - 1))]);
      }
    }
    grid.push(row);
  }

  return { grid, cols, rows, logoW: LOGO_W, logoH, cellW: CELL_W, cellH: CELL_H };
});

await browser.close();

const { grid, cols, rows, logoW, logoH, cellW, cellH } = ascii;

// Build SVG — one <text> per non-background character, grouped by row for readability
const lines = [
  `<svg xmlns="http://www.w3.org/2000/svg"`,
  `     viewBox="0 0 ${logoW} ${logoH}"`,
  `     width="${logoW}" height="${logoH}">`,
  `  <rect width="100%" height="100%" fill="#ffffff"/>`,
  `  <g font-family="'Courier New', Courier, monospace"`,
  `     font-size="${cellH}" fill="#0a0a0a">`,
];

for (let r = 0; r < rows; r++) {
  const y = r * cellH + cellH; // baseline
  const rowChars = [];
  for (let c = 0; c < cols; c++) {
    const ch = grid[r][c];
    if (!ch) continue;
    const x = c * cellW;
    // Escape XML special chars
    const safe = ch === "&" ? "&amp;" : ch === "<" ? "&lt;" : ch;
    rowChars.push(`<tspan x="${x}" y="${y}">${safe}</tspan>`);
  }
  if (rowChars.length) {
    lines.push(`    <text>${rowChars.join("")}</text>`);
  }
}

lines.push("  </g>", "</svg>");

writeFileSync(OUT, lines.join("\n"), "utf8");
console.log(`Saved ${rows * cols} cells → ${OUT}`);
