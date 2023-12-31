import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Layouts
import AuthLayout from "./layouts/authorization-layout/AuthLayout";
import PortalLayout from "./layouts/portal-layout/PortalLayout";
import CategoryLayout from "./layouts/category-layout/CategoryLayout";

// Components
import NotFound from "./pages/not-found/NotFound";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Overview from "./pages/overview/Overview";
import Categories from "./pages/categories/Categories";
import AddCategory from "./pages/add-category/AddCategory";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/portal" element={<PortalLayout />}>
        <Route path="/portal/overview" element={<Overview />} />
        <Route path="/portal/categories" element={<CategoryLayout />}>
          <Route index element={<Categories />} />
          <Route path="/portal/categories/add" element={<AddCategory />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);
