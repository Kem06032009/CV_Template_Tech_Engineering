import { CVHeader } from "@/components/cv/sections/header";
import { SectionRenderer } from "@/components/cv/section-renderer";
import type { Resume } from "@/lib/schema/resume";

/** ATS-optimized: single column, semantic HTML, no complex grids */
export function SingleColumnATS({ resume }: { resume: Resume }) {
  const mainSections = resume.sectionOrder.filter((id) => id !== "languages");

  return (
    <article className="cv-paper max-w-[210mm] mx-auto" itemScope itemType="https://schema.org/Person">
      <CVHeader personal={resume.personal} variant="ats" />
      <meta itemProp="name" content={resume.personal.fullName} />
      <meta itemProp="email" content={resume.personal.contact.email} />

      <div className="space-y-6">
        {mainSections.map((sectionId) => (
          <SectionRenderer
            key={sectionId}
            sectionId={sectionId}
            resume={resume}
            variant="default"
          />
        ))}
        {resume.languages.length > 0 && (
          <SectionRenderer sectionId="languages" resume={resume} variant="default" />
        )}
      </div>
    </article>
  );
}
