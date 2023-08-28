import "./categories.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useRootContext } from "../../hooks/useRootContext";
import DataTable from "../../components/data-table/DataTable";
import { Input } from "antd";
import { category } from "../../interface/category.interface";

function Categories() {
  const rootContext = useRootContext();

  const [searchVal, setSearchVal] = useState<string>("");

  const { data: categoriesData, isLoading: categoriesLoader } = useQuery(
    ["categories"],
    () =>
      rootContext
        ? rootContext
            .fetchData(rootContext?.apiUrl + "/Category")
            .then((res) => res.data)
        : [],
    {
      enabled: !!rootContext?.accessToken,
    }
  );

  return (
    <div className="categories">
      <div className="categories-header d-flex justify-content-between align-items-center">
        <h1>Categories</h1>
        <div className="categories-panel d-flex justify-content-between align-items-center">
          <Input
            className="input"
            placeholder="input search text"
            allowClear
            onChange={(value) => setSearchVal(value.currentTarget.value)}
            style={{ width: 200 }}
            suffix={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group">
                  <path
                    id="Vector"
                    d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.867 18 18 14.867 18 11C18 7.132 14.867 4 11 4C7.132 4 4 7.132 4 11C4 14.867 7.132 18 11 18ZM19.485 18.071L22.314 20.899L20.899 22.314L18.071 19.485L19.485 18.071Z"
                  />
                </g>
              </svg>
            }
          />
          <Link to="/portal/categories/add" className="button add-category">
            Add category
          </Link>
        </div>
      </div>
      <DataTable<category>
        data={
          categoriesData
            ? categoriesData?.filter((category: category) =>
                [
                  category.categoryID,
                  category.categoryName,
                  category.description,
                ].some((value) =>
                  String(value).toLowerCase().includes(searchVal.toLowerCase())
                )
              )
            : []
        }
        loading={categoriesLoader}
      />
    </div>
  );
}

export default Categories;
