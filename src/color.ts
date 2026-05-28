/**
 * ═══════════════════════════════════════════════════════════════
 *  MÀU SẮC — src/color.ts
 *  Hướng dẫn: src/huongdan.md
 * ═══════════════════════════════════════════════════════════════
 */

import { appConfig } from "@/config";

export const light = {
  cvBg: "#ffffff",
  cvFg: "#0a0c10",
  cvMuted: "#515c6e",
  cvBorder: "#d5d9e0",
  cvAccent: "#0066cc",
  cvAccentSoft: "#e8f4ff",
  cvSurface: "#eef1f6",
  cvTagBg: "#eceef1",
  cvTagFg: "#1a1d24",
  panelBg: "rgba(255, 255, 255, 0.72)",
  headerBg: "rgba(255, 255, 255, 0.8)",
  techGridOpacity: "0.45",
  techGlowBlue: "rgba(10, 132, 255, 0.12)",
  techGlowEmerald: "rgba(16, 185, 129, 0.08)",
  techGlowViolet: "rgba(99, 102, 241, 0.1)",
  cvPrintBg: "#ffffff",
  cvPrintFg: "#0a0c10",
  cvPrintMuted: "#434c5c",
  cvPrintBorder: "#c5cad3",
  cvPrintAccent: "#0066cc",
} as const;

export const dark = {
  cvBg: "#0c0e12",
  cvFg: "#f0f2f5",
  cvMuted: "#9aa3b2",
  cvBorder: "#2a3140",
  cvAccent: "#5eb3ff",
  cvAccentSoft: "rgba(10, 132, 255, 0.12)",
  cvSurface: "#06080b",
  cvTagBg: "#161a22",
  cvTagFg: "#e8eaed",
  panelBg: "rgba(12, 14, 18, 0.75)",
  headerBg: "rgba(6, 8, 11, 0.85)",
  techGridOpacity: "0.35",
  techGlowBlue: "rgba(59, 158, 255, 0.18)",
  techGlowEmerald: "rgba(52, 211, 153, 0.1)",
  techGlowViolet: "rgba(139, 92, 246, 0.12)",
  cvPrintBg: light.cvPrintBg,
  cvPrintFg: light.cvPrintFg,
  cvPrintMuted: light.cvPrintMuted,
  cvPrintBorder: light.cvPrintBorder,
  cvPrintAccent: light.cvPrintAccent,
} as const;

type CvPalette = typeof light | typeof dark;

function block(selector: string, palette: CvPalette): string {
  return [
    `${selector} {`,
    `  --cv-bg: ${palette.cvBg};`,
    `  --cv-fg: ${palette.cvFg};`,
    `  --cv-muted: ${palette.cvMuted};`,
    `  --cv-border: ${palette.cvBorder};`,
    `  --cv-accent: ${palette.cvAccent};`,
    `  --cv-accent-soft: ${palette.cvAccentSoft};`,
    `  --cv-surface: ${palette.cvSurface};`,
    `  --cv-tag-bg: ${palette.cvTagBg};`,
    `  --cv-tag-fg: ${palette.cvTagFg};`,
    `  --panel-bg: ${palette.panelBg};`,
    `  --header-bg: ${palette.headerBg};`,
    `  --tech-grid-opacity: ${palette.techGridOpacity};`,
    `  --tech-glow-blue: ${palette.techGlowBlue};`,
    `  --tech-glow-emerald: ${palette.techGlowEmerald};`,
    `  --tech-glow-violet: ${palette.techGlowViolet};`,
    `  --cv-print-bg: ${palette.cvPrintBg};`,
    `  --cv-print-fg: ${palette.cvPrintFg};`,
    `  --cv-print-muted: ${palette.cvPrintMuted};`,
    `  --cv-print-border: ${palette.cvPrintBorder};`,
    `  --cv-print-accent: ${palette.cvPrintAccent};`,
    "}",
  ].join("\n");
}

/** CSS inject trong layout.tsx */
export function getThemeCssBlock(): string {
  const scale = appConfig.browserDisplayScale;
  return [
    ":root {",
    `  --cv-display-scale: ${scale};`,
    "  --cv-a4-width: 210mm;",
    "}",
    block(":root", light),
    block(".dark", dark),
  ].join("\n\n");
}
