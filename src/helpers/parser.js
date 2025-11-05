export function splitClauses(text, language = "en") {
    // Split by common delimiters
    let parts = text.split(/[،,;.\n-]/).map(p => p.trim()).filter(Boolean);

    if (language === "ar") {
        // Split by Arabic "و" conjunction
        const expanded = [];
        for (const p of parts) {
            const sub = p.split(/\bو\s+/).map(s => s.trim()).filter(Boolean);
            expanded.push(...sub);
        }
        return expanded;
    }

    // English: split by "and"
    const expanded = [];
    for (const p of parts) {
        const sub = p.split(/\band\b/i).map(s => s.trim()).filter(Boolean);
        expanded.push(...sub);
    }
    return expanded;
}

export function parseClauseForExpense(clause, language = "en") {
    const numberMatch = clause.match(/(\d+[.,]?\d*)/);
    if (!numberMatch) return null;

    const amount = parseFloat(numberMatch[1].replace(",", "."));
    if (isNaN(amount)) return null;

    const categories = language === "ar"
        ? {
            "قهوة": ["قهوة", "كافيه", "كوفي"],
            "مواصلات": ["مواصلات", "تاكسي", "تكسي", "مترو"],
            "أكل": ["فطور", "غداء", "عشاء", "أكل", "اكل", "سناك", "وجبة"],
            "تسوق": ["سوق", "تسوق", "اشتريت", "شراء"],
            "عمل": ["شغل", "مكتب", "بيت"],
            "—": [],
        }
        : {
            "Coffee": ["coffee", "cafe", "latte", "espresso"],
            "Transport": ["taxi", "uber", "bus", "metro", "train"],
            "Food": ["breakfast", "lunch", "dinner", "snack", "meal"],
            "Shopping": ["shop", "shopping", "buy", "bought"],
            "Work": ["work", "office", "job", "project"],
            "—": [],
        };

    const clauseLower = clause.toLowerCase();
    let category = "—";
    for (const cat in categories)
        if (categories[cat].some(kw => clauseLower.includes(kw.toLowerCase())))
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
