import React from "react";
import { connect } from "react-redux";
import md5 from "md5";
import axios from "axios";
import { Form, Input, Button, Image, Upload, Modal, Row, Col } from "antd";
import {
  FileAddOutlined,
  TagsOutlined,
  ProfileOutlined,
  UserOutlined,
  FileProtectOutlined,
  PlusOutlined,
} from "@ant-design/icons";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    // reader.onerror = (error) => reject(error);
  });
}

class UploadIndex extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: {},
    user: {},
    uploadStatus: false,
    formData: {
      tags: "",
      category: "",
      purchased: "",
    },
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ user: nextProps.user });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  onChange(e) {
    this.setState({ fileList: e.target.files[0] });
  }

  onFinish = (values) => {
    console.log("dfdf");
    const formData = new FormData();
    console.log(this.state.fileList);
    formData.append("file", this.state.fileList);
    let str = values.tags.replace(/\s+/g, "");
    const data = {
      id: this.props.user.id,
      filename: values.filename,
      tags: str,
      category: values.category,
      purchased: values.purchased,
    };
    formData.append("data", data);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post("http://localhost:5000/api/file/upload-info", formData, config);
  };

  render() {
    const { user } = this.props;
    const data = { id: user.id };
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    const hash = md5(String(user.email).trim().toLowerCase());
    const userGravatar = `http://www.gravatar.com/avatar/${hash}?s=120&d=404`;
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
              {userGravatar ? (
                <Image width={200} src={userGravatar} />
              ) : (
                <h1 style={{ color: "white" }}>
                  {user.firstname.charAt(0).toUpperCase() +
                    user.lastname.charAt(0).toUpperCase()}
                </h1>
              )}
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
                  <FileProtectOutlined />
                  File to upload
                </p>
                {/* <Upload
                  // action="http://localhost:5000/api/file/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                  name="file"
                  beforeUpload={() => false}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload> */}
                <input type="file" onChange={this.handleChange} />
                <Modal
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
                </Modal>
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
