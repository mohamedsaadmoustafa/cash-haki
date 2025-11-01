import React from "react";
import { Select } from "antd";
import { useLanguage } from "../../context/LanguageContext";

export default function DaysFilter({ value, onChange }) {
    const { t } = useLanguage();

    return (
        <Select value={value} onChange={onChange} size="small" className="w-28">
            <Select.Option value="all">{t("allData")}</Select.Option>
            <Select.Option value={1}>{t("lastDay")}</Select.Option>
            <Select.Option value={7}>{t("last7Days")}</Select.Option>
            <Select.Option value={14}>{t("last14Days")}</Select.Option>
            <Select.Option value={30}>{t("last30Days")}</Select.Option>
        </Select>
    );
}
