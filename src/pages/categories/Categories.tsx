import "./categories.css";
import { useQuery } from "@tanstack/react-query";
import { useRootContext } from "../../hooks/useRootContext";
import { category } from "../../interface/category.interface";
import DataTable from "../../components/data-table/DataTable";

function Categories() {
  const rootContext = useRootContext();

  const { data: categoriesData } = useQuery<category[]>(
    ["categories"],
    () => {
      const data = rootContext?.fetchData<category>(
        rootContext?.apiUrl + "/Category"
      );
      if (data !== undefined) {
        return data;
      } else {
        return [];
      }
    },
    { enabled: !!rootContext?.accessToken }
  );

  // console.log(categoriesData);

  return (
    <div className="categories">
      <h1>Categories</h1>
      {categoriesData !== undefined ? (
        <DataTable<category> data={categoriesData} />
      ) : null}
    </div>
  );
}

export default Categories;
