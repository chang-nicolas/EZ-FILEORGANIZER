import React from "react";
import md5 from "md5";
import { Card, Avatar, Row, Col } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  UserOutlined,
  FontSizeOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  CalendarOutlined,
  TrademarkOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";

import "./style.scss";

const { Meta } = Card;

function DrawInfo({ record, setPanel }) {
  const hash = md5(String(record.email).trim().toLowerCase());
  const gravatar = `http://www.gravatar.com/avatar/${hash}?s=120&d=404`;
  const avatar = (
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
        {record.firstname.charAt(0) + record.lastname.charAt(0)}
      </h1>
    </Avatar>
  );
  const firstname = (
    <span>
      <UserOutlined style={{ marginRight: "10px" }} />
      First name
    </span>
  );

  const lastname = (
    <span>
      <FontSizeOutlined style={{ marginRight: "10px" }} />
      Last name
    </span>
  );
  const email = (
    <span>
      <MailOutlined style={{ marginRight: "10px" }} />
      Email
    </span>
  );
  const phonenumber = (
    <span>
      <PhoneOutlined style={{ marginRight: "10px" }} />
      Phonenumber
    </span>
  );
  const address = (
    <span>
      <HomeOutlined style={{ marginRight: "10px" }} />
      Address
    </span>
  );
  const birthdate = (
    <span>
      <CalendarOutlined style={{ marginRight: "10px" }} />
      Birthdate
    </span>
  );
  const role = (
    <span>
      <TrademarkOutlined style={{ marginRight: "10px" }} />
      Role
    </span>
  );
  const lastlogin = (
    <span>
      <FieldTimeOutlined style={{ marginRight: "10px" }} />
      Last Login
    </span>
  );
  const onEditClick = () => {
    setPanel("form");
  };
  return (
    <Card
      style={{ width: 300 }}
      cover={avatar}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" onClick={onEditClick} />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Row>
        <Col span={10} offset={4}>
          <Meta title={firstname} description={record.firstname} />
          <Meta title={lastname} description={record.lastname} />
          <Meta title={email} description={record.email} />
          <Meta title={phonenumber} description={record.phonenumber} />
        </Col>
        <Col span={10}>
          <Meta title={address} description={record.address} />
          <Meta title={birthdate} description={record.birthdate} />
          <Meta title={role} description={record.role} />
          <Meta title={lastlogin} description={record.lastlogin} />
        </Col>
      </Row>
    </Card>
  );
}

export default DrawInfo;
