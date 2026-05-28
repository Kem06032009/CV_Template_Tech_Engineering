import { CVHeader } from "@/components/cv/sections/header";
import { SectionRenderer } from "@/components/cv/section-renderer";
import type { Resume } from "@/lib/schema/resume";

/** ATS-optimized: single column, semantic HTML, no complex grids */
export function SingleColumnATS({ resume }: { resume: Resume }) {
  return (
    <article
      className="cv-paper max-w-[210mm] mx-auto leading-relaxed"
      itemScope
      itemType="https://schema.org/Person"
    >
      <CVHeader personal={resume.personal} variant="ats" />
      <meta itemProp="name" content={resume.personal.fullName} />
      <meta itemProp="email" content={resume.personal.contact.email} />

      <div className="space-y-6">
        {resume.sectionOrder.map((sectionId) => (
          <SectionRenderer
            key={sectionId}
            sectionId={sectionId}
            resume={resume}
            variant="default"
          />
        ))}
      </div>
    </article>
  );
}
