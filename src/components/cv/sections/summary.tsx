import { SectionTitle } from "@/components/cv/shared/section-title";

export function SummarySection({
  summary,
  variant = "default",
}: {
  summary: string;
  variant?: "default" | "sidebar" | "compact";
}) {
  return (
    <section className="print-break-avoid" aria-labelledby="summary-heading">
      <SectionTitle variant={variant === "sidebar" ? "sidebar" : variant === "compact" ? "compact" : "default"}>
        <span id="summary-heading">Professional Summary</span>
      </SectionTitle>
      <p className="text-sm leading-relaxed text-cv-muted">{summary}</p>
    </section>
  );
}
