import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language, TranslationKeys } from "@/lib/translations";
import { supabase } from "@/integrations/supabase/client";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "preferred_language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "da") {
        return stored;
      }
    }
    return "da"; // Default to Danish
  });

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    
    // Sync with profile if user is logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Use setTimeout to avoid blocking
      setTimeout(async () => {
        try {
          await supabase
            .from("profiles")
            .update({ preferred_language: lang })
            .eq("id", user.id);
        } catch (error) {
          console.error("Failed to sync language preference:", error);
        }
      }, 0);
    }
  };

  // Load language from profile on mount if user is logged in
  useEffect(() => {
    const loadLanguageFromProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("preferred_language")
          .eq("id", user.id)
          .maybeSingle();
        
        if (profile?.preferred_language && (profile.preferred_language === "da" || profile.preferred_language === "en")) {
          setLanguageState(profile.preferred_language);
          localStorage.setItem(STORAGE_KEY, profile.preferred_language);
        }
      }
    };
    
    loadLanguageFromProfile();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
