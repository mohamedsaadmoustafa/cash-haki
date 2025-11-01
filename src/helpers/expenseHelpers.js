// helpers/expenseHelpers.js
export const filterByMonthYear = (list, month = "all", year = "all") => {
    return list.filter(item => {
        const d = new Date(item.date);
        const itemMonth = d.getMonth(); // 0 = Jan
        const itemYear = d.getFullYear();

        const monthMatch = month === "all" || Number(month) === itemMonth;
        const yearMatch = year === "all" || Number(year) === itemYear;

        return monthMatch && yearMatch;
    });
};


export const computeTotals = (list, setListTotal, setListByDay, setListByCategory) => {
    const total = list.reduce((acc, item) => acc + Number(item.amount || 0), 0);
    setListTotal(total);

    // By day
    const byDayMap = {};
    list.forEach(item => {
        const day = item.date.split("T")[0];
        byDayMap[day] = (byDayMap[day] || 0) + Number(item.amount || 0);
    });
    const byDayArray = Object.entries(byDayMap)
        .sort((a, b) => new Date(a[0]) - new Date(b[0]))
        .map(([day, value]) => ({ day, value }));
    setListByDay(byDayArray);

    // By category
    const byCategory = {};
    list.forEach(item => {
        if (!item.category) return;
        byCategory[item.category] = (byCategory[item.category] || 0) + Number(item.amount || 0);
    });
    setListByCategory(byCategory);
};
