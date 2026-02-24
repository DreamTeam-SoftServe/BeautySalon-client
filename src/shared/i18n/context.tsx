import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Locale, Translations } from "./types";
import { en } from "./locales/en";
import { uk } from "./locales/uk";

const locales: Record<Locale, Translations> = { en, uk };

const STORAGE_KEY = "lumiere_locale";

function detectLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && stored in locales) return stored;

  const browser = navigator.language.slice(0, 2) as Locale;
  if (browser in locales) return browser;

  return "en";
}

interface I18nContextValue {
  t: Translations;
  locale: Locale;
  setLocale: (l: Locale) => void;
  availableLocales: Locale[];
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
    document.documentElement.dir = locales[l].dir;
  };

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locales[locale].dir;
  }, []);

  return (
    <I18nContext.Provider
      value={{
        t: locales[locale],
        locale,
        setLocale,
        availableLocales: Object.keys(locales) as Locale[],
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
