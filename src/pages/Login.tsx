import { createRef, useContext, useEffect, type SyntheticEvent } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from "react-router";

export const Login = () => {
    const {
        login,
        isAuthenticated,
    } = useContext(AuthContext);

    const loginRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile')
        }
    }, [isAuthenticated, navigate])

    const handleLogin = (e: SyntheticEvent) => {
        e.preventDefault();
        login({
            username: loginRef.current.value,
            password: passwordRef.current.value
        })
    };
    return (
        <form onSubmit={handleLogin}>
            <input ref={loginRef} type="text" required/>
            <input ref={passwordRef} type="password" required/>
            <button type="submit" onClick={handleLogin}>
                Login
            </button>
        </form>
    );
};