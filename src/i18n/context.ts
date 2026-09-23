import { createContext, useContext } from "react";
export type Language = "en" | "he";
export interface I18nValue {
  language: Language;
  setLanguage: (language: Language) => void;
  tr: (text: string) => string;
}
export const I18nContext = createContext<I18nValue | null>(null);
export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("I18nProvider is required");
  return context;
}
