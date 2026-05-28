import type { LayoutType } from "@/lib/schema/resume";

/**
 * ═══════════════════════════════════════════════════════════════
 *  CẤU HÌNH — src/config.ts
 *  Hướng dẫn: src/huongdan.md
 * ═══════════════════════════════════════════════════════════════
 */

/** Cấu hình cơ bản — SEO, layout, theme */
export const configBasic = {
  /** Tiêu đề tab trình duyệt */
  title: "Võ Hoàng Hải Nghĩa — CV | ZakShinn",

  /** URL site (SEO, Open Graph) */
  siteUrl: "https://your-cv.vercel.app",

  /** Mô tả meta */
  description:
    "CV Võ Hoàng Hải Nghĩa (ZakShinn) — Senior System Administrator, DevOps, Lead Developer. MikroTik, Ubuntu, WireGuard, Next.js.",

  /** Layout CV: two-column-modern | single-column-ats | compact-senior */
  defaultLayout: "two-column-modern" as LayoutType,

  /** Giao diện: light | dark | system */
  defaultTheme: "dark" as "light" | "dark" | "system",

  /** Ngôn ngữ mặc định CV: vi | en */
  defaultLocale: "vi" as "vi" | "en",

  /**
   * Chặn Google/Bing index trang CV.
   * true = meta noindex + robots.txt Disallow + header X-Robots-Tag.
   * Đặt false nếu muốn CV xuất hiện trên tìm kiếm.
   */
  blockSearchIndexing: true,
} as const;

/** Cấu hình nâng cao — hiển thị web, export, bật/tắt tính năng */
export const configAdvanced = {
  /** Phóng to CV trên trình duyệt (1 = 100%, 2 = 200%). In ấn luôn 100% */
  browserDisplayScale: 2,

  /** Tiền tố tên file PDF/DOCX */
  exportFilenamePrefix: "CV",

  /** Cho phép QR liên hệ (cần features.showQrCode = true) */
  qrContactEnabled: true,

  /**
   * Bật/tắt thành phần trên trang web.
   * Tắt những mục không cần để giao diện gọn hơn.
   */
  features: {
    /** Nền grid / hiệu ứng công nghệ */
    techBackground: true,
    /** Nút đổi dark / light */
    themeToggle: true,
    /** Nút VI / EN (dịch qua API) */
    localeToggle: true,
    /** Đổi layout trên header (không sửa file) */
    layoutSwitcher: true,
    /** Mã QR trên CV */
    showQrCode: true,
    /** Nút In CV */
    exportPrint: true,
    /** Nút tải PDF */
    exportPdf: true,
    /** Nút tải DOCX */
    exportDocx: true,
    /** API /api/translate — MyMemory only, không dùng Google/Lingva */
    translationApi: true,
    /**
     * Chặn Google: font hệ thống (không fonts.googleapis.com),
     * CSP chặn domain Google, dịch không qua Google Translate.
     */
    blockGoogle: true,
  },
} as const;

/** Gộp cấu hình — dùng trong app */
export const appConfig = {
  ...configBasic,
  ...configAdvanced,
} as const;

export type AppConfig = typeof appConfig;
