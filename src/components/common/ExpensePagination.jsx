import React from "react";
import { Button } from "antd";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

export default function ExpensePagination({ page, totalPages, setPage }) {
    const { t } = useLanguage();
    const { darkMode } = useTheme();

    if (totalPages <= 1) return null;

    return (
        <div
            className={`flex justify-center items-center gap-4 mt-4 ${
                darkMode ? "text-gray-200" : "text-gray-700"
            }`}
        >
            <Button
                size="small"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                {t("prev")}
            </Button>

            <span>
        {page} / {totalPages}
      </span>

            <Button
                size="small"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
            >
                {t("next")}
            </Button>
        </div>
    );
}
