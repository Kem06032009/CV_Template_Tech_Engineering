# Tech Engineering CV Template

Production-ready, modern CV templates for software engineering, DevOps, cloud, AI/ML, and security roles. Built with **Next.js 15**, **TypeScript**, **Tailwind CSS 4**, and **Framer Motion**.

## Features

- **3 layouts**: Two-column modern, single-column ATS, compact senior engineer
- **Dark / light mode** with graphite palette and electric blue accents
- **8 resume sections**: Summary, skills (grouped + proficiency), experience, projects, certifications, education, open source, languages
- **Live editor** with drag-and-drop section reorder
- **Export**: PDF (html2canvas + jsPDF), DOCX, JSON schema, print (A4)
- **GitHub API sync** for open-source stats (optional `GITHUB_TOKEN` for higher rate limits)
- **AI summary** (rule-based generator; swap for OpenAI in `src/lib/ai/`)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — landing page  
Open [http://localhost:3000/editor](http://localhost:3000/editor) — live CV editor

## Project structure

```
src/
├── app/                 # Pages & API routes
├── components/cv/       # Layouts, sections, renderer
├── components/editor/   # Editor panels
├── lib/schema/          # Zod resume schema
├── lib/export/          # PDF & DOCX engines
├── lib/sample-data.ts   # Demo resume
└── store/               # Zustand + localStorage
public/schema/resume.schema.json
```

## Resume JSON schema

Edit data via the editor JSON panel or replace `src/lib/sample-data.ts`. Schema version: `1.0`.

```json
{
  "version": "1.0",
  "meta": { "layout": "two-column-modern" },
  "personal": { "fullName": "...", "title": "...", "contact": { "email": "..." } },
  "summary": "...",
  "sectionOrder": ["summary", "skills", "experience", ...],
  "skills": [{ "id": "languages", "label": "Programming Languages", "skills": [...] }],
  "experience": [...],
  "projects": [...]
}
```

## Layouts

| Layout | Use case |
|--------|----------|
| `two-column-modern` | Portfolio-style; sidebar for skills & contact |
| `single-column-ats` | Applicant tracking systems; linear semantic HTML |
| `compact-senior` | Dense 2-zone layout for 10+ years experience |

## Export

| Format | Method |
|--------|--------|
| PDF | Client-side capture of `#cv-preview` |
| DOCX | `docx` package structured document |
| JSON | Full resume schema download |
| Print | Browser print with `@media print` A4 rules |

## Environment variables

```env
# Optional — increases GitHub API rate limit
GITHUB_TOKEN=ghp_...
```

## Customization

- **Colors**: `src/app/globals.css` CSS variables (`--cv-*`)
- **Fonts**: Inter + JetBrains Mono in `src/app/layout.tsx`
- **Sample data**: `src/lib/sample-data.ts`
- **New sections**: extend `src/lib/schema/resume.ts` and `SectionRenderer`

## Tech stack

- Next.js 15 · React 19 · TypeScript
- Tailwind CSS 4 · Framer Motion · next-themes
- Zustand · Zod · @dnd-kit
- html2canvas · jsPDF · docx · qrcode.react

## License

MIT — see [LICENSE](LICENSE).
