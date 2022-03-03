import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { setSongModel } from '../../redux/actions/model';
import { setRunning } from '../../redux/actions/music';
import { addYourPlaylists } from '../../redux/actions/playlists';
import { ThemeContext } from '../../context/ThemeContext';

export default function ModelSlider({songModel}: any) {
  const {image, name, singer, song,id} = songModel;
  
 
  const value = useContext(ThemeContext);
  const { backgroundUrl, setBackgroundUrl }: any = value;
  

  const handleBoxClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event?.stopPropagation();
  }
  
  const dispatch = useDispatch();
  const handleRenderSong = (songModel: any) => {
    
    dispatch(setRunning(songModel));
    dispatch(setSongModel({ id: '', name: '', song: '', singer: '', image: '' }))
    // dispatch(isRunning(true))
  }
  const handleAddYourMusics = (songModel:any) => {
    dispatch(setSongModel({ id: '', name: '', song: '', singer: '', image: '' }))
    dispatch(addYourPlaylists(songModel))

  }

  return (
    <Box
      onClick={handleBoxClick}
      sx={{
        bgcolor: `${backgroundUrl}`,
        width: '330px',
        height: '470px',
        borderRadius: '8px',
        textAlign: 'center',
        color: '#fff',
      }}
      className="modelslider"
    >
      <Box sx={{ width: '290px', textAlign: 'center', m: '20px' }}>
        <Box
          sx={{
            color: '#fff',
            textAlign: 'center',
            mt: '20px',
            fontSize: '14px',
            fontWeight: '400',
          }}
        >
          Bạn có muốn phát bài hát này? Danh sách phát hiện tại sẽ bị thay thế.
        </Box>
        <Box sx={{ px: '40px', mt: '10px', mx: '5px' }}>
          <Box
            sx={{ height: '180px', width: '180px', objectFit: 'cover', borderRadius: "10px" }}
            component="img"
            src={image}
            alt=""
          ></Box>
        </Box>

        <Box>
          <Box>{name}</Box>
          <Box
            sx={{
              fontSize: '12px',
              fontWeight: '400',
              lineHeight: '1.33',
              color: 'hsla(0,0%,100%,0.5)',
            }}
          >
            {singer}
          </Box>
        </Box>
        <Box sx={{ mt: '30px' }}>
          <Box
            component="button"
            onClick={() => handleRenderSong(songModel)}
            sx={{
              fontSize: '14px',
              py: '9px',
              px: '24px',
              fontWeight: '400',
              margin: '0 auto',
              bgcolor: '#309785',
              border: '1px solid hsla(0,0%,100%,0.1)',
              color: '#fff',
              textTransform: 'uppercase',
              cursor: 'pointer',
              mt: '10px',
              display: "inline-block",
              width: "100%",
              borderRadius: "999px",
              '&:hover': {
                bgcolor: 'hsla(0,0%,100%,0.1)'
              }
            }}
          >
            Phát bài hát
          </Box>
          <Box
            component="button"
            onClick={() => handleAddYourMusics(songModel)}
            sx={{
              display: "inline-block",
              fontSize: '14px',
              py: '9px',
              px: '24px',
              fontWeight: '400',
              margin: '0 auto',
              bgcolor: '#dbdbdb;',
              border: '1px solid hsla(0,0%,100%,0.1)',
              color: '#32323d',
              textTransform: 'uppercase',
              cursor: 'pointer',
              mt: '10px',
              width: "100%",
              borderRadius: "999px",
              '&:hover': {
                bgcolor: 'rgba(197, 197, 197,1)'
              }
            }}
          >
            Thêm vào danh sách bài hát
          </Box>
          <Box
            onClick={() =>
              dispatch(setSongModel({ id: '', name: '', song: '', singer: '', image: '' }))
            }
            sx={{
              fontSize: "14px",
              display: "inline-block",
              fontWeight: '400',
              margin: '0 auto',
              color: '#fff',
              textTransform: 'uppercase',
              cursor: 'pointer',
              mt: '10px',
              width: "100%",
              py: "8px"
            }}
          >
            Bỏ Qua
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
