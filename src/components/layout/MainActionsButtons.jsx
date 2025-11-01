import React, { useState } from "react";
import { Button, Space, Tooltip, Popconfirm } from "antd";
import {
    PlayCircleOutlined,
    StopOutlined,
    DownloadOutlined,
    DeleteOutlined,
    UndoOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import AddExpenseModal from "./AddExpenseModal";
import { exportCSV } from "../../helpers/exportCSV";

const MainActionsButtons = ({
                              listening,
                              startListening,
                              stopListening,
                              list,
                              clearAll,
                              undo,
                          }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { language } = useLanguage();
    const { darkMode } = useTheme();

    const t = {
        ar: {
            startVoice: "ابدأ صوت",
            listening: "يستمع...",
            stop: "إيقاف",
            addExpense: "إضافة مصروف",
            exportCSV: "تصدير CSV",
            clearAll: "مسح الكل",
            confirmClear: "مسح كل البنود؟",
            undo: "تراجع",
            startTooltip: "ابدأ التحدث",
        },
        en: {
            startVoice: "Start Voice",
            listening: "Listening...",
            stop: "Stop",
            addExpense: "Add Expense",
            exportCSV: "Export CSV",
            clearAll: "Clear All",
            confirmClear: "Clear all items?",
            undo: "Undo",
            startTooltip: "Start speaking",
        },
    }[language];

    const handleExport = () => {
        if (!list?.length) return;
        exportCSV(list);
    };

    const btnBase = darkMode ? "bg-gray-700 text-white border-gray-600" : "";

    return (
        <>
            <div
                className={`flex justify-center sm:justify-start transition-colors duration-300 ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                }`}
            >
                <Space wrap size="middle">
                    <Tooltip title={t.startTooltip}>
                        <Button
                            type={listening ? "primary" : "default"}
                            icon={<PlayCircleOutlined />}
                            onClick={startListening}
                            className={`${btnBase} ${
                                listening ? "!bg-blue-600 !text-white" : ""
                            }`}
                        >
                            {listening ? t.listening : t.startVoice}
                        </Button>
                    </Tooltip>

                    <Button icon={<StopOutlined />} onClick={stopListening} className={btnBase}>
                        {t.stop}
                    </Button>

                    <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalVisible(true)}
                        className={`${btnBase}`}
                    >
                        {t.addExpense}
                    </Button>

                    <Button
                        icon={<DownloadOutlined />}
                        onClick={handleExport}
                        disabled={!list?.length}
                        className={`${btnBase} ${
                            !list?.length ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {t.exportCSV}
                    </Button>

                    <Popconfirm title={t.confirmClear} onConfirm={clearAll} okText={t.clearAll}>
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            className={
                                darkMode ? "bg-red-700 hover:bg-red-800 text-white" : ""
                            }
                        >
                            {t.clearAll}
                        </Button>
                    </Popconfirm>

                    <Button onClick={undo} icon={<UndoOutlined />} className={btnBase}>
                        {t.undo}
                    </Button>
                </Space>
            </div>

            <AddExpenseModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </>
    );
};

export default MainActionsButtons;
