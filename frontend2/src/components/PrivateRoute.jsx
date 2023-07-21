import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : <Navigate to='/' replace />
}

export default PrivateRoute