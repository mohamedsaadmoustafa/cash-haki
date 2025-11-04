import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import ar from "../locales/ar";
import en from "../locales/en";

const LanguageContext = createContext();

const translations = { ar, en };

export function LanguageProvider({ children }) {
    // Remember last selected language
    const [language, setLanguage] = useState(() => localStorage.getItem("language") || "en");

    useEffect(() => {
        localStorage.setItem("language", language);
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    }, [language]);

    // Toggle between Arabic / English
    const toggleLanguage = () => setLanguage((prev) => (prev === "ar" ? "en" : "ar"));

    // Translation helper
    const t = useMemo(
        () => (key) => {
            const dict = translations[language] || translations.en;
            return dict[key] ?? translations.en[key] ?? key;
        },
        [language]
    );

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
