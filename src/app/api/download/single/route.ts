import { NextResponse } from "next/server";
import { CandidateResult } from "@/utils/types";
import { createResultPdf } from "@/utils/download";

export async function POST(req: Request) {
  try {
    const origin = req.headers.get("origin")!;

    const result: CandidateResult = await req.json();

    const url = `${origin}/assets/result_template.pdf`;
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const file = await createResultPdf(existingPdfBytes, result, origin);

    return new Response(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
