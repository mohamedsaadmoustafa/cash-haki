import React from "react";
import { Select } from "antd";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

export default function ExpenseFilter({ filter, setFilter, categories, setPage }) {
    const { t, language } = useLanguage();
    const { darkMode } = useTheme();

    return (
        <div
            className={`flex ${language === "ar" ? "justify-end" : "justify-start"}`}
        >
            <Select
                value={filter}
                onChange={(val) => {
                    setFilter(val);
                    setPage(1);
                }}
                className={`min-w-[200px] ${darkMode ? "bg-gray-700 text-white" : ""}`}
                popupMatchSelectWidth={false}
                options={[
                    { label: t("all"), value: "all" },
                    ...categories.map((cat) => ({ label: cat, value: cat })),
                ]}
                placeholder={t("filterByCategory")}
            />
        </div>
    );
}
