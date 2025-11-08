// helpers/storage.js
import { DEFAULT_EXPENSES } from "./defaultExpenses";

const STORAGE_KEY = "voice_expenses_v1";
const DEMO_FLAG_KEY = "voice_expenses_demo_loaded";

export function loadFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const demoShown = localStorage.getItem(DEMO_FLAG_KEY);

        // ✅ First-time user → show demo data once
        if (!raw && !demoShown) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EXPENSES));
            localStorage.setItem(DEMO_FLAG_KEY, "true"); // mark demo as shown
            return DEFAULT_EXPENSES;
        }

        // ✅ No data, but demo already shown → start empty
        if (!raw && demoShown) {
            return [];
        }

        // ✅ Parse existing data
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) throw new Error("Invalid data format");
        return parsed;
    } catch (err) {
        console.warn("Error loading expenses:", err);
        // fallback — only add demo data once
        if (!localStorage.getItem(DEMO_FLAG_KEY)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EXPENSES));
            localStorage.setItem(DEMO_FLAG_KEY, "true");
            return DEFAULT_EXPENSES;
        }
        return [];
    }
}

export function saveToStorage(items) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
        console.error("Failed to save expenses:", err);
    }
}

export function clearStorage() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        // ⚠️ Keep the DEMO_FLAG_KEY so it won’t reload example data again
    } catch (err) {
        console.error("Failed to clear storage:", err);
    }
}
