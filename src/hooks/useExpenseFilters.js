import { useState, useMemo } from "react";
import dayjs from "dayjs";

export function useExpenseFilters(list) {
    const [filter, setFilter] = useState("all");
    const [dateRange, setDateRange] = useState([null, null]);
    const [sortBy, setSortBy] = useState("date");
    const [sortOrder, setSortOrder] = useState("desc");
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const categories = useMemo(
        () => Array.from(new Set(list.map((i) => i.category).filter(Boolean))),
        [list]
    );

    const filteredList = useMemo(() => {
        const filtered = list.filter((item) => {
            const categoryMatch = filter === "all" || item.category === filter;
            const dateMatch =
                !dateRange[0] ||
                !dateRange[1] ||
                (dayjs(item.date).isAfter(dateRange[0], "day") &&
                    dayjs(item.date).isBefore(dateRange[1], "day"));
            return categoryMatch && dateMatch;
        });

        return filtered.sort((a, b) => {
            let compareValue = 0;
            if (sortBy === "date") compareValue = new Date(a.date) - new Date(b.date);
            if (sortBy === "amount") compareValue = a.amount - b.amount;
            return sortOrder === "asc" ? compareValue : -compareValue;
        });
    }, [list, filter, dateRange, sortBy, sortOrder]);

    const paginatedList = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredList.slice(start, start + pageSize);
    }, [page, filteredList]);

    const totalPages = Math.ceil(filteredList.length / pageSize);

    const resetFilters = () => {
        setFilter("all");
        setDateRange([null, null]);
        setSortBy("date");
        setSortOrder("desc");
        setPage(1);
    };

    return {
        filter,
        setFilter,
        dateRange,
        setDateRange,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        page,
        setPage,
        categories,
        filteredList,
        paginatedList,
        totalPages,
        resetFilters,
        pageSize,
    };
}
