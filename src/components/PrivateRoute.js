import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Loading from './Loading';

const PrivateRoute = ({ element }) => {
  const userId = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!userId) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
