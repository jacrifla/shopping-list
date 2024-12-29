import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PrivateRoute = ({ element }) => {
  const userId = useUser();

  if (!userId) {
    <Navigate to="/" />
  }

  return element;
};

export default PrivateRoute;
