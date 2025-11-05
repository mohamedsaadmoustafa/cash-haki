import React from "react";
import { Layout, Row, Col, Tabs } from "antd";
import { useExpenses } from "../context/ExpenseContext";
import ExpenseStatsCard from "../components/layout/ExpenseStatsCard";
import ExpenseTrendChart from "../components/charts/ExpenseTrendChart";
import ExpenseList from "../components/layout/ExpenseList/ExpenseList";
import Header from "../components/layout/Header";
import MainActionsButtons from "../components/layout/MainActionsButtons";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import ExpenseCategoryPieChart from "../components/charts/ExpenseCategoryPieChart";
import MonthlyExpenseBarChart from "../components/charts/MonthlyExpenseBarChart";
import CumulativeExpenseAreaChart from "../components/charts/CumulativeExpenseAreaChart";
import { useTab } from "../context/TabContext";
import { useVoiceRecognitionLive } from "../hooks/useVoiceRecognitionLive";

export default function DashboardContent() {
    const {
        list,
        listTotal,
        listByDay,
        listByCategory,
        categoryData,
        monthlyData,
        cumulativeData,
        addItems,
        undo,
        clearAll,
    } = useExpenses();

    // ✅ Use updated hook with contextHolder
    const {
        listening,
        liveTranscript,
        startListening,
        stopListening,
        clearLiveTranscript,
        contextHolder,
    } = useVoiceRecognitionLive(addItems);

    const { t } = useLanguage();
    const { darkMode } = useTheme();
    const { activeTab, changeTab } = useTab();

    const tabPaneClass = darkMode
        ? "bg-gray-800 text-gray-100 rounded-2xl p-4 transition-colors"
        : "bg-white text-gray-900 rounded-2xl p-4 transition-colors";

    const items = [
        {
            key: "1",
            label: t("dashboard"),
            children: (
                <div className={`space-y-6 mt-4 ${tabPaneClass}`}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            <ExpenseStatsCard
                                listTotal={listTotal}
                                listByCategory={listByCategory}
                                list={list}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} className="flex flex-wrap">
                        <Col xs={24} md={12} xl={8}>
                            <ExpenseTrendChart listByDay={listByDay} darkMode={darkMode} />
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                            <ExpenseCategoryPieChart data={categoryData} darkMode={darkMode} />
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                            <MonthlyExpenseBarChart data={monthlyData} darkMode={darkMode} />
                        </Col>
                        <Col xs={24}>
                            <CumulativeExpenseAreaChart data={cumulativeData} darkMode={darkMode} />
                        </Col>
                    </Row>
                </div>
            ),
        },
        {
            key: "2",
            label: t("controlsList"),
            children: (
                <div className={`space-y-6 mt-4 ${tabPaneClass}`}>
                    <MainActionsButtons
                        listening={listening}
                        liveTranscript={liveTranscript}
                        startListening={startListening}
                        stopListening={stopListening}
                        clearLiveTranscript={clearLiveTranscript}
                        list={list}
                        clearAll={clearAll}
                        undo={undo}
                    />

                    <ExpenseList
                        list={list}
                        title={t("expenseList")}
                        darkMode={darkMode}
                        className="mt-2"
                    />
                </div>
            ),
        },
    ];

    return (
        <Layout
            className={`min-h-screen px-4 sm:px-6 lg:px-10 py-8 transition-colors duration-300 ${
                darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
            }`}
        >
            {/* ✅ Render contextHolder at the top of the tree */}
            {contextHolder}

            <div className="max-w-7xl mx-auto w-full space-y-6">
                <Header />

                <Tabs
                    activeKey={activeTab}
                    onChange={changeTab}
                    centered
                    className="mt-2"
                    tabBarStyle={{
                        fontWeight: 600,
                        borderBottom: "none",
                        color: darkMode ? "#f3f4f6" : "#111827",
                    }}
                    items={items}
                />
            </div>
        </Layout>
    );
}
