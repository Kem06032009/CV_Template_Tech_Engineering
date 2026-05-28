"use client";

import { useState } from "react";
import { Download, FileText, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadDocx, exportResumeToDocx } from "@/lib/export/docx";
import { exportCvToPdfFile } from "@/lib/export-pdf";
import { printResume } from "@/lib/print";
import { ATS_PDF_HINT } from "@/lib/seo";
import type { Resume } from "@/lib/schema/resume";
import { appConfig } from "@/config";

export function ExportActions({ resume }: { resume: Resume }) {
  const { features } = appConfig;
  const [loading, setLoading] = useState<"pdf" | "docx" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const showAnyExport =
    features.exportPrint || features.exportPdf || features.exportDocx;
  const baseName = resume.personal.fullName.replace(/\s+/g, "_");

  if (!showAnyExport) return null;

  async function handlePdf() {
    setError(null);
    setLoading("pdf");
    try {
      await exportCvToPdfFile(
        `${appConfig.exportFilenamePrefix}_${baseName}.pdf`,
      );
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Xuất PDF thất bại. Thử In CV (Ctrl+P).";
      setError(msg);
      console.error("[PDF export]", e);
    } finally {
      setLoading(null);
    }
  }

  async function handleDocx() {
    setError(null);
    setLoading("docx");
    try {
      const blob = await exportResumeToDocx(resume);
      downloadDocx(blob, `${appConfig.exportFilenamePrefix}_${baseName}.docx`);
    } catch (e) {
      setError("Xuất DOCX thất bại.");
      console.error("[DOCX export]", e);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1 shrink-0 no-print">
      <div className="flex items-center gap-2">
        {features.exportPrint && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="font-mono text-xs gap-1.5"
            onClick={() => printResume()}
            aria-label="In CV A4"
          >
            <Printer className="h-3.5 w-3.5" />
            In CV
          </Button>
        )}
        {features.exportPdf && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="font-mono text-xs gap-1.5"
            onClick={() => void handlePdf()}
            disabled={loading !== null}
            title={ATS_PDF_HINT}
            aria-label="Tải PDF"
          >
            <Download className="h-3.5 w-3.5" />
            {loading === "pdf" ? "…" : "PDF"}
          </Button>
        )}
        {features.exportDocx && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="font-mono text-xs gap-1.5"
            onClick={() => void handleDocx()}
            disabled={loading !== null}
            aria-label="Tải DOCX"
          >
            <FileText className="h-3.5 w-3.5" />
            {loading === "docx" ? "…" : "DOCX"}
          </Button>
        )}
      </div>
      {error && (
        <p className="text-[10px] text-red-500 max-w-[220px] text-right leading-snug">
          {error}
        </p>
      )}
    </div>
  );
}
