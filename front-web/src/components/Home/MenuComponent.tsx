import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { SettingFilled, ReadOutlined, TeamOutlined } from "@ant-design/icons";
import HomeBreadCrumbsComponent from "./HomeBreadCrumbsComponent";
import SettingsSVG from "../svgs/settings";
import ExpandLeft from "../svgs/ExpandLeft";
import Bottle from "../svgs/Bottle";
import "../css/MenuStyle.css";

import { Link, useLocation } from "react-router-dom";

const { Content, Sider } = Layout;

function MenuComponent({ children }: any) {
  const [Collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!Collapsed);
  };
  const location = useLocation();
  const pathRoutes = location.pathname.split("/");
  return (
    <Layout>
      <Sider
        width={200}
        className="Sider"
        collapsedWidth="0"
        collapsible
        collapsed={Collapsed}
        onCollapse={onCollapse}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          selectedKeys={pathRoutes}
          expandIcon={<ExpandLeft />}
        >
          <Menu.Item key="operations" icon={<Bottle />}>
            <Link to="/operations" style={{ position: "relative", left: 10 }}>
              Operations
            </Link>
          </Menu.Item>
          <Menu.Item
            key="comptes"
            style={{ color: "rgba(0, 0, 0, 0.65)" }}
            icon={<ReadOutlined style={{ color: "#e8501d" }} />}
          >
            <Link to="/comptes">Comptes</Link>
          </Menu.Item>
          <Menu.Item key="clients" icon={<SettingsSVG />}>
            <Link to="/clients" style={{ position: "relative", left: 10 }}>
              Clients
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <HomeBreadCrumbsComponent />
        <Content className="menu">{children}</Content>
      </Layout>
    </Layout>
  );
}

export default MenuComponent;
