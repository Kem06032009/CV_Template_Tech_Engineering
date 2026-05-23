"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/store/resume-store";

export function ResumeJsonEditor() {
  const resume = useResumeStore((s) => s.resume);
  const importFromJson = useResumeStore((s) => s.importFromJson);
  const resetToSample = useResumeStore((s) => s.resetToSample);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleImport() {
    const payload = text.trim() || JSON.stringify(resume, null, 2);
    const ok = importFromJson(payload);
    if (!ok) {
      setError("Invalid JSON or missing required fields");
      return;
    }
    setError(null);
  }

  function loadCurrent() {
    setText(JSON.stringify(resume, null, 2));
    setError(null);
  }

  return (
    <div className="space-y-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste resume JSON schema here…"
        className="w-full h-40 font-mono text-xs p-3 rounded-md border border-cv bg-[var(--cv-bg)] text-[var(--cv-fg)] resize-y"
        spellCheck={false}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={handleImport}>
          Import JSON
        </Button>
        <Button size="sm" variant="outline" onClick={loadCurrent}>
          Load current
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            resetToSample();
            setText("");
            setError(null);
          }}
        >
          Reset sample
        </Button>
      </div>
    </div>
  );
}
