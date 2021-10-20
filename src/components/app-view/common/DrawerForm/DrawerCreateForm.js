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

import logo from "../../../auth/login/logo.png";
import "./style.scss";

import * as actions from "../../../_redux/admin/AdminAction";
import { useDispatch } from "react-redux";

function DrawerCreateForm({ onClose }) {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    values.birthdate = new Date(values.birthdate._d);
    values.role = "admin";
    console.log("Received values of form: ", values);
    await dispatch(actions.addAdminData(values));
    onClose();
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
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Image width={200} src={logo} />
      <Form.Item
        name="firstname"
        rules={[{ required: true, message: "Please input Firstname!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Firstname"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="lastname"
        rules={[{ required: true, message: "Please input Lastname!" }]}
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
        rules={[{ required: true, message: "Please input Phonenumber!" }]}
      >
        <Input
          prefix={<PhoneOutlined className="site-form-item-icon" />}
          placeholder="Phonenumber"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="address"
        rules={[{ required: true, message: "Please input Address!" }]}
      >
        <Input
          prefix={<HomeOutlined className="site-form-item-icon" />}
          placeholder="Address"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="birthdates"
        rules={[{ required: true, message: "Please input Birthdate!" }]}
        prefix={<CalendarOutlined className="site-form-item-icon" />}
      >
        <DatePicker
          prefix={<CalendarOutlined className="site-form-item-icon" />}
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input Password!" }]}
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
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default DrawerCreateForm;
