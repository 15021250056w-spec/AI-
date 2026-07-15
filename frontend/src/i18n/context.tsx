import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';
import { zh, en, ENUM_EN } from './dict.js';

/* ================================================================
 * 类型
 * ================================================================ */

type Lang = 'zh' | 'en';
type Dict = typeof zh;
type EnumCategory = keyof typeof ENUM_EN;

interface LangContextValue {
  lang: Lang;
  dict: Dict;
  /** 翻译受控枚举值 */
  tEnum: (category: EnumCategory, value: string) => string;
  setLang: (lang: Lang) => void;
}

/* ================================================================
 * Context
 * ================================================================ */

const LangContext = createContext<LangContextValue | null>(null);

const LS_KEY = 'beyondesoft_tool_lang';

function loadLang(): Lang {
  try {
    const stored = localStorage.getItem(LS_KEY);
    if (stored === 'en' || stored === 'zh') return stored;
  } catch { /* localStorage 不可用 */ }
  return 'zh';
}

function saveLang(lang: Lang) {
  try { localStorage.setItem(LS_KEY, lang); } catch { /* 忽略 */ }
}

/* ================================================================
 * Provider
 * ================================================================ */

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(loadLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    saveLang(next);
  }, []);

  const dict = useMemo(() => (lang === 'zh' ? zh : en) as Dict, [lang]);

  const tEnum = useCallback((category: EnumCategory, value: string): string => {
    if (lang === 'zh') return value;
    const map = ENUM_EN[category] as Record<string, string> | undefined;
    return map?.[value] ?? value;
  }, [lang]);

  const value = useMemo<LangContextValue>(() => ({
    lang, dict, tEnum, setLang,
  }), [lang, dict, tEnum, setLang]);

  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  );
}

/* ================================================================
 * Hook
 * ================================================================ */

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within <LangProvider>');
  return ctx;
}
