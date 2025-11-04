import React from "react";
import { DatePicker, Select } from "antd";
import ExpenseFilter from "../../common/ExpenseFilter";
import ResetFilterButton from "../../common/ResetFilterButton";
import { useLanguage } from "../../../context/LanguageContext";
import { useTheme } from "../../../context/ThemeContext";

const { RangePicker } = DatePicker;

/**
 * ExpenseListFilters
 * Handles all filter/sort UI for the ExpenseList.
 * Keeps it independent and reusable.
 */
export default function ExpenseListFilters({
                                               filter,
                                               setFilter,
                                               categories,
                                               dateRange,
                                               setDateRange,
                                               sortBy,
                                               setSortBy,
                                               sortOrder,
                                               setSortOrder,
                                               setPage,
                                               onReset,
                                           }) {
    const { t, language } = useLanguage();
    const { darkMode } = useTheme();

    const selectStyle = {
        width: 120,
        ...(darkMode
            ? { backgroundColor: "#374151", color: "#fff" }
            : { backgroundColor: "#fff" }),
    };

    return (
        <div className="flex items-center gap-2 mb-3 flex-nowrap overflow-x-auto w-full">
            <ExpenseFilter
                filter={filter}
                setFilter={setFilter}
                categories={categories}
                setPage={setPage}
            />

            <RangePicker
                value={dateRange}
                onChange={(dates) => {
                    setDateRange(dates);
                    setPage(1);
                }}
                className={darkMode ? "bg-gray-700 text-white" : ""}
                placeholder={[t("filterByDate"), t("filterByDate")]}
            />

            <Select
                value={sortBy}
                onChange={(value) => setSortBy(value)}
                style={selectStyle}
                className={darkMode ? "bg-gray-700 text-white" : ""}
            >
                <Select.Option value="date">{t("sortByDate")}</Select.Option>
                <Select.Option value="amount">{t("sortByAmount")}</Select.Option>
            </Select>

            <Select
                value={sortOrder}
                onChange={(value) => setSortOrder(value)}
                style={selectStyle}
                className={darkMode ? "bg-gray-700 text-white" : ""}
            >
                <Select.Option value="asc">{t("ascending")}</Select.Option>
                <Select.Option value="desc">{t("descending")}</Select.Option>
            </Select>

            <ResetFilterButton onReset={onReset} language={language} darkMode={darkMode} />
        </div>
    );
}
