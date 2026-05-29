import type {
  Education,
  Experience,
  Language,
  SkillCategory,
} from "@/lib/schema/resume";

/**
 * RESUME BASIC — Trần Gia Khiêm (Kem)
 * Hướng dẫn: src/huongdan.md
 */

export const BASIC_SECTION_ORDER = [
  "summary",
  "skills",
  "experience",
  "education",
  "languages",
] as const;

export const resumeBasic = {
  personal: {
    fullName: "Trần Gia Khiêm ",
    alias: "Kem mê vịt",
    title:
      "Senior System Administrator · DevOps Engineer · Lead Developer",
    avatar: "",
    contact: {
      email: "saboylaanh@gmail.com",
      phone: "0919.128.135",
      birthDate: "06/03/2009",
      location: "Việt Nam · Ưu tiên Ubuntu Server",
      linkedin: "",
      github: "https://github.com/ZakShinn",
      portfolio: "",
      blog: "",
      stackoverflow: "",
      facebook:
        "https://www.facebook.com/profile.php?id=100006985387032",
      zalo: "https://zalo.me/0968884946",
    },
  },

  summary:
    "Chuyên gia CNTT (IT Specialist) với nhiều năm kinh nghiệm quản trị hệ thống, hạ tầng mạng doanh nghiệp và phát triển phần mềm. Thế mạnh chuyên sâu tối ưu hạ tầng MikroTik RouterOS v7 (Firewall, Routing, DNS, Layer7), ảo hóa, triển khai VPN bảo mật cao (WireGuard, Tailscale) và tự động hóa (Bash, RouterOS Script). Full-stack Developer với Next.js 15, React 19, PHP; vận hành HIS/EMR tại môi trường y tế. Hướng tới hệ sinh thái ổn định, tự động hóa tối đa và bảo mật cho doanh nghiệp.",

  skills: [
    {
      id: "system-network",
      label: "Quản trị hệ thống & Mạng",
      skills: [
        { name: "MikroTik RouterOS v7", proficiency: "expert" as const },
        { name: "Ubuntu Server", proficiency: "expert" as const },
        { name: "WireGuard", proficiency: "expert" as const },
        { name: "Tailscale", proficiency: "advanced" as const },
        { name: "HIS / EMR", proficiency: "advanced" as const },
        { name: "Backup & DR", proficiency: "advanced" as const },
      ],
    },
    {
      id: "development",
      label: "Phát triển & Tự động hóa",
      skills: [
        { name: "PHP", proficiency: "expert" as const },
        { name: "Bash / Shell", proficiency: "expert" as const },
        { name: "RouterOS Script", proficiency: "expert" as const },
        { name: "Next.js 15", proficiency: "advanced" as const },
        { name: "React 19", proficiency: "advanced" as const },
        { name: "Git / GitHub", proficiency: "advanced" as const },
      ],
    },
    {
      id: "devops-tools",
      label: "DevOps & Công cụ",
      skills: [
        { name: "Cloudflare", proficiency: "advanced" as const },
        { name: "Vercel", proficiency: "advanced" as const },
        { name: "CI/CD", proficiency: "intermediate" as const },
        { name: "Telegram Bot", proficiency: "advanced" as const },
      ],
    },
  ] satisfies SkillCategory[],

  experience: [
    {
      id: "exp-vanan",
      company: "Bệnh viện Đa khoa Vạn An",
      position: "IT Specialist — Chuyên viên Hạ tầng & Hệ thống",
      location: "Việt Nam",
      startDate: "2025-01",
      current: true,
      stack: [
        "MikroTik RouterOS v7",
        "Ubuntu Server",
        "HIS",
        "EMR",
        "Backup",
        "Firewall",
      ],
      responsibilities: [
        "Thiết kế, vận hành và bảo trì toàn bộ hạ tầng mạng và máy chủ bệnh viện",
        "Quản lý hệ thống HIS và quy trình backup dữ liệu EMR định kỳ",
      ],
      achievements: [
        "Lên phương án và thực thi backup EMR đảm bảo tính toàn vẹn dữ liệu y tế theo quy định",
        "Tối ưu định tuyến và triển khai chính sách Firewall trên MikroTik bảo vệ dữ liệu bệnh nhân",
        "Vận hành ổn định hạ tầng CNTT phục vụ hệ thống thông tin bệnh viện",
      ],
    },
    {
      id: "exp-lecturer",
      company: "Trường Cao đẳng Công nghệ và Du lịch",
      position: "Giảng viên CNTT",
      location: "Việt Nam",
      startDate: "2024-01",
      current: true,
      stack: ["CNTT", "Đào tạo", "Thực hành hệ thống"],
      achievements: [
        "Giảng dạy kiến thức công nghệ thông tin cho sinh viên cao đẳng từ 2024 đến nay",
        "Hướng dẫn thực hành, kỹ năng làm việc nhóm và tư duy hệ thống",
      ],
    },
    {
      id: "exp-lead-oss",
      company: "Dự án độc lập & Open Source",
      position: "Lead Developer / Creator",
      location: "Remote",
      startDate: "2025-01",
      current: true,
      stack: [
        "MikroTik",
        "WireGuard",
        "Linux",
        "PHP",
        "Next.js",
        "Telegram",
      ],
      achievements: [
        "Phát triển Zakshin MikroTik WireGuard Admin — tự động hóa cấu hình VPN trên RouterOS",
        "Xây dựng Linux-Telegram-Monitor giám sát tài nguyên server và cảnh báo real-time",
        "Script backup cấu hình MikroTik (.rsc/.backup) gửi an toàn qua Telegram",
      ],
    },
  ] satisfies Experience[],

  education: [
    {
      id: "edu-ctu",
      university: "Đại học Cần Thơ",
      degree: "Cử nhân",
      major: "Công nghệ thông tin",
      graduationYear: "2024",
    },
    {
      id: "edu-ladec",
      university: "Trường Cao đẳng Công nghệ Ladec",
      degree: "Cao đẳng",
      major: "Công nghệ thông tin",
      graduationYear: "2019",
    },
    {
      id: "edu-bknamsg",
      university: "Trường Cao đẳng Bách Khoa Nam Sài Gòn",
      degree: "Cao đẳng",
      major: "Y sĩ đa khoa",
      graduationYear: "2016",
    },
    {
      id: "edu-thpt",
      university: "THPT Nguyễn Thông",
      degree: "Trung học phổ thông",
      graduationYear: "2014",
    },
    {
      id: "edu-thcs",
      university: "THCS Vĩnh Công",
      degree: "Trung học cơ sở",
      graduationYear: "2011",
    },
    {
      id: "edu-tieu-hoc",
      university: "Trường Tiểu học Vĩnh Công",
      degree: "Tiểu học",
      graduationYear: "2007",
    },
  ] satisfies Education[],

  languages: [
    { name: "Tiếng Việt", level: "Bản ngữ" },
    { name: "Tiếng Anh", level: "Đọc tài liệu kỹ thuật" },
  ] satisfies Language[],
};

export type ResumeBasic = typeof resumeBasic;
