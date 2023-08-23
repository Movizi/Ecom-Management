import "./data-table.css";
import React, { useState } from "react";
import { Button, Table } from "antd";
import { category } from "../../interface/category.interface";
import { product } from "../../interface/product.interface";
import { ColumnsType } from "antd/lib/table";

type Item = category | product;

type DataTableProps<T> = {
  data: T[];
};

function DataTable<T extends Item>({ data }: DataTableProps<T>) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const keys = Object.keys(data[0]);

  const columns: ColumnsType<T> = keys.map((key) => ({
    title: key,
    dataIndex: key,
    key: key,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sorter: (a: any, b: any) => {
      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === "number" && typeof bValue === "number") {
        // Compare numbers
        return aValue - bValue;
      } else {
        // Compare strings
        return aValue.toString().localeCompare(bValue.toString());
      }
    },
  }));

  const getKey = (item: T): React.Key => {
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

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data.map((item: T) => ({
          ...item,
          key: getKey(item),
        }))}
      />
    </div>
  );
}

export default DataTable;
