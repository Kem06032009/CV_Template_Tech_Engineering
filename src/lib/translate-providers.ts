/**
 * Dịch VI → EN qua MyMemory (không dùng Google / Lingva).
 * Tùy chọn: MYMEMORY_EMAIL trong .env.local
 */

const FETCH_TIMEOUT_MS = 12_000;

function normalizeTranslation(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function fetchWithTimeout(url: string, init?: RequestInit) {
  return fetch(url, { ...init, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
}

function assertNotGoogleUrl(url: string): void {
  const host = new URL(url).hostname.toLowerCase();
  if (
    host === "google.com" ||
    host.endsWith(".google.com") ||
    host.endsWith(".googleapis.com") ||
    host.endsWith(".gstatic.com") ||
    host.includes("googleusercontent")
  ) {
    throw new Error("Google services are blocked");
  }
}

async function translateViaMyMemory(text: string): Promise<string> {
  const chunk = text.trim().slice(0, 450);
  const url = new URL("https://api.mymemory.translated.net/get");
  url.searchParams.set("q", chunk);
  url.searchParams.set("langpair", "vi|en");
  const email = process.env.MYMEMORY_EMAIL?.trim();
  if (email) url.searchParams.set("de", email);

  assertNotGoogleUrl(url.toString());

  const res = await fetchWithTimeout(url.toString());
  if (!res.ok) throw new Error(`MyMemory HTTP ${res.status}`);

  const json = (await res.json()) as {
    responseData?: { translatedText?: string };
    responseStatus?: number;
    responseDetails?: string;
  };
  if (json.responseStatus && json.responseStatus !== 200) {
    throw new Error(json.responseDetails || "MyMemory error");
  }
  const translated = json.responseData?.translatedText?.trim();
  if (!translated) throw new Error("MyMemory empty response");
  return normalizeTranslation(translated);
}

const cache = new Map<string, string>();

export async function translateTextFree(text: string): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return text;
  const hit = cache.get(trimmed);
  if (hit) return hit;
  const translated = await translateViaMyMemory(trimmed);
  cache.set(trimmed, translated);
  return translated;
}
