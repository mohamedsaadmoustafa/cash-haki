import { useState } from "react";
import { Form } from "antd";

export function useExpenseEditor(editItemFn) {
    const [editingItem, setEditingItem] = useState(null);
    const [form] = Form.useForm();

    const handleEdit = (item) => {
        setEditingItem(item);
        form.setFieldsValue({
            desc: item.desc,
            amount: item.amount,
            category: item.category,
        });
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            editItemFn({ ...editingItem, ...values });
            setEditingItem(null);
        });
    };

    const handleCancel = () => setEditingItem(null);

    return { editingItem, form, handleEdit, handleSave, handleCancel };
}
