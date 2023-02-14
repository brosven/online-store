import { List, ListItemText, ListItemButton } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../index';

export const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <List sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {device.brands.map((brand) => (
        <ListItemButton
          key={brand.id}
          onClick={() => {
            device.setSelectedBrand(brand);
          }}
          selected={device.selectedBrand ? brand.id === device.selectedBrand.id : false}
        >
          <ListItemText primary={brand.name} />
        </ListItemButton>
      ))}
    </List>
  );
});
