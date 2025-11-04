import React from "react";
import { Card, Empty } from "antd";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

export default function CumulativeExpenseAreaChart({ data }) {
    const { darkMode } = useTheme();
    const { t } = useLanguage();

    const axisColor = darkMode ? "#ccc" : "#333";
    const gridColor = darkMode ? "#444" : "#e0e0e0";
    const areaColor = darkMode ? "#4ade80" : "#1677ff";

    return (
        <Card
            className={`mt-4 p-4 transition-colors duration-300 ${
                darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
            }`}
            variant="outlined"
        >
            <h4 className="text-sm font-medium mb-3">{t("cumulativeExpenses")}</h4>

            {data.length === 0 ? (
                <Empty description={<span style={{color: darkMode ? "#ccc" : "#555"}}>
                    {t("noDataYet")}
                </span>} image={Empty.PRESENTED_IMAGE_SIMPLE}/>
            ) : (
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                        <XAxis dataKey="day" stroke={axisColor} />
                        <YAxis stroke={axisColor} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: darkMode ? "#333" : "#fff",
                                borderColor: darkMode ? "#555" : "#ddd",
                            }}
                            formatter={(val) => val.toLocaleString()}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={areaColor}
                            fill={areaColor}
                            fillOpacity={0.3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </Card>
    );
}
