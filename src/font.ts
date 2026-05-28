/**
 * ═══════════════════════════════════════════════════════════════
 *  FONT — src/font.ts
 *  Hướng dẫn: src/huongdan.md
 * ═══════════════════════════════════════════════════════════════
 *
 * Không dùng next/font/google — font hệ thống, không tải từ Google.
 */

export const fonts = {
  sans: {
    family: "system-ui",
    stack:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  mono: {
    family: "ui-monospace",
    stack:
      'ui-monospace, "Cascadia Code", "Segoe UI Mono", "SF Mono", Menlo, Consolas, monospace',
  },
} as const;

export function getFontCssBlock(theme = fonts): string {
  return [
    ":root {",
    `  --font-sans: ${theme.sans.stack};`,
    `  --font-mono: ${theme.mono.stack};`,
    "}",
  ].join("\n");
}
