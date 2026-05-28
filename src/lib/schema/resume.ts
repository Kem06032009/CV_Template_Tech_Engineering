import { z } from "zod";

export const proficiencySchema = z.enum([
  "expert",
  "advanced",
  "intermediate",
  "familiar",
]);

export const contactSchema = z.object({
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  birthDate: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  portfolio: z.string().url().optional().or(z.literal("")),
  blog: z.string().url().optional().or(z.literal("")),
  stackoverflow: z.string().url().optional().or(z.literal("")),
  facebook: z.string().url().optional().or(z.literal("")),
  zalo: z.string().url().optional().or(z.literal("")),
});

export const skillItemSchema = z.object({
  name: z.string(),
  proficiency: proficiencySchema.optional(),
});

export const skillCategorySchema = z.object({
  id: z.string(),
  label: z.string(),
  skills: z.array(skillItemSchema),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  position: z.string(),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  stack: z.array(z.string()).optional(),
  responsibilities: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional().default([]),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  github: z.string().url().optional().or(z.literal("")),
  demo: z.string().url().optional().or(z.literal("")),
  stack: z.array(z.string()).optional().default([]),
  architecture: z.string().optional(),
  achievements: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  date: z.string().optional(),
  credentialId: z.string().optional(),
  url: z.string().url().optional().or(z.literal("")),
});

export const educationSchema = z.object({
  id: z.string(),
  university: z.string(),
  degree: z.string(),
  major: z.string().optional(),
  graduationYear: z.string().optional(),
  gpa: z.string().optional(),
});

export const openSourceSchema = z.object({
  githubUsername: z.string().optional(),
  stats: z
    .object({
      repositories: z.number().optional(),
      stars: z.number().optional(),
      contributions: z.number().optional(),
    })
    .optional(),
  repositories: z
    .array(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        url: z.string().url().optional(),
        stars: z.number().optional(),
      }),
    )
    .optional(),
  highlights: z.array(z.string()).optional(),
});

export const languageSchema = z.object({
  name: z.string(),
  level: z.string(),
});

export const sectionIdSchema = z.enum([
  "summary",
  "skills",
  "experience",
  "projects",
  "certifications",
  "education",
  "opensource",
  "languages",
]);

export const layoutSchema = z.enum([
  "single-column-ats",
  "two-column-modern",
  "compact-senior",
]);

export const resumeSchema = z.object({
  version: z.literal("1.0"),
  meta: z.object({
    layout: layoutSchema,
    theme: z.enum(["light", "dark", "system"]).optional(),
    locale: z.string().optional(),
  }),
  personal: z.object({
    fullName: z.string(),
    /** Bí danh / nickname — hiển thị dưới tên */
    alias: z.string().optional(),
    title: z.string(),
    avatar: z.string().url().optional().or(z.literal("")),
    contact: contactSchema,
    qrEnabled: z.boolean().optional(),
  }),
  summary: z.string(),
  sectionOrder: z.array(sectionIdSchema),
  skills: z.array(skillCategorySchema),
  experience: z.array(experienceSchema),
  projects: z.array(projectSchema),
  certifications: z.array(certificationSchema),
  education: z.array(educationSchema),
  openSource: openSourceSchema.optional(),
  languages: z.array(languageSchema),
});

export type Resume = z.infer<typeof resumeSchema>;
export type LayoutType = z.infer<typeof layoutSchema>;
export type SectionId = z.infer<typeof sectionIdSchema>;
export type SkillCategory = z.infer<typeof skillCategorySchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Language = z.infer<typeof languageSchema>;
export type Certification = z.infer<typeof certificationSchema>;

/** Section cốt lõi — khớp src/resume-basic.ts */
export const BASIC_SECTION_ORDER: SectionId[] = [
  "summary",
  "skills",
  "experience",
  "education",
  "languages",
];

/** Section nâng cao — khớp src/resume-advanced.ts */
export const ADVANCED_SECTION_ORDER: SectionId[] = [
  "projects",
  "certifications",
  "opensource",
];

/** Thứ tự mặc định: basic + advanced */
export const DEFAULT_SECTION_ORDER: SectionId[] = [
  ...BASIC_SECTION_ORDER,
  ...ADVANCED_SECTION_ORDER,
];

export function validateResume(data: unknown): Resume {
  return resumeSchema.parse(data);
}
