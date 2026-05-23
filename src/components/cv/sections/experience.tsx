import { SectionTitle } from "@/components/cv/shared/section-title";
import type { Experience } from "@/lib/schema/resume";
import { cn } from "@/lib/utils";

function formatDateRange(exp: Experience) {
  const start = exp.startDate.replace("-", "/");
  const end = exp.current ? "Present" : exp.endDate?.replace("-", "/") ?? "";
  return `${start} – ${end}`;
}

export function ExperienceSection({
  experience,
  variant = "default",
  compact = false,
}: {
  experience: Experience[];
  variant?: "default" | "sidebar" | "compact";
  compact?: boolean;
}) {
  return (
    <section aria-labelledby="experience-heading">
      <SectionTitle
        variant={
          variant === "sidebar" ? "sidebar" : variant === "compact" ? "compact" : "default"
        }
      >
        <span id="experience-heading">Work Experience</span>
      </SectionTitle>
      <div className="space-y-5">
        {experience.map((exp) => (
          <article key={exp.id} className="print-break-avoid">
            <div className="flex flex-wrap justify-between gap-2 items-baseline">
              <div>
                <h3 className={cn("font-semibold", compact ? "text-sm" : "text-base")}>
                  {exp.position}
                </h3>
                <p className="text-sm text-cv-accent font-medium">{exp.company}</p>
              </div>
              <div className="text-xs text-cv-muted text-right shrink-0">
                <time>{formatDateRange(exp)}</time>
                {exp.location && <p>{exp.location}</p>}
              </div>
            </div>
            {exp.stack && exp.stack.length > 0 && (
              <p className="mt-1.5 text-xs font-mono text-cv-muted">
                Stack: {exp.stack.join(" · ")}
              </p>
            )}
            <ul className="mt-2 space-y-1.5 list-disc list-outside ml-4">
              {exp.achievements.map((item, i) => (
                <li key={i} className="text-sm text-cv-muted leading-relaxed">
                  {item}
                </li>
              ))}
              {exp.responsibilities?.map((item, i) => (
                <li key={`r-${i}`} className="text-sm text-cv-muted leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
