import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateAdmissionForm from "../components/PrivatePage/PrivateAdmissionForm";

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
                path: "*",
                Component: NotFound,
            },
        ],
    },
]);

export default router;