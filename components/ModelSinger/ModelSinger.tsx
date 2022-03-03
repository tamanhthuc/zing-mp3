import InputComment from '../UserComment/InputComment';
import ListUserComment from '../UserComment/ListUserComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { Box } from '@mui/material';
import { SingerProvider } from '../../context/SingerContext';
import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/reducers';
export interface IModelSingerProps {
  singerModel: {
    avatar: string;
    id: string;
    image: string;
    message: string;
    name: string;
    time: string;
  };
}

export default function ModelSinger({ singerModel }: IModelSingerProps) {
  console.log('singerModelId', singerModel.id);
  const { avatar, id, image, message, name, time } = singerModel;
  const isSignIn = useSelector((state: IRootState) => state.models.isSign);
  const handleBoxClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event?.stopPropagation();
  };

  return (
    <Box id="model__singer">
      <Box
        sx={{
          height: '70vh',
          maxWidth: '70vw',
          minWidth: '600px',
          borderRadius: '4px',
          display: 'flex',
          
          // justifyContent: "center",
          // alignItems:"center"
        }}
        onClick={handleBoxClick}
      >
        <Box
          sx={{
            height: '100%',
            width: 'calc(70vw - 360px)',
            position: 'relative',
            overflow: 'hidden',
            bgcolor: '#000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: '0',
          }}
        >
          <Box></Box>
          <Box
            sx={{ maxHeight: '100%', margin: 'auto', objectFit: 'cover' }}
            component="img"
            src={image}
            alt=""
          />
          <Box></Box>
        </Box>
        <Box />
        <Box
          sx={{
            bgcolor: '#432275',
            minWidth: '360px',
            maxWidth: '600px',
            width: '100%',
            height: '100%',
            overflowY: 'scroll',
            position: 'relative',
          }}
        >
          <Box sx={{ ml: '20px', mt: '15px', display: 'flex', color: '#fff', fontSize: '14px'}}>
            <Box
              component="img"
              sx={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              src={avatar}
              alt=""
            />
            <Box sx={{ ml: '10px' }}>
              <Box>{name}</Box>
              <Box sx={{ fontSize: '12px', color: 'hsla(0,0%,100%,0.5)' }}>{time}</Box>
            </Box>
          </Box>

          <Box
            sx={{
              mx: '20px',
              mt: '15px',
              color: '#fff',
              fontSize: '14px',
              borderTop: '1px solid hsla(0,0%,100%,0.05)',
              borderBottom: '1px solid hsla(0,0%,100%,0.05)',
              py: '6px',
            }}
          >
            {message}
          </Box>

          <Box
            sx={{
              mx: '20px',
              color: '#fff',
              fontSize: '14px',
              borderBottom: '1px solid hsla(0,0%,100%,0.05)',
              py: '6px',
              display: 'flex',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FavoriteBorderIcon sx={{ transform: 'scale(0.8)' }} />
              <Box sx={{ ml: '6px' }}>Thích</Box>
            </Box>
            <Box sx={{ display: 'flex', ml: '20px' }}>
              <ShareIcon sx={{ transform: 'scale(0.8)' }} />
              <Box sx={{ ml: '6px' }}>Chia sẻ</Box>
            </Box>
          </Box>

          <Box sx={{ color: '#fff', ml: '20px', mt: '15px', fontSize: '12px', fontWeight: '600' }}>
            2 lượt thích
          </Box>
          <Box sx={{ color: '#fff', ml: '20px', mt: '15px', fontSize: '18px', fontWeight: '600' }}>
            Bình Luận
          </Box>
          <SingerProvider>
            <ListUserComment id={singerModel?.id} />
           {isSignIn && <InputComment id={singerModel?.id} />}
          </SingerProvider>
          {!isSignIn && (
            <Box
              sx={{
                color: '#fff',
                mx: '20px',
                mt: '15px',
                bgcolor: 'hsla(0,0%,100%,0.1)',
                py: '10px',
                px: '5px',
              }}
            >
              Bạn Phải đăng nhập mới bình luận được
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
