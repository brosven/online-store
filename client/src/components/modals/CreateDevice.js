import {
  Modal,
  Box,
  Typography,
  Button,
  ButtonGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { createDevice, getBrands, getTypes } from '../../http/deviceApi';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';

export const CreateDevice = observer(({ visibility, setVisibility }) => {
  const { type, brand } = useContext(Context);
  const handleClose = () => setVisibility(false);

  useEffect(() => {
    getTypes().then((data) => type.setTypes(data));
    getBrands().then((data) => brand.setBrands(data));
  }, []);

  const [deviceFields, setdeviceFields] = useState({ brand: '', type: '', deviceName: '', devicePrice: 0 });
  const handleChangeBrand = (event) => {
    setdeviceFields((prev) => ({ ...prev, brand: event.target.value }));
  };
  const handleChangeType = (event) => {
    setdeviceFields((prev) => ({ ...prev, type: event.target.value }));
  };

  const handleChangeDeviceName = (event) => {
    setdeviceFields((prev) => ({ ...prev, deviceName: event.target.value }));
  };

  const handleChangeDevicePrice = (event) => {
    setdeviceFields((prev) => ({ ...prev, devicePrice: Number(event.target.value) }));
  };

  const [file, setFile] = useState(null);

  const handleSelectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const [info, setInfo] = useState([]);
  const handleAddInfo = () => {
    setInfo((prevInfo) => [...prevInfo, { title: '', description: '', number: Date.now() }]);
  };

  const handleRemoveInfo = (id) => {
    setInfo((prevInfo) => prevInfo.filter((i) => i.number !== id));
  };

  const handleChangeInfoTitle = (id, title) => {
    setInfo((prevInfo) =>
      prevInfo.map((i) => {
        return i.number === id ? { ...i, title } : i;
      }),
    );
  };

  const handleChangeInfoDescription = (id, description) => {
    setInfo((prevInfo) =>
      prevInfo.map((i) => {
        return i.number === id ? { ...i, description } : i;
      }),
    );
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append('name', deviceFields.deviceName);
    formData.append('price', `${deviceFields.devicePrice}`);
    formData.append('img', file);
    formData.append('brandId', `${deviceFields.brand}`);
    formData.append('typeId', `${deviceFields.type}`);
    formData.append('info', JSON.stringify(info));

    createDevice(formData).then((_) => handleClose());
  };

  return (
    <Modal open={visibility} onClose={handleClose} aria-labelledby="modal-modal-title" sx={{ overflow: 'scroll' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          position: 'absolute',
          top: { xs: '58%', sm: '50%' },
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '220px', sm: '400px' },
          bgcolor: '#fff',
          borderRadius: '5px',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h5" component="h3">
          ???????????????? ????????????????????
        </Typography>

        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="type-label">???????????????? ??????</InputLabel>
            <Select value={deviceFields.type} label="???????????????? ??????" onChange={handleChangeType} labelId="type-label">
              {type.types.map((type) => (
                <MenuItem key={type.name} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="brand-label">???????????????? ??????????</InputLabel>
            <Select
              value={deviceFields.brand}
              label="???????????????? ??????????"
              onChange={handleChangeBrand}
              labelId="brand-label"
            >
              {brand.brands.map((brand) => (
                <MenuItem key={brand.name} value={brand.id}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            value={deviceFields.deviceName}
            onChange={handleChangeDeviceName}
            placeholder="?????????????? ???????????????? ??????????????????"
          />
          <TextField
            value={deviceFields.devicePrice}
            onChange={handleChangeDevicePrice}
            placeholder="?????????????? ?????????????????? ??????????????????"
            type="number"
          />
          <input type="file" accept="image/*" onChange={handleSelectFile} />

          <Button variant="outlined" onClick={handleAddInfo}>
            ???????????????? ?????????? ????????????????
          </Button>

          {info.map((i) => (
            <Box key={i.number} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                value={i.title}
                onChange={(e) => handleChangeInfoTitle(i.number, e.target.value)}
                placeholder="?????????????? ???????????????? ????????????????"
              />
              <TextField
                value={i.description}
                onChange={(e) => handleChangeInfoDescription(i.number, e.target.value)}
                placeholder="?????????????? ???????????????? ????????????????"
              />
              <Button onClick={() => handleRemoveInfo(i.id)}>??????????????</Button>
            </Box>
          ))}

          <ButtonGroup variant="text" aria-label="???????????? ???????????????????? ?????????????????? ??????????">
            <Button color="primary" onClick={addDevice}>
              ????????????????
            </Button>
            <Button onClick={handleClose} color="error">
              ??????????????
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Modal>
  );
});
