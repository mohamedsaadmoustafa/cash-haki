import React from "react";
import { Card, Empty } from "antd";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

export default function MonthlyExpenseBarChart({ data }) {
    const { darkMode } = useTheme();
    const { language } = useLanguage();

    const t = {
        ar: {
            title: "المصروفات الشهرية",
            noData: "لا توجد بيانات بعد",
        },
        en: {
            title: "Monthly Expenses",
            noData: "No data yet",
        },
    }[language];

    const axisColor = darkMode ? "#ccc" : "#333";
    const gridColor = darkMode ? "#444" : "#e0e0e0";
    const barColor = darkMode ? "#4ade80" : "#1677ff";

    return (
        <Card
            className={`mt-4 p-4 transition-colors duration-300 ${
                darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
            }`}
            variant="outlined"
        >
            <h4 className="text-sm font-medium mb-3">{t.title}</h4>

            {data.length === 0 ? (
                <Empty description={t.noData} image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                        <XAxis dataKey="month" stroke={axisColor} />
                        <YAxis
                            stroke={axisColor}
                            tickFormatter={(val) => val.toLocaleString()}
                        />
                        <Tooltip
                            formatter={(val) => val.toLocaleString()}
                            contentStyle={{
                                backgroundColor: darkMode ? "#333" : "#fff",
                                borderColor: darkMode ? "#555" : "#ddd",
                            }}
                        />
                        <Bar
                            dataKey="value"
                            fill={barColor}
                            animationDuration={600}
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </Card>
    );
}
