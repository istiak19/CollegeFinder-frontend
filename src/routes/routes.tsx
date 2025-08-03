import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateAdmissionForm from "../components/PrivatePage/PrivateAdmissionForm";
import PasswordReset from "../pages/PasswordReset";
import Colleges from "../pages/Colleges/Colleges";
import PrivateCollegeDetails from "../components/PrivatePage/PrivateCollegeDetails";
import AdmissionPage from "../pages/AdmissionPage/AdmissionPage";
import PrivateProfile from "../components/PrivatePage/PrivateProfile";

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
                path: "/admission/",
                Component: AdmissionPage,
            },
            {
                path: "/admission/:id",
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
                Component: PrivateProfile,
            },
            {
                path: "/forgot-password",
                Component: PasswordReset,
            },
            {
                path: "/colleges",
                Component: Colleges,
            },
            {
                path: "/colleges/:id",
                Component: PrivateCollegeDetails,
            },
            {
                path: "*",
                Component: NotFound,
            },
        ],
    },
]);

export default router;