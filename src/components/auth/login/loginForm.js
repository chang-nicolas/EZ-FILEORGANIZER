import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router";
import { Form, Input, Button, Checkbox, Image, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import * as actions from "../../_redux/auth/authAction";

import logo from "./logo.png";
import "./form-style.scss";

function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();
  // const [token, setToken] = React.useState(null);

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);
    await dispatch(actions.login(values)).then(() => {
      const token = localStorage.getItem("auth_token");
      console.log(token);
      if (token) window.location.href = "/app/dashboard";
      else setLoading(false);
    });
  };

  const { authError } = useSelector((state) => ({
    authError: state.auth.error,
  }));
  // setError(authError)
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
      {authError ? (
        <Alert
          message="Error"
          description="This account is invalid"
          type="error"
          style={{ marginBottom: "30px" }}
          showIcon
        />
      ) : (
        ""
      )}
      <Form.Item
        name="email"
        rules={[{ type: "email" }]}
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input
          size="large"
          placeholder="Email"
          prefix={<MailOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          size="large"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox size="large">Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="login-form-button"
          block
          shape="round"
          loading={loading}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
