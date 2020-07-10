import { createContext, useState, useRef, useEffect } from 'react';
import rosetta from 'rosetta';
// import rosetta from 'rosetta/debug';

const i18n = rosetta();

export const defaultLanguage = 'en';
export const languages = ['de', 'en'];
export const contentLanguageMap = { de: 'de-DE', en: 'en-US' };

export const I18nContext = createContext<{
  activeLocale: string;
  t<X extends Record<string, any> | any[]>(key: string | (string | number)[], params?: X, lang?: string): string;
  locale(l, dict): void;
}>(undefined);

// default language
i18n.locale(defaultLanguage);

export const I18n: React.FC<{ locale: string; lngDict: Record<string, string> }> = ({ children, locale, lngDict }) => {
  const [activeDict, setActiveDict] = useState(() => lngDict);
  const activeLocaleRef = useRef(locale || defaultLanguage);
  const [, setTick] = useState(0);
  const firstRender = useRef(true);

  // for initial SSR render
  if (locale && firstRender.current === true) {
    firstRender.current = false;
    i18n.locale(locale);
    i18n.set(locale, activeDict);
  }

  useEffect(() => {
    if (locale) {
      i18n.locale(locale);
      i18n.set(locale, activeDict);
      activeLocaleRef.current = locale;
      // force rerender
      setTick((tick) => tick + 1);
    }
  }, [locale, activeDict]);

  const i18nWrapper = {
    activeLocale: activeLocaleRef.current,
    t: (key, ...args) => i18n.t(key, ...args),
    locale: (l, dict) => {
      i18n.locale(l);
      activeLocaleRef.current = l;
      if (dict) {
        i18n.set(l, dict);
        setActiveDict(dict);
      } else {
        setTick((tick) => tick + 1);
      }
    },
  };

  return <I18nContext.Provider value={i18nWrapper}>{children}</I18nContext.Provider>;
};
export default I18n;
