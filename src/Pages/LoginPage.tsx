
import { Alert, Button, Checkbox, Form, Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import "../styles.css"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { baseUrl } from '../Util/Token';
import { FC, useState } from 'react';
import { setCookie } from '../Util/Cookie';

type Props = {
  setUserStatus: React.Dispatch<React.SetStateAction<number>>
}

const LoginPage: FC<Props> = ({ setUserStatus }) => {

  const navigate = useNavigate()
  const [loginFailed, setLoginFailed] = useState(false)

  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setLoginFailed(false)
  };

  const loginFailAlert = () => {

    if (loginFailed) {
      return (<Space direction="vertical" style={{ width: '100%' }}>
        <Alert
          message="Login Failed"
          description="Wrong username or password"
          type="error"
          closable
          onClose={onClose}
        />
      </Space>)
    } else {
      return <></>
    }

  }


  const loginUser = async (username: string, password: string) => {

    if (baseUrl !== undefined) {
      const response = await fetch(baseUrl + "/login", {
        method: 'POST',
        body: new URLSearchParams({
          username: username,
          password: password
        }).toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.status === 200) {
        setLoginFailed(false)
        return response.json()

      } else {
        setLoginFailed(true)
        return undefined
      }
    }
  }

  const onFinish = async (values: any) => {
    setCookie("remember-user", values.remember)
    const data = await loginUser(values.username, values.password)
    if (data !== undefined) {
      setUserStatus(1)
      setCookie("access-token", data["access_token"])
      setCookie("refresh-token", data["refresh_token"])
      navigate("/main-page")
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-page-form">
      <Title level={3}>Welcome to Confidential Maternal Health Guardian!</Title>
      <Title level={5}>Please login with your credentials</Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="/register-page">Register Now!</a>
        </Form.Item>
      </Form>
      {loginFailAlert()}
    </div>
  );
}

export default LoginPage;
