import { SectionTitle } from "@/components/cv/shared/section-title";
import type { Experience } from "@/lib/schema/resume";
import { getSectionLabel, getUiString, type CVLocale } from "@/i18n/section-labels";
import { cn } from "@/lib/utils";

function formatDateRange(exp: Experience, locale: CVLocale) {
  const start = exp.startDate.replace("-", "/");
  const end = exp.current
    ? getUiString(locale, "present")
    : exp.endDate?.replace("-", "/") ?? "";
  return `${start} – ${end}`;
}

export function ExperienceSection({
  experience,
  variant = "default",
  compact = false,
  locale = "en",
}: {
  experience: Experience[];
  variant?: "default" | "sidebar" | "compact";
  compact?: boolean;
  locale?: CVLocale;
}) {
  return (
    <section aria-labelledby="experience-heading">
      <SectionTitle
        variant={
          variant === "sidebar" ? "sidebar" : variant === "compact" ? "compact" : "default"
        }
      >
        <span id="experience-heading">{getSectionLabel(locale, "experience")}</span>
      </SectionTitle>
      <div className="space-y-5">
        {experience.map((exp) => (
          <article
            key={exp.id}
            className="print-break-avoid relative border-l-2 border-electric-500/25 pl-4 ml-0.5"
          >
            <span
              className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-electric-500 shadow-[0_0_8px_-2px_rgba(10,132,255,0.6)]"
              aria-hidden
            />
            <div className="flex flex-wrap justify-between gap-2 items-baseline">
              <div>
                <h3 className={cn("font-semibold", compact ? "text-sm" : "text-base")}>
                  {exp.position}
                </h3>
                <p className="text-sm text-cv-accent font-medium">{exp.company}</p>
              </div>
              <div className="text-xs text-cv-muted text-right shrink-0">
                <time>{formatDateRange(exp, locale)}</time>
                {exp.location && <p>{exp.location}</p>}
              </div>
            </div>
            {exp.stack && exp.stack.length > 0 && (
              <p className="mt-1.5 text-xs font-mono text-cv-muted">
                {getUiString(locale, "stack")}: {exp.stack.join(" · ")}
              </p>
            )}
            {(() => {
              const bullets = [
                ...(exp.achievements ?? []),
                ...(exp.responsibilities ?? []),
              ];
              if (bullets.length === 0) return null;
              return (
                <ul className="mt-2 space-y-1.5 list-disc list-outside ml-4">
                  {bullets.map((item, i) => (
                    <li key={i} className="text-sm text-cv-muted leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            })()}
          </article>
        ))}
      </div>
    </section>
  );
}
