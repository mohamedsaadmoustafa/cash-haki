import React from "react";
import { Card, Tag, Badge, Progress, ConfigProvider, theme as antdTheme } from "antd";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

export default function ExpenseStatsCard({ listTotal, listByCategory, list }) {
    const { language, t } = useLanguage();
    const { darkMode } = useTheme();
    const isArabic = language === "ar";

    // 🎨 Category color map
    const categoryColors = {
        Food: { light: "green", dark: "lime" },
        Transport: { light: "orange", dark: "gold" },
        Bills: { light: "red", dark: "volcano" },
        Entertainment: { light: "purple", dark: "magenta" },
        Shopping: { light: "blue", dark: "geekblue" },
        Other: { light: "gray", dark: "gray" },
    };

    // 🎨 Fallback colors if category not found
    const defaultColors = ["blue", "green", "orange", "purple", "cyan", "magenta"];

    const getCategoryColor = (cat, index) => {
        const colorSet = categoryColors[cat] || null;
        if (colorSet) return darkMode ? colorSet.dark : colorSet.light;
        return defaultColors[index % defaultColors.length];
    };

    return (
        <ConfigProvider
            direction={isArabic ? "rtl" : "ltr"}
            theme={{
                algorithm: darkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                token: {
                    colorBgContainer: darkMode ? "#1f2937" : "#ffffff", // gray-800 / white
                    colorTextBase: darkMode ? "#f3f4f6" : "#111827",   // gray-100 / gray-900
                    borderRadius: 12,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                },
            }}
        >
            <Card
                className={`transition-colors duration-300 border-none shadow-md rounded-2xl ${
                    darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
                }`}
                styles={{
                    body: { padding: "1.5rem" }
                }}
            >
                {/* Header section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3
                            className={`text-sm font-medium ${
                                darkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                        >
                            {t("total")}
                        </h3>
                        <div className="text-2xl font-bold">
                            {listTotal.toFixed(2)}{" "}
                            <span className="text-base font-normal">{t("currency")}</span>
                        </div>
                    </div>

                    <Badge count={list.length} showZero>
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                                darkMode ? "bg-gray-700" : "bg-gray-100"
                            }`}
                        >
                            💰
                        </div>
                    </Badge>
                </div>

                {/* Category stats section */}
                <div className="mt-6">
                    <h4
                        className={`text-sm font-semibold mb-3 ${
                            darkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                    >
                        {t("byCategory")}
                    </h4>

                    {Object.keys(listByCategory).length === 0 ? (
                        <div
                            className={`text-xs ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                        >
                            {t("noData")}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {Object.entries(listByCategory).map(([cat, val], index) => {
                                const percent = Math.round((val / (listTotal || 1)) * 100);
                                const color = getCategoryColor(cat, index);

                                return (
                                    <div key={cat} className="flex flex-col gap-1">
                                        <div className="flex justify-between text-xs">
                                            <div className="flex items-center gap-2">
                                                <Tag color={color}>{cat}</Tag>
                                                <span
                                                    className={`${
                                                        darkMode ? "text-gray-400" : "text-gray-500"
                                                    }`}
                                                >
                          {percent}%
                        </span>
                                            </div>
                                            <span className="font-medium text-sm">{val.toFixed(2)}</span>
                                        </div>

                                        <Progress
                                            percent={percent}
                                            showInfo={false}
                                            strokeColor={
                                                darkMode ? antdTheme.defaultSeed[color] || "#60a5fa" : antdTheme.defaultSeed[color] || "#1677ff"
                                            }
                                            trailColor={darkMode ? "#374151" : "#e5e7eb"}
                                            size={8}
                                            className="rounded-full"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </Card>
        </ConfigProvider>
    );
}
