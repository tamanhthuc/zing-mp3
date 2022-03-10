import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { setSongModel } from '../../redux/actions/model';
import { setRunning } from '../../redux/actions/music';
import { addYourPlaylists } from '../../redux/actions/playlists';
import { ThemeContext } from '../../context/ThemeContext';

export default function ModelSlider({ songModel }: any) {
  const { image, name, singer, song, id } = songModel;

  const value = useContext(ThemeContext);
  const { backgroundUrl, setBackgroundUrl }: any = value;

  const handleBoxClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event?.stopPropagation();
  };

  const dispatch = useDispatch();
  const handleRenderSong = (songModel: any) => {
    dispatch(setRunning(songModel));
    dispatch(setSongModel({ id: '', name: '', song: '', singer: '', image: '' }));
    // dispatch(isRunning(true))
  };
  const handleAddYourMusics = (songModel: any) => {
    dispatch(setSongModel({ id: '', name: '', song: '', singer: '', image: '' }));
    dispatch(addYourPlaylists(songModel));
  };

  return (
    <Box
      onClick={handleBoxClick}
      sx={{
        bgcolor: `${backgroundUrl}`,
      }}
      className="modelSlider"
    >
      <Box className="modelSlider__item">
        <Box className="modelSlider__item__title">
          Bạn có muốn phát bài hát này? Danh sách phát hiện tại sẽ bị thay thế.
        </Box>
        <Box sx={{ px: '40px', mt: '10px', mx: '5px' }} className="modelSlider__item__wrap">
          <Box component="img" src={image} alt="" className="modelSlider__item__wrap__img"></Box>
        </Box>

        <Box className="modelSlider__item__main">
          <Box className="modelSlider__item__main__name">{name}</Box>
          <Box className="modelSlider__item__main__singer">{singer}</Box>
        </Box>
        <Box className="modelSlider__item__btn">
          <div
           
            onClick={() => handleRenderSong(songModel)}
            className="modelSlider__item__btn__start"
          >
            Phát bài hát
          </div>
          <div
            onClick={() => handleAddYourMusics(songModel)}
            className="modelSlider__item__btn__add "
          >
            Thêm vào danh sách bài hát
          </div>
          <Box
            onClick={() =>
              dispatch(setSongModel({ id: '', name: '', song: '', singer: '', image: '' }))
            }
            className="modelSlider__item__btn__ignor"
          >
            Bỏ Qua
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
