import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({children}) => {

     const {authenticate} = useSelector(state=>state.auth);
     return authenticate ? children : <Navigate to="/messenger/login" />


 
};

export default ProtectRoute;

