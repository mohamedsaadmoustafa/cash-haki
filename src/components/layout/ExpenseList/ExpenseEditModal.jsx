import React from "react";
import { Modal, Form, Input, InputNumber } from "antd";

export default function ExpenseEditModal({
                                             t,
                                             form,
                                             darkMode,
                                             editingItem,
                                             handleSave,
                                             handleCancel,
                                         }) {
    return (
        <Modal
            title={t("editExpense")}
            open={!!editingItem}
            onCancel={handleCancel}
            onOk={handleSave}
            okText={t("save")}
            cancelText={t("cancel")}
            className={darkMode ? "dark-modal" : ""}
        >
            <Form layout="vertical" form={form}>
                <Form.Item
                    name="desc"
                    label={t("desc")}
                    rules={[{ required: true, message: t("requiredDesc") }]}
                >
                    <Input className={darkMode ? "bg-gray-700 text-white border-gray-600" : ""} />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label={t("amount")}
                    rules={[{ required: true, message: t("requiredAmount") }]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        min={0}
                        className={darkMode ? "bg-gray-700 text-white border-gray-600" : ""}
                    />
                </Form.Item>
                <Form.Item
                    name="category"
                    label={t("category")}
                    rules={[{ required: true, message: t("requiredCategory") }]}
                >
                    <Input className={darkMode ? "bg-gray-700 text-white border-gray-600" : ""} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
