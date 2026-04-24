import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from "react-router";
import { Layout, theme, Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import type { BodyLoginApiV1AuthLoginPost } from "../client";

type FieldType = {
  username?: string;
  password?: string;
};

const { Header, Content, Footer } = Layout;

export const Login = () => {
    const {
        login,
        isAuthenticated,
    } = useContext(AuthContext);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile')
        }
    }, [isAuthenticated, navigate]);

    const onFinish: FormProps<FieldType>['onFinish'] = (values: FieldType) => {
        const loginData: BodyLoginApiV1AuthLoginPost = {
            username: values.username || '',
            password: values.password || '',
        };
        login(loginData);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Layout
            style={{
                height: "100vh"
            }}
        >
            <Header
                style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <div
                style={{
                    padding: 24,
                    minHeight: 380,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2026 Created by Ant UED</Footer>
        </Layout>
    );
};