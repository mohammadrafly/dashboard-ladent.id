import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import AppLayouts from "../Layouts/AppLayouts";
import LoadingSpinner from "../Components/LoadingComponents";

const ProtectedRoute = ({ element }) => {
    const { authChecked, isAuthenticated } = useAuth();
    const location = useLocation();
    const message = location.state?.message || '';

    if (!authChecked) {
        return (
            <AppLayouts>
                <div className="flex justify-center items-center h-full">
                    <LoadingSpinner />
                </div>
            </AppLayouts>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ error: 'You need to log in to access this page.' }} />;
    }

    return React.cloneElement(element, { error: message });
};

export default ProtectedRoute;