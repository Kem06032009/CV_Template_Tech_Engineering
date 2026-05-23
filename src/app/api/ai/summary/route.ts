import { NextRequest, NextResponse } from "next/server";
import { generateProfessionalSummary } from "@/lib/ai/summary-generator";
import type { Resume } from "@/lib/schema/resume";

export async function POST(request: NextRequest) {
  try {
    const resume = (await request.json()) as Resume;
    const summary = generateProfessionalSummary(resume);
    return NextResponse.json({ summary });
  } catch {
    return NextResponse.json({ error: "Invalid resume payload" }, { status: 400 });
  }
}
