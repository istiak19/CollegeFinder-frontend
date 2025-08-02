import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateAdmissionForm from "../components/PrivatePage/PrivateAdmissionForm";
import Profile from "../pages/Profile/Profile";
import PasswordReset from "../pages/PasswordReset";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/admission",
                Component: PrivateAdmissionForm,
            },
            {
                path: "/login",
                Component: Login,
            },
            {
                path: "/register",
                Component: Register,
            },
            {
                path: "/profile",
                Component: Profile,
            },
            {
                path: "/forgot-password",
                Component: PasswordReset,
            },
            {
                path: "*",
                Component: NotFound,
            },
        ],
    },
]);

export default router;