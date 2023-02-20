import { List, ListItemText, ListItemButton, Button, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Context } from '../index';

export const TypeBar = observer(() => {
  const { device } = useContext(Context);
  const [isOpen, setIsOpen] = useState(true);

  const typeToggle = (type) => {
    if (device.selectedType.id) {
      device.selectedType.id === type.id ? device.setSelectedType({}) : device.setSelectedType(type);
    } else {
      device.setSelectedType(type);
    }
  };

  const isOpenToggler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Button
        onClick={isOpenToggler}
        endIcon={isOpen ? <VisibilityOffIcon /> : <VisibilityIcon />}
        sx={{ display: { sm: 'none' }, width: '100%', fontSize: '0.9rem', textTransform: 'none' }}
      >
        {isOpen ? 'Скрыть типы' : 'Показать типы'}
      </Button>
      {isOpen && (
        <List sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, flexWrap: 'wrap' }}>
          {device.types.map((type) => (
            <ListItemButton
              key={type.id}
              onClick={() => typeToggle(type)}
              selected={device.selectedType.id ? type.id === device.selectedType.id : false}
              sx={{ minWidth: '100px' }}
            >
              <ListItemText primary={type.name} />
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
});
