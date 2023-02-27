import { List, ListItemText, ListItemButton, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Context } from '../index';

export const BrandBar = observer(() => {
  const { brand, device } = useContext(Context);
  const [isOpen, setIsOpen] = useState(true);

  const handleResetBrand = () => {
    brand.setSelectedBrand({});
    device.setPage(1);
  };

  const handleSelectBrand = (el) => {
    brand.setSelectedBrand(el);
    device.setPage(1);
  };

  const brandToggle = (el) => {
    if (brand.selectedBrand.id) {
      brand.selectedBrand.id === el.id ? handleResetBrand() : handleSelectBrand(el);
    } else {
      brand.setSelectedBrand(el);
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
          {brand.brands.map((el) => (
            <ListItemButton
              sx={{ width: '100px' }}
              key={el.id}
              onClick={() => brandToggle(el)}
              selected={brand.selectedBrand.id ? el.id === brand.selectedBrand.id : false}
            >
              <ListItemText primary={el.name} />
            </ListItemButton>
          ))}
        </List>
      )}
    </>
  );
});
