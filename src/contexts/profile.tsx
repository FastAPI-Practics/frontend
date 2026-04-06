import React, { useContext, useState, type FC } from "react";
import { getProfileApiV1UsersMeGet, type UserPublic } from "../client";
import { AuthContext } from "./auth";

type ProfileContextValue = {
    userInfo: UserPublic | null;
    fetchUserInfo: () => Promise<void>
};

export const ProfileContext = React.createContext<ProfileContextValue>({
    userInfo: null,
    fetchUserInfo: () => new Promise(res => res()),
});

type ProfileContextProviderProps = {
    children: React.ReactNode
}

export const ProfileContextProvider: FC<ProfileContextProviderProps> = (props) => {
    const { isAuthenticated, accessToken, refresh } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState<UserPublic | null>(null);

    const fetchUserInfo = async () => {
        if (isAuthenticated) {
            const resp = await getProfileApiV1UsersMeGet({
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const { response, data } = resp;
            if (response.status === 200){
                setUserInfo(data);
            } else if (response.status == 401) {
                await refresh();
                await fetchUserInfo();
            }
        }
    };

    const contextValue: ProfileContextValue = {
        userInfo,
        fetchUserInfo,
    }

    return (
        <ProfileContext value={contextValue}>
            {props.children}
        </ProfileContext>
    );
}
