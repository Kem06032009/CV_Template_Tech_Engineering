import type { Resume } from "@/lib/schema/resume";
import type { SkillCategory } from "@/lib/schema/resume";

/**
 * RESUME ADVANCED — Võ Hoàng Hải Nghĩa (ZakShinn)
 * Hướng dẫn: src/huongdan.md
 */

export const ADVANCED_SECTION_ORDER = [
  "projects",
  "certifications",
  "opensource",
] as const;

export const resumeAdvanced = {
  sectionOrderOverride: undefined as Resume["sectionOrder"] | undefined,

  skillsExtra: [
    {
      id: "android-modding",
      label: "Android Modding & Automation",
      skills: [
        { name: "Magisk", proficiency: "advanced" as const },
        { name: "KernelSU", proficiency: "advanced" as const },
        { name: "Telegram control", proficiency: "advanced" as const },
      ],
    },
    {
      id: "media-iptv",
      label: "IPTV & Streaming",
      skills: [
        { name: "Multicast", proficiency: "advanced" as const },
        { name: "M3U / PHP", proficiency: "advanced" as const },
        { name: "MyTV API", proficiency: "intermediate" as const },
      ],
    },
    {
      id: "design",
      label: "Thiết kế đồ họa",
      skills: [
        { name: "Photoshop", proficiency: "advanced" as const },
        { name: "CorelDRAW", proficiency: "advanced" as const },
        { name: "Illustrator", proficiency: "intermediate" as const },
        { name: "Canva", proficiency: "advanced" as const },
      ],
    },
    {
      id: "kernel-arm",
      label: "Nghiên cứu chuyên sâu",
      skills: [
        { name: "Linux Kernel", proficiency: "advanced" as const },
        { name: "ARM64 / AArch64", proficiency: "intermediate" as const },
      ],
    },
  ] satisfies SkillCategory[],

  projects: [
    {
      id: "proj-wireguard-admin",
      name: "Zakshin MikroTik WireGuard Admin",
      description:
        "Tiện ích tự động hóa cấu hình WireGuard trên MikroTik RouterOS",
      github: "https://github.com/ZakShinn",
      stack: ["MikroTik", "WireGuard", "RouterOS", "Automation"],
      architecture:
        "Đơn giản hóa khởi tạo, quản lý và cấp phát quyền VPN cho người dùng cuối",
      achievements: [
        "Giảm thao tác thủ công khi triển khai VPN nội bộ doanh nghiệp",
        "Tích hợp quy trình cấp quyền truy cập an toàn",
      ],
      featured: true,
    },
    {
      id: "proj-linux-telegram",
      name: "Linux-Telegram-Monitor",
      description:
        "Giám sát CPU, RAM, Storage, Network trên Linux; cảnh báo Telegram",
      github: "https://github.com/ZakShinn",
      stack: ["Linux", "Bash", "Telegram Bot", "Shell Script"],
      achievements: [
        "Cảnh báo thời gian thực về tài nguyên máy chủ",
        "Tự động hóa kịch bản giám sát qua script",
      ],
      featured: true,
    },
    {
      id: "proj-mikrotik-backup",
      name: "Backup & Giám sát MikroTik qua Telegram",
      description: "Script RouterOS v7 xuất .rsc/.backup, nén và gửi Telegram",
      stack: ["MikroTik RouterOS v7", "Telegram", "Automation"],
      achievements: [
        "Sao lưu cấu hình định kỳ, giảm rủi ro mất cấu hình thiết bị",
      ],
      featured: false,
    },
    {
      id: "proj-iptv",
      name: "Giải pháp IPTV & Multicast",
      description: "Công cụ PHP quét luồng multicast, xuất playlist M3U",
      stack: ["PHP", "Multicast", "IPTV", "MyTV API"],
      architecture:
        "Nghiên cứu IPTV; chuyển đổi luồng thu phát thành danh sách phát tùy biến",
      achievements: [
        "Tự động hóa quét và đóng gói luồng multicast",
      ],
      featured: false,
    },
    {
      id: "proj-maias",
      name: "Web Maias Landing & Telegram Control Builder",
      description:
        "Landing Next.js 15 / React 19; CI/CD Vercel; điều khiển Android qua Telegram",
      stack: ["Next.js 15", "React 19", "Vercel", "Android", "Telegram"],
      achievements: [
        "Deploy mượt trên Vercel với pipeline tối ưu",
        "Module builder điều khiển thiết bị Samsung (đã root) qua Telegram",
      ],
      featured: true,
    },
  ],

  certifications: [
    {
      id: "cert-self-linux",
      name: "Tự nghiên cứu & phát triển",
      issuer:
        "Linux Kernel, tối ưu ARM64 (AArch64), Android system-level modding",
      date: "Liên tục",
    },
    {
      id: "cert-it",
      name: "Chuyên ngành CNTT / Quản trị mạng",
      issuer: "Đào tạo chính quy & tự học chuyên sâu",
    },
  ],

  openSource: {
    githubUsername: "ZakShinn",
    repositories: [
      {
        name: "Linux-Telegram-Monitor",
        description: "Giám sát Linux + cảnh báo Telegram",
        url: "https://github.com/ZakShinn",
      },
      {
        name: "Zakshin MikroTik WireGuard Admin",
        description: "Tự động hóa WireGuard trên MikroTik",
        url: "https://github.com/ZakShinn",
      },
    ],
    highlights: [
      "Lead Developer các công cụ tự động hóa MikroTik, Linux và Telegram",
      "Đóng góp giải pháp VPN, backup và giám sát hạ tầng mã nguồn mở",
      "Kinh nghiệm IPTV/multicast và phát triển web Next.js hiện đại",
    ],
  },
};

export type ResumeAdvanced = typeof resumeAdvanced;
