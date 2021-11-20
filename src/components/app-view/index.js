import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useHistory } from "react-router";
import md5 from "md5";

import { Layout, Menu, Image, Button, Dropdown, Avatar, Drawer } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  PoweroffOutlined,
  AccountBookOutlined,
} from "@ant-design/icons";

import * as actions from "../_redux/auth/authAction";

import "./style.scss";
// import store from "../../store";
import logo from "../auth/login/logo.png";
import AppRoute from "./AppRoute";
import { useDispatch, useSelector } from "react-redux";
import DrawInfo from "./common/DrawerForm/DrawerInfo";
import DrawerEditForm from "./common/DrawerForm/DrawerEditForm";

const { Header, Sider, Content } = Layout;

function SiderDemo() {
  const { user } = useSelector((state) => ({ user: state.auth.user }));
  if (user) {
    const date_ob = new Date();
    const formatDate = (day) => {
      let ts = new Date(day);

      let date_ob = new Date(ts);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();
      return year + "-" + month + "-" + date;
    };
    if (formatDate(date_ob) != formatDate(user.lastlogin)) {
      // localStorage.removeItem("auth_token");
      console.log(formatDate(date_ob));
      console.log(formatDate(user.lastlogin));
      // window.location.reload();
    }
  }

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

  const menu = (
    <Menu>
      <Menu.Item>
        <Button type="text" onClick={showDrawer}>
          <AccountBookOutlined />
          View My Profile
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="text" onClick={onSignOut}>
          <PoweroffOutlined />
          Sign Out
        </Button>
      </Menu.Item>
    </Menu>
  );

  const hash = md5(String(user.email).trim().toLowerCase());
  const userGravatar = `http://www.gravatar.com/avatar/${hash}?s=120&d=404`;
  const [gravatar, setGravatar] = React.useState();
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [panel, setPanel] = React.useState("info");

  React.useEffect(() => {
    setGravatar(userGravatar);
  }, [userGravatar]);
  // const [userGravatar, setUserGravatar] = React.useState(defaultAvatar);
  // axios
  //   .get(`http://www.gravatar.com/avatar/${hash}?s=120&d=404`)
  //   .then(async (res) => {
  //     await setUserGravatar(
  //       `http://www.gravatar.com/avatar/${hash}?s=120&d=404`
  //     );
  //   })
  //   .catch((err) => {});
  const avatar = (
    <Avatar
      src={gravatar}
      // size={{ xs: 80, sm: 80, md: 80, lg: 90, xl: 120, xxl: 150 }}
      align="center"
      style={{
        // borderRadius: "50%",
        backgroundColor: "#f56a00",
        // margin: "0 auto",
        // display: "flex",
        marginTop: "10px",
        marginRight: "10px",
        float: "right",
      }}
    >
      <h1 style={{ color: "white" }}>
        {user.firstname.charAt(0).toUpperCase() +
          user.lastname.charAt(0).toUpperCase()}
      </h1>
    </Avatar>
  );

  function closeDrawer() {
    setDrawerVisible(false);
    setPanel("info");
  }

  function showDrawer() {
    setDrawerVisible(true);
  }

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
            <Link to="/app/upload">Upload Files</Link>
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
          <Dropdown overlay={menu} placement="bottomLeft" arrow>
            {/* <Button >
              bottomLeft
            </Button> */}
            {avatar}
          </Dropdown>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Drawer
            title=""
            width={720}
            // closable={false}
            onClose={closeDrawer}
            visible={drawerVisible}
          >
            {panel == "info" ? (
              <DrawInfo record={user} setPanel={setPanel} />
            ) : (
              <DrawerEditForm record={user} />
            )}
          </Drawer>
          <AppRoute />
        </Content>
      </Layout>
    </Layout>
  );
}

export default SiderDemo;
