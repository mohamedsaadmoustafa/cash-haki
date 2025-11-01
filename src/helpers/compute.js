export function computeTotals(items, setListTotal, setListByDay, setListByCategory) {
    const total = items.reduce((s, it) => s + Number(it.amount || 0), 0);
    setListTotal(total);

    const byDayMap = {};
    items.forEach(it => {
        const day = new Date(it.date).toLocaleDateString("en-CA");
        byDayMap[day] = (byDayMap[day] || 0) + Number(it.amount);
    });
    const byDay = Object.entries(byDayMap)
        .map(([day, value]) => ({day, value}))
        .sort((a, b) => a.day.localeCompare(b.day))
        .slice(-14);
    setListByDay(byDay);

    const catMap = {};
    items.forEach(it => {
        catMap[it.category] = (catMap[it.category] || 0) + Number(it.amount);
    });
    setListByCategory(catMap);
}
