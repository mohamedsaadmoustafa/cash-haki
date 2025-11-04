import React from "react";
import { Select } from "antd";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

export default function DaysFilter({ value, onChange }) {
    const { t } = useLanguage();
    const { darkMode } = useTheme();

    return (
        <Select
            value={value}
            onChange={onChange}
            size="middle"
            className={`w-32 rounded-md transition-colors duration-300 ${
                darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
            }`}
            styles={{
                popup: {
                    root: {
                        backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                        color: darkMode ? "#f9fafb" : "#111827",
                    },
                },
            }}
            classNames={{
                popup: {
                    root: darkMode ? "dark-select" : "",
                },
            }}
        >
            <Select.Option value="all">{t("allData")}</Select.Option>
            <Select.Option value={1}>{t("lastDay")}</Select.Option>
            <Select.Option value={7}>{t("last7Days")}</Select.Option>
            <Select.Option value={14}>{t("last14Days")}</Select.Option>
            <Select.Option value={30}>{t("last30Days")}</Select.Option>
        </Select>
    );
}
