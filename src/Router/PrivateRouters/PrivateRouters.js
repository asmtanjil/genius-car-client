import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const PrivateRouters = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) {
    return <h2>Loading</h2>
  }

  if (user) {
    return children
  }

  return <Navigate state={{ from: location }} replace></Navigate>
};

export default PrivateRouters;