import { List, ListItemText, ListItemButton, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Context } from '../index';

export const BrandBar = observer(() => {
  const { device } = useContext(Context);
  const [isOpen, setIsOpen] = useState(true);

  const brandToggle = (brand) => {
    if (device.selectedBrand.id) {
      device.selectedBrand.id === brand.id ? device.setSelectedBrand({}) : device.setSelectedBrand(brand);
    } else {
      device.setSelectedBrand(brand);
    }
  };

  const isOpenToggler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Button
        onClick={isOpenToggler}
        endIcon={isOpen ? <VisibilityOffIcon /> : <VisibilityIcon />}
        sx={{ display: { sm: 'none' }, width: '100%', fontSize: '0.9rem', textTransform: 'none' }}
      >
        {isOpen ? 'Скрыть бренды' : 'Показать бренды'}
      </Button>
      {isOpen && (
        <List
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: 'fit-content',
          }}
        >
          {device.brands.map((brand) => (
            <ListItemButton
              sx={{ width: '100px' }}
              key={brand.id}
              onClick={() => brandToggle(brand)}
              selected={device.selectedBrand.id ? brand.id === device.selectedBrand.id : false}
            >
              <ListItemText primary={brand.name} />
            </ListItemButton>
          ))}
        </List>
      )}
    </>
  );
});
