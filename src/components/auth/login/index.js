import React from "react";
import { Row, Col, Space, Button } from "antd";

import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import Canvas from "./canvas";

function Login() {
  const [page, setPage] = React.useState("login");

  function pageChange(newValue) {
    setPage(newValue);
    console.log(page);
  }

  const style = {
    backgroundColor: "#333399",
  };
  return (
    <Row style={{ height: "100vh" }}>
      <Col lg={12} sx={0}>
        <Canvas />
      </Col>
      <Col lg={12} sm={24} sx={24} style={{ width: "100%" }}>
        <Row>
          <Col span={12} offset={6}>
            {page == "login" ? (
              <>
                <LoginForm />
                Or
                <Button
                  danger
                  type="text"
                  onClick={() => pageChange("register")}
                  style={{ marginBottom: "50px" }}
                >
                  Don't you have account?
                </Button>
              </>
            ) : (
              <RegisterForm pageChange={pageChange} />
            )}

            {/* <Button type="primary">Primary</Button>
        <span className="mock-block">Block</span> */}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Login;
