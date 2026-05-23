"use client";

import { useState } from "react";
import { Download, FileJson, FileText, Printer, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportResumeToDocx } from "@/lib/export/docx";
import { exportElementToPdf, printCv } from "@/lib/export/pdf-client";
import { generateProfessionalSummary } from "@/lib/ai/summary-generator";
import { downloadJson } from "@/lib/utils";
import { useResumeStore } from "@/store/resume-store";

export function ExportToolbar() {
  const resume = useResumeStore((s) => s.resume);
  const updateSummary = useResumeStore((s) => s.updateSummary);
  const [loading, setLoading] = useState<string | null>(null);

  async function handlePdf() {
    setLoading("pdf");
    try {
      await exportElementToPdf(
        "cv-preview",
        `${resume.personal.fullName.replace(/\s+/g, "_")}_CV.pdf`,
      );
    } finally {
      setLoading(null);
    }
  }

  async function handleDocx() {
    setLoading("docx");
    try {
      const blob = await exportResumeToDocx(resume);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${resume.personal.fullName.replace(/\s+/g, "_")}_CV.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(null);
    }
  }

  function handleJson() {
    downloadJson(resume, `${resume.personal.fullName.replace(/\s+/g, "_")}_resume.json`);
  }

  function handleAiSummary() {
    const generated = generateProfessionalSummary(resume);
    updateSummary(generated);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" onClick={handlePdf} disabled={loading === "pdf"}>
        <Download className="h-4 w-4" />
        {loading === "pdf" ? "Exporting…" : "PDF"}
      </Button>
      <Button size="sm" variant="secondary" onClick={handleDocx} disabled={loading === "docx"}>
        <FileText className="h-4 w-4" />
        DOCX
      </Button>
      <Button size="sm" variant="outline" onClick={handleJson}>
        <FileJson className="h-4 w-4" />
        JSON
      </Button>
      <Button size="sm" variant="outline" onClick={() => printCv()}>
        <Printer className="h-4 w-4" />
        Print
      </Button>
      <Button size="sm" variant="ghost" onClick={handleAiSummary}>
        <Sparkles className="h-4 w-4" />
        AI Summary
      </Button>
    </div>
  );
}
