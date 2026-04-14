"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

type Language = "en" | "yo";

/* =========================
   TRANSLATIONS
========================= */
const translations = {
  en: {
    nav: {
      home: "Home",
      dashboard: "Dashboard",
      login: "Login",
      signIn: "Sign In",
      settings: "Settings",
    },

    hero: {
      badge: "The spark that powers language & culture",
      title: "Learn Your Heritage Language",
      subtitle: "Through AI-powered cultural immersion",
      ctaPrimary: "Start 60-Second Spark",
      ctaSecondary: "Watch Demo",
    },

    auth: {
      welcomeBack: "Welcome Back",
      createAccount: "Create Account",
      email: "Email",
      password: "Password",
    },

    dashboard: {
      welcome: "Welcome Back",
      streak: "Streak",
      xp: "XP",
      level: "Level",
    },

    comparison: {
      title: "Why Zabbot?",
      subtitle:
        "Standard tools ignore tonal accuracy and cultural context. We built the solution.",
      genericApps: "Generic Apps",

      generic: {
        1: "Robotic audio with zero tonal nuance.",
        2: "Western-centric phrases, no cultural depth.",
        3: "Repetitive drills without storytelling.",
        4: "Disconnected from native communities.",
      },

      zabbotApproach: "The Zabbot Approach",

      zabbot: {
        1: "AI-detected tonal accuracy.",
        2: "Heritage idioms and cultural modules.",
        3: "Mastery Paths built on authentic stories.",
        4: "Global community of native speakers.",
      },

      footer: "Zabbot blends AI and heritage to help you belong.",
    },

    pricing: {
      title: "Choose your path",
      subtitle: "Start with a 7-day free trial. Unlock your heritage today.",
      badgeBestValue: "Best Value",
      ctaPrefix: "Get",
      ctaSuffix: "Access",
      loading: "Initializing...",
      footer: "Secure checkout • Instant Activation",

      plans: {
        explorer: {
          name: "Explorer",
          features: "7-Day Free Trial|AI Feedback|Unlimited Lessons",
        },
        fluentist: {
          name: "Fluentist",
          features: "Everything in Explorer|Offline Mode|Priority AI Support",
        },
        legacy: {
          name: "Legacy",
          features: "Lifetime Access|All Future Content|Exclusive Founder Badge",
        },
      },
    },

    team: {
      header: "The Team",
      title: "Meet the Builders",
    },

    footer: {
      stayConnected: "Stay Connected.",
      stayCultural: "Stay Cultural.",
      emailPlaceholder: "Enter your email",
      subtitle: "Learnings, riddles, cultural stories, prizes and updates.",
      trust: "No spam. Just culture.",

      about: "About",
      contact: "Contact",
      privacy: "Privacy",
      terms: "Terms",

      legal: "Designed for the global diaspora",
    },

    /* =========================
       FEATURES (NEW)
    ========================= */
    features: {
      experience: "Experience",
      title: "Learn visually. Speak naturally.",
      open: "Open",
      tags: {
        chat: "Chat",
        speak: "Speak",
        stories: "Stories",
        connect: "Connect",
      },
    },

    /* =========================
       DASHBOARD PEAK (NEW)
    ========================= */
    dashboardPeek: {
      inside: "Inside the App",
      title: "Your Daily Sparks",
      lockTitle: "Unlock Your Dashboard",
      lockSubtitle: "Access Sparks, streaks, and AI coaching.",
      cta: "Start Free Trial",

      streakValue: "12 Day Streak",
      xpValue: "1,240 XP",

      sparkLabel: "Today’s Spark",
      sparkTitle: "Greet like a native speaker",
      sparkSubtitle: "Practice tone and delivery in real conversation.",

      pronunciation: "Pronunciation Check",
      aiFeedback: "AI tonal feedback ready",
      start: "Start",

      modules: {
        market: "Market",
        family: "Family",
        travel: "Travel",
      },
    },
  },

  yo: {
    nav: {
      home: "Ile",
      dashboard: "Dasibodu",
      login: "Wọle",
      signIn: "Wọle",
      settings: "Eto",
    },

    hero: {
      badge: "Ìtanràn tí ń jí ede àti àṣà dide",
      title: "Kọ Ede Ìbílẹ Rẹ",
      subtitle: "Lilo AI fun ìrìnkèrindò asa",
      ctaPrimary: "Bẹrẹ 60 Iṣẹju Spark",
      ctaSecondary: "Wo Demo",
    },

    auth: {
      welcomeBack: "Kaabọ Pada",
      createAccount: "Ṣẹda Akanti",
      email: "Imeeli",
      password: "Ọrọ aṣínà",
    },

    dashboard: {
      welcome: "Kaabọ Pada",
      streak: "Ọjọ Itẹlera",
      xp: "XP",
      level: "Ipele",
    },

    comparison: {
      title: "Kí nìdí Zabbot?",
      subtitle:
        "Awọn irinṣẹ lasan ko ka tonality ati asa. A kọ ojutu to dara.",
      genericApps: "Awọn App Lasan",

      generic: {
        1: "Ohùn roboti laisi tonality to peye.",
        2: "Awọn gbolohun iwọ-oorun nikan, ko si asa.",
        3: "Awọn adaṣe atunwi laisi itan.",
        4: "Ko sopọ mọ agbegbe abinibi.",
      },

      zabbotApproach: "Ọna Zabbot",

      zabbot: {
        1: "AI n ṣayẹwo tonality to peye.",
        2: "Ìtàn ati asa inu ede abinibi.",
        3: "Awọn ọna ikẹkọ lori itan gidi.",
        4: "Agbegbe agbaye ti awọn agbọrọsọ abinibi.",
      },

      footer: "Zabbot n darapọ AI ati asa lati jẹ ki o ni ìdánimọ.",
    },

    pricing: {
      title: "Yan ọna rẹ",
      subtitle: "Bẹrẹ pẹlu idanwo ọjọ 7 ọfẹ. Ṣí ilẹ̀-ìbílẹ rẹ lónìí.",
      badgeBestValue: "Iye to dara jù",
      ctaPrefix: "Gba",
      ctaSuffix: "Iwọle",
      loading: "N ṣeto...",
      footer: "Isanwo to ni aabo • Ṣí lẹsẹkẹsẹ",

      plans: {
        explorer: {
          name: "Explorer",
          features: "Idanwo ọjọ 7 ọfẹ|Idahun AI|Awọn ẹkọ ailopin",
        },
        fluentist: {
          name: "Fluentist",
          features: "Gbogbo Explorer|Ipo Offline|Iranlọwọ AI pataki",
        },
        legacy: {
          name: "Legacy",
          features:
            "Iwọle igbesi aye|Gbogbo akoonu ọjọ iwaju|Baaji oludasile pataki",
        },
      },
    },

    team: {
      header: "Ẹgbẹ",
      title: "Pàdé Àwọn Olùkọ́lé",
    },

    footer: {
      stayConnected: "Duro Sopọ.",
      stayCultural: "Duro Pẹlu Asa.",
      emailPlaceholder: "Tẹ imeeli rẹ sii",
      subtitle: "Ẹkọ, àlọ́, ìtàn asa, ẹ̀bùn àti imudojuiwọn.",
      trust: "Kò sí spam. Asa nikan.",

      about: "Nipa wa",
      contact: "Kan si wa",
      privacy: "Asiri",
      terms: "Àwọn ofin",

      legal: "Ti ṣe apẹrẹ fun gbogbo àwọn ará káàkiri ayé",
    },

    /* =========================
       FEATURES (NEW)
    ========================= */
    features: {
      experience: "Iriri",
      title: "Kọ́ ní ojú. Sọ ní ti ara.",
      open: "Ṣí",
      tags: {
        chat: "Ìbánisọ̀rọ̀",
        speak: "Sọ̀rọ̀",
        stories: "Ìtàn",
        connect: "Sopọ̀",
      },
    },

    /* =========================
       DASHBOARD PEAK (NEW)
    ========================= */
    dashboardPeek: {
      inside: "Inu App",
      title: "Awọn Sparks Ojoojumọ Rẹ",
      lockTitle: "Ṣii Dashboard Rẹ",
      lockSubtitle: "Wọle si Sparks, streaks, ati AI coaching.",
      cta: "Bẹrẹ Trial Ọfẹ",

      streakValue: "Ọjọ Itẹlera 12",
      xpValue: "XP 1,240",

      sparkLabel: "Spark Oni",
      sparkTitle: "Ki eniyan bi agbọrọsọ abinibi",
      sparkSubtitle: "Ṣe adaṣe tonality ati bi o ṣe n sọ ọrọ.",

      pronunciation: "Ṣayẹwo Pronunciation",
      aiFeedback: "AI n ṣayẹwo tonality rẹ",
      start: "Bẹrẹ",

      modules: {
        market: "Oja",
        family: "Idile",
        travel: "Irin-ajo",
      },
    },
  },
} as const;

/* =========================
   TYPE HELPERS
========================= */
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never;

type Paths<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends object
        ? K | Join<K, Paths<T[K]>>
        : K;
    }[keyof T & (string | number)]
  : never;

type TranslationKeys = Paths<typeof translations["en"]>;

/* =========================
   CONTEXT
========================= */
type LangContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
  isHydrated: boolean;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

/* =========================
   PROVIDER
========================= */
export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("zabbot-language") as Language;
      if (saved === "en" || saved === "yo") setLanguageState(saved);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("zabbot-language", lang);
    } catch {}
  }, []);

  const resolveKey = (obj: any, key: string) =>
    key.split(".").reduce((acc, part) => acc?.[part], obj);

  const t = useCallback(
    (key: TranslationKeys) => {
      const value = resolveKey(translations[language], key);
      if (value) return value;
      return resolveKey(translations.en, key) ?? key;
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      isHydrated,
    }),
    [language, setLanguage, t, isHydrated]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

/* =========================
   HOOK
========================= */
export function useLanguage() {
  const ctx = useContext(LangContext);

  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return ctx;
}