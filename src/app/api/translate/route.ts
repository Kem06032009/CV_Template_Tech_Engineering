import { defaultResume } from "@/resume";
import { translateResumeData } from "@/lib/translate-cv";
import type { Resume } from "@/lib/schema/resume";
import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    let body: Resume = JSON.parse(JSON.stringify(defaultResume)) as Resume;
    const contentType = request.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const parsed = await request.json();
      if (parsed && typeof parsed === "object") body = parsed as Resume;
    }

    const translated = await translateResumeData(body);
    return NextResponse.json({ data: translated });
  } catch (e) {
    console.error("[translate]", e);
    return NextResponse.json(
      { error: "Không thể dịch nội dung. Vui lòng thử lại sau." },
      { status: 500 },
    );
  }
}
