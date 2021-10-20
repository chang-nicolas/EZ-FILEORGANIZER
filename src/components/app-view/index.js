import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useHistory } from "react-router";

import { Layout, Menu, Image, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

import * as actions from "../_redux/auth/authAction";

import "./style.scss";
// import store from "../../store";
import logo from "../auth/login/logo.png";
import AppRoute from "./AppRoute";
import { useDispatch } from "react-redux";

const { Header, Sider, Content } = Layout;

function SiderDemo() {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggle = () => {
    setCollapsed((prevState) => !prevState);
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const onSignOut = async () => {
    localStorage.removeItem("auth_token");
    await dispatch(actions.singOut());
    window.location.href = "/auth/login";
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {collapsed ? "" : <Image width={150} src={logo} />}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<VideoCameraOutlined />}>
            <Link to="/app/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/app/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/app/admins">Admins</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ paddingLeft: 10 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <Button
            style={{ float: "right", marginTop: "20px" }}
            type="text"
            onClick={onSignOut}
          >
            <PoweroffOutlined />
            Sign Out
          </Button>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <AppRoute />
        </Content>
      </Layout>
    </Layout>
  );
}

export default SiderDemo;
