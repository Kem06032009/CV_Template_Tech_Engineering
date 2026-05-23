"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CVRenderer } from "@/components/cv/cv-renderer";
import { ExportToolbar } from "@/components/editor/export-toolbar";
import { GitHubImport } from "@/components/editor/github-import";
import { LayoutSelector } from "@/components/editor/layout-selector";
import { ResumeJsonEditor } from "@/components/editor/resume-json-editor";
import { SectionOrderEditor } from "@/components/editor/section-order-editor";
import { SummaryEditor } from "@/components/editor/summary-editor";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useResumeStore } from "@/store/resume-store";
import type { LayoutType } from "@/lib/schema/resume";

function EditorContent() {
  const resume = useResumeStore((s) => s.resume);
  const setLayout = useResumeStore((s) => s.setLayout);
  const searchParams = useSearchParams();

  useEffect(() => {
    const layout = searchParams.get("layout") as LayoutType | null;
    if (
      layout &&
      ["single-column-ats", "two-column-modern", "compact-senior"].includes(layout)
    ) {
      setLayout(layout);
    }
  }, [searchParams, setLayout]);

  return (
    <div className="min-h-screen bg-[var(--cv-surface)]">
      <header className="no-print border-b border-cv sticky top-0 z-50 bg-[var(--cv-surface)]/95 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="font-semibold text-sm shrink-0">
            <span className="font-mono text-cv-accent">&lt;/&gt;</span> Tech CV
          </Link>
          <ExportToolbar />
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 grid lg:grid-cols-[360px_1fr] gap-6">
        <aside className="no-print space-y-6 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <section>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cv-muted mb-3">
              Layout
            </h2>
            <LayoutSelector />
          </section>

          <section>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cv-muted mb-3">
              Section order
            </h2>
            <SectionOrderEditor />
          </section>

          <section>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cv-muted mb-3">
              Professional summary
            </h2>
            <SummaryEditor />
          </section>

          <section>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cv-muted mb-3">
              GitHub sync
            </h2>
            <GitHubImport />
          </section>

          <section>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cv-muted mb-3">
              JSON import
            </h2>
            <ResumeJsonEditor />
          </section>
        </aside>

        <div className="min-w-0">
          <p className="no-print text-xs text-cv-muted mb-3 font-mono">
            Live preview · {resume.meta.layout.replace(/-/g, " ")}
          </p>
          <CVRenderer resume={resume} />
        </div>
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-cv-muted">
          Loading editor…
        </div>
      }
    >
      <EditorContent />
    </Suspense>
  );
}
