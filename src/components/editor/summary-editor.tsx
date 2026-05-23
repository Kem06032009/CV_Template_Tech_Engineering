"use client";

import { useResumeStore } from "@/store/resume-store";

export function SummaryEditor() {
  const summary = useResumeStore((s) => s.resume.summary);
  const updateSummary = useResumeStore((s) => s.updateSummary);

  return (
    <textarea
      value={summary}
      onChange={(e) => updateSummary(e.target.value)}
      rows={5}
      className="w-full text-sm p-3 rounded-md border border-cv bg-[var(--cv-bg)] text-[var(--cv-fg)] leading-relaxed resize-y"
      aria-label="Professional summary"
    />
  );
}
