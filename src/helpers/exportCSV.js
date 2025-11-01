export function exportCSV(list) {
    if (!list || list.length === 0) return;

    const headers = ["id", "date", "desc", "category", "amount"];
    const rows = list.map(r => [r.id, r.date, `"${r.desc}"`, r.category, r.amount]);
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `expenses_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}
