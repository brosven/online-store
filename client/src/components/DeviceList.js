import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../index';
import { Box } from '@mui/material';
import { DeviceItem } from './DeviceItem';

export const DeviceList = observer(() => {
  const { device } = useContext(Context);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: { xs: 'center', sm: 'stretch' },
        pt: '10px',
        gap: { xs: 5, sm: 2 },
      }}
    >
      {device.devices.map((device) => (
        <DeviceItem key={device.id} device={device} />
      ))}
    </Box>
  );
});
