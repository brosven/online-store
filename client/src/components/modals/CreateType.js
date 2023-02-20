import { Modal, Box, Typography, Button, TextField, ButtonGroup } from '@mui/material';
import { useState } from 'react';
import { createType } from '../../http/deviceApi';

export const CreateType = ({ visibility, setVisibility }) => {
  const [type, setType] = useState('');
  const handleTypeChange = (e) => setType(e.target.value);
  const handleClose = () => setVisibility(false);

  const handleAddType = () => {
    createType({ name: type }).then((data) => {
      setType('');
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
          Добавить тип
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField value={type} onChange={handleTypeChange} placeholder="Введите название типа" />
        </Box>
        <ButtonGroup variant="text" aria-label="Кнопки управления модальным окном">
          <Button color="primary" onClick={handleAddType}>
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
