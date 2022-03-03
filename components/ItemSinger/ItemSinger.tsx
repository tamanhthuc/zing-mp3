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
    comments: string
  };
}

export default function ItemSinger({ singerItem }: IItemSingerProps) {
  console.log("ItemSinger", singerItem)
  
  return (
    <Box
      sx={{
        bgcolor: 'hsla(0,0%,100%,0.1)',
        p: '20px',
        boxShadow: '0 2px 10px 0',
        borderRadius: '8px',
        position: 'relative',
        color: '#fff',
        width: '499px',
        mb: '50px',
        cursor: 'pointer',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{ width: '50px', height: '50px', borderRadius: '50%' }}
          component="img"
          src={singerItem.avatar}
          alt="dd"
        />
        <Box sx={{ ml: '6px' }}>
          <Box sx={{ fontSize: '14px' }}>{singerItem.name}</Box>
          <Box sx={{ fontSize: '12px', fontWeight: '300', color: 'hsla(0,0%,100%,0.5)' }}>
            {singerItem.time}
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: '10px', fontSize: '14px' }}>{singerItem.message}</Box>
      <Box
        component="img"
        src={singerItem.image}
        alt=""
        sx={{ width: '100%', mt: '10px', height: '80vh', borderRadius: '10px', objectFit: 'cover' }}
      />

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
