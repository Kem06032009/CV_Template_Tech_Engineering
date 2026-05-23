import { CVHeader } from "@/components/cv/sections/header";
import { SectionRenderer } from "@/components/cv/section-renderer";
import type { Resume } from "@/lib/schema/resume";

/** Dense layout for senior engineers with extensive experience */
export function CompactSenior({ resume }: { resume: Resume }) {
  return (
    <article className="cv-paper max-w-[210mm] mx-auto text-[13px]">
      <CVHeader personal={resume.personal} variant="compact" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {resume.sectionOrder
            .filter((id) =>
              ["summary", "experience", "projects"].includes(id),
            )
            .map((sectionId) => (
              <SectionRenderer
                key={sectionId}
                sectionId={sectionId}
                resume={resume}
                variant="compact"
                compact
              />
            ))}
        </div>
        <div className="space-y-4">
          {resume.sectionOrder
            .filter((id) =>
              ["skills", "certifications", "education", "opensource", "languages"].includes(
                id,
              ),
            )
            .map((sectionId) => (
              <SectionRenderer
                key={sectionId}
                sectionId={sectionId}
                resume={resume}
                variant="compact"
                compact
              />
            ))}
        </div>
      </div>
    </article>
  );
}
