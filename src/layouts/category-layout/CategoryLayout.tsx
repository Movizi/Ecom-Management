import "./category-layout.css";
import { Outlet } from "react-router-dom";

function CategoryLayout() {
  return (
    <div className="category-layout">
      <Outlet />
    </div>
  );
}

export default CategoryLayout;
