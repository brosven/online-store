import { Modal, Box, Typography, Button, TextField, ButtonGroup } from '@mui/material';
import { useState } from 'react';
import { createBrand } from '../../http/deviceApi';

export const CreateBrand = ({ visibility, setVisibility }) => {
  const handleClose = () => setVisibility(false);
  const [brand, setBrand] = useState('');
  const handleBrandChange = (e) => setBrand(e.target.value);

  const handleAddBrand = () => {
    createBrand({ name: brand }).then((data) => {
      setBrand('');
      setVisibility(false);
    });
  };

  return (
    <Modal open={visibility} onClose={handleClose} aria-labelledby="modal-modal-title">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          position: 'absolute',
          top: '50%',
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
          Добавить бренд
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField value={brand} onChange={handleBrandChange} placeholder="Введите название бренда" />
        </Box>
        <ButtonGroup variant="text" aria-label="Кнопки управления модальным окном">
          <Button color="primary" onClick={handleAddBrand}>
            Добавить
          </Button>
          <Button onClick={handleClose} color="error">
            Закрыть
          </Button>
        </ButtonGroup>
      </Box>
    </Modal>
  );
};
