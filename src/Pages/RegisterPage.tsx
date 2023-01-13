
import { Button, Col, Form, Input, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import cmhg_logo from "../cmhg_logo.png"
import { baseUrl } from '../Util/Token';
import Swal from 'sweetalert2'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
function RegisterPage() {
  const navigate = useNavigate()
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    if (baseUrl !== undefined) {
      const response = await fetch(baseUrl + "/user/register", {
        method: 'POST',
        body: JSON.stringify({
          "username": values.username,
          "password": values.password
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'You have registered succesfuly',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate("/")
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  };

  return (
    <div className="register-page-form">
      <div className="image-wrapper"><img id="register-logo" src={cmhg_logo} alt="register-cmhg-logo" /></div>
      <Row justify={'center'} style={{ paddingBottom: "10px" }}><Col offset={8} span={16}>
        <Title level={5}>Create Your Account to Get Started!</Title>
      </Col>
      </Row>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterPage;
