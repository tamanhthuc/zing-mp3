import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Grid, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setRunning } from '../../redux/actions/music';
import { addYourPlaylists } from '../../redux/actions/playlists';


 interface IMusicProps {
  music: {
    id: string;
    image: string;
    isRunning?: boolean;
    isYourPlaylists?: boolean;
    mvSong?: string;
    name: string;
    singer: string;
    song: string;
    viewed?: number;
    isMoreActive?: boolean;
    overlay?: boolean;
  };

  index : number  ;
  key?: string;
  onDelete ?: (id: string) => void
  
 
}
export default function MusicItem({ music, index , onDelete}: IMusicProps) {
 
  const dispatch = useDispatch();
  const handleSetRunning = (music: any) => {
    console.log("song", music)
    dispatch(setRunning(music));
  };
  const handleAddPlaylist = (music: any) => {
    dispatch(addYourPlaylists(music));
  };

  const styleIndexTop = (index: number ) => {
    if (index === 0) return ' topMusic__index-1';
    else if (index === 1) return ' topMusic__index-2';
    else if (index === 2) return '  topMusic__index-3';
  };

  let text = ''

  if (onDelete){
    text = 'xoa'
  }else {
    text = '...'
  }
 
  const handleRemove = (id: string) => {
    console.log("id", id)
    // onDelete(id)
    try {

    }catch(err) {
      alert(err)
    }
  }

  const handleDelete = () => {
    if (onDelete){
      onDelete(music.id)
    }
  }

  return (
   
    <div className="topMusic__detail">
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: '10px', mb: '10px' }}
      >
        <Grid item lg={4} xs={4} md={4} >
          <div className="topMusic__info">
            <div className={`topMusic__info__index ${styleIndexTop(index)}`}>{index + 1}</div>
            <div className="topMusic__info__wrap">
              <PlayArrowIcon
                className="topMusic__info__wrap__icon topMusic__detail__info__active"
                onClick={() => handleSetRunning(music)}
              />
              <div className="topMusic__info__wrap__img">
              <Box component="img" className="topMusic__info__img" src={music.image} alt="image" />
              </div>
            </div>

            <div className="topMusic__info__song">
              <div className="topMusic__info__song__name">{music.name}</div>
              <div className="topMusic__info__song__singer">{music.singer}</div>
            </div>
          </div>
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          <div className="topMusic__singer">{music.singer} (Single)</div>
        </Grid>
        <Grid item md={4} lg={4} xs={4}>
          <div className="topMusic__icon topMusic__detail__icon__active">
            <Tooltip title="Phát cùng lời bài hát" arrow placement="top">
              <MicExternalOnIcon className="topMusic__icon__item" />
            </Tooltip>

            <Tooltip title="Thêm vào thư viện" arrow placement="top">
              <FavoriteBorderIcon
                className="topMusic__icon__item"
                onClick={() => handleAddPlaylist(music)}
              />
            </Tooltip>

            {/* <Tooltip title="xem thêm" arrow placement="top"> */}
              <div className="topMusic__icon__more topMusic__icon__item" onClick={handleDelete} >{text}</div>
            {/* </Tooltip> */}
          </div>
          <div className="topMusic__duration topMusic__detail__duration__active">03:68</div>
        </Grid>
      </Grid>

      {/* <div className="watch__more">
       {more && <WatchMore />} 
      </div> */}
    </div>
  );
}
