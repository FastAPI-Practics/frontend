import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthContext } from "../contexts/auth";

export const ProtectedLayout = () => {
    const { isAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    return <Outlet/>;
};