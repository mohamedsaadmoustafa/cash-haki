import React from "react";
import { Card, Tag, Badge, Progress } from "antd";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

export default function ExpenseStatsCard({ listTotal, listByCategory, list }) {
    const { t } = useLanguage();
    const { darkMode } = useTheme();

    return (
        <Card
            className={`${
                darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
            } border-none shadow-md rounded-2xl`}
            bodyStyle={{ padding: "1.5rem" }}
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
                <h4 className="text-sm font-semibold mb-3">{t("byCategory")}</h4>

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
                        {Object.entries(listByCategory).map(([cat, val]) => {
                            const percent = Math.round((val / (listTotal || 1)) * 100);
                            return (
                                <div key={cat} className="flex flex-col gap-1">
                                    <div className="flex justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <Tag color={darkMode ? "geekblue" : "blue"}>{cat}</Tag>
                                            <span
                                                className={`${
                                                    darkMode ? "text-gray-400" : "text-gray-500"
                                                }`}
                                            >
                        {percent}%
                      </span>
                                        </div>
                                        <span className="font-medium text-sm">
                      {val.toFixed(2)}
                    </span>
                                    </div>

                                    <Progress
                                        percent={percent}
                                        showInfo={false}
                                        strokeColor={darkMode ? "#60a5fa" : "#1677ff"}
                                        trailColor={darkMode ? "#374151" : "#e5e7eb"}
                                        strokeWidth={8}
                                        className="rounded-full"
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </Card>
    );
}
