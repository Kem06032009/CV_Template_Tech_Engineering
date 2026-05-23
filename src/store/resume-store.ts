"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LayoutType, Resume, SectionId } from "@/lib/schema/resume";
import { sampleResume } from "@/lib/sample-data";

interface ResumeStore {
  resume: Resume;
  setResume: (resume: Resume) => void;
  updateSummary: (summary: string) => void;
  setLayout: (layout: LayoutType) => void;
  setSectionOrder: (order: SectionId[]) => void;
  resetToSample: () => void;
  importFromJson: (json: string) => boolean;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resume: sampleResume,
      setResume: (resume) => set({ resume }),
      updateSummary: (summary) =>
        set({ resume: { ...get().resume, summary } }),
      setLayout: (layout) =>
        set({ resume: { ...get().resume, meta: { ...get().resume.meta, layout } } }),
      setSectionOrder: (sectionOrder) =>
        set({ resume: { ...get().resume, sectionOrder } }),
      resetToSample: () => set({ resume: sampleResume }),
      importFromJson: (json) => {
        try {
          const parsed = JSON.parse(json) as Resume;
          if (!parsed.version || !parsed.personal) return false;
          set({ resume: parsed });
          return true;
        } catch {
          return false;
        }
      },
    }),
    { name: "tech-cv-resume" },
  ),
);
