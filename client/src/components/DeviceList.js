import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../index';
import { Box } from '@mui/material';
import { DeviceItem } from './DeviceItem';

export const DeviceList = observer(() => {
  const { device } = useContext(Context);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
      {device.devices.map((device) => (
        <DeviceItem key={device.id} device={device} />
      ))}
    </Box>
  );
});
