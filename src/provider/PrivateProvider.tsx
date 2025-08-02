import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hook/useAuth";

interface PrivateProviderProps {
    children: ReactNode;
}

const PrivateProvider = ({ children }: PrivateProviderProps) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <p>Loading.....</p>
    }

    if (user) {
        return <>{children}</>;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateProvider;