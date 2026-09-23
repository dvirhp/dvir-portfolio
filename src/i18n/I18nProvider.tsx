import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { I18nContext } from "./context";
import type { Language } from "./context";
import { he } from "./he";
import { en } from "./en";
export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem("portfolio-language") === "he" ? "he" : "en";
    } catch {
      return "en";
    }
  });
  const tr = useCallback(
    (text: string) =>
      language === "he" ? (he[text] ?? text) : (en[text] ?? text),
    [language],
  );
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    try {
      localStorage.setItem("portfolio-language", language);
    } catch {
      /* Language remains available without storage. */
    }
  }, [language]);
  return (
    <I18nContext.Provider value={{ language, setLanguage, tr }}>
      {children}
    </I18nContext.Provider>
  );
}
