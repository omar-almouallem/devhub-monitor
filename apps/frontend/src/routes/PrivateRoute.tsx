import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
interface PrivateRouteProps
{
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) =>
{
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
