import { useContext } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Container, Typography, Toolbar, Box, AppBar } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { WhiteButton } from './WhiteButton';
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

export const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthorizationPage = location.pathname === LOGIN_ROUTE || location.pathname === REGISTRATION_ROUTE;

  const handleAuth = () => {
    navigate(LOGIN_ROUTE);
  };

  const handleAdminPanelClick = () => navigate(ADMIN_ROUTE);

  const handleLogoutClick = () => {
    navigate(LOGIN_ROUTE);
    user.setIsAuth(false);
    user.setUser({});
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'rgb(0, 30, 60)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <NavLink to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
              <LocalMallIcon sx={{ marginRight: '7px' }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: 'flex',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                Test Shop
              </Typography>
            </NavLink>

            <Box sx={{ display: 'flex', marginLeft: 'auto', gap: 2 }}>
              {!isAuthorizationPage &&
                (user.isAuth ? (
                  [
                    <WhiteButton onClick={handleAdminPanelClick} key="Админ панель" variant="outlined">
                      Админ панель
                    </WhiteButton>,
                    <WhiteButton onClick={handleLogoutClick} key="Войти" variant="outlined">
                      Выйти
                    </WhiteButton>,
                  ]
                ) : (
                  <WhiteButton onClick={handleAuth} variant="outlined">
                    Авторизация
                  </WhiteButton>
                ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
});
