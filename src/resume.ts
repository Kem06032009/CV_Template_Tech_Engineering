import type { Resume, SectionId } from "@/lib/schema/resume";
import { appConfig } from "@/config";
import { normalizeResume } from "@/lib/resume-normalize";
import {
  BASIC_SECTION_ORDER,
  resumeBasic,
} from "@/resume-basic";
import {
  ADVANCED_SECTION_ORDER,
  resumeAdvanced,
} from "@/resume-advanced";

/**
 * Gộp resume-basic + resume-advanced → Resume hiển thị trên web.
 * Hướng dẫn: src/huongdan.md
 */

export { resumeBasic, BASIC_SECTION_ORDER } from "@/resume-basic";
export { resumeAdvanced, ADVANCED_SECTION_ORDER } from "@/resume-advanced";

function buildDefaultSectionOrder(): SectionId[] {
  if (resumeAdvanced.sectionOrderOverride?.length) {
    return resumeAdvanced.sectionOrderOverride;
  }
  const basic = [...BASIC_SECTION_ORDER] as SectionId[];
  const advanced = ADVANCED_SECTION_ORDER.filter(
    (id) => !basic.includes(id),
  ) as SectionId[];
  return [...basic, ...advanced];
}

export function buildResume(): Resume {
  return normalizeResume({
    meta: {
      layout: appConfig.defaultLayout,
      theme: appConfig.defaultTheme,
      locale: appConfig.defaultLocale,
    },
    personal: {
      ...resumeBasic.personal,
      alias: resumeBasic.personal.alias,
      qrEnabled:
        appConfig.features.showQrCode && appConfig.qrContactEnabled,
    },
    summary: resumeBasic.summary,
    languages: resumeBasic.languages ?? [],
    skills: [
      ...(resumeBasic.skills ?? []),
      ...(resumeAdvanced.skillsExtra ?? []),
    ],
    experience: resumeBasic.experience ?? [],
    education: resumeBasic.education ?? [],
    projects: resumeAdvanced.projects ?? [],
    certifications: resumeAdvanced.certifications ?? [],
    openSource: resumeAdvanced.openSource,
    sectionOrder: buildDefaultSectionOrder(),
  });
}

export const defaultResume = buildResume();
