import React from "react";
import md5 from "md5";
import { Card, Avatar, Spin } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

// import "./style.scss";

const UserAvatar = ({ user }) => {
  const hash = md5(String(user.email).trim().toLowerCase());
  const [gravatar, setGravatar] = React.useState(
    <Spin style={{ margin: "0 auto", marginTop: "30%" }} />
  );
  const userGravatar = `http://www.gravatar.com/avatar/${hash}?s=120&d=404`;

  React.useEffect(() => {
    setGravatar(userGravatar);
  }, [userGravatar]);

  return (
    <Avatar
      src={gravatar}
      size={{ xs: 80, sm: 80, md: 80, lg: 90, xl: 120, xxl: 150 }}
      align="center"
      style={{
        borderRadius: "50%",
        backgroundColor: "#f56a00",
        margin: "0 auto",
        display: "flex",
        marginTop: "20px",
        marginBottom: "10px",
      }}
    >
      <h1 style={{ color: "white" }}>
        {user.firstname.charAt(0).toUpperCase() +
          user.lastname.charAt(0).toUpperCase()}
      </h1>
    </Avatar>
  );
};

export default UserAvatar;
