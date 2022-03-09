import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { Box } from '@mui/material';
import React from 'react';
export interface IItemSingerProps {
  singerItem: {
    avatar: string;
    name: string;
    message: string;
    id: string;
    image: string;
    time: string;
    comments: string;
  };
}

export default function ItemSinger({ singerItem }: IItemSingerProps) {
  return (
    <Box className="itemSinger">
      <Box className="itemSinger__list">
        <Box component="img" src={singerItem.avatar} alt="dd" className="itemSinger__list__img" />
        <Box className="itemSinger__list__info">
          <Box className="itemSinger__list__info__name">{singerItem.name}</Box>
          <Box className="itemSinger__list__info__time">{singerItem.time}</Box>
        </Box>
      </Box>
      <Box className="itemSinger__message">{singerItem.message}</Box>
      <img  className="itemSinger__img" src={singerItem.image} alt="" />

      <Box sx={{ display: 'flex', mt: '10px', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', mr: '20px' }}>
          <FavoriteBorderIcon />
          <Box sx={{ ml: '10px' }}>0</Box>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <ModeCommentIcon />
          <Box sx={{ ml: '10px' }}>{singerItem?.comments?.length}</Box>
        </Box>
      </Box>
    </Box>
  );
}
