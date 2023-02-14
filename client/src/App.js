import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { authRoutes, publicRoutes } from './routes';
import { useContext, useEffect, useState } from 'react';
import { Context } from './index';
import { NavBar } from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { CircularProgress, Box } from '@mui/material/';
import { check } from './http/userAPI';
import './App.css';

export const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then(() => {
        user.setUser(true);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  const router = user.isAuth
    ? createBrowserRouter([
        {
          path: '/',
          element: <NavBar />,
          children: [...authRoutes, ...publicRoutes],
        },
      ])
    : createBrowserRouter([
        {
          path: '/',
          element: <NavBar />,
          children: publicRoutes,
        },
      ]);

  return <RouterProvider router={router} />;
});
