import { Routes, Route } from "react-router";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { ProtectedLayout } from "./layout/Protected";

export const Router = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />

            <Route element={<ProtectedLayout />}>
                <Route index element={<Profile />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
    )
};