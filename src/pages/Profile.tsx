import { useContext, useEffect } from "react";
import { ProfileContext } from "../contexts/profile";
import { AuthContext } from "../contexts/auth";

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
        <div>
            <div>
                Username: {userInfo.username}
            </div>
            <button onClick={logout}>
                Logout
            </button>
        </div>
    );
};