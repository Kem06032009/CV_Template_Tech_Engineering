import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  Code2,
  FileCheck,
  Layers,
  Shield,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Code2,
    title: "Engineering-First",
    description:
      "Layouts inspired by Vercel, GitHub, and Linear — clean, technical, premium.",
  },
  {
    icon: FileCheck,
    title: "ATS Optimized",
    description:
      "Single-column semantic HTML, selectable text, print-ready A4 export.",
  },
  {
    icon: Layers,
    title: "3 Layout Modes",
    description:
      "Two-column modern, ATS single column, and compact senior engineer.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps Ready",
    description:
      "Skill groups for infrastructure, security, AI/ML, and platform engineering.",
  },
  {
    icon: Shield,
    title: "Export Suite",
    description: "PDF, DOCX, JSON schema, and print-optimized styles built in.",
  },
];

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "DevOps / SRE",
  "Cloud Engineer",
  "Platform Engineer",
  "AI / ML Engineer",
  "Security Engineer",
  "Backend / Frontend",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--cv-surface)]">
      <header className="no-print border-b border-cv sticky top-0 z-50 bg-[var(--cv-surface)]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight flex items-center gap-2">
            <span className="text-cv-accent font-mono text-sm">&lt;/&gt;</span>
            Tech CV
          </Link>
          <nav className="flex items-center gap-3">
            <Link
              href="/editor"
              className="text-sm text-cv-muted hover:text-[var(--cv-fg)] transition-colors hidden sm:inline"
            >
              Editor
            </Link>
            <ThemeToggle />
            <Link href="/editor">
              <Button size="sm">
                Open Editor
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-cv-accent mb-4">
            CV Template · Tech Engineering
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-3xl leading-tight">
            Professional CV templates for{" "}
            <span className="text-cv-accent">senior engineers</span> and global tech teams
          </h1>
          <p className="mt-6 text-lg text-cv-muted max-w-2xl leading-relaxed">
            Modern dark/light themes, ATS-friendly structure, measurable impact bullets, and
            export to PDF, DOCX, and JSON — built for Big Tech, startups, and infrastructure
            roles.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/editor">
              <Button size="lg">Build your CV</Button>
            </Link>
            <Link href="/editor?layout=single-column-ats">
              <Button variant="outline" size="lg">
                ATS layout
              </Button>
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-5 rounded-lg border border-cv bg-[var(--cv-bg)] hover:border-electric-500/40 transition-colors"
            >
              <f.icon className="h-5 w-5 text-cv-accent mb-3" />
              <h3 className="font-semibold text-sm">{f.title}</h3>
              <p className="text-sm text-cv-muted mt-1">{f.description}</p>
            </div>
          ))}
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-20">
          <h2 className="text-sm font-mono uppercase tracking-widest text-cv-muted mb-4">
            Built for roles
          </h2>
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <span key={role} className="skill-tag">
                {role}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-cv py-8 text-center text-xs text-cv-muted no-print">
        Tech Engineering CV Template · Production-ready · MIT License
      </footer>
    </div>
  );
}
