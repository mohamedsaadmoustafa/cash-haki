export function loadFromStorage() {
    try {
        const raw = localStorage.getItem("voice_expenses_v1");
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function saveToStorage(items) {
    try {
        localStorage.setItem("voice_expenses_v1", JSON.stringify(items));
    } catch {}
}
