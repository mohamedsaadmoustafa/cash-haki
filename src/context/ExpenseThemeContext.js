import React from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "./ThemeContext";

export default function ExpenseThemeProvider({ children }) {
    const { language } = useLanguage();
    const { darkMode } = useTheme();

    const isArabic = language === "ar";

    return (
        <ConfigProvider
            direction={isArabic ? "rtl" : "ltr"}
            theme={{
                algorithm: darkMode
                    ? antdTheme.darkAlgorithm
                    : antdTheme.defaultAlgorithm,
                token: {
                    colorBgContainer: darkMode ? "#1f2937" : "#ffffff",
                    colorTextBase: darkMode ? "#f3f4f6" : "#111827",
                    colorBorder: darkMode ? "#374151" : "#d9d9d9",
                    borderRadius: 10,
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
}
