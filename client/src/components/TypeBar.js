import { List, ListItemText, ListItemButton } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../index';

export const TypeBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <List>
      {device.types.map((type) => (
        <ListItemButton
          key={type.id}
          onClick={() => {
            device.setSelectedType(type);
          }}
          selected={device.selectedType ? type.id === device.selectedType.id : false}
        >
          <ListItemText primary={type.name} />
        </ListItemButton>
      ))}
    </List>
  );
});
