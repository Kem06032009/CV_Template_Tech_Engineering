"use client";

import { useResumeStore } from "@/store/resume-store";
import type { LayoutType } from "@/lib/schema/resume";
import { cn } from "@/lib/utils";

const layouts: { id: LayoutType; label: string; description: string }[] = [
  {
    id: "two-column-modern",
    label: "Two Column",
    description: "Modern engineering layout",
  },
  {
    id: "single-column-ats",
    label: "ATS Single",
    description: "Parser-friendly linear flow",
  },
  {
    id: "compact-senior",
    label: "Compact Senior",
    description: "Dense layout for 10+ years",
  },
];

export function LayoutSelector() {
  const layout = useResumeStore((s) => s.resume.meta.layout);
  const setLayout = useResumeStore((s) => s.setLayout);

  return (
    <div className="flex flex-wrap gap-2">
      {layouts.map((l) => (
        <button
          key={l.id}
          type="button"
          onClick={() => setLayout(l.id)}
          className={cn(
            "px-3 py-2 rounded-md text-left border transition-colors text-xs",
            layout === l.id
              ? "border-electric-500 bg-cv-accent-soft text-cv-accent"
              : "border-cv hover:border-graphite-400 text-cv-muted",
          )}
        >
          <span className="font-medium block">{l.label}</span>
          <span className="opacity-70">{l.description}</span>
        </button>
      ))}
    </div>
  );
}
