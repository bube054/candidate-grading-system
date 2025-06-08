import { NextResponse } from "next/server";
import { CandidateResult } from "@/utils/types";
import { createResultPdf, createResultsZip } from "@/utils/download";

export async function POST(req: Request) {
  try {
    const origin = req.headers.get("origin")!;

    const results: CandidateResult[] = await req.json();

    const url = `${origin}/assets/result_template.pdf`;
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    // console.log({ results: res });
    const files = await Promise.all(
      results.map((result) => createResultPdf(existingPdfBytes, result, origin))
    );
    const names = results.map(
      (result) => `${result.serviceNumber}_${result.name}.pdf`
    );
    const zipContent = await createResultsZip(files, names);

    return new Response(zipContent, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
