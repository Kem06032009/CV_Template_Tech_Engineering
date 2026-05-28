import type { Resume } from "@/lib/schema/resume";
import { translateTextFree } from "@/lib/translate-providers";

export function shouldSkipTranslation(text: string): boolean {
  const t = text.trim();
  if (!t) return true;
  if (/^https?:\/\//i.test(t)) return true;
  if (/^[\w.-]+@[\w.-]+\.\w+$/.test(t)) return true;
  if (/^[+\d\s\-().[\]/:]+$/.test(t)) return true;
  if (/^\d{4}(-\d{2})?$/.test(t)) return true;
  if (!/[\u00C0-\u1EF9]/i.test(t) && /^[a-zA-Z0-9\s#.+/&\-–—():,'"]+$/.test(t)) {
    return true;
  }
  return false;
}

const CONCURRENCY = 4;

async function runPool<T>(
  items: T[],
  worker: (item: T) => Promise<void>,
  concurrency = CONCURRENCY,
) {
  const queue = [...items];
  const runners = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length > 0) {
      const item = queue.shift()!;
      await worker(item);
    }
  });
  await Promise.all(runners);
}

async function translateString(text: string): Promise<string> {
  if (shouldSkipTranslation(text)) return text;
  if (text.length <= 1800) return translateTextFree(text);
  const parts = text.match(/[^.!?…]+[.!?…]?/g) || [text];
  const out: string[] = [];
  for (const part of parts) {
    if (!part.trim()) continue;
    out.push(await translateTextFree(part));
  }
  return out.join("") || text;
}

function collectTranslatableStrings(data: Resume, set: Set<string>) {
  const add = (s?: string) => {
    if (s && !shouldSkipTranslation(s)) set.add(s);
  };

  add(data.personal.fullName);
  add(data.personal.title);
  add(data.personal.contact.location);
  add(data.summary);

  for (const cat of data.skills) {
    add(cat.label);
    for (const s of cat.skills) add(s.name);
  }

  for (const exp of data.experience) {
    add(exp.company);
    add(exp.position);
    add(exp.location);
    exp.responsibilities?.forEach(add);
    (exp.achievements ?? []).forEach(add);
  }

  for (const proj of data.projects) {
    add(proj.name);
    add(proj.description);
    add(proj.architecture);
    proj.achievements?.forEach(add);
    (proj.stack ?? []).forEach(add);
  }

  for (const cert of data.certifications) {
    add(cert.name);
    add(cert.issuer);
    add(cert.credentialId);
  }

  for (const edu of data.education) {
    add(edu.university);
    add(edu.degree);
    add(edu.major);
    add(edu.gpa);
  }

  if (data.openSource) {
    add(data.openSource.githubUsername);
    data.openSource.repositories?.forEach((r) => {
      add(r.name);
      add(r.description);
    });
    data.openSource.highlights?.forEach(add);
  }

  for (const lang of data.languages) {
    add(lang.name);
    add(lang.level);
  }
}

function applyMap(text: string, map: Map<string, string>): string {
  if (shouldSkipTranslation(text)) return text;
  return map.get(text.trim()) ?? text;
}

export async function translateResumeData(data: Resume): Promise<Resume> {
  const unique = new Set<string>();
  collectTranslatableStrings(data, unique);

  const map = new Map<string, string>();
  await runPool([...unique], async (original) => {
    try {
      map.set(original, await translateString(original));
    } catch {
      map.set(original, original);
    }
  });

  return {
    ...data,
    meta: { ...data.meta, locale: "en" },
    personal: {
      ...data.personal,
      fullName: applyMap(data.personal.fullName, map),
      title: applyMap(data.personal.title, map),
      contact: {
        ...data.personal.contact,
        location: data.personal.contact.location
          ? applyMap(data.personal.contact.location, map)
          : undefined,
      },
    },
    summary: applyMap(data.summary, map),
    skills: data.skills.map((cat) => ({
      ...cat,
      label: applyMap(cat.label, map),
      skills: cat.skills.map((s) => ({
        ...s,
        name: applyMap(s.name, map),
      })),
    })),
    experience: data.experience.map((exp) => ({
      ...exp,
      company: applyMap(exp.company, map),
      position: applyMap(exp.position, map),
      location: exp.location ? applyMap(exp.location, map) : undefined,
      responsibilities: exp.responsibilities?.map((r) => applyMap(r, map)),
      achievements: (exp.achievements ?? []).map((a) => applyMap(a, map)),
    })),
    projects: data.projects.map((proj) => ({
      ...proj,
      name: applyMap(proj.name, map),
      description: proj.description ? applyMap(proj.description, map) : undefined,
      architecture: proj.architecture ? applyMap(proj.architecture, map) : undefined,
      achievements: proj.achievements?.map((a) => applyMap(a, map)),
      stack: (proj.stack ?? []).map((t) => applyMap(t, map)),
    })),
    certifications: data.certifications.map((c) => ({
      ...c,
      name: applyMap(c.name, map),
      issuer: applyMap(c.issuer, map),
      credentialId: c.credentialId ? applyMap(c.credentialId, map) : undefined,
    })),
    education: data.education.map((edu) => ({
      ...edu,
      university: applyMap(edu.university, map),
      degree: applyMap(edu.degree, map),
      major: edu.major ? applyMap(edu.major, map) : undefined,
      gpa: edu.gpa ? applyMap(edu.gpa, map) : undefined,
    })),
    openSource: data.openSource
      ? {
          ...data.openSource,
          repositories: data.openSource.repositories?.map((r) => ({
            ...r,
            name: applyMap(r.name, map),
            description: r.description ? applyMap(r.description, map) : undefined,
          })),
          highlights: data.openSource.highlights?.map((h) => applyMap(h, map)),
        }
      : undefined,
    languages: data.languages.map((lang) => ({
      name: applyMap(lang.name, map),
      level: applyMap(lang.level, map),
    })),
  };
}
