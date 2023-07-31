import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './index.css'
import store from './store';
import { Provider } from 'react-redux';
import PrivateRoute from './components/PrivateRoute.jsx';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import LoginScreen from './screens/LoginScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import ChangePasswordScreen from './screens/ChangePasswordScreen.jsx';
import AdminScreen from './screens/AdminScreen.jsx';
import { userLoader } from './loaders/userLoader.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={ true } path="/" element={ <LoginScreen /> } />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/home' element={<HomeScreen />}></Route>
        <Route path='/profile' element={ <ProfileScreen /> } />
        <Route path='/change-password' element={ <ChangePasswordScreen /> } />
        <Route path='/view' element={ <AdminScreen /> } loader={ userLoader } />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
