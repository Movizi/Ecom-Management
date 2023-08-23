import "./sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { usePortalLayoutContext } from "../../hooks/usePortalLayoutContext";

const { Sider } = Layout;

function Sidebar() {
  const portalLayoutContext = usePortalLayoutContext();

  const navigate = useNavigate();
  const location = useLocation();

  const path =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  if (portalLayoutContext !== null) {
    const { collapsed } = portalLayoutContext;

    return (
      <Sider trigger={null} theme="dark" collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[path]}
          defaultSelectedKeys={[path]}
          onSelect={(item) => {
            navigate(`/portal/${item.key}`);
          }}
          items={[
            {
              key: "overview",
              icon: <UserOutlined />,
              label: "Overview",
            },
            {
              key: "categories",
              icon: <VideoCameraOutlined />,
              label: "Categories",
            },
            {
              key: "products",
              icon: <UploadOutlined />,
              label: "Products",
            },
          ]}
        ></Menu>
      </Sider>
    );
  }
}

export default Sidebar;
