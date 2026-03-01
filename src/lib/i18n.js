/**
 * Multilingual (Urdu / English) helpers.
 * Supports both legacy string fields and { ur, en } objects.
 */

const ARABIC_SCRIPT = /[\u0600-\u06FF]/;

export const LANG_EN = "en";
export const LANG_UR = "ur";

/** Whether the locale uses RTL (e.g. Urdu). */
export function isRtl(lang) {
  return lang === LANG_UR;
}

/** True if text contains Arabic/Urdu script. */
export function isArabicScript(text) {
  if (!text || typeof text !== "string") return false;
  return ARABIC_SCRIPT.test(text.trim());
}

/**
 * Normalize a field that may be a string (legacy) or { ur, en }.
 * Returns the value as-is for object, or as string for legacy.
 */
export function normalizeMultilingual(value) {
  if (value == null) return null;
  if (typeof value === "object" && ("ur" in value || "en" in value))
    return value;
  if (typeof value === "string") return value;
  return null;
}

/**
 * Get display text for a given language.
 * - value: string (legacy) or { ur?: string, en?: string }
 * - lang: "en" | "ur"
 * Returns the best available string for that language; does not translate.
 */
export function getMultilingualText(value, lang) {
  const n = normalizeMultilingual(value);
  if (n == null) return "";
  if (typeof n === "string") return n;
  const text = n[lang] ?? n.en ?? n.ur ?? "";
  return typeof text === "string" ? text : "";
}
