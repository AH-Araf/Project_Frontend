/* eslint-disable react/prop-types */

import  { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import Loader from '../components/Loader/Loader';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loader></Loader>;
    }

    if (user) {
        return children;
    }

    return <Navigate to="/pleaseLoginFirst" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;