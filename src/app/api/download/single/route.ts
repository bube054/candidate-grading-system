import { NextResponse } from "next/server";
import { CandidateResult } from "@/utils/types";
import { createResultPdf } from "@/utils/download";

export async function POST(req: Request) {
  try {
    const origin = req.headers.get("origin")!;

    const result: CandidateResult = await req.json();

    const file = await createResultPdf(result, origin);

    return new Response(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment`,
      },
    })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
