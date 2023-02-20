import { Container, Card, Typography, Input, Box, Button } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { registration, login } from '../http/userAPI';
import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

export const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState('');
  const handleChangeEmail = (e) => setEmail(e.target.value);

  const [password, setPassword] = useState('');
  const handleChangePasswrod = (e) => setPassword(e.target.value);

  const signInOrReg = async () => {
    try {
      let userData;
      if (isLogin) {
        userData = await login(email, password);
      } else {
        userData = await registration(email, password);
      }
      user.setUser(userData);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: window.innerHeight - 164 }}
    >
      <Card sx={{ minWidth: '240px', p: 5 }}>
        <Typography
          variant="h4"
          sx={{
            margin: 'auto',
            fontFamily: 'monospace',
            fontWeight: 700,
          }}
        >
          {isLogin ? 'Авторизация' : 'Регистрация'}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} component="form">
          <Input
            value={email}
            onChange={handleChangeEmail}
            label="email"
            variant="standard"
            placeholder="Введите ваш email"
            type="email"
          />
          <Input
            value={password}
            onChange={handleChangePasswrod}
            label="password"
            variant="standard"
            placeholder="Введите ваш пароль"
            type="password"
          />
          <Button onClick={signInOrReg} variant="contained">
            {isLogin ? 'Войти' : 'Регистрация'}
          </Button>
        </Box>
        {isLogin ? (
          <Typography sx={{ paddingTop: '10px' }}>
            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегестрируйтесь!</NavLink>
          </Typography>
        ) : (
          <Typography sx={{ paddingTop: '10px' }}>
            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
          </Typography>
        )}
      </Card>
    </Container>
  );
});
