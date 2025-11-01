import React, { useState, useMemo } from "react";
import {
    List,
    Button,
    Tag,
    Popconfirm,
    Modal,
    Form,
    Input,
    InputNumber,
    DatePicker,
    Select,
} from "antd";
import dayjs from "dayjs";
import { useExpenses } from "../../context/ExpenseContext";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import ExpensePagination from "../common/ExpensePagination";
import ExpenseFilter from "../common/ExpenseFilter";
import ResetFilterButton from "../common/ResetFilterButton";

const { RangePicker } = DatePicker;

export default function ExpenseList() {
    const { list, removeItem, editItem } = useExpenses();
    const [editingItem, setEditingItem] = useState(null);
    const [form] = Form.useForm();
    const { t, language } = useLanguage();
    const { darkMode } = useTheme();

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("all");
    const [dateRange, setDateRange] = useState([null, null]);
    const [sortBy, setSortBy] = useState("date");
    const [sortOrder, setSortOrder] = useState("desc");
    const pageSize = 5;

    // Categories for filtering
    const categories = useMemo(
        () => Array.from(new Set(list.map((i) => i.category).filter(Boolean))),
        [list]
    );

    // Filter, sort, and paginate
    const filteredList = useMemo(() => {
        const filtered = list.filter((item) => {
            const categoryMatch = filter === "all" || item.category === filter;
            const dateMatch =
                !dateRange[0] ||
                !dateRange[1] ||
                (dayjs(item.date).isAfter(dateRange[0], "day") &&
                    dayjs(item.date).isBefore(dateRange[1], "day"));
            return categoryMatch && dateMatch;
        });

        return filtered.sort((a, b) => {
            let compareValue = 0;
            if (sortBy === "date") {
                compareValue = new Date(a.date) - new Date(b.date);
            } else if (sortBy === "amount") {
                compareValue = a.amount - b.amount;
            }
            return sortOrder === "asc" ? compareValue : -compareValue;
        });
    }, [list, filter, dateRange, sortBy, sortOrder]);

    const paginatedList = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredList.slice(start, start + pageSize);
    }, [page, filteredList]);

    const totalPages = Math.ceil(filteredList.length / pageSize);

    // Handlers
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
            editItem({
                ...editingItem,
                ...values,
            });
            setEditingItem(null);
        });
    };

    return (
        <>
            {/* Filters & Sorting */}
            <div className="flex items-center gap-2 mb-3 flex-nowrap overflow-x-auto w-full">
                <ExpenseFilter
                    filter={filter}
                    setFilter={setFilter}
                    categories={categories}
                    setPage={setPage}
                />

                <RangePicker
                    value={dateRange}
                    onChange={(dates) => {
                        setDateRange(dates);
                        setPage(1);
                    }}
                    className={darkMode ? "bg-gray-700 text-white" : ""}
                    placeholder={[t("filterByDate"), t("filterByDate")]}
                />

                <Select
                    value={sortBy}
                    onChange={(value) => setSortBy(value)}
                    style={{ width: 120 }}
                    className={darkMode ? "bg-gray-700 text-white" : ""}
                >
                    <Select.Option value="date">{t("sortByDate")}</Select.Option>
                    <Select.Option value="amount">{t("sortByAmount")}</Select.Option>
                </Select>

                <Select
                    value={sortOrder}
                    onChange={(value) => setSortOrder(value)}
                    style={{ width: 120 }}
                    className={darkMode ? "bg-gray-700 text-white" : ""}
                >
                    <Select.Option value="asc">{t("ascending")}</Select.Option>
                    <Select.Option value="desc">{t("descending")}</Select.Option>
                </Select>

                <ResetFilterButton
                    onReset={() => {
                        setFilter("all");
                        setDateRange([null, null]);
                        setSortBy("date");
                        setSortOrder("desc");
                        setPage(1);
                    }}
                    language={language}
                    darkMode={darkMode}
                />
            </div>

            {/* Expense List */}
            <List
                dataSource={paginatedList}
                locale={{ emptyText: t("noExpenses") }}
                className={`transition-colors duration-300 ${
                    darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
                } rounded-2xl shadow-md p-3`}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <div className="text-sm font-medium">
                                {item.amount} {t("currency")}
                            </div>,
                            <Button
                                size="small"
                                onClick={() => handleEdit(item)}
                                className={darkMode ? "bg-gray-700 text-white" : ""}
                            >
                                {t("edit")}
                            </Button>,
                            <Popconfirm
                                title={t("confirmDelete")}
                                onConfirm={() => removeItem(item.id)}
                            >
                                <Button
                                    size="small"
                                    danger
                                    className={
                                        darkMode ? "bg-red-700 hover:bg-red-800 text-white" : ""
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
                                    <Tag color={darkMode ? "geekblue" : "blue"}>
                                        {item.category}
                                    </Tag>{" "}
                                    {item.desc}
                                </div>
                            }
                            description={new Date(item.date).toLocaleString(
                                language === "ar" ? "ar-EG" : "en-US"
                            )}
                        />
                    </List.Item>
                )}
            />

            {/* Pagination */}
            <ExpensePagination page={page} totalPages={totalPages} setPage={setPage} />

            {/* Edit Modal */}
            <Modal
                title={t("editExpense")}
                open={!!editingItem}
                onCancel={() => setEditingItem(null)}
                onOk={handleSave}
                okText={t("save")}
                cancelText={t("cancel")}
                className={darkMode ? "dark-modal" : ""}
            >
                <Form layout="vertical" form={form} className={darkMode ? "text-gray-100" : ""}>
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
                            style={{ width: "100%" }}
                            min={0}
                            className={darkMode ? "bg-gray-700 text-white" : ""}
                        />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label={t("category")}
                        rules={[{ required: true, message: t("requiredCategory") }]}
                    >
                        <Input className={darkMode ? "bg-gray-700 text-white" : ""} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
