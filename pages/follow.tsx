import { MainLayout } from '../components/layout';
import ListSinger from '../components/ListSinger/ListSinger';
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../redux/reducers';

export default function Follow() {
  const singerModel = useSelector((state:IRootState) => state.models.singerModel);

  return (
    <Box sx={{  mr: '30px', mt: '90px', mb: '100px', position: 'relative' }}>
      <ListSinger />
    </Box>
  );
}
Follow.Layout = MainLayout;

