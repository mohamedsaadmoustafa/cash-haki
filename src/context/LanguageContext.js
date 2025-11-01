import React, { createContext, useContext, useState } from "react";
import ar from "../locales/ar";
import en from "../locales/en";

const LanguageContext = createContext();

const translations = { ar, en };

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState("ar");

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
    };

    const t = (key) => translations[language][key] || key;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            <div dir={language === "ar" ? "rtl" : "ltr"}>{children}</div>
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
