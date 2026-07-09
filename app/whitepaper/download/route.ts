import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { WHITEPAPER_PDF_FILENAME } from "@/lib/whitepaper-pdf";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "whitepaper", WHITEPAPER_PDF_FILENAME);

  try {
    const buffer = await readFile(filePath);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${WHITEPAPER_PDF_FILENAME}"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    return NextResponse.json({ error: "Whitepaper PDF not found" }, { status: 404 });
  }
}
