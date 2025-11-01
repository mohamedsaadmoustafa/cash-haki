import React from "react";
import { Button, Space, Switch } from "antd";
import { MoonOutlined, SunOutlined, GlobalOutlined } from "@ant-design/icons";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
    const { language, toggleLanguage, t } = useLanguage();
    const { darkMode, toggleTheme } = useTheme();

    return (
        <header
            className={`mb-8 shadow-md p-6 rounded-2xl flex flex-col items-center gap-6 text-center transition-colors duration-300 ${
                darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
            }`}
        >
            <h1 className="text-2xl sm:text-3xl font-semibold">
                {t("dashboardTitle")}
            </h1>

            <Space size="middle">
                <Button
                    icon={<GlobalOutlined />}
                    onClick={toggleLanguage}
                    className={`flex items-center ${
                        darkMode ? "bg-gray-700 text-white border-gray-600" : ""
                    }`}
                >
                    {language === "ar" ? "English" : "العربية"}
                </Button>

                <Switch
                    checked={darkMode}
                    onChange={toggleTheme}
                    checkedChildren={<MoonOutlined />}
                    unCheckedChildren={<SunOutlined />}
                />
            </Space>
        </header>
    );
};

export default Header;
