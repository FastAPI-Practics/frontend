import React, { useMemo, useState, type FC } from "react";
import { loginApiV1AuthLoginPost, logoutApiV1AuthLogoutDelete, refreshApiV1AuthRefreshPost, type BodyLoginApiV1AuthLoginPost } from "../client";

type AuthContextValue = {
    isAuthenticated: boolean;
    accessToken: string | null;
    login: (loginData: BodyLoginApiV1AuthLoginPost) => Promise<void>,
    logout: () => Promise<void>
    refresh: () => Promise<void>
};

export const AuthContext = React.createContext<AuthContextValue>({
    isAuthenticated: false,
    accessToken: null,
    login: () => new Promise(res => res()),
    logout: () => new Promise(res => res()),
    refresh: () => new Promise(res => res()),
});

type AuthContextProviderProps = {
    children: React.ReactNode
}

const LOCAL_STORAGE_KEY = 'access_token'

export const AuthContextProvider: FC<AuthContextProviderProps> = (props) => {
    const setTokenToStorage = (token: string) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, token);
    }
    const clearStorage = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY)
    }

    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem(LOCAL_STORAGE_KEY));

    const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

    const login = async (loginData: BodyLoginApiV1AuthLoginPost) => {
        const resp = await loginApiV1AuthLoginPost({
            body: loginData
        });
        const { response, data } = resp;
        if (response.status == 200 && data) {
            const { access_token } = data;
            setAccessToken(access_token);
            setTokenToStorage(access_token);
        }
    }

    const logout = async () => {
        await logoutApiV1AuthLogoutDelete({});
        setAccessToken(null);
        clearStorage();
    }

    const refresh = async () => {
        const resp = await refreshApiV1AuthRefreshPost({});
        const { response, data } = resp;
        if (response.status == 200 && data) {
            const { access_token } = data;
            setAccessToken(access_token);
            setTokenToStorage(access_token);
        } else {
            setAccessToken(null);
            clearStorage();
        }
    }

    const contextValue: AuthContextValue = {
        isAuthenticated,
        accessToken,
        login,
        logout,
        refresh,
    }

    return (
        <AuthContext value={contextValue}>
            {props.children}
        </AuthContext>
    );
};