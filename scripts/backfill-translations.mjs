#!/usr/bin/env node
/**
 * Backfill translation cache for Urdu/Arabic text in all_data.json and project-descriptions.json.
 * Run from project root: node scripts/backfill-translations.mjs
 * Writes data/translation-cache.json. Safe to re-run; skips already-cached text.
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const CACHE_PATH = join(root, "data", "translation-cache.json");
const ALL_DATA_PATH = join(root, "public", "data", "all_data.json");
const DESCRIPTIONS_PATH = join(root, "public", "data", "project-descriptions.json");
const MYMEMORY = "https://api.mymemory.translated.net/get";
const LANGPAIR = "ar|en";
const MAX_CHARS = 450;

const ARABIC_SCRIPT = /[\u0600-\u06FF]/;
function isArabicScript(text) {
  if (!text || typeof text !== "string") return false;
  return ARABIC_SCRIPT.test(text.trim());
}

function hash(text) {
  let h = 0;
  const s = String(text);
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return "t_" + Math.abs(h).toString(36);
}

async function translate(text) {
  const truncated = text.length > MAX_CHARS ? text.slice(0, MAX_CHARS) : text;
  const url = `${MYMEMORY}?q=${encodeURIComponent(truncated)}&langpair=${encodeURIComponent(LANGPAIR)}`;
  const res = await fetch(url);
  const data = await res.json();
  const translated = data?.responseData?.translatedText;
  return typeof translated === "string" ? translated : text;
}

function collectStrings(obj, out) {
  if (!obj) return;
  if (typeof obj === "string") {
    const t = obj.trim();
    if (t && isArabicScript(t)) out.add(t);
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item) => collectStrings(item, out));
    return;
  }
  if (typeof obj === "object") {
    for (const v of Object.values(obj)) collectStrings(v, out);
  }
}

async function main() {
  let cache = {};
  try {
    const raw = await readFile(CACHE_PATH, "utf8");
    cache = JSON.parse(raw);
  } catch {
    // no cache yet
  }

  const texts = new Set();
  try {
    const allData = JSON.parse(await readFile(ALL_DATA_PATH, "utf8"));
    collectStrings(allData, texts);
  } catch (e) {
    console.warn("Could not read all_data.json:", e.message);
  }
  try {
    const desc = JSON.parse(await readFile(DESCRIPTIONS_PATH, "utf8"));
    collectStrings(desc, texts);
  } catch {
    // optional
  }

  const toFetch = [];
  for (const t of texts) {
    const key = hash(t);
    if (cache[key] == null) toFetch.push(t);
  }

  if (toFetch.length === 0) {
    console.log("No new texts to translate. Cache is up to date.");
    return;
  }

  console.log(`Translating ${toFetch.length} unique text(s)...`);
  for (let i = 0; i < toFetch.length; i++) {
    const text = toFetch[i];
    const key = hash(text);
    try {
      cache[key] = await translate(text);
      if ((i + 1) % 10 === 0) console.log(`  ${i + 1}/${toFetch.length}`);
    } catch (e) {
      console.warn(`  Skip "${text.slice(0, 40)}...":`, e.message);
      cache[key] = text; // fallback to original
    }
  }

  await mkdir(dirname(CACHE_PATH), { recursive: true });
  await writeFile(CACHE_PATH, JSON.stringify(cache, null, 2), "utf8");
  console.log(`Wrote ${Object.keys(cache).length} entries to data/translation-cache.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
