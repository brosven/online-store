import { Button, styled } from '@mui/material';

export const WhiteButton = styled(Button)({
  backgroundColor: 'transparent',
  border: '1px solid rgb(255, 255, 255, 0.3)',
  color: '#Ffffff',
  '&:hover': {
    backgroundColor: '#Ffffff',
    border: 'Ffffff',
    color: 'rgb(0, 30, 60)',
  },
  '&:active': {
    backgroundColor: '#F3f3f3',
    border: '#F3f3f3',
    color: 'rgb(0, 30, 60)',
  },
});
