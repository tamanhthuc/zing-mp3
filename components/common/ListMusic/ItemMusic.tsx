
import WatchMore from '../../WatchMore/WatchMore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRunning } from '../../../redux/actions/music';
import { addYourPlaylists, setOpenPlaylists } from '../../../redux/actions/playlists';
import { IRootState } from '../../../redux/reducers';
import BassMusic from '../BassMusic/BassMusic';
import { IsongProps } from './ListMusic';

interface IProps {
  newSong: IsongProps;
  handeMoreMenu: (id: string) => void;
  more?: boolean;
  overlay?:boolean;
  handeOverlay: (id: string) => void
}

function ItemMusic({ newSong, handeMoreMenu, more , overlay,handeOverlay}: IProps) {
  
  
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState<undefined | string | IsongProps>();
  const isRunningSong = useSelector((state: IRootState) => state.music.isRunning);
  const runningMusic = useSelector((state: IRootState) => state.music.runningMusic);
  const isRunningMusic = useSelector((state: IRootState) => state.music.isRunning);

  const [isPlaying, setIsPlaying] = useState<boolean>(isRunningSong);
 
  const [moreNow, setMoreNow] = useState(more);

  let next = useSelector((state: IRootState) => state.music.next);
  // console.log("next", next)
  const handleAddPlaylists = (song: IsongProps) => {
    
    dispatch(addYourPlaylists(song))
    dispatch(setOpenPlaylists(true));
  };


  const handleAddRunningMusic = (song: IsongProps) => {
    

    dispatch(setRunning(song));
    
      // handeOverlay(newSong.id);
    
  };


  const isBass = (id: string) => {
    if (runningMusic.length > 0) {
      const current = runningMusic[0];
      if (Number(current?.id) == Number(id) && isRunningSong) {
        return <BassMusic />;
      }
    }
    return '';
  };

  useEffect(() => {
    setMoreNow(more);
  }, [more, handeMoreMenu]);

  const moreRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (moreRef.current && !moreRef.current.contains(event.target)) {
      setMoreNow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });
  const overlayRef = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    if (overlay ) {
      overlayRef.current.classList.add('music__item__model__wrap--active')
    }else {
      overlayRef.current.classList.remove('music__item__model__wrap--active')

    }

  }, [handeOverlay, runningMusic])

  

  return (
    <div className="music">
      <Box
        className="music__item"
        onMouseLeave={() => setIsHover(undefined)}
        onMouseEnter={() => setIsHover(newSong.id)}
      >
        <Box className="music__item__model">
          <div className={`music__item__model__wrap`} ref={overlayRef} >
            <Box className="music__item__model__overlay"></Box>

            <Box
              className="music__item__model__img"
              component="img"
              src={newSong.image}
              alt="hihi"
            />
            {isHover === newSong.id ? (
              <Box className="music__item__action">
                <Tooltip title="Thêm vào yêu thích" arrow placement="top">
                  <FavoriteBorderIcon
                    className="music__item__action__icon"
                    onClick={() => handleAddPlaylists(newSong)}
                  />
                </Tooltip>

                {/* {isPlaying ? (
              <PauseCircleOutlineOutlinedIcon className="music__item__action__icon-border" />
            ) : ( */}

                <PlayArrowIcon
                  className="music__item__action__icon-border"
                  onClick={() => handleAddRunningMusic(newSong)}
                />
                {/* )} */}
                <Tooltip title="khác" arrow placement="top">
                  <div
                    className=" music__item__action__more"
                    onClick={() => handeMoreMenu(newSong.id)}
                  >
                    <span>...</span>
                  </div>
                </Tooltip>
              </Box>
            ) : (
              isBass(newSong.id)
            )}
          </div>

          <Box className="music__item-name">{newSong.name}</Box>
          <div className="music__item-singer">{newSong.singer}</div>
        </Box>
      </Box>
      <div className="music__more" ref={moreRef}>
        {moreNow && <WatchMore />}
      </div>
    </div>
  );
}

export default memo(ItemMusic)
