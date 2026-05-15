import { useContext, useEffect } from "react";
import { ProfileContext } from "../contexts/profile";
import { AuthContext } from "../contexts/auth";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Typography, Button } from 'antd';

const { Title } = Typography;

export const Profile = () => {
    const { userInfo, fetchUserInfo } = useContext(ProfileContext);
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        if (!userInfo) {
            fetchUserInfo();
        }
    }, [userInfo, fetchUserInfo]);

    if (!userInfo) return <>Loading...</>
    return (
        <Space vertical size={16}>
            <Space wrap size={16}>
                <Avatar size={64} icon={<UserOutlined />} />
                <Title>{userInfo.username}</Title>
            </Space>
            <Space wrap size={16}>
                <Title level={3}>Email: {userInfo.email}</Title>
            </Space>
            <Button color="danger" variant="solid" onClick={logout}>
                Logout
            </Button>
        </Space>
    );
};