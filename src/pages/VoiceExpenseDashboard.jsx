import React from "react";
import { Layout, Row, Col, Tabs } from "antd";
import { useVoiceRecognition } from "../hooks/useVoiceRecognition";
import { useExpenses } from "../context/ExpenseContext";
import ExpenseStatsCard from "../components/layout/ExpenseStatsCard";
import ExpenseTrendChart from "../components/charts/ExpenseTrendChart";
import ExpenseList from "../components/layout/ExpenseList";
import Header from "../components/layout/Header";
import MainActionsButtons from "../components/layout/MainActionsButtons";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import ExpenseCategoryPieChart from "../components/charts/ExpenseCategoryPieChart";
import MonthlyExpenseBarChart from "../components/charts/MonthlyExpenseBarChart";
import CumulativeExpenseAreaChart from "../components/charts/CumulativeExpenseAreaChart";

const { TabPane } = Tabs;

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

    const { listening, startListening, stopListening } =
        useVoiceRecognition(addItems);
    const { t } = useLanguage();
    const { darkMode } = useTheme();

    return (
        <Layout
            className={`min-h-screen px-4 sm:px-6 lg:px-10 py-8 transition-colors duration-300 ${
                darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
            }`}
        >
            <div className="max-w-7xl mx-auto w-full space-y-6">
                <Header />

                <Tabs
                    defaultActiveKey="1"
                    centered
                    className="mt-2"
                    tabBarStyle={{
                        fontWeight: 600,
                        borderBottom: "none",
                    }}
                >
                    {/* layout */}
                    <TabPane tab={t("dashboard")} key="1">
                        <div className="space-y-6 mt-4">
                            {/* Expense Stats Card */}
                            <Row gutter={[16, 16]}>
                                <Col xs={24}>
                                    <ExpenseStatsCard
                                        listTotal={listTotal}
                                        listByCategory={listByCategory}
                                        list={list}
                                    />
                                </Col>
                            </Row>

                            {/* charts */}
                            <Row gutter={[16, 16]} className="flex flex-wrap">
                                <Col xs={24} md={12} xl={8}>
                                    <ExpenseTrendChart listByDay={listByDay} />
                                </Col>
                                <Col xs={24} md={12} xl={8}>
                                    <ExpenseCategoryPieChart data={categoryData} />
                                </Col>
                                <Col xs={24} md={12} xl={8}>
                                    <MonthlyExpenseBarChart data={monthlyData} />
                                </Col>
                                <Col xs={24}>
                                    <CumulativeExpenseAreaChart data={cumulativeData} />
                                </Col>
                            </Row>
                        </div>
                    </TabPane>

                    {/* Controls & List */}
                    <TabPane tab={t("controlsList")} key="2">
                        <div className="space-y-6 mt-4">
                            <MainActionsButtons
                                listening={listening}
                                startListening={startListening}
                                stopListening={stopListening}
                                list={list}
                                clearAll={clearAll}
                                undo={undo}
                            />

                            <ExpenseList
                                list={list}
                                title={t("expenseList")}
                                className="mt-2"
                            />
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </Layout>
    );
}
