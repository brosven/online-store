import { useContext, useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { Container, Typography, Toolbar, AppBar, IconButton, Menu, MenuItem } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import { Context } from '../index';

export const NavBar = observer(() => {
  const { user } = useContext(Context);

  const [anchorMenuEl, setAnchorMenuEl] = useState(null);
  const menuOpen = Boolean(anchorMenuEl);

  const navigate = useNavigate();
  const location = useLocation();

  const isAuthorizationPage = location.pathname === LOGIN_ROUTE || location.pathname === REGISTRATION_ROUTE;

  const handleAnchorMenuElClick = (event) => {
    setAnchorMenuEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorMenuEl(null);
  };

  const handleAuth = () => {
    handleCloseMenu();
    navigate(LOGIN_ROUTE);
  };

  const handleAdminPanelClick = () => {
    handleCloseMenu();
    navigate(ADMIN_ROUTE);
  };

  const handleLogoutClick = () => {
    handleCloseMenu();
    navigate(LOGIN_ROUTE);
    user.setIsAuth(false);
    user.setUser({});
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'rgb(0, 30, 60)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ display: 'flex', flexWrap: 'wrap' }}>
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

            {!isAuthorizationPage && (
              <>
                <IconButton
                  id="nav-menu-openener"
                  aria-controls={menuOpen ? 'close-navigation-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={menuOpen ? 'true' : undefined}
                  onClick={handleAnchorMenuElClick}
                  sx={{ display: 'flex', marginLeft: 'auto', color: 'white' }}
                >
                  <MenuSharpIcon />
                </IconButton>
                <Menu
                  id="nav-menu"
                  anchorEl={anchorMenuEl}
                  open={menuOpen}
                  onClose={handleCloseMenu}
                  disableScrollLock={true}
                  MenuListProps={{
                    'aria-labelledby': 'close-navigation-menu',
                  }}
                >
                  {user.isAuth ? (
                    [
                      <MenuItem onClick={handleAdminPanelClick} key="Админ панель" variant="outlined">
                        Админ панель
                      </MenuItem>,
                      <MenuItem onClick={handleLogoutClick} key="Войти" variant="outlined">
                        Выйти
                      </MenuItem>,
                    ]
                  ) : (
                    <MenuItem key="Авторизация" onClick={handleAuth} variant="outlined">
                      Авторизация
                    </MenuItem>
                  )}
                </Menu>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
});
