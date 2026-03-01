"use client";

import { createContext, useContext } from "react";
import { LANG_EN } from "@/lib/i18n";

const LanguageContext = createContext({
  language: LANG_EN,
  isRtl: false,
});

export function LanguageProvider({ children }) {
  const value = {
    language: LANG_EN,
    isRtl: false,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
