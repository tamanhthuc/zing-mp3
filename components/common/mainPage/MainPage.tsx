import Slider from '../../slider/Slider'
import { Box } from '@mui/system';
import React from 'react';
import ListMusic from '../ListMusic/ListMusic';

export default function MainPage() {
  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <Slider />
      <ListMusic />
    </Box>
  );
}
