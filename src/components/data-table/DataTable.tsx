import "./data-table.css";
import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import { category } from "../../interface/category.interface";
import { product } from "../../interface/product.interface";
import { ColumnsType } from "antd/lib/table";

type DataTableProps<T> = {
  data: T[];
  loading: boolean;
};

function DataTable<T extends category | product>({
  data,
  loading,
}: DataTableProps<T>) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const keys = Object.keys(data.length > 0 && data[0]);

  const columns: ColumnsType<category | product> = [
    ...keys.map((key) => ({
      title: key,
      dataIndex: key,
      key: key,
      ellipsis: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sorter: (a: any, b: any) => {
        const aValue = a[key];
        const bValue = b[key];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return aValue - bValue;
        } else {
          return aValue.toString().localeCompare(bValue.toString());
        }
      },
    })),
    {
      title: "Additional Column",
      dataIndex: "additionalColumn",
      key: "additionalColumn",
      fixed: "right",
      render: () => (
        <Tooltip placement="topLeft">
          <button onClick={() => console.log("clicked")}>click</button>
        </Tooltip>
      ),
    },
  ];

  const getKey = (item: category | product): React.Key => {
    if ("categoryID" in item) {
      return item.categoryID;
    } else if ("productID" in item) {
      return item.productID;
    }
    return "";
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className="data-table-container">
      <Table
        tableLayout="fixed"
        scroll={{ x: 1500, y: 700 }}
        rowSelection={rowSelection}
        loading={loading}
        pagination={{ pageSize: 11 }}
        columns={data.length > 0 ? columns : []}
        dataSource={
          data.length > 0
            ? data.map((item) => ({
                ...item,
                key: getKey(item),
              }))
            : []
        }
      />
    </div>
  );
}

export default DataTable;
