"use client";

import { getMultilingualText, normalizeMultilingual, isArabicScript, LANG_EN } from "@/lib/i18n";
import { useTranslatedText } from "@/hooks/useTranslatedText";

/**
 * Returns [displayText, loading] for a value that may be a string (legacy) or { ur, en }.
 * When language is "en" and value is plain string with Arabic/Urdu script, fetches translation once (cache-backed).
 */
export function useDisplayText(value, lang) {
  const normalized = normalizeMultilingual(value);
  const stringSource = typeof normalized === "string" ? normalized : "";
  const [translated, loading] = useTranslatedText(stringSource);

  if (normalized != null && typeof normalized === "object") {
    return [getMultilingualText(normalized, lang), false];
  }
  if (lang !== LANG_EN) {
    return [stringSource, false];
  }
  if (!isArabicScript(stringSource)) {
    return [stringSource, false];
  }
  const display = translated !== null ? translated : stringSource;
  return [display, loading];
}
