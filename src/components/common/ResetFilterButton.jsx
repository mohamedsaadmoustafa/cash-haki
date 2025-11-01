import React from "react";
import { Button } from "antd";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

export default function ResetFilterButton({ onReset, className = "" }) {
    const { t } = useLanguage();
    const { darkMode } = useTheme();

    return (
        <Button
            size="small"
            onClick={onReset}
            className={`${darkMode ? "bg-gray-600 text-white" : ""} ${className}`}
        >
            {t("resetFilter")}
        </Button>
    );
}
