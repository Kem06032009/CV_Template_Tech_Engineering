/**
 * ═══════════════════════════════════════════════════════════════
 *  ẢNH ĐẠI DIỆN — src/avatar.ts
 *  Hướng dẫn: src/huongdan.md
 * ═══════════════════════════════════════════════════════════════
 */

export type AvatarObjectFit = "cover" | "contain";

export interface AvatarConfig {
  /** Bật/tắt hiển thị ảnh */
  enabled: boolean;
  /** Đường dẫn từ `public/` hoặc URL đầy đủ */
  src: string;
  alt: string;
  objectFit: AvatarObjectFit;
  /** Ẩn ảnh khi in */
  hideInPrint: boolean;
}

/** File mặc định: đặt ảnh tại public/avatar/anh_dai_dien.png */
export const DEFAULT_AVATAR_SRC = "/avatar/anh_dai_dien.png";

export const avatarConfig: AvatarConfig = {
  enabled: true,
  src: DEFAULT_AVATAR_SRC,
  alt: "Võ Hoàng Hải Nghĩa — ZakShinn",
  objectFit: "cover",
  hideInPrint: false,
};

/** URL hiển thị — ưu tiên avatar.ts, sau đó resume.personal.avatar */
export function resolveAvatarSrc(resumeAvatar?: string): string {
  if (!avatarConfig.enabled) return "";
  if (avatarConfig.src.trim()) return avatarConfig.src;
  if (resumeAvatar?.trim()) return resumeAvatar.trim();
  return DEFAULT_AVATAR_SRC;
}
