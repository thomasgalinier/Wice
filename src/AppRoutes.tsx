
import { useRoutes } from 'react-router-dom';


import Home from './scenes/Home/Home';
import Header from './components/Header';
import Login from './scenes/Login/Login';
import Register from './scenes/Register/Register';
import User from './scenes/User/User';

const AppRoutes = () => {

  
  return useRoutes([
    {
      path: '/',
      element: (
        <>
          <Header />
          <Home />
        </>
      )
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },

    {
      path: '/user',
      element:
        <>
          <Header />
          <User />
        </>
    }
  ]);
};

export default AppRoutes;
