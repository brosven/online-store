import { Card, CardMedia, CardContent, Typography, Box, Button, Rating } from '@mui/material';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDevice } from '../http/deviceApi';

export const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();

  useEffect(() => {
    getDevice(id).then((data) => setDevice(data));
  }, []);

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: { xs: 'center', md: 'stretch' },
        flexDirection: { xs: 'column', md: 'row' },
        padding: { xs: '15px 0', sm: '15px' },
        width: 'fit-content',
        margin: '20px auto',
      }}
    >
      <CardMedia
        sx={{
          height: {
            xs: '220px',
            sm: '230px',
            lg: '410px',
          },
          width: {
            xs: '200px',
            sm: '225px',
            md: '210px',
            lg: '390px',
          },
        }}
        image={process.env.REACT_APP_API_URL + device.img}
        title={device.name}
      />
      <CardContent>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: 500,
            fontSize: {
              xs: '1.5rem',
              md: '2.5rem',
            },
          }}
        >
          {device.name}
        </Typography>
        <Rating value={device.rating || 0} readOnly />
        <Typography
          variant="h3"
          component="h3"
          sx={{
            fontWeight: 500,
            fontSize: {
              xs: '1.2rem',
              md: '1.75rem',
            },
            marginBottom: '10px',
          }}
        >
          Характеристики
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {device.info.map((el) => (
            <Typography key={el.id} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ color: '#7e7e83' }} component="span" key={el.id + 'title'}>
                {el.title + ':'}
              </Typography>
              {el.description}
            </Typography>
          ))}
        </Box>
      </CardContent>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: {
              xs: '200px',
              md: '280px',
              lg: '350px',
            },
            borderColor: 'rgba(25, 118, 210, 0.5)',
            borderRadius: '10px',
            borderWidth: '1px',
            borderStyle: 'solid',
            p: '15px',
            gap: {
              xs: 1,
              md: 2,
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: {
                xs: '1.75rem',
                lg: '2.3rem',
              },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {device.price}
            <CurrencyRubleIcon
              sx={{
                fontSize: {
                  xs: '1.2rem',
                  md: '1.75rem',
                  lg: '2.3rem',
                },
              }}
            />
          </Typography>
          <Button
            variant="outlined"
            sx={{
              width: { xs: '210px', md: '230px', lg: '300px' },
            }}
          >
            Добавить в корзину
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: {
              xs: '200px',
              md: '280px',
              lg: '350px',
            },
            borderColor: 'rgba(25, 118, 210, 0.5)',
            borderRadius: '10px',
            borderWidth: '1px',
            borderStyle: 'solid',
            p: '15px',
            gap: 1,
          }}
        >
          <Typography
            variant="h5"
            component="h4"
            sx={{
              fontWeight: 700,
              fontSize: '1.2rem',
            }}
          >
            Способы получения заказа
          </Typography>

          <Typography>Самовывоз за 15 минут из 20 магазинов Test Shop сегодня, бесплатно</Typography>
          <Typography>Самовывоз из 34 магазинов Test Shop завтра и позже, бесплатно</Typography>
          <Typography>Доставка завтра, бесплатно</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
