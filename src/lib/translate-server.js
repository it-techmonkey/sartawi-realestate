/**
 * Server-only: translate Urdu/Arabic → English once, with persistent cache.
 * Cache is read from data/translation-cache.json (populated by backfill script).
 * On cache miss we call MyMemory and return; write to cache only when fs is writable (e.g. local dev).
 */

import path from "path";
import { readFile, writeFile, mkdir } from "fs/promises";
import { isArabicScript } from "./i18n";

const CACHE_FILENAME = "translation-cache.json";
const MYMEMORY_URL = "https://api.mymemory.translated.net/get";
const MAX_CHARS = 450;
const LANGPAIR = "ar|en"; // Arabic/Urdu to English

function hash(text) {
  let h = 0;
  const s = String(text);
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h = (h << 5) - h + c;
    h |= 0;
  }
  return "t_" + Math.abs(h).toString(36);
}

function getCachePath() {
  if (typeof process === "undefined" || !process.cwd) return null;
  return path.join(process.cwd(), "data", CACHE_FILENAME);
}

async function readCache() {
  const cachePath = getCachePath();
  if (!cachePath) return {};
  try {
    const raw = await readFile(cachePath, "utf8");
    const data = JSON.parse(raw);
    return typeof data === "object" && data !== null ? data : {};
  } catch {
    return {};
  }
}

async function writeCache(data) {
  const cachePath = getCachePath();
  if (!cachePath) return;
  try {
    await mkdir(path.dirname(cachePath), { recursive: true });
    await writeFile(cachePath, JSON.stringify(data, null, 2), "utf8");
  } catch {
    // Serverless: read-only fs, ignore
  }
}

async function callMyMemory(text) {
  const truncated = text.length > MAX_CHARS ? text.slice(0, MAX_CHARS) : text;
  const url = `${MYMEMORY_URL}?q=${encodeURIComponent(truncated)}&langpair=${encodeURIComponent(LANGPAIR)}`;
  const res = await fetch(url);
  const data = await res.json();
  const translated = data?.responseData?.translatedText;
  return typeof translated === "string" ? translated : text;
}

/**
 * Translate Arabic/Urdu text to English if needed. Uses cache first; on miss calls API and optionally persists.
 * API keys stay server-side (MyMemory is key-free; swap for Google/DeepL via env if needed).
 */
export async function translateIfMissing(text) {
  if (!text || typeof text !== "string") return "";
  const trimmed = text.trim();
  if (!trimmed) return "";
  if (!isArabicScript(trimmed)) return trimmed;

  const key = hash(trimmed);
  const cache = await readCache();
  if (cache[key] != null) return cache[key];

  let translated;
  try {
    translated = await callMyMemory(trimmed);
  } catch {
    return trimmed; // fallback to original on API failure
  }
  try {
    cache[key] = translated;
    await writeCache(cache);
  } catch {
    // ignore write errors (e.g. serverless)
  }
  return translated;
}
