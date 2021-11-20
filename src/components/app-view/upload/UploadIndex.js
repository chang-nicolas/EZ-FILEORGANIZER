import React from "react";
import axios, { post } from "axios";
import { connect } from "react-redux";
import md5 from "md5";
import { Form, Input, Button, Image, Upload, Typography, Row, Col } from "antd";
import {
  FileAddOutlined,
  TagsOutlined,
  ProfileOutlined,
  UserOutlined,
  FileProtectOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { API_URL } from "../../../constant";

const { Title } = Typography;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class UploadIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.onFinish = this.onFinish.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  onFinish(values) {
    console.log(values);
    this.fileUpload(this.state.file, values).then((response) => {
      this.props.history.push("/app/dashboard");
    });
  }

  onChange(e) {
    console.log(e);
    // console.log(e.target.files[0]);
    this.setState({ file: e.file });
  }

  fileUpload(file, values) {
    const url = `${API_URL}/file/upload`;
    const formData = new FormData();
    formData.append("id", this.props.user.id);
    formData.append("file", file);
    formData.append("category", values.category);
    formData.append("tags", values.tags);
    formData.append("purchased", values.purchased);
    formData.append("filename", values.filename);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  }

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  };

  render() {
    const { user } = this.props;
    const data = { id: user.id };
    const hash = md5(String(user.email).trim().toLowerCase());
    const userGravatar = `http://www.gravatar.com/avatar/${hash}`;
    const alt = (
      <h1 style={{ color: "white" }}>
        {user.firstname.charAt(0).toUpperCase() +
          user.lastname.charAt(0).toUpperCase()}
      </h1>
    );
    return (
      <>
        <Row>
          <Col span={16} offset={4}>
            <Form
              name="normal_login"
              className="login-form"
              onFinish={this.onFinish}
            >
              <Title style={{ marginBottom: "30px" }}>
                Fill up the Form to upload
              </Title>
              {/* {userGravatar ? (
                <Image
                  width={200}
                  style={{ borderRadius: "50%" }}
                  src={userGravatar}
                />
              ) : (
                <h1 style={{ color: "white" }}>
                  {user.firstname.charAt(0).toUpperCase() +
                    user.lastname.charAt(0).toUpperCase()}
                </h1>
              )} */}

              <Form.Item
                name="filename"
                rules={[{ required: true, message: "Please input file name!" }]}
              >
                <Input
                  prefix={<FileAddOutlined className="site-form-item-icon" />}
                  placeholder="File name"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="tags"
                rules={[{ required: true, message: "Please input tags!" }]}
              >
                <Input
                  prefix={<TagsOutlined className="site-form-item-icon" />}
                  placeholder="Please Input tags separated by Comma"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="category"
                rules={[{ required: true, message: "Please input category!" }]}
              >
                <Input
                  size="large"
                  placeholder="Category"
                  prefix={<ProfileOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                name="purchased"
                rules={[{ required: true, message: "Please input purchased!" }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Purchased"
                  size="large"
                />
              </Form.Item>
              <Form.Item>
                <p>
                  <FileProtectOutlined /> File to upload
                </p>
                <Upload
                  // action="http://localhost:5000/api/file/upload"
                  listType="picture-card"
                  // fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.onChange}
                  name="file"
                  beforeUpload={() => false}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
                {/* <input type="file" onChange={this.onChange} /> */}

                {/* <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal> */}
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
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(UploadIndex);
