import React from "react";
import { Modal, Form, Input, InputNumber, DatePicker, Button } from "antd";
import { useExpenses } from "../../context/ExpenseContext";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

export default function AddExpenseModal({ isModalVisible, setIsModalVisible }) {
    const { addManual } = useExpenses();
    const [form] = Form.useForm();
    const { t } = useLanguage();
    const { darkMode } = useTheme();

    const handleOk = () => {
        form.validateFields().then((values) => {
            const payload = {
                ...values,
                date: values.date ? values.date.toISOString() : new Date().toISOString(),
            };
            addManual(payload);
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    return (
        <Modal
            title={t("addExpenseModalTitle")}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null} // we'll handle buttons manually
            className={darkMode ? "dark-modal" : ""}
        >
            <Form
                layout="vertical"
                form={form}
                className={darkMode ? "text-gray-100" : "text-gray-800"}
            >
                <Form.Item
                    name="desc"
                    label={t("desc")}
                    rules={[{ required: true, message: t("requiredDesc") }]}
                >
                    <Input className={darkMode ? "bg-gray-700 text-white" : ""} />
                </Form.Item>

                <Form.Item
                    name="amount"
                    label={t("amount")}
                    rules={[{ required: true, message: t("requiredAmount") }]}
                >
                    <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        className={darkMode ? "bg-gray-700 text-white" : ""}
                    />
                </Form.Item>

                <Form.Item name="category" label={t("category")}>
                    <Input className={darkMode ? "bg-gray-700 text-white" : ""} />
                </Form.Item>

                <Form.Item name="date" label={t("date")}>
                    <DatePicker
                        style={{ width: "100%" }}
                        className={darkMode ? "bg-gray-700 text-white" : ""}
                    />
                </Form.Item>

                {/* Button dynamically enabled/disabled based on required fields */}
                <Form.Item shouldUpdate>
                    {() => {
                        const desc = form.getFieldValue("desc");
                        const amount = form.getFieldValue("amount");
                        const disabled = !desc || amount === undefined || amount === null;

                        return (
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button
                                    style={{ marginRight: 8 }}
                                    onClick={() => setIsModalVisible(false)}
                                >
                                    {t("cancel")}
                                </Button>
                                <Button type="primary" onClick={handleOk} disabled={disabled}>
                                    {t("add")}
                                </Button>
                            </div>
                        );
                    }}
                </Form.Item>
            </Form>
        </Modal>
    );
}
