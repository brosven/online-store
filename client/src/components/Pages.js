import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Stack, Pagination } from '@mui/material';

export const Pages = observer(() => {
  const { device } = useContext(Context);

  const pageCount = Math.ceil(device.totalCount / device.limit);

  const handlePageChange = (event, value) => {
    device.setPage(value);
  };

  return (
    <Stack spacing={2} sx={{ pb: '20px' }}>
      <Pagination count={pageCount} page={device.page} onChange={handlePageChange} variant="outlined" color="primary" />
    </Stack>
  );
});
