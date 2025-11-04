import React, { createContext, useContext, useState } from "react";

const TabContext = createContext();

export function TabProvider({ children }) {
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem("dashboard_active_tab") || "1";
    });

    const changeTab = (key) => {
        setActiveTab(key);
        localStorage.setItem("dashboard_active_tab", key);
    };

    return (
        <TabContext.Provider value={{ activeTab, changeTab }}>
            {children}
        </TabContext.Provider>
    );
}

// Custom hook to use the tab context
export function useTab() {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error("useTab must be used within a TabProvider");
    }
    return context;
}
