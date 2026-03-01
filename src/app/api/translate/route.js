/**
 * Translate Urdu/Arabic → English. Uses server-side cache first; on miss calls MyMemory and persists when fs is writable.
 */
import { translateIfMissing } from "@/lib/translate-server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("text");

  if (!raw || typeof raw !== "string") {
    return Response.json({ error: "Missing text" }, { status: 400 });
  }

  try {
    const translated = await translateIfMissing(raw.trim());
    return Response.json({ translated });
  } catch (e) {
    console.error("[translate]", e);
    return Response.json({ translated: raw.trim() }, { status: 200 });
  }
}
