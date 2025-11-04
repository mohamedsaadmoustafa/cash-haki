import React from "react";
import { List, Tag, Button, Popconfirm } from "antd";

export default function ExpenseListItem({
                                            item,
                                            index,
                                            t,
                                            language,
                                            darkMode,
                                            onEdit,
                                            onDelete,
                                            getCategoryColor,
                                        }) {
    return (
        <List.Item
            className={`${
                darkMode
                    ? "hover:bg-gray-700 border-b border-gray-700"
                    : "hover:bg-gray-50 border-b border-gray-200"
            } transition-all duration-150`}
            actions={[
                <div className="text-sm font-medium">
                    {item.amount} {t("currency")}
                </div>,
                <Button
                    size="small"
                    onClick={() => onEdit(item)}
                    className={darkMode ? "!bg-gray-700 !text-white border-gray-600" : ""}
                >
                    {t("edit")}
                </Button>,
                <Popconfirm title={t("confirmDelete")} onConfirm={() => onDelete(item.id)}>
                    <Button
                        size="small"
                        danger
                        className={
                            darkMode ? "!bg-red-700 hover:!bg-red-800 !text-white" : ""
                        }
                    >
                        {t("delete")}
                    </Button>
                </Popconfirm>,
            ]}
        >
            <List.Item.Meta
                title={
                    <div className="flex items-center gap-2">
                        <Tag color={getCategoryColor(item.category, index)}>
                            {item.category}
                        </Tag>
                        {item.desc}
                    </div>
                }
                description={new Date(item.date).toLocaleString(
                    language === "ar" ? "ar-EG" : "en-US"
                )}
            />
        </List.Item>
    );
}
