import { Container, Box } from '@mui/material';
import { BrandBar } from '../components/BrandBar';
import { DeviceList } from '../components/DeviceList';
import { TypeBar } from '../components/TypeBar';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Context } from '../index';
import { getBrands, getDevices, getTypes } from '../http/deviceApi';
import { Pages } from '../components/Pages';

export const Shop = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    getTypes().then((data) => device.setTypes(data));
    getBrands().then((data) => device.setBrands(data));
    getDevices(null, null, device.page, device.limit).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    getDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand]);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 1, sm: 2 },
      }}
    >
      <TypeBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <BrandBar />
        <DeviceList />
        <Pages />
      </Box>
    </Container>
  );
});
