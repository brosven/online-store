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
        flexDirection: 'row',
        padding: '15px 30px',
        width: 'fit-content',
        margin: '20px auto',
      }}
    >
      <CardMedia
        sx={{ height: '550px', width: '450px' }}
        image={process.env.REACT_APP_API_URL + device.img}
        title={device.name}
      />
      <CardContent>
        <Typography variant="h2" component="h2" sx={{ fontWeight: 500 }}>
          {device.name}
        </Typography>
        <Rating value={device.rating || 0} readOnly />
        <Typography variant="h3" component="h3" sx={{ fontWeight: 500, fontSize: '2.3rem', marginBottom: '20px' }}>
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
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '300px',
          height: '110px',
          borderColor: 'rgba(25, 118, 210, 0.5)',
          borderRadius: '10px',
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: '2.5rem', display: 'flex', alignItems: 'center' }}>
          {device.price}
          <CurrencyRubleIcon sx={{ fontSize: '2.5rem' }} />
        </Typography>
        <Button variant="outlined">Добавить в корзину</Button>
      </CardContent>
    </Card>
  );
};
