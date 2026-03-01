/**
 * Detect if text contains Urdu/Arabic script (U+0600–U+06FF).
 * Such text is auto-translated to English via the translate API.
 */
export function needsTranslation(text) {
  if (!text || typeof text !== "string") return false;
  return /[\u0600-\u06FF]/.test(text.trim());
}
