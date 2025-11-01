export function splitArabicClauses(text) {
    // Removed unnecessary escapes
    let parts = text.split(/[،,;.\n-]/).map(p => p.trim()).filter(Boolean);
    const expanded = [];
    for (const p of parts) {
        const sub = p.split(/\bو\s+/).map(s => s.trim()).filter(Boolean);
        expanded.push(...sub);
    }
    return expanded;
}

export function parseClauseForExpense(clause) {
    const numberMatch = clause.match(/(\d+[.,]?\d*)/);
    if (!numberMatch) return null;

    const amount = parseFloat(numberMatch[1].replace(",", "."));
    if (isNaN(amount)) return null;

    const categories = {
        "قهوة": ["قهوة", "كافيه", "كوفي"],
        "مواصلات": ["مواصلات", "تاكسي", "تكسي", "مترو"],
        "أكل": ["فطور", "غداء", "عشاء", "أكل", "اكل", "سناك", "وجبة"],
        "تسوق": ["سوق", "تسوق", "اشتريت", "شراء"],
        "عمل": ["شغل", "مكتب", "بيت"],
        "أخرى": [],
    };

    const clauseLower = clause.toLowerCase();
    let category = "أخرى";
    for (const cat in categories)
        if (categories[cat].some(kw => clauseLower.includes(kw)))
            category = cat;

    const desc = clause.replace(numberMatch[0], "").trim();

    return {
        id: `e_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        amount,
        category,
        desc: desc || category,
        date: new Date().toISOString(),
    };
}
