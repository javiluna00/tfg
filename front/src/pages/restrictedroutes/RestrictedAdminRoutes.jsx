import useAuth from '@/hooks/useAuth';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function RestrictedAdminRoutes() {

    const {isAdmin} = useAuth();

    if(!isAdmin()) {
        return <Navigate to="/404" />
    }
    else
    {
        return(
            <Outlet />
        )
    }

}

export default RestrictedAdminRoutes