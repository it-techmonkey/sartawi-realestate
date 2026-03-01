"use client";

import { useState, useEffect, useCallback } from "react";
import { needsTranslation } from "@/lib/translate";

/**
 * Returns [translatedText, isLoading].
 * Only calls the translate API when text contains Urdu/Arabic script.
 * Otherwise returns the original text immediately with loading false.
 */
export function useTranslatedText(text, langpair = "ur|en") {
  const [translated, setTranslated] = useState(null);
  const [loading, setLoading] = useState(false);

  const stableText = text ?? "";

  useEffect(() => {
    if (!stableText.trim()) {
      setTranslated("");
      setLoading(false);
      return;
    }
    if (!needsTranslation(stableText)) {
      setTranslated(stableText);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setTranslated(null);

    const q = new URLSearchParams({ text: stableText, langpair });
    fetch(`/api/translate?${q.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data?.translated != null) setTranslated(data.translated);
      })
      .catch(() => {
        if (!cancelled) setTranslated(stableText);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [stableText, langpair]);

  const display = translated !== null ? translated : stableText;
  return [display, loading];
}
