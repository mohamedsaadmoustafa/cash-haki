import React from "react";
import { Card, Empty } from "antd";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

export default function ExpenseCategoryPieChart({ data }) {
    const { darkMode } = useTheme();
    const { t } = useLanguage(); // use translation hook

    const COLORS = ["#1677ff", "#4ade80", "#facc15", "#f97316", "#ef4444"];

    return (
        <Card
            className={`mt-4 p-4 transition-colors duration-300 ${
                darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
            }`}
            variant="outlined"
        >
            <h4 className="text-sm font-medium mb-3">{t("expensesByCategory")}</h4>

            {data.length === 0 ? (
                <Empty description={t("noDataYet")} image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="category"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: darkMode ? "#333" : "#fff",
                                borderColor: darkMode ? "#555" : "#ddd",
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </Card>
    );
}
