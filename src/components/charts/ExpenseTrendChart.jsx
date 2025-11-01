import React, { useState, useMemo } from "react";
import { Card, Empty } from "antd";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import ResetFilterButton from "../common/ResetFilterButton";
import DaysFilter from "../common/DaysFilter";

export default function ExpenseTrendChart({ listByDay }) {
    const { t, language } = useLanguage();
    const { darkMode } = useTheme();

    const axisColor = darkMode ? "#ccc" : "#333";
    const lineColor = darkMode ? "#4ade80" : "#1677ff";
    const gridColor = darkMode ? "#444" : "#e0e0e0";

    const [daysFilter, setDaysFilter] = useState("all");

    const filteredData = useMemo(() => {
        if (daysFilter === "all") return listByDay;
        return listByDay.slice(-daysFilter);
    }, [listByDay, daysFilter]);

    const handleReset = () => setDaysFilter("all");

    return (
        <Card
            className={`mt-4 p-4 transition-colors duration-300 ${
                darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
            }`}
            variant="outlined"
        >
            <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium">{t("expenseTrend")}</h4>

                <div className="flex items-center gap-2">
                    <DaysFilter value={daysFilter} onChange={setDaysFilter} language={language} />
                    <ResetFilterButton
                        onReset={handleReset}
                        language={language}
                        darkMode={darkMode}
                    />
                </div>
            </div>

            {filteredData.length === 0 ? (
                <Empty description={t("noDataYet")} image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={filteredData}>
                        <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
                        <XAxis dataKey="day" stroke={axisColor} />
                        <YAxis stroke={axisColor} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: darkMode ? "#333" : "#fff",
                                borderColor: darkMode ? "#555" : "#ddd",
                            }}
                            labelStyle={{ color: darkMode ? "#fff" : "#000" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={lineColor}
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </Card>
    );
}
