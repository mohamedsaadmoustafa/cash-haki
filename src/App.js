import React from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import arEG from "antd/locale/ar_EG";
import enUS from "antd/locale/en_US";
import VoiceExpenseDashboard from "./pages/VoiceExpenseDashboard";
import '@ant-design/v5-patch-for-react-19';
import "antd/dist/reset.css";
import "./index.css";

import { ExpenseProvider } from "./context/ExpenseContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

// Internal wrapper so we can use both contexts together
function AppContent() {
    const { language } = useLanguage();
    const { theme } = useTheme();

    // Determine if it's Arabic (RTL)
    const isArabic = language === "ar";

    // Configure Ant Design direction and theme
    return (
        <ConfigProvider
            direction={isArabic ? "rtl" : "ltr"}
            locale={isArabic ? arEG : enUS}
            theme={{
                algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                token: {
                    fontFamily: isArabic ? "Tajawal, sans-serif" : "Inter, sans-serif",
                },
            }}
        >
            <div
                className={`${isArabic ? "rtl text-right" : "ltr text-left"} ${
                    theme === "dark" ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
                } min-h-screen transition-all`}
            >
                <VoiceExpenseDashboard />
            </div>
        </ConfigProvider>
    );
}

export default function App() {
    return (
        <React.StrictMode>
            <ThemeProvider>
                <LanguageProvider>
                    <ExpenseProvider>
                        <AppContent />
                    </ExpenseProvider>
                </LanguageProvider>
            </ThemeProvider>
        </React.StrictMode>
    );
}
