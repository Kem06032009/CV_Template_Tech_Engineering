import type { Resume } from "@/lib/schema/resume";

/** Rule-based summary generator (no API key required). Replace with OpenAI API in production. */
export function generateProfessionalSummary(resume: Resume): string {
  const years = estimateYears(resume.experience);
  const topSkills = resume.skills
    .flatMap((c) => c.skills.slice(0, 2).map((s) => s.name))
    .slice(0, 6);
  const highlights = resume.experience
    .flatMap((e) => e.achievements.slice(0, 1))
    .slice(0, 2);

  const role = resume.personal.title.split("·")[0]?.trim() ?? "Engineer";

  let summary = `${role} with ${years}+ years delivering production systems at scale. `;
  summary += `Core expertise in ${topSkills.join(", ")}. `;

  if (highlights.length) {
    summary += highlights.join(" ").replace(/\.$/, "") + ". ";
  }

  summary +=
    "Focused on reliability, security, and measurable engineering outcomes for global technology teams.";

  return summary.trim();
}

function estimateYears(
  experience: Resume["experience"],
): number {
  if (!experience.length) return 3;
  const starts = experience.map((e) => {
    const [y] = e.startDate.split("-");
    return parseInt(y, 10);
  });
  const minYear = Math.min(...starts.filter(Boolean));
  const currentYear = new Date().getFullYear();
  return Math.max(1, currentYear - minYear);
}

export function extractSkillsFromText(text: string): string[] {
  const known = [
    "Go",
    "Rust",
    "Python",
    "TypeScript",
    "Java",
    "React",
    "Next.js",
    "Vue",
    "Node.js",
    "FastAPI",
    "Docker",
    "Kubernetes",
    "Terraform",
    "AWS",
    "Azure",
    "GCP",
    "PostgreSQL",
    "Redis",
    "MongoDB",
    "gRPC",
    "Linux",
    "Nginx",
    "PyTorch",
    "LangChain",
  ];
  return known.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase()),
  );
}
