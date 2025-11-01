import React from "react";
import { Select, Space, Button } from "antd";

export default function MonthYearFilter({
                                            month,
                                            setMonth,
                                            year,
                                            setYear,
                                            months,
                                            years,
                                            onReset,
                                            t,
                                            darkMode,
                                        }) {
    return (
        <Space size="middle" className="mb-3">
            <Select
                value={month}
                onChange={setMonth}
                options={[{ label: t("all"), value: "all" }, ...months]}
                placeholder={t("month")}
                className={darkMode ? "bg-gray-700 text-white" : ""}
                size="small"
            />

            <Select
                value={year}
                onChange={setYear}
                options={[{ label: t("all"), value: "all" }, ...years]}
                placeholder={t("year")}
                className={darkMode ? "bg-gray-700 text-white" : ""}
                size="small"
            />

            <Button size="small" onClick={onReset} className={darkMode ? "bg-gray-600 text-white" : ""}>
                {t("reset")}
            </Button>
        </Space>
    );
}
