import React from "react";
import { List } from "antd";
import {useLanguage} from "../../../context/LanguageContext";
import {useExpenses} from "../../../context/ExpenseContext";
import {useTheme} from "../../../context/ThemeContext";
import {useExpenseFilters} from "../../../hooks/useExpenseFilters";
import {useExpenseEditor} from "../../../hooks/useExpenseEditor";
import ExpenseThemeProvider from "../../../context/ExpenseThemeContext";
import ExpenseListItem from "./ExpenseListItem";
import ExpensePagination from "../../common/ExpensePagination";
import ExpenseEditModal from "./ExpenseEditModal";
import ExpenseListFilters from "./ExpenseListFilters";


export default function ExpenseList() {
    const { list, removeItem, editItem } = useExpenses();
    const { t, language } = useLanguage();
    const { darkMode } = useTheme();

    const filters = useExpenseFilters(list);
    const editor = useExpenseEditor(editItem);

    const categoryColors = {
        Food: { light: "green", dark: "lime" },
        Transport: { light: "orange", dark: "gold" },
        Bills: { light: "red", dark: "volcano" },
        Entertainment: { light: "purple", dark: "magenta" },
        Shopping: { light: "blue", dark: "geekblue" },
        Other: { light: "gray", dark: "gray" },
    };

    const fallbackColors = ["blue", "green", "orange", "purple", "cyan", "magenta"];

    const getCategoryColor = (cat, index) => {
        const map = categoryColors[cat];
        if (map) return darkMode ? map.dark : map.light;
        return fallbackColors[index % fallbackColors.length];
    };

    return (
        <ExpenseThemeProvider>
            <ExpenseListFilters t={t} darkMode={darkMode} language={language} {...filters} />

            <List
                dataSource={filters.paginatedList}
                locale={{ emptyText: t("noExpenses") }}
                className={`transition-colors duration-300 ${
                    darkMode
                        ? "bg-gray-800 text-gray-100 border border-gray-700"
                        : "bg-white text-gray-800 border border-gray-200"
                } rounded-2xl shadow-md`}
                renderItem={(item, index) => (
                    <ExpenseListItem
                        key={item.id}
                        item={item}
                        index={index}
                        t={t}
                        language={language}
                        darkMode={darkMode}
                        onEdit={editor.handleEdit}
                        onDelete={removeItem}
                        getCategoryColor={getCategoryColor}
                    />
                )}
            />

            <ExpensePagination
                page={filters.page}
                totalPages={filters.totalPages}
                setPage={filters.setPage}
            />

            <ExpenseEditModal
                t={t}
                darkMode={darkMode}
                {...editor}
            />
        </ExpenseThemeProvider>
    );
}
