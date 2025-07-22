import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';

import { AuthContext } from './contexts/AuthContext';
import Spinner from './pages/loading';

const PrivateRoute = ({ children }) => {
    
    const { user,loading } = use(AuthContext);
    const location = useLocation();
   


    if(loading){
        return <Spinner></Spinner>
    }
    if(user && user.email){
        return children;
    }

    return  <Navigate state={location.pathname} to="/login" />;
};


export default PrivateRoute;