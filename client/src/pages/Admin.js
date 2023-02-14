import { useState } from 'react';
import { Container, Button } from '@mui/material';
import { CreateType } from '../components/modals/CreateType';
import { CreateBrand } from '../components/modals/CreateBrand';
import { CreateDevice } from '../components/modals/CreateDevice';

export const Admin = () => {
  const [typeModalVisibility, setTypeModalVisibility] = useState(false);
  const [brandModalVisibility, setBrandModalVisibility] = useState(false);
  const [deviceModalVisibility, setDeviceModalVisibility] = useState(false);

  const handleAddTypeClick = () => setTypeModalVisibility(true);
  const handleAddBrandClick = () => setBrandModalVisibility(true);
  const handleAddDeviceClick = () => setDeviceModalVisibility(true);

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: '20px' }}>
      <Button variant="outlined" onClick={handleAddTypeClick}>
        Добавить тип
      </Button>
      <Button variant="outlined" onClick={handleAddBrandClick}>
        Добавить бренд
      </Button>
      <Button variant="outlined" onClick={handleAddDeviceClick}>
        Добавить устройство
      </Button>
      <CreateType visibility={typeModalVisibility} setVisibility={setTypeModalVisibility} />
      <CreateBrand visibility={brandModalVisibility} setVisibility={setBrandModalVisibility} />
      <CreateDevice visibility={deviceModalVisibility} setVisibility={setDeviceModalVisibility} />
    </Container>
  );
};
