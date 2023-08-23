import "./portal-layout.css";
import PortalLayoutContextProvider from "../../context/PortalLayoutContextProvider";
import { useEffect } from "react";
import { useRootContext } from "../../hooks/useRootContext";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Layout } from "antd";

const { Content } = Layout;

function PortalLayout() {
  const rootContext = useRootContext();

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      console.log("No Access Token");
    } else {
      rootContext?.setAccessToken(localStorage.getItem("accessToken"));
    }
  }, [rootContext]);

  return (
    <PortalLayoutContextProvider>
      <div className="portal-layout">
        <Layout>
          <Sidebar />
          <Layout className="site-layout">
            <Navbar />
            <Content className="site-layout-background">
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </div>
    </PortalLayoutContextProvider>
  );
}

export default PortalLayout;
