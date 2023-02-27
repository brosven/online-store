import { List, ListItemText, ListItemButton, Button, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Context } from '../index';

export const TypeBar = observer(() => {
  const { type, device } = useContext(Context);
  const [isOpen, setIsOpen] = useState(true);

  const handleResetType = () => {
    type.setSelectedType({});
    device.setPage(1);
  };

  const handleSelectType = (el) => {
    type.setSelectedType(el);
    device.setPage(1);
  };

  const typeToggle = (el) => {
    if (type.selectedType.id) {
      type.selectedType.id === el.id ? handleResetType() : handleSelectType(el);
    } else {
      type.setSelectedType(el);
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
          {type.types.map((el) => (
            <ListItemButton
              key={el.id}
              onClick={() => typeToggle(el)}
              selected={type.selectedType.id ? el.id === type.selectedType.id : false}
              sx={{ minWidth: '100px' }}
            >
              <ListItemText primary={el.name} />
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
});
