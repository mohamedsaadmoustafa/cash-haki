import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
} from "react";
import { message } from "antd";
import { loadFromStorage, saveToStorage } from "../helpers/storage";
import { computeTotals } from "../helpers/compute";
import { useLanguage } from "./LanguageContext";

const ExpenseContext = createContext(null);

export function ExpenseProvider({ children }) {
    const { t } = useLanguage();

    const [list, setList] = useState(() => loadFromStorage() || []);
    const [listTotal, setListTotal] = useState(0);
    const [listByDay, setListByDay] = useState([]);
    const [listByCategory, setListByCategory] = useState({});
    const undoRef = useRef(null);

    useEffect(() => {
        computeTotals(list, setListTotal, setListByDay, setListByCategory);
        saveToStorage(list);
    }, [list]);

    const addItems = useCallback(
        (newItems) => {
            if (!Array.isArray(newItems) || newItems.length === 0) return;
            const updated = [...newItems, ...list];
            undoRef.current = { before: list, after: updated };
            setList(updated);
            message.success(t("itemsAdded", { count: newItems.length }));
        },
        [list, t]
    );

    const addManual = useCallback(
        (item) => {
            if (!item || !item.desc || !item.amount) {
                return message.warning(t("invalidItem"));
            }
            const newItem = {
                ...item,
                id: `e_${Date.now()}`,
                date: item.date || new Date().toISOString(),
                category: item.category || "—",
            };
            const updated = [newItem, ...list];
            undoRef.current = { before: list, after: updated };
            setList(updated);
            message.success(t("expenseAdded"));
        },
        [list, t]
    );


    const editItem = useCallback(
        (updatedItem) => {
            if (!updatedItem?.id) return;
            undoRef.current = { before: list };
            setList((prev) =>
                prev.map((i) => (i.id === updatedItem.id ? { ...i, ...updatedItem } : i))
            );
            message.success(t("expenseUpdated"));
        },
        [list, t]
    );

    const removeItem = useCallback(
        (id) => {
            const updated = list.filter((i) => i.id !== id);
            undoRef.current = { before: list, after: updated };
            setList(updated);
            message.success(t("expenseRemoved"));
        },
        [list, t]
    );

    const clearAll = useCallback(() => {
        if (list.length === 0) return message.info(t("nothingToClear"));
        undoRef.current = { before: list, after: [] };
        setList([]);
        message.success(t("allCleared"));
    }, [list, t]);

    const undo = useCallback(() => {
        if (!undoRef.current) return message.info(t("nothingToUndo"));
        setList(undoRef.current.before);
        undoRef.current = null;
        message.success(t("undoSuccess"));
    }, [t]);

    const monthlyData = useMemo(() => {
        const byMonth = {};
        listByDay.forEach(({ day, value }) => {
            const month = new Date(day).toLocaleString("default", { month: "short" });
            byMonth[month] = (byMonth[month] || 0) + value;
        });
        return Object.entries(byMonth).map(([month, value]) => ({ month, value }));
    }, [listByDay]);

    const cumulativeData = useMemo(() => {
        let total = 0;
        return listByDay.map(({ day, value }) => {
            total += value;
            return { day, value: total };
        });
    }, [listByDay]);

    const categoryData = useMemo(() => {
        return Object.entries(listByCategory).map(([category, value]) => ({
            category,
            value,
        }));
    }, [listByCategory]);

    const value = {
        list,
        listTotal,
        listByDay,
        listByCategory,
        categoryData,
        monthlyData,
        cumulativeData,
        addItems,
        addManual,
        editItem,
        removeItem,
        clearAll,
        undo,
    };

    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

export const useExpenses = () => {
    const context = useContext(ExpenseContext);
    if (!context) throw new Error("useExpenses must be used within an ExpenseProvider");
    return context;
};
