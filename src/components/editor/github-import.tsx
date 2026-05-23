"use client";

import { useState } from "react";
import { Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/store/resume-store";

export function GitHubImport() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const setResume = useResumeStore((s) => s.setResume);
  const resume = useResumeStore((s) => s.resume);

  async function handleFetch() {
    if (!username.trim()) return;
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/github?username=${encodeURIComponent(username.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error ?? "Failed to fetch GitHub data");
        return;
      }
      setResume({
        ...resume,
        openSource: {
          githubUsername: data.username,
          stats: data.stats,
          repositories: data.repositories,
          highlights: resume.openSource?.highlights,
        },
        personal: {
          ...resume.personal,
          contact: {
            ...resume.personal.contact,
            github: data.profileUrl ?? resume.personal.contact.github,
          },
        },
      });
      setMessage(`Imported ${data.repositories?.length ?? 0} repositories`);
    } catch {
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub username"
          className="flex-1 h-9 px-3 text-sm rounded-md border border-cv bg-[var(--cv-bg)]"
        />
        <Button size="sm" onClick={handleFetch} disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Github className="h-4 w-4" />
          )}
          Sync
        </Button>
      </div>
      {message && <p className="text-xs text-cv-muted">{message}</p>}
    </div>
  );
}
