import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = () => {
    const userInfo = useSelector(state => state.auth);

    // if user doesn't have group
    if (!userInfo.hasOwnProperty('group')) {
      return <Navigate to='/' replace />
    }

    // check if user have admin role
    const allow = userInfo.group.includes('W_ADMIN');

    return allow ? (
        <>
          <Header />
          <Outlet />
        </>
      ) : <Navigate to='/' replace />
}

export default AdminRoute