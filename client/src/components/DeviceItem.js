import { Card, CardMedia, CardContent, Typography, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';

export const DeviceItem = ({ device }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(DEVICE_ROUTE + '/' + device.id);
  };

  return (
    <Card onClick={handleCardClick} sx={{ cursor: 'pointer', padding: '10px' }}>
      <CardMedia
        sx={{ height: { xs: '260px', sm: '200px' }, width: { xs: '250px', sm: '180px' } }}
        image={process.env.REACT_APP_API_URL + device.img}
        title={device.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h3"
          component="h3"
          sx={{
            fontSize: '1rem',
            fontWeight: 500,
            maxWidth: { xs: '200px', sm: '150px' },
            overflowWrap: 'break-word',
          }}
        >
          {device.name}
        </Typography>
        <Rating value={device.rating || 0} readOnly />
      </CardContent>
    </Card>
  );
};
