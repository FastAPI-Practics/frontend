import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthContext } from "../contexts/auth";
import { Layout, theme } from 'antd';

const { Header, Content, Footer } = Layout;

export const ProtectedLayout = () => {
    const { isAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

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
            <Content style={{ padding: '0 48px', height: "100%" }}>
                <div
                style={{
                    height: "100%",
                    padding: 24,
                    minHeight: 380,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
                >
                    <Outlet/>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2026 Created by Ant UED</Footer>
        </Layout>
    );
};