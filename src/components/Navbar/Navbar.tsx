import "./navbar.css";
import { createElement } from "react";
import { usePortalLayoutContext } from "../../hooks/usePortalLayoutContext";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";

const { Header } = Layout;

function Navbar() {
  const portalLayoutContext = usePortalLayoutContext();

  if (portalLayoutContext !== null) {
    const { collapsed, setCollapsed } = portalLayoutContext;

    return (
      <Header className="site-layout-background">
        {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: "trigger",
          onClick: () => setCollapsed(!collapsed),
        })}
      </Header>
    );
  }
}

export default Navbar;
