import React, { useState, useEffect } from "react";
import { Button, Space, Tooltip, Popconfirm, ConfigProvider, Typography, message, theme as antdTheme } from "antd";
import { PlayCircleOutlined, StopOutlined, DownloadOutlined, DeleteOutlined, UndoOutlined, PlusOutlined } from "@ant-design/icons";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import AddExpenseModal from "./AddExpenseModal";
import { exportCSV } from "../../helpers/exportCSV";

const { Paragraph, Text } = Typography;

const MainActionsButtons = ({
                                listening,
                                startListening,
                                stopListening,
                                liveTranscript,
                                clearLiveTranscript,
                                list,
                                clearAll,
                                undo
                            }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showTranscript, setShowTranscript] = useState(false);
    const { language, t } = useLanguage();
    const { darkMode } = useTheme();
    const isArabic = language === "ar";
    const [messageApi, contextHolder] = message.useMessage();

    const handleExport = () => {
        if (!list?.length) return;
        exportCSV(list);
    };

    const handleClearTranscript = () => {
        clearLiveTranscript();
        setShowTranscript(false);
        messageApi.info(isArabic ? "تم مسح النص المباشر." : "Live transcript cleared.");
    };

    // Show transcript when recording starts
    useEffect(() => {
        if (listening) setShowTranscript(true);
    }, [listening]);

    const btnBase = darkMode
        ? "bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
        : "bg-white hover:bg-gray-50 text-gray-800 border-gray-300";

    return (
        <ConfigProvider
            theme={{
                algorithm: darkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                token: {
                    colorBgBase: darkMode ? "#1f2937" : "#ffffff",
                    colorTextBase: darkMode ? "#f3f4f6" : "#111827",
                    borderRadius: 8,
                },
            }}
            direction={isArabic ? "rtl" : "ltr"}
        >
            {contextHolder}

            <div className={`flex justify-center sm:justify-start transition-colors duration-300 ${darkMode ? "text-gray-100" : "text-gray-800"} ${isArabic ? "rtl text-right" : "ltr text-left"}`}>
                <Space wrap size="middle">
                    <Tooltip title={t("startTooltip")}>
                        <Button
                            type={listening ? "primary" : "default"}
                            icon={<PlayCircleOutlined />}
                            onClick={listening ? stopListening : startListening}
                            className={`${btnBase} ${listening ? "!bg-blue-600 !text-white" : ""}`}
                        >
                            {listening ? t("listening") : t("startVoice")}
                        </Button>
                    </Tooltip>

                    <Button
                        icon={<StopOutlined />}
                        onClick={handleClearTranscript}
                        className={`${btnBase} ${listening ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={listening || !liveTranscript}
                    >
                        {t("clearLiveTranscript")}
                    </Button>

                    <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalVisible(true)}
                        className={btnBase}
                    >
                        {t("addExpense")}
                    </Button>

                    <Button
                        icon={<DownloadOutlined />}
                        onClick={handleExport}
                        disabled={!list?.length}
                        className={`${btnBase} ${!list?.length ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {t("exportCSV")}
                    </Button>

                    <Popconfirm
                        title={t("confirmClear")}
                        onConfirm={clearAll}
                        okText={t("clearAll")}
                        overlayClassName={darkMode ? "dark-modal" : ""}
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            className={darkMode ? "bg-red-700 hover:bg-red-800 text-white border-none" : ""}
                        >
                            {t("clearAll")}
                        </Button>
                    </Popconfirm>

                    <Button onClick={undo} icon={<UndoOutlined />} className={btnBase}>
                        {t("undo")}
                    </Button>
                </Space>
            </div>

            {/* Animated Live Transcript */}
            <div
                className={`overflow-hidden transition-all duration-1500 ease-in-out mb-4 rounded border`}
                style={{
                    maxHeight: showTranscript ? 200 : 0,
                    opacity: showTranscript ? 1 : 0,
                    backgroundColor: darkMode ? "#374151" : "#f5f5f5",
                    whiteSpace: "pre-wrap",
                    padding: showTranscript ? "0.75rem" : "0",
                }}
            >
                {showTranscript && (
                    <>
                        <Text strong>{t("liveTranscriptLabel")}</Text>
                        <Paragraph style={{ margin: 0 }}>
                            {liveTranscript || t("listening")}
                        </Paragraph>
                    </>
                )}
            </div>


            <AddExpenseModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
        </ConfigProvider>
    );
};

export default MainActionsButtons;
