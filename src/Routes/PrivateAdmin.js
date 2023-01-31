import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Components/Loading';
import { useAdmin } from '../Components/useAdmin';
import { AuthContext } from '../ContextApi/UserContext';

const PrivateAdmin = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, adminLoading] = useAdmin(user?.email)
    const location = useLocation()
    if (loading || adminLoading) {
        return <Loading></Loading>
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate to='/noAccess' state={{ from: location }} replace></Navigate>
};

export default PrivateAdmin;