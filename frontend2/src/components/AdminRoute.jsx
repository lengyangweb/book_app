import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    // get user info
    const { userInfo } = useSelector(state => state.auth);

    // if user doesn't have group
    if (!userInfo || !userInfo.hasOwnProperty('group') || !userInfo.group.includes('W_ADMIN')) {
      return <Navigate to='/home' />
    }

    return(
        <>
          <Outlet />
        </>
    ) 
}

export default AdminRoute