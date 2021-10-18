import React from "react";

import { Form, Input, Button, Checkbox, Image, DatePicker } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import logo from "./logo.png";
import "./form-style.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { API_URL } from "../../../constant";

function RegisterForm({ pageChange }) {
  const [userData, setUserData] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    address: "",
    password: "",
  });
  const history = useHistory();

  const onFinish = (values) => {
    values.birthdate = new Date(values.birthdate._d);
    values.role = "user";
    console.log("Received values of form: ", values);
    axios
      .post(`${API_URL}/auth/register`, values)
      .then((res) => pageChange("login"));
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{ marginTop: "30%" }}
      validateMessages={validateMessages}
    >
      <Image width={200} src={logo} />
      <Form.Item
        name="firstname"
        rules={[{ required: true, message: "Please input your Firstname!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Firstname"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="lastname"
        rules={[{ required: true, message: "Please input your Lastname!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Lastname"
          size="large"
        />
      </Form.Item>

      <Form.Item name="email" rules={[{ type: "email" }]}>
        <Input
          size="large"
          placeholder="Email"
          prefix={<MailOutlined className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item
        name="phonenumber"
        rules={[{ required: true, message: "Please input your Phonenumber!" }]}
      >
        <Input
          prefix={<PhoneOutlined className="site-form-item-icon" />}
          placeholder="Phonenumber"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="address"
        rules={[{ required: true, message: "Please input your Address!" }]}
      >
        <Input
          prefix={<HomeOutlined className="site-form-item-icon" />}
          placeholder="Address"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="birthdate"
        rules={[{ required: true, message: "Please input your Birthdate!" }]}
      >
        <DatePicker
          prefix={<CalendarOutlined className="site-form-item-icon" />}
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox size="large">Remember me</Checkbox>
        </Form.Item>

        {/* <a className="login-form-forgot" href="">
          Forgot password
        </a> */}
      </Form.Item>

      <Form.Item>
        <Button
          size="large"
          type="danger"
          htmlType="submit"
          // className="login-form-button"
          block
          shape="round"
          style={{ marginBottom: "50px" }}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

export default RegisterForm;
